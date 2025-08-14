interface AlertProps {
  message: string;
  type?: "error" | "success" | "warning";
}

export const Alert = ({ message, type = "error" }: AlertProps) => {
  if (!message) return null;

  const baseClasses = "p-3 rounded-md text-sm font-medium";
  
  const typeClasses = {
    error: "bg-red-50 text-red-700 border border-red-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
};
