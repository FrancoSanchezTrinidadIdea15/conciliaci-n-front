import React from 'react';
import { FaUpload } from 'react-icons/fa';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
}

export const UploadSection = ({ onFileSelect, selectedFile }: UploadSectionProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="bg-blue-500 rounded-lg p-6 text-white w-80 h-72">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Subir Estado de Cuenta</h3>
        <p className="text-blue-200 text-sm">
          Carga tu archivo PDF para extraer movimientos bancarios.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-blue-500 bg-white rounded-md cursor-pointer hover:bg-blue-200/40 transition-all hover:shadow-sm"
          >
            <FaUpload className="w-4 h-4 mr-2" />
            Subir Archivo
          </label>
        </div>
        
        {selectedFile && (
          <div className="text-sm text-blue-200 bg-blue-600 rounded-md p-3">
            <span className="text-green-300">✓</span> {selectedFile.name}
          </div>
        )}
      </div>
    </div>
  );
};
