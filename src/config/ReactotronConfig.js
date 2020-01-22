import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  /**
   * __DEV__ é uma variável global do react-native, o que estiver dentro não
   * roda em ambiente de produção. Declarei essa variável dentro .eslintrc.js
   * como global, e se estiver usando usb informar o host dentro de configure e
   * também fazer o redirecionamento de portas rodando no terminal
   *  adb reverse tcp:9090 tcp:9090
   */
  const tron = Reactotron.configure({ host: 'localhost' })
    .useReactNative()
    .connect();

  // para ser possível chamar esse console em toda a aplicação
  console.tron = tron;

  // limpar a timeline quando for dado refresh na aplicação
  tron.clear();
}
