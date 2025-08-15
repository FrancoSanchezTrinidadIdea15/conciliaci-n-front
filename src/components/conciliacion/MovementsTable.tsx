import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  state: 'conciliado' | 'pendiente' | 'sin_conciliar';
  type: 'ingreso' | 'egreso' | 'transferencia';
}

interface MovementsTableProps {
  movements: Movement[];
  isLoading?: boolean;
}

export const MovementsTable = ({ movements, isLoading = false }: MovementsTableProps) => {
  const getStateColor = (state: string) => {
    switch (state) {
      case 'conciliado':
        return 'text-green-600 bg-green-50';
      case 'pendiente':
        return 'text-yellow-600 bg-yellow-50';
      case 'sin_conciliar':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStateText = (state: string) => {
    switch (state) {
      case 'conciliado':
        return 'Conciliado';
      case 'pendiente':
        return 'Pendiente';
      case 'sin_conciliar':
        return 'Sin conciliar';
      default:
        return state;
    }
  };

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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Concepto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((movement) => (
              <tr key={movement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {movement.concept}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${movement.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {movement.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStateColor(movement.state)}`}>
                    {getStateText(movement.state)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {movement.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
