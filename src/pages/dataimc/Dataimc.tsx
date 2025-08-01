import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Campform from '@/components/Campform';

interface IMCEntry {
  id: string;
  name: string;
  weight: number;
  height: number;
  imc: number;
  date: string;
  category: string;
}

export default function Dataimc() {
  const [entries, setEntries] = useState<IMCEntry[]>([]);
  const [name, setName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [imc, setImc] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const savedEntries = localStorage.getItem('imc-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    // Set current date
    setDate(new Date().toISOString().split('T')[0] ?? '');

    // Safe parsing of query parameters
    const { weight, height, imc } = router.query;

    if (
      typeof weight === 'string' &&
      typeof height === 'string' &&
      typeof imc === 'string'
    ) {
      setWeight(weight);
      setHeight(height);
      setImc(imc);
    }
  }, [router.query]);

  const saveEntry = () => {
    if (!name || !weight || !height || !imc) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const newEntry: IMCEntry = {
      id: isEditing || Date.now().toString(),
      name: name.trim(),
      weight: parseFloat(weight),
      height: parseFloat(height),
      imc: parseFloat(imc),
      date: date,
      category: getIMCCategory(parseFloat(imc)),
    };

    let updatedEntries;
    if (isEditing) {
      updatedEntries = entries.map(entry =>
        entry.id === isEditing ? newEntry : entry
      );
      setIsEditing(null);
    } else {
      updatedEntries = [newEntry, ...entries];
    }

    setEntries(updatedEntries);
    localStorage.setItem('imc-entries', JSON.stringify(updatedEntries));
    resetForm();
  };

  const deleteEntry = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      localStorage.setItem('imc-entries', JSON.stringify(updatedEntries));
    }
  };

  const editEntry = (entry: IMCEntry) => {
    setIsEditing(entry.id);
    setName(entry.name);
    setWeight(entry.weight.toString());
    setHeight(entry.height.toString());
    setImc(entry.imc.toString());
    setDate(entry.date);
  };

  const resetForm = () => {
    setName('');
    setWeight('');
    setHeight('');
    setImc('');
    setDate(new Date().toISOString().split('T')[0] as string);
    setIsEditing(null);
  };

  const getIMCCategory = (imcValue: number): string => {
    if (imcValue < 18.5) return 'Abaixo do Peso';
    if (imcValue < 25) return 'Peso Normal';
    if (imcValue < 30) return 'Sobrepeso';
    if (imcValue < 35) return 'Obesidade Grau I';
    if (imcValue < 40) return 'Obesidade Grau II';
    return 'Obesidade Grau III';
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Abaixo do Peso':
        return 'text-blue-600 bg-blue-50';
      case 'Peso Normal':
        return 'text-green-600 bg-green-50';
      case 'Sobrepeso':
        return 'text-yellow-600 bg-yellow-50';
      case 'Obesidade Grau I':
        return 'text-orange-600 bg-orange-50';
      case 'Obesidade Grau II':
        return 'text-red-600 bg-red-50';
      case 'Obesidade Grau III':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredEntries = entries.filter(
    entry =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageIMC =
    entries.length > 0
      ? entries.reduce((sum, entry) => sum + entry.imc, 0) / entries.length
      : 0;

  return (
    <Layout>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Form Section */}
          <div className='lg:col-span-1 animate-fade-in'>
            <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20'>
              <div className='text-center mb-6'>
                <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </div>
                <h2 className='text-xl font-bold text-gray-900'>
                  {isEditing ? 'Editar Registro' : 'Novo Registro'}
                </h2>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  saveEntry();
                }}
                className='space-y-4'
              >
                <Campform
                  label='Nome'
                  state={name}
                  funcState={setName}
                  placeholder='Digite seu nome'
                  type='text'
                  required
                />

                <Campform
                  label='Peso'
                  state={weight}
                  funcState={setWeight}
                  unit='kg'
                  min={20}
                  max={300}
                  required
                />

                <Campform
                  label='Altura'
                  state={height}
                  funcState={setHeight}
                  unit='m'
                  min={0.5}
                  max={3}
                  required
                />

                <Campform
                  label='IMC'
                  state={imc}
                  funcState={setImc}
                  placeholder='IMC calculado'
                  required
                />

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Data
                  </label>
                  <input
                    type='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>

                <div className='space-y-3 pt-4'>
                  <Button type='submit' variant='success' fullWidth size='lg'>
                    {isEditing ? 'Atualizar' : 'Salvar Registro'}
                  </Button>

                  {isEditing && (
                    <Button
                      onClick={resetForm}
                      variant='outline'
                      fullWidth
                      size='md'
                    >
                      Cancelar Edição
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Data Section */}
          <div className='lg:col-span-2 animate-slide-in'>
            {/* Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              <div className='bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20'>
                <div className='text-2xl font-bold text-indigo-600'>
                  {entries.length}
                </div>
                <div className='text-sm text-gray-600'>Total de Registros</div>
              </div>
              <div className='bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20'>
                <div className='text-2xl font-bold text-green-600'>
                  {averageIMC.toFixed(1)}
                </div>
                <div className='text-sm text-gray-600'>IMC Médio</div>
              </div>
              <div className='bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20'>
                <div className='text-2xl font-bold text-purple-600'>
                  {entries.filter(e => e.category === 'Peso Normal').length}
                </div>
                <div className='text-sm text-gray-600'>Peso Normal</div>
              </div>
            </div>

            {/* Search */}
            <div className='bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20 mb-6'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Buscar por nome ou categoria...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
                <svg
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </div>

            {/* Table */}
            <div className='bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                        Nome
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                        Peso
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                        Altura
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                        IMC
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                        Categoria
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                        Data
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {filteredEntries.map(entry => (
                      <tr
                        key={entry.id}
                        className='hover:bg-gray-50 transition-colors duration-200'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {entry.name}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                          {entry.weight} kg
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                          {entry.height} m
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600'>
                          {entry.imc.toFixed(1)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                              entry.category
                            )}`}
                          >
                            {entry.category}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                          {new Date(entry.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-2'>
                            <Button
                              onClick={() => editEntry(entry)}
                              variant='outline'
                              size='sm'
                            >
                              ✏️
                            </Button>
                            <Button
                              onClick={() => deleteEntry(entry.id)}
                              variant='danger'
                              size='sm'
                            >
                              🗑️
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredEntries.length === 0 && (
                <div className='text-center py-12'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <h3 className='mt-2 text-sm font-medium text-gray-900'>
                    Nenhum registro encontrado
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    {searchTerm
                      ? 'Tente ajustar os termos de busca.'
                      : 'Comece adicionando seu primeiro registro.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
