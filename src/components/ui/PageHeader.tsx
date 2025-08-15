import React from 'react';
import { IconType } from 'react-icons';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: IconType;
  children?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, icon: Icon, children }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="flex justify-center items-center w-8 h-8 bg-blue-100 rounded-md">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {children && (
          <div className="flex items-center space-x-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
