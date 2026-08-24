/**
 * The one empty state for the whole site.
 *
 * A heading plus one muted line, centred, sitting inside whatever vertical
 * rhythm the calling section already has. No illustration, no CTA, no border —
 * an empty list should read as a quiet absence, not as an error.
 *
 * Every list-rendering screen imports this and passes copy. Don't write a second one.
 */

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center">
      <h2 className="text-primary text-xl/7 font-medium">{title}</h2>
      <p className="text-muted-foreground mx-auto mt-3 max-w-md text-base/6">{description}</p>
    </div>
  );
}
