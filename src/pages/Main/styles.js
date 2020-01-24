import styled from 'styled-components/native';
// um botão retangular
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  /* ocupando todo o espaço disponível da tela */
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  /* input e button um do lado do outro */
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 4px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  // trazendo um atributo do input
  placeholderTextColor: '#999',
})`
  /* ocupando toda a largura descontando o botão */
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

/* estilizando componentes que não são de nossa aplicação importadas de outras ferramentas */
export const SubmitButton = styled(RectButton)`
  /* alinhando todo o conteúdo dentro do botão */
  justify-content: center;
  align-items: center;
  /*  */
  background: #7259c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  // tirando a barra de rolagem
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  /* enquanto não carrega a imagem aplicar um fundo */
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  /* para forçar mesmo quando for mais que uma linha */
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  // limitando o número de linhas
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  /* ocupar a largura total */
  align-self: stretch;
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
