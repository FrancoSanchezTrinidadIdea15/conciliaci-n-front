import React from 'react';
import { FaPlay } from 'react-icons/fa';

interface ExecutionSectionProps {
  onExecute: () => void;
  isExecuting?: boolean;
}

export const ExecutionSection = ({ onExecute, isExecuting = false }: ExecutionSectionProps) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center mb-3 space-x-2">
        <FaPlay className="w-4 h-4 text-green-600" />
        <h3 className="text-base font-medium text-gray-900">Ejecutar Conciliación</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Mes
          </label>
          <select className="px-3 py-2 w-full text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Seleccionar mes</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Año
          </label>
          <select className="px-3 py-2 w-full text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Seleccionar año</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Tolerancia Monto ($)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            className="px-3 py-2 w-full text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Tolerancia Días
          </label>
          <input
            type="number"
            placeholder="0"
            className="px-3 py-2 w-full text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <button
        onClick={onExecute}
        disabled={isExecuting}
        className="flex justify-center items-center px-4 py-2 space-x-2 w-full text-sm font-medium text-white bg-green-600 rounded-md transition-colors hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <FaPlay className="w-3 h-3" />
        <span>{isExecuting ? 'Ejecutando...' : 'Ejecutar Conciliación'}</span>
      </button>
    </div>
  );
};
