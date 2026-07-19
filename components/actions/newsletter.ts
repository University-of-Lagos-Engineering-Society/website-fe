'use server';

import { z } from 'zod';
import { SITE_URL, SUBSTACK_URL } from '../constants';

export type SubscribeState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; message: string };

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = schema.safeParse({ email: formData.get('email') });
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.issues[0].message };
  }

  const email = parsed.data.email.toLowerCase().trim();

  try {
    const res = await fetch(`${SUBSTACK_URL}/api/v1/free`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Substack checks these — spoof the embed's context
        Origin: SITE_URL,
        Referer: `${SITE_URL}/`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return {
        status: 'error',
        message: "Couldn't subscribe right now — please try again.",
      };
    }

    return {
      status: 'success',
      message: 'Thanks for signing up! Check your inbox to confirm.',
    };
  } catch {
    return {
      status: 'error',
      message: "Couldn't subscribe right now — please try again.",
    };
  }
}
