import { ArrowRight } from "lucide-react";

export interface NewsCardDetails {
  date: string;
  title: string;
  description: string;
  readMoreHref?: string;
  onReadMoreClick?: () => void;
}

interface NewsCardProps {
  details: NewsCardDetails;
  imageUrl: string;
  imageAlt?: string;
}

export default function NewsCard({
  details,
  imageUrl,
  imageAlt = "",
}: NewsCardProps) {
  const { date, title, description, readMoreHref, onReadMoreClick } = details;

  return (
    <div className="w-full max-w-[592px] mx-auto sm:mx-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Image */}
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 p-6">
        <p className="text-sm font-medium text-emerald-600">{date}</p>

        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>

        <p className="text-slate-600">{description}</p>

        <a
          href={readMoreHref ?? "#"}
          onClick={onReadMoreClick}
          className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-slate-900 transition-colors hover:text-emerald-600"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
