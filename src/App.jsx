import { useEffect, useState } from 'react';

const tamanhos = ['P', 'M', 'G', 'GG'];
const cores = [
  { nome: 'Branca', cor: 'bg-white' },
  { nome: 'Preta', cor: 'bg-black' },
];

const imagens = [
  '/imgs/camiseta-preta.png',
  '/imgs/camiseta-branca.png',
  '/imgs/camisa-principal.png',
];

const STORAGE_KEY = 'produto-selecionado';

export default function EcommerceBasico() {
  const [imagemPrincipal, setImagemPrincipal] = useState('/imgs/camisa-principal.png');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erroCep, setErroCep] = useState(null);

  // Restaurar do localStorage se for recente
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (dadosSalvos && Date.now() - dadosSalvos.timestamp < 15 * 60 * 1000) {
      if (dadosSalvos.imagemPrincipal) setImagemPrincipal(dadosSalvos.imagemPrincipal);
      if (dadosSalvos.tamanhoSelecionado) setTamanhoSelecionado(dadosSalvos.tamanhoSelecionado);
      if (dadosSalvos.corSelecionada) setCorSelecionada(dadosSalvos.corSelecionada);
      if (dadosSalvos.cep) setCep(dadosSalvos.cep);
      if (dadosSalvos.endereco) setEndereco(dadosSalvos.endereco);
    }
  }, []);

  // Salvar no localStorage a cada alteração
  useEffect(() => {
    const dados = {
      imagemPrincipal,
      tamanhoSelecionado,
      corSelecionada,
      cep,
      endereco,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
  }, [imagemPrincipal, tamanhoSelecionado, corSelecionada, cep, endereco]);

  // Buscar CEP
  async function buscarCep() {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error('CEP não encontrado');
      setEndereco(data);
      setErroCep(null);
    } catch (err) {
      setEndereco(null);
      setErroCep('CEP inválido ou não encontrado');
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-4">
      <div className="w-full md:w-1/2">
        <div className="border rounded-xl overflow-hidden">
          <img
            src={imagemPrincipal}
            alt="Produto"
            className="w-full h-auto object-cover"
            onError={(e) => {
              console.warn('Erro ao carregar imagem:', imagemPrincipal);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {imagens.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Miniatura"
              className="w-16 h-16 object-cover rounded cursor-pointer"
              onClick={() => setImagemPrincipal(img)}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Camiseta Básica</h2>
          <h3 className="text-xl text-green-600 font-medium">R$ 39,90</h3>

          <div>
            <p className="font-semibold">Tamanho</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {tamanhos.map((t) => (
                <button
                  key={t}
                  onClick={() => setTamanhoSelecionado(t)}
                  className={`px-4 py-2 border rounded ${
                    tamanhoSelecionado === t ? 'bg-neutral-800 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold">Cor</p>
            <div className="flex gap-2 mt-2">
              {cores.map((cor) => (
                <button
                  key={cor.nome}
                  onClick={() => setCorSelecionada(cor.nome)}
                  className={`w-8 h-8 rounded-full border ${cor.cor} ${
                    corSelecionada === cor.nome ? 'ring-2 ring-neutral-800' : ''
                  }`}
                  title={cor.nome}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <p className="font-semibold">Verificar disponibilidade para entrega</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="border p-2 rounded w-full sm:w-1/2"
              />
              <button
                onClick={buscarCep}
                className="bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-900"
              >
                Verificar
              </button>
            </div>
          </div>

          <div className="mt-2">
            {endereco && (
              <p className="text-sm text-green-700">
                {endereco.logradouro}, {endereco.bairro}, {endereco.localidade} - {endereco.uf}
              </p>
            )}
            {erroCep && <p className="text-sm text-red-600">{erroCep}</p>}
          </div>

          <button className="bg-green-600 text-white py-3 rounded hover:bg-green-700 text-lg font-semibold w-full">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

