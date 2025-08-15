"use client"
import { FaFileAlt, FaCheckCircle, FaExclamationTriangle, FaDollarSign } from 'react-icons/fa';
import { StatCard } from '@/components/ui/StatCard';
import { UploadSection, ExecutionSection, FiltersSection, MovementsTable } from '@/components/conciliacion';
import { useConciliacion } from '@/hooks/useConciliacion';

export default function ConciliacionPage() {
  const {
    selectedFile,
    filteredMovements,
    isExecuting,
    stats,
    handleFileSelect,
    handleExecute,
    handleSearch,
    handleStateFilter,
    handleTypeFilter
  } = useConciliacion();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-16 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Conciliación Bancaria</h1>
          <p className="text-xs text-gray-600">
            INTELIGENCIA DATOS ESTADISTICAS Y ANALISIS S.A.P.I DE C.V - IDE2001209V6
          </p>
        </div>

        {/* Estadísticas */}
        <div className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Movimientos"
              value={stats.totalMovements}
              icon={<FaFileAlt className="w-4 h-4" />}
              color="blue"
            />
            <StatCard
              title="Conciliados"
              value={stats.conciliados}
              icon={<FaCheckCircle className="w-4 h-4" />}
              color="green"
            />
            <StatCard
              title="Pendientes"
              value={stats.pendientes}
              icon={<FaExclamationTriangle className="w-4 h-4" />}
              color="red"
            />
            <StatCard
              title="Monto Total"
              value={`$${stats.totalAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}
              icon={<FaDollarSign className="w-4 h-4" />}
              color="yellow"
            />
          </div>
        </div>

        {/* Secciones principales */}
        <div className="flex gap-6 mb-8">
          <UploadSection
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
          <ExecutionSection
            onExecute={handleExecute}
            isExecuting={isExecuting}
          />
        </div>

        {/* Filtros y Tabla */}
        <div className="space-y-4">
          
          <MovementsTable
            movements={filteredMovements}
            isLoading={isExecuting}
          />
        </div>
      </div>
    </div>
  )
}