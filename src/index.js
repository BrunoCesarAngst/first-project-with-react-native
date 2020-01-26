import React from 'react';
// Status bar é um componente
import { StatusBar } from 'react-native';
// Tudo o que criamos deixamos depois do Reactotron
import './config/ReactotronConfig';
// Importamos o roteamento com as páginas
import Routes from './routes';

export default function App() {
  return (
    // usando fragment
    <>
      {/** mudamos a cor da fonte e o background padrão do android */}
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
