import React, { useState, useEffect } from "react";

interface CampformProps {
  label: string;
  state: string;
  funcState: (value: string) => void;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  required?: boolean;
  type?: 'text' | 'number' | 'email' | 'tel';
}

export default function Campform({ 
  label, 
  state, 
  funcState, 
  placeholder,
  unit,
  min = 0,
  max = 999,
  required = false,
  type = 'number'
}: CampformProps) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const validateInput = (value: string) => {
    if (type === 'number') {
      const numValue = parseFloat(value);
      
      if (value === "") {
        setIsValid(true);
        setErrorMessage("");
        return;
      }

      if (isNaN(numValue)) {
        setIsValid(false);
        setErrorMessage("Por favor, insira um número válido");
        return;
      }

      if (numValue < min) {
        setIsValid(false);
        setErrorMessage(`O valor mínimo é ${min}`);
        return;
      }

      if (numValue > max) {
        setIsValid(false);
        setErrorMessage(`O valor máximo é ${max}`);
        return;
      }
    } else if (type === 'text') {
      if (required && value.trim() === "") {
        setIsValid(false);
        setErrorMessage("Este campo é obrigatório");
        return;
      }
    }

    setIsValid(true);
    setErrorMessage("");
  };

  useEffect(() => {
    validateInput(state);
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    funcState(value);
  };

  const getInputType = () => {
    return type;
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (label.toLowerCase().includes('peso')) return 'Ex: 70.5';
    if (label.toLowerCase().includes('altura')) return 'Ex: 1.75';
    if (label.toLowerCase().includes('nome')) return 'Digite seu nome completo';
    return `Digite seu ${label.toLowerCase()}`;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <span className="capitalize">{label}</span>
          {required && <span className="text-red-500">*</span>}
          {unit && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {unit}
            </span>
          )}
        </label>
        
        <div className="relative">
          <input
            className={`
              w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
              ${isFocused ? 'border-indigo-300' : 'border-gray-300'}
              ${!isValid ? 'border-red-500 bg-red-50' : 'bg-white'}
              ${isValid && state ? 'border-green-300 bg-green-50' : ''}
              hover:border-gray-400
            `}
            type={getInputType()}
            value={state}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={getPlaceholder()}
            min={type === 'number' ? min : undefined}
            max={type === 'number' ? max : undefined}
            step={type === 'number' && label.toLowerCase().includes('altura') ? '0.01' : type === 'number' ? '0.1' : undefined}
            required={required}
          />
          
          {/* Status indicator */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {state && (
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                isValid ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {isValid ? (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Error message */}
        {!isValid && errorMessage && (
          <div className="flex items-center space-x-2 text-sm text-red-600 animate-slide-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
        
        {/* Success message */}
        {isValid && state && (
          <div className="flex items-center space-x-2 text-sm text-green-600 animate-slide-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Valor válido</span>
          </div>
        )}
      </div>
    </div>
  );
}
