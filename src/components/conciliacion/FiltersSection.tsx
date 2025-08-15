import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

interface FiltersSectionProps {
  onSearch: (term: string) => void;
  onStateFilter: (state: string) => void;
  onTypeFilter: (type: string) => void;
}

export const FiltersSection = ({ onSearch, onStateFilter, onTypeFilter }: FiltersSectionProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaFilter className="w-4 h-4 text-gray-600" />
          <h3 className="text-base font-medium text-gray-900">Filtros</h3>
        </div>
        <button className="text-blue-600 text-sm hover:text-blue-700">
          Más filtros
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Buscar en concepto
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar movimientos..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Estado
          </label>
          <select 
            onChange={(e) => onStateFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="conciliado">Conciliado</option>
            <option value="pendiente">Pendiente</option>
            <option value="sin_conciliar">Sin conciliar</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Tipo
          </label>
          <select 
            onChange={(e) => onTypeFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los tipos</option>
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>
      </div>
    </div>
  );
};
