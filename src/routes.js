// Cria um container por toda a aplicação
import { createAppContainer } from 'react-navigation';
// Tipo de navegação por pilha(botões)
import { createStackNavigator } from 'react-navigation-stack';

// A páginas
import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repository,
    },
    {
      // Opções de navegação padrão para usar em telas
      defaultNavigationOptions: {
        title: 'Usuário',
        // Se o título do botão Voltar deve estar visível ou não
        headerBackTitleVisible: false,
        // Como alinhar o título do cabeçalho
        headerTitleAlign: 'center',
        // Objeto de estilo para o cabeçalho
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        // Cor da tonalidade para o cabeçalho. Muda a cor do botão Voltar e do título.
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
// E importamos no index.js da raiz
