// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-primary text-primary hover:bg-primary/10",
        ghost: "text-primary hover:bg-primary/5",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-md",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

export const Button = ({ asChild, href, className, variant, size, ...props }: ButtonProps) => {
  const Comp = asChild && href ? Link : "button";
  return (
    <Comp
      href={href}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};
