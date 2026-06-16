import { Reveal } from "@/components/motion/Reveal";
import { clsx } from "@/lib/clsx";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className={clsx("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-0.5 w-6 rounded-full bg-amber" />
          <span className={clsx("eyebrow", light && "!text-blue-soft")}>{eyebrow}</span>
        </div>
      )}
      <h2
        className={clsx(
          "mt-3 text-3xl font-extrabold sm:text-4xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={clsx("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-steel-light" : "text-slate")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
