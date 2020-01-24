import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Keyboard é o teclado
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// importando ícone/informando o nome do pacote que queremos utilizar
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    // armazenando o valor do input
    newUser: '',
    // os usuários
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  // lidando com a adição de usuário
  handleAddUser = async () => {
    const { users, newUser } = this.state;

    /**
     * setState() agenda uma atualização para o objeto state de um componente.
     * Quando o state muda, o componente responde renderizando novamente.
     */
    this.setState({ loading: true });

    // buscando o usuário do github
    const response = await api.get(`/users/${newUser}`);

    // pegando alguns dados do usuário
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      // incluindo o usuário no array de usuários
      users: [...users, data],
      // setando o input como vazio
      newUser: '',
      loading: false,
    });

    // para tirar o teclado depois do send
    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    // buscando os dados no state
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            /* recebendo o texto do input */
            onChangeText={text => this.setState({ newUser: text })}
            /* usando o teclado para enviar */
            returnKeyType="send"
            /* mostrar qual método vai ser usado quando send */
            onSubmitEditing={this.handleAddUser}
          />
          {/* ouvindo o click do botão */}
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              {/* ouvindo o click do botão */}
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
