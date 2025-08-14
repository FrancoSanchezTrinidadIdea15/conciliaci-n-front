interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
};

export const Button = ({
  className = "",
  children,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) => {
    const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants: Record<string, string> = {
    primary:
        "bg-black text-white hover:bg-black/80 focus-visible:ring-black",
    secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
    ghost:
        "bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300",
    };

    const width = fullWidth ? "w-full" : "";

    return (
    <button
        className={`${base} ${variants[variant]} ${width} px-4 h-10 ${className}`}
        {...props}
    >
        {children}
    </button>
  );
};
