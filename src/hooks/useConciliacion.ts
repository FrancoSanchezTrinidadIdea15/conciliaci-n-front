import { useState, useMemo } from 'react';

interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  state: 'conciliado' | 'pendiente' | 'sin_conciliar';
  type: 'ingreso' | 'egreso' | 'transferencia';
}

const mockMovements: Movement[] = [
  {
    id: '1',
    concept: 'Transferencia bancaria',
    amount: 1500.00,
    date: '2024-01-15',
    state: 'conciliado',
    type: 'ingreso'
  },
  {
    id: '2', 
    concept: 'Pago proveedor',
    amount: 750.50,
    date: '2024-01-14',
    state: 'pendiente',
    type: 'egreso'
  },
  {
    id: '3',
    concept: 'Depósito cliente',
    amount: 2300.75,
    date: '2024-01-13',
    state: 'sin_conciliar',
    type: 'ingreso'
  }
];

export const useConciliacion = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [movements] = useState<Movement[]>(mockMovements);
  const [filteredMovements, setFilteredMovements] = useState<Movement[]>(mockMovements);
  const [isExecuting, setIsExecuting] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    type: ''
  });

  // Estadísticas calculadas
  const stats = useMemo(() => {
    const total = filteredMovements.length;
    const conciliados = filteredMovements.filter(m => m.state === 'conciliado').length;
    const pendientes = filteredMovements.filter(m => m.state === 'pendiente').length;
    const amount = filteredMovements.reduce((sum, m) => sum + m.amount, 0);

    return {
      totalMovements: total,
      conciliados,
      pendientes,
      totalAmount: amount
    };
  }, [filteredMovements]);

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = movements;

    if (filters.search) {
      filtered = filtered.filter(m => 
        m.concept.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.state) {
      filtered = filtered.filter(m => m.state === filters.state);
    }

    if (filters.type) {
      filtered = filtered.filter(m => m.type === filters.type);
    }

    setFilteredMovements(filtered);
  };

  // Handlers
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 2000);
  };

  const handleSearch = (term: string) => {
    setFilters(prev => ({ ...prev, search: term }));
    const newFilters = { ...filters, search: term };
    
    let filtered = movements;
    if (newFilters.search) {
      filtered = filtered.filter(m => 
        m.concept.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }
    if (newFilters.state) {
      filtered = filtered.filter(m => m.state === newFilters.state);
    }
    if (newFilters.type) {
      filtered = filtered.filter(m => m.type === newFilters.type);
    }
    
    setFilteredMovements(filtered);
  };

  const handleStateFilter = (state: string) => {
    setFilters(prev => ({ ...prev, state }));
    const newFilters = { ...filters, state };
    
    let filtered = movements;
    if (newFilters.search) {
      filtered = filtered.filter(m => 
        m.concept.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }
    if (newFilters.state) {
      filtered = filtered.filter(m => m.state === newFilters.state);
    }
    if (newFilters.type) {
      filtered = filtered.filter(m => m.type === newFilters.type);
    }
    
    setFilteredMovements(filtered);
  };

  const handleTypeFilter = (type: string) => {
    setFilters(prev => ({ ...prev, type }));
    const newFilters = { ...filters, type };
    
    let filtered = movements;
    if (newFilters.search) {
      filtered = filtered.filter(m => 
        m.concept.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }
    if (newFilters.state) {
      filtered = filtered.filter(m => m.state === newFilters.state);
    }
    if (newFilters.type) {
      filtered = filtered.filter(m => m.type === newFilters.type);
    }
    
    setFilteredMovements(filtered);
  };

  return {
    // State
    selectedFile,
    filteredMovements,
    isExecuting,
    stats,
    
    // Handlers
    handleFileSelect,
    handleExecute,
    handleSearch,
    handleStateFilter,
    handleTypeFilter
  };
};
