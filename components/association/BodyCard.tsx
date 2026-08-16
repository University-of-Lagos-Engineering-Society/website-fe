import Image from 'next/image';
import { Card } from '../ui/card';

type BodyCardProps = {
  name: string;
  imageSrc: string;
  imageWidth: number | null;   // base scale (1x display px)
  imageHeight: number | null;
  tagline: string;
  body: string;
  type: string;
};

export function BodyCard({
  imageSrc, name, imageWidth, imageHeight, tagline, body, type,
}: BodyCardProps) {
  return (
    <Card className="flex flex-col items-center gap-y-3 rounded-lg border border-gray-200 p-0">
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
        <p className="pr-1.5 text-left text-base/6 text-gray-700">{body}</p>
      </div>
    </Card>
  );
}
