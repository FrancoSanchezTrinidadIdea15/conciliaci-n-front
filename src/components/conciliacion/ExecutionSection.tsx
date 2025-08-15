"use client"
import { FaPlay } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

interface ExecutionSectionProps {
  onExecute: () => void;
  isExecuting?: boolean;
}

export const ExecutionSection = ({ onExecute, isExecuting = false }: ExecutionSectionProps) => {
  return (
    <div className="bg-gray-600 rounded-lg p-6 text-white flex-1 h-72">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Ejecutar Conciliación</h3>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Mes</label>
            <Select>
              <SelectTrigger className="h-11 text-white border-gray-600 bg-gray-700">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent className=" text-gray-900 bg-gray-700 border-gray-600">
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="1">Enero</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="2">Febrero</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="3">Marzo</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="4">Abril</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="5">Mayo</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="6">Junio</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="7">Julio</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="8">Agosto</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="9">Septiembre</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="10">Octubre</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="11">Noviembre</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="12">Diciembre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block mb-1 text-sm text-gray-300">Año</label>
            <Select>
              <SelectTrigger className="h-11 text-white border-gray-600 bg-gray-700">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent className=" text-gray-900 border-gray-600 bg-gray-700">
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="2025">2025</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="2024">2024</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="2023">2023</SelectItem>
                <SelectItem  className="hover:bg-gray-600 hover:text-white" value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Monto ($)</label>
            {/* TODO: Add input validation solo aceptar numeros y decimales */}
            <input
              inputMode="numeric"
              pattern="[0-9.]*"
              type="number"
              min="0"
              max="999999999999999999"
              step="0.01"
              placeholder="0.00"
              className="px-3 py-2 w-full text-sm rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm text-gray-300">Días</label>
            {/* TODO: Add input validation solo aceptar numeros */}
            <input
              inputMode="numeric"
              pattern="[0-9]*"    
              type="number"
              placeholder="0"
              className="px-3 py-2 w-full text-sm rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={onExecute}
        disabled={isExecuting}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white rounded transition-all hover:bg-gray-100 hover:shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center"
      >
        <FaPlay className="w-3 h-3 mr-2" />
        <span>{isExecuting ? 'Ejecutando...' : 'Ejecutar'}</span>
      </button>
    </div>
  );
};
