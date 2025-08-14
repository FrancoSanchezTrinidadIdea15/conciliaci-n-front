interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
};

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
            {/* aqui puede ir un logo */}
        <div className="rounded-xl bg-white p-6 shadow-md">
            <h1 className="text-center text-xl font-semibold text-gray-900">{title}</h1>
            {subtitle ? (
            <p className="mt-1 text-center text-sm text-gray-500">{subtitle}</p>
            ) : null}
            <div className="mt-6">{children}</div>
        </div>
        </div>
    </div>
    );
}
