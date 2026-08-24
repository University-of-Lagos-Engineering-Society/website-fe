'use client';

import Image from 'next/image';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

/**
 * "Read more" affordance on a body card.
 *
 * The card clamps its body to a few lines; this opens the full write-up in a
 * modal. Only this piece is a client component — the card around it stays on
 * the server.
 */

type BodyReadMoreProps = {
  name: string;
  tagline: string;
  body: string;
  imageSrc: string;
};

export function BodyReadMore({ name, tagline, body, imageSrc }: BodyReadMoreProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className="text-primary hover:text-accent mt-3 h-auto gap-1 px-0 py-0 text-sm/5 font-medium hover:bg-transparent"
          />
        }
      >
        Read more
        <span className="sr-only">about {name}</span>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <div className="flex items-start gap-4 border-b border-gray-200 p-6 pr-4">
          <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 p-1.5">
            <Image
              src={imageSrc}
              alt=""
              width={56}
              height={56}
              className="h-full w-auto object-contain"
            />
          </span>

          <div className="min-w-0 flex-1">
            <DialogTitle className="text-primary text-xl/7 font-medium md:text-2xl/8">
              {name}
            </DialogTitle>
            <p className="text-accent mt-1 text-sm/5">{tagline}</p>
          </div>

          <DialogClose
            render={<Button variant="ghost" size="icon-sm" className="shrink-0" />}
          >
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        {/* The dialog is height-capped, so a long write-up scrolls here rather
            than pushing the close button off screen. */}
        <div className="overflow-y-auto p-6">
          <p className="text-base/7 whitespace-pre-line text-gray-700">{body}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
