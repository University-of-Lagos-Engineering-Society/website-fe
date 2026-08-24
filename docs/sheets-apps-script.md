# Routing forms to Google Sheets (temporary)

While `NEXT_PUBLIC_BASE_ENDPOINT` has no live backend, every form on the site
posts into a spreadsheet instead. This is a stopgap — the API transport
(`lib/api/client.ts` → `postJson`) is untouched and each form falls back to it
the moment `NEXT_PUBLIC_SHEETS_ENDPOINT` is cleared.

**Spreadsheet:** ULES Website — Form Responses
<https://docs.google.com/spreadsheets/d/1KdaHKUcFxwuus4gHjrzyWOIKML6a_axM53VXAsi3k-Q/edit>

Four tabs, one per form: `Contact`, `Questions`, `Feedback`, `Newsletter`. The
script below creates a tab (with headers) the first time a submission for it
arrives, so there is nothing to set up by hand.

## Why Apps Script and not the Sheets API

The Sheets API needs an OAuth token or a service-account key. Either one would
have to ship in the browser bundle, which would hand anyone who viewed source
write access to the spreadsheet. An Apps Script Web App deployed as *execute as
me / anyone can access* runs under your identity and exposes exactly one
operation — append a row — so the worst a scraper can do is add junk rows.

## Setup (about two minutes, and it has to be you — I can't deploy scripts)

1. Open the spreadsheet → **Extensions → Apps Script**.
2. Delete the placeholder `myFunction` and paste the script below.
3. **Deploy → New deployment → Web app.**
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
4. Copy the deployment URL (`https://script.google.com/macros/s/AKfycb.../exec`).
5. Paste it into `.env.local` as `NEXT_PUBLIC_SHEETS_ENDPOINT`, then restart
   `next dev`. It's a `NEXT_PUBLIC_` var, so production needs a redeploy, not
   just an env edit.

Re-deploy as a **new version** after any script edit — Apps Script serves the
last deployed version, not the last saved one.

```javascript
/**
 * Appends one form submission per request. Creates the tab and its header row
 * on first use, and widens the header if a form later sends a new field.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // Concurrent submits would otherwise interleave rows.

  try {
    var payload = JSON.parse(e.postData.contents);
    var tabName = payload.tab || 'Unsorted';
    delete payload.tab;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);

    var keys = Object.keys(payload);

    // First write to this tab: lay down a header row.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(keys);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, keys.length).setFontWeight('bold');
    }

    var header = sheet
      .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
      .getValues()[0]
      .filter(String);

    // A new field showed up — append it to the header rather than dropping it.
    var added = keys.filter(function (k) {
      return header.indexOf(k) === -1;
    });
    if (added.length) {
      sheet.getRange(1, header.length + 1, 1, added.length).setValues([added]);
      sheet.getRange(1, 1, 1, header.length + added.length).setFontWeight('bold');
      header = header.concat(added);
    }

    sheet.appendRow(
      header.map(function (key) {
        var value = payload[key];
        return value === undefined || value === null ? '' : String(value);
      })
    );

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // 200 with an error body on purpose: the client only checks the status, and
    // a thrown error would surface to the user as an opaque network failure.
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'failed', error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## What each tab receives

Every row starts with `submittedAt` (ISO, added client-side) and `request_id`,
which is stable across retries — index or de-duplicate on it if a submission
ever lands twice.

| Tab          | Fields                                                              |
| ------------ | ------------------------------------------------------------------- |
| `Contact`    | `name`, `email`, `subject`, `question`, `request_id`, `source`, `company_website` |
| `Questions`  | `name`, `email`, `question`, `request_id`, `source`, `company_website` |
| `Feedback`   | `subject`, `message`, `request_id`, `source`, `company_website`      |
| `Newsletter` | `email`                                                             |

`company_website` is the honeypot and should be blank on every genuine row — a
filled one is a bot. The contact and feedback forms drop those before they're
sent; anything that reaches the sheet with it populated came from a path that
doesn't.

## Known limits

- **No field-level errors.** The API contract maps `error.title` to an input
  (`createFieldResolver`); Apps Script has no such catalogue, so a failure shows
  as a form-level banner. Client-side validation still runs normally, so this
  only affects server-side rejections — which a spreadsheet doesn't do anyway.
- **No de-duplication.** `postJson`'s retry sends the same `request_id`
  expecting the backend to dedupe. A spreadsheet won't, so a retried submission
  appends a second row. Filter on `request_id` when exporting.
- **Not a database.** Apps Script Web Apps are rate-limited and the URL is
  public. Fine for a few hundred submissions; move to the real API before any
  campaign that might drive real volume.
