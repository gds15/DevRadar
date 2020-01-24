import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

//importação das rotas
import Routes from './src/routes';

//aqui e so pra ignorar os avisos da caixa amarela que aparecem no expo
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </>
  );
}
//no react native a estilização e com css tbm mais ela n e como no react normal
//aqui n pode  por - entre as coisas entao e tudo junto e a segunda palavra começa em maiuscolo

