import Image from 'next/image';
import { Card } from '../ui/card';
import { BodyReadMore } from './BodyReadMore';

type BodyCardProps = {
  name: string;
  imageSrc: string;
  imageWidth: number | null;   // base scale (1x display px)
  imageHeight: number | null;
  tagline: string;
  body: string;
  type: string;
};

/**
 * Roughly what fits in the clamp below at the narrowest card width (~36
 * characters per line at `md`, six lines). Past this the text is being cut off,
 * so the card offers the full version in a dialog instead of growing.
 */
const CLAMP_CHARACTERS = 220;

export function BodyCard({
  imageSrc, name, imageWidth, imageHeight, tagline, body, type,
}: BodyCardProps) {
  const isClamped = body.length > CLAMP_CHARACTERS;

  return (
    // `h-full` lets the card fill the grid track. Nothing inside grows, so a
    // short body leaves the slack at the bottom rather than spreading it out.
    <Card className="hover-lift flex h-full flex-col items-center gap-y-3 rounded-lg border border-gray-200 p-0">
      <div className="flex h-55 w-full items-center justify-center overflow-hidden px-6 py-4">
        <Image
          src={imageSrc}
          alt={name}
          width={imageWidth ?? 200}
          height={imageHeight ?? 200}
          className={` object-contain ${type == 'departmental' ? "h-50 w-auto" : "h-fit"}`}
          loading="eager"
        />
      </div>

      <div className="w-full p-6 pr-4">
        <h3 className="text-primary text-left text-2xl/6 font-medium">{name}</h3>
        <p className="text-accent mt-3 mb-4 truncate text-left text-sm/5">{tagline}</p>
        <p
          className={`pr-1.5 text-left text-base/6 whitespace-pre-line text-gray-700 ${
            isClamped ? 'line-clamp-6' : ''
          }`}
        >
          {body}
        </p>

        {isClamped && (
          <BodyReadMore name={name} tagline={tagline} body={body} imageSrc={imageSrc} />
        )}
      </div>
    </Card>
  );
}
