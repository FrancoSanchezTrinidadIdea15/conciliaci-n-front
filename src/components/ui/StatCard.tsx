import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

export const StatCard = ({ title, value, icon, color = 'blue' }: StatCardProps) => {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-200', // #3b82f6 text on #bfdbfe bg
    green: 'text-green-600 bg-green-50', // #16a34a on #f0fdf4
    red: 'text-red-500 bg-red-50', // #ef4444 on #fca5a5 (light)
    yellow: 'text-yellow-600 bg-yellow-50' // #ca8a04 on #fefce8
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow h-24 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-1 truncate font-medium">
            {title}
          </p>
          <p className="text-xl font-bold text-gray-900">
            {value}
          </p>
        </div>
        <div className={`${colorClasses[color]} ml-3 p-2 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};