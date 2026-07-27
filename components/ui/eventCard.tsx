import { Calendar, ArrowRight } from 'lucide-react';

export interface EventCardDetails {
  category: string;
  title: string;
  date: string;
  description: string;
  learnMoreHref?: string;
  onLearnMoreClick?: () => void;
}

interface EventCardProps {
  details: EventCardDetails;
  imageUrl: string;
  imageAlt?: string;
}

export default function EventCard({ details, imageUrl, imageAlt = '' }: EventCardProps) {
  const { category, title, date, description, learnMoreHref, onLearnMoreClick } = details;

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-slate-200 bg-transparent shadow-sm sm:mx-0">
      {/* Image */}
      <div className="aspect-4/3 w-full overflow-hidden">
        <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="space-y-3 p-6">
        <p className="text-sm font-medium text-emerald-600">{category}</p>

        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>

        <p className="text-slate-600">{description}</p>

        <a
          href={learnMoreHref ?? '#'}
          onClick={onLearnMoreClick}
          className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-slate-900 transition-colors hover:text-emerald-600"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
