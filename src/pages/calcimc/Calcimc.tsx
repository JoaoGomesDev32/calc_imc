import { useState, useEffect } from "react";
import Campform from "@/components/Campform";
import Tableimc from "@/components/Tableimc";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Link from "next/link";

interface IMCHistory {
  id: string;
  weight: number;
  height: number;
  imc: number;
  date: string;
  name: string;
}

export default function Calcimc() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [imc, setImc] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState<IMCHistory[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('imc-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const calculateIMC = async () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!isValidInputs(w, h)) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = w / (h * h);
    setImc(result);
    setShowResult(true);
    setIsCalculating(false);
  };

  const isValidInputs = (w: number, h: number): boolean => {
    if (isNaN(w) || isNaN(h) || h <= 0) {
      return false;
    }
    
    if (w < 20 || w > 300) {
      alert("Peso deve estar entre 20kg e 300kg");
      return false;
    }
    
    if (h < 0.5 || h > 3) {
      alert("Altura deve estar entre 0.5m e 3m");
      return false;
    }
    
    return true;
  };

  const resetForm = () => {
    setWeight("");
    setHeight("");
    setImc(null);
    setShowResult(false);
  };

  const saveToHistory = () => {
    if (!imc) return;
    
    const newEntry: IMCHistory = {
      id: Date.now().toString(),
      weight: parseFloat(weight),
      height: parseFloat(height),
      imc: imc,
      date: new Date().toLocaleDateString('pt-BR'),
      name: `Cálculo ${history.length + 1}`
    };
    
    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep only last 10
    setHistory(updatedHistory);
    localStorage.setItem('imc-history', JSON.stringify(updatedHistory));
  };

  const canCalculate = weight && height && !isCalculating;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Section */}
          <div className="animate-fade-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Calculadora de IMC
                </h1>
                <p className="text-gray-600">
                  Calcule seu Índice de Massa Corporal de forma rápida e precisa
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); calculateIMC(); }} className="space-y-6">
                <Campform
                  label="Peso"
                  state={weight}
                  funcState={setWeight}
                  unit="kg"
                  min={20}
                  max={300}
                  required
                />
                
                <Campform
                  label="Altura"
                  state={height}
                  funcState={setHeight}
                  unit="m"
                  min={0.5}
                  max={3}
                  required
                />

                <div className="space-y-4">
                  <Button
                    onClick={calculateIMC}
                    disabled={!canCalculate}
                    loading={isCalculating}
                    fullWidth
                    size="lg"
                  >
                    {isCalculating ? 'Calculando...' : 'Calcular IMC'}
                  </Button>

                  {canCalculate && (
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      fullWidth
                      size="md"
                    >
                      Limpar Campos
                    </Button>
                  )}
                </div>
              </form>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/dataimc/Dataimc" className="flex-1">
                    <Button variant="secondary" fullWidth>
                      📊 Ver Histórico
                    </Button>
                  </Link>
                  <Button
                    onClick={saveToHistory}
                    variant="success"
                    disabled={!imc}
                    fullWidth
                  >
                    💾 Salvar Resultado
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="animate-slide-in">
            {showResult && imc && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Seu Resultado
                  </h2>
                  <div className="text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    {imc.toFixed(1)}
                  </div>
                  <div className="text-lg text-gray-600">IMC</div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Detalhes do Cálculo</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Peso:</span>
                        <span className="font-medium ml-2">{weight} kg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Altura:</span>
                        <span className="font-medium ml-2">{height} m</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={saveToHistory}
                    variant="success"
                    fullWidth
                    size="md"
                  >
                    💾 Salvar no Histórico
                  </Button>
                </div>
              </div>
            )}

            {/* Table Section */}
            <div className="mt-8">
              <Tableimc imc={imc} />
            </div>
          </div>
        </div>

        {/* Recent History */}
        {history.length > 0 && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Histórico Recente</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Peso</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Altura</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">IMC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 5).map((entry) => (
                      <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">{entry.date}</td>
                        <td className="py-3 px-4 text-sm font-medium">{entry.weight} kg</td>
                        <td className="py-3 px-4 text-sm font-medium">{entry.height} m</td>
                        <td className="py-3 px-4 text-sm font-bold text-indigo-600">{entry.imc.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
