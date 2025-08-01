interface TableimcProps {
  imc: number | null;
}

interface IMCCategory {
  name: string;
  range: string;
  min: number;
  max: number;
  color: string;
  bgColor: string;
  description: string;
}

export default function Tableimc(props: TableimcProps) {
  const categories: IMCCategory[] = [
    {
      name: "Abaixo do Peso",
      range: "Abaixo de 18,5",
      min: 0,
      max: 18.4,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Peso abaixo do recomendado para sua altura"
    },
    {
      name: "Peso Normal",
      range: "Entre 18,5 e 24,9",
      min: 18.5,
      max: 24.9,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Peso saudável para sua altura"
    },
    {
      name: "Sobrepeso",
      range: "Entre 25 e 29,9",
      min: 25,
      max: 29.9,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Peso acima do recomendado"
    },
    {
      name: "Obesidade Grau I",
      range: "Entre 30 e 34,9",
      min: 30,
      max: 34.9,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Obesidade leve"
    },
    {
      name: "Obesidade Grau II",
      range: "Entre 35 e 39,9",
      min: 35,
      max: 39.9,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Obesidade moderada"
    },
    {
      name: "Obesidade Grau III",
      range: "Maior que 40",
      min: 40,
      max: 999,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Obesidade grave"
    }
  ];

  const getCurrentCategory = () => {
    if (!props.imc) return null;
    return categories.find(cat => props.imc! >= cat.min && props.imc! <= cat.max);
  };

  const currentCategory = getCurrentCategory();

  return (
    <div className="animate-fade-in">
      {/* Result Summary */}
      {props.imc && currentCategory && (
        <div className={`mb-6 p-4 rounded-lg border-2 ${currentCategory.bgColor} border-current ${currentCategory.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">{currentCategory.name}</h3>
              <p className="text-sm opacity-80">{currentCategory.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{props.imc.toFixed(1)}</div>
              <div className="text-sm opacity-70">IMC</div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4">
          <h3 className="font-bold text-lg">Classificação do IMC</h3>
          <p className="text-sm opacity-90">Tabela de referência da OMS</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classificação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IMC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category, index) => {
                const isActive = props.imc !== null && 
                  props.imc >= category.min && 
                  props.imc <= category.max;
                
                return (
                  <tr 
                    key={index}
                    className={`
                      transition-all duration-300 hover:bg-gray-50
                      ${isActive ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''}
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {isActive && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 animate-pulse"></div>
                        )}
                        <span className={`font-medium ${isActive ? 'text-indigo-700' : 'text-gray-900'}`}>
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isActive ? 'text-indigo-700 font-medium' : 'text-gray-500'}`}>
                        {category.range}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${isActive ? 'text-indigo-700' : 'text-gray-500'}`}>
                        {category.description}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Informação Importante
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                O IMC é uma ferramenta de triagem, não um diagnóstico. Consulte um profissional de saúde para uma avaliação completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
