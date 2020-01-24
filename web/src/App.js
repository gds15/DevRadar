//o useState e usado pelo react para criar um estado para o componente
import React, { useState, useEffect } from 'react';

//importar a nossa conexao com a api node
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

//importacao do componente form
import DevForm from './components/DevForm';
//importar o componente que lista os devs components/Devitem n tem que por /index ele sempre pega o index por padrao
import DevItem from './components/Devitem';

//3 conceitos do react
//componente = bloco isilado de html css js que não interfere no resto da aplicacao
//estado = e uma informacao mantida pelo componente (Lembrar imutabilidade)
//propriedade = informacoes que um componente pai passa para um componente filho

//uma funcao de um ele mento e sempre feita dentro dele msm
function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  //função assincrona
  async function handleAddDev(data) {

    const response = await api.post('/devs', data);
    //console.log(response.data);

    //para quando cadastrar um novo deve ja atualizar a lista que aparece ao lado do form
    setDevs([...devs, response.data]);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            //colocando o componente li tem que passar a propriedade que chamamos de dev la
            <DevItem  key={dev._id} dev={dev} />   
          ))}

        </ul>
      </main>

    </div>
  );
}

export default App;
