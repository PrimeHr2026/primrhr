import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "amber";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold font-[family-name:var(--font-inter)] transition-[transform,background-color,color,box-shadow] duration-200 ease-[var(--ease-out-soft)] focus-visible:outline-2 active:translate-y-px disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-soft shadow-[0_10px_30px_-12px_rgba(6,14,58,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(6,14,58,0.7)]",
  secondary:
    "border border-navy/30 text-navy hover:border-navy hover:bg-navy/[0.04]",
  ghost: "text-navy hover:bg-navy/[0.05]",
  whatsapp: "bg-whatsapp text-white hover:brightness-95 shadow-[0_10px_30px_-12px_rgba(37,211,102,0.7)]",
  amber: "bg-amber text-navy hover:bg-amber-deep hover:text-white shadow-[0_10px_30px_-12px_rgba(245,165,36,0.8)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: CommonProps & {
  href?: string;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
