import { useState } from 'react'

import { FiSearch } from 'react-icons/fi';

import api from './services/api';

import './App.css';

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function hand() {

    if (input === '') {
      alert("Preencha o CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('')

    }
    catch {
      alert('CEP não encontrado');
      setInput('')

    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>
      <div className="container-input">
        <input type="text" placeholder="Digite seu cep..."
          value={input}
          onChange={(e => {
            setInput(e.target.value)
          })} />

        <button className="button" onClick={hand}>
          <FiSearch size={24} color="#FFF" />
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h1>CEP: {cep.cep}</h1>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  )
}

export default App
