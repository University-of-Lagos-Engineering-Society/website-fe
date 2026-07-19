'use client';

import { useActionState } from 'react';
import { subscribe, type SubscribeState } from '../actions/newsletter';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const initialState: SubscribeState = { status: 'idle' };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);

  // input disappears, replaced by the message
  if (state.status === 'success') {
    return (
      <p className="text-muted-foreground text-sm" role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="max-w-150 space-y-2 lg:max-w-none">
      <div className="flex gap-2">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          disabled={pending}
          aria-invalid={state.status === 'error'}
          className="h-12 border border-[#374151] bg-transparent text-sm/none text-gray-200 placeholder:text-base/none placeholder:text-gray-200 md:text-base/none lg:border-gray-200 dark:bg-transparent"
        />
        <Button
          type="submit"
          disabled={pending}
          className="bg-accent text-gray-5 hover:bg-accent/80 xs:shrink-0 w-29.75 shrink text-sm/[24px] font-medium text-gray-50 md:text-base/[24px]"
        >
          {pending ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      {state.status === 'error' && (
        <p className="text-destructive text-sm" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
