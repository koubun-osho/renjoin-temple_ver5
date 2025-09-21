import { cn } from "@/lib/utils";

export type CardProps = {
  title: string;
  description?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

export function Card({ title, description, href, className, children }: CardProps) {
  const content = (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg border border-zinc-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-zinc-800">{title}</h3>
      {description ? (
        <p className="text-sm leading-relaxed text-zinc-600">{description}</p>
      ) : null}
      {children}
    </article>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
