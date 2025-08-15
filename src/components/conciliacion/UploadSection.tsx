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
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center mb-3 space-x-2">
        <FaUpload className="w-4 h-4 text-blue-600" />
        <h3 className="text-base font-medium text-gray-900">Subir Estado de Cuenta</h3>
      </div>
      
      <p className="mb-4 text-sm text-gray-600">Seleccionar archivo PDF</p>
      
      <div className="space-y-3">
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
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md transition-colors cursor-pointer hover:bg-blue-700"
          >
            Seleccionar archivo
          </label>
        </div>
        
        {selectedFile ? (
          <div className="text-sm text-green-600">
            ✓ {selectedFile.name}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Sin archivos seleccionados
          </div>
        )}
      </div>
    </div>
  );
};
