export const HIGHLIGHTED_POST_ITEMS = [
  {
    id: 1,
    details: {
      release: 'Release #05',
      title: '5 Tips for Surviving Your First Year in Engineering',
      author: 'Chiamaka Okonkwo',
      date: 'Apr 15, 2026',
      description:
        'Starting your engineering journey can be overwhelming. Here are some practical tips to help you thrive academically and socially.',
      readMoreHref: '#',
    },
    imageUrl: '/home/blog1.png',
    imageAlt: 'Blog 1',
    highlight: true,
  },
  {
    id: 2,
    details: {
      release: 'Release #05',
      title: '5 Tips for Surviving Your First Year in Engineering',
      author: 'Chiamaka Okonkwo',
      date: 'Apr 15, 2026',
      description:
        'Starting your engineering journey can be overwhelming. Here are some practical tips to help you thrive academically and socially.',
      readMoreHref: '#',
    },
    imageUrl: '/home/blog1.png',
    imageAlt: 'Blog 2',
    highlight: true,
  },
  {
    id: 3,
    details: {
      release: 'Release #05',
      title: '5 Tips for Surviving Your First Year in Engineering',
      author: 'Chiamaka Okonkwo',
      date: 'Apr 15, 2026',
      description:
        'Starting your engineering journey can be overwhelming. Here are some practical tips to help you thrive academically and socially.',
      readMoreHref: '#',
    },
    imageUrl: '/home/blog1.png',
    imageAlt: 'Blog 3',
    highlight: true,
  },
];

/**
 * Filter pills on the blog index, in the order the design lists them. "All" is
 * the unfiltered state and lives in the component, not here — it isn't a
 * category a post can belong to.
 */
export const BLOG_CATEGORIES = ['Tech', 'Career', 'Campus Life', 'Opinion'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * Posts rendered by `/stories/blog`. Same shape as `HIGHLIGHTED_EVENT_ITEMS`
 * and `NEWS_ITEMS` — numeric `id`, `slug` for the detail route, nested
 * `details`, `imageUrl`/`imageAlt` at the top level — plus `category`, which
 * drives the filter pills.
 *
 * SEEDED WITH ONE POST. The Figma frame shows six cards and
 * `HIGHLIGHTED_POST_ITEMS` above holds three, but every one of them is the same
 * placeholder repeated — this is the only distinct post that exists anywhere.
 * Real posts, real slugs and real category assignments still need to land.
 *
 * `category` is assigned here rather than derived; nothing upstream supplies
 * one yet.
 */
export const BLOG_ITEMS: {
  id: number;
  slug: string;
  category: BlogCategory;
  details: {
    release: string;
    title: string;
    author: string;
    authorPfp: string;
    /** Shown on the card. The detail frame spells the month out in full. */
    date: string;
    longDate: string;
    description: string;
    /** One-line author bio, shown in the About Author block on the detail page. */
    authorBio: string;
    /**
     * Full post, newline-delimited into paragraphs. Unlike `NEWS_ITEMS.body`
     * this is plain prose — blog posts have no section headings, so the detail
     * page doesn't run the digest's heading heuristic over it.
     */
    body: string;
    readMoreHref: string;
  };
  /**
   * Canonical post on the ULES Substack. The detail page is a teaser that
   * funnels here — it shows an excerpt behind a fade and sends readers on.
   * Required: without it the page would dead-end on a truncated post.
   */
  blogLink: string;
  imageUrl: string;
  imageAlt: string;
}[] = [
  {
    id: 1,
    slug: "my-first-love-letter",
    category: 'Campus Life',
    details: {
      release: "Release #01",
      title: "My Last Love Letter 💌",
      author: "ULES Blog",
      authorPfp: "/blogs/ules-author.png",
      date: "November 2, 2025",
      longDate: "November 2, 2025",
      description:
        "Most people think a love letter is about romance.\nMine never was.\nThis is the last one. 💌\nhttps://ulesblog.substack.com/p/2358f364-d0fa-4194-9211-9b11501773ca\nYou probably think this is another newsletter.\nIt's a goodbye. 💛",
      authorBio: "ULES Blog is the official blog written and managed by the ULES.",
      // STUB. No article copy exists for this post anywhere — not in the Figma
      // frame (which reuses the Shell Nigeria placeholder) and not in the
      // constants this was migrated from. This repeats the card summary so the
      // page renders; the five tips still need writing.
      body: "Most people think a love letter is about romance.\nMine never was.\nThis is the last one. 💌\nhttps://ulesblog.substack.com/p/2358f364-d0fa-4194-9211-9b11501773ca\nYou probably think this is another newsletter.\nIt's a goodbye. 💛",
      readMoreHref: '/stories/blog/my-first-love-letter',
    },
    blogLink: 'https://ulesblog.substack.com/p/2358f364-d0fa-4194-9211-9b11501773ca',
    imageUrl: "/blogs/my-first-love-letter.jpeg",
    imageAlt: "My Last Love Letter 💌",
  },
];
