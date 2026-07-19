import { ArrowRight } from "lucide-react";

export interface BlogCardDetails {
  release: string;
  title: string;
  author: string;
  date: string;
  description: string;
  readMoreHref?: string;
  onReadMoreClick?: () => void;
}

interface BlogCardProps {
  details: BlogCardDetails;
  imageUrl: string;
  imageAlt?: string;
}

export default function BlogCard({
  details,
  imageUrl,
  imageAlt = "",
}: BlogCardProps) {
  const { release, title, author, date, description, readMoreHref, onReadMoreClick } =
    details;

  return (
    <div className="w-full max-w-sm mx-auto sm:mx-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-2 p-6">
        <p className="text-sm font-medium text-emerald-600">{release}</p>

        <h3 className="text-xl sm:text-2xl font-semibold leading-snug text-slate-900">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
          <span>By {author}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{date}</span>
        </div>

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
