import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Button } from '../ui/Button';

interface Movement {
  id: string;
  amount: number;
  cfdi: number;
  movements: number;
}

interface MovementsTableProps {
  movements: Movement[];
  isLoading?: boolean;
}

export const MovementsTable = ({ movements, isLoading = false }: MovementsTableProps) => {


  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (movements.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 py-16 text-center">
        <FaFileAlt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-base font-medium text-gray-900 mb-1">No hay movimientos</h3>
        <p className="text-sm text-gray-500">
          No se encontraron movimientos bancarios con los filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto 
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                CFDI
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movimientos
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vista
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((movement) => (
              <tr key={movement.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center">
                  ${movement.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-gray-900">51</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-gray-900">51</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Button variant="blue">
                    Visualizar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
