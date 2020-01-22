# Um passo a passo para a criação desse projeto

Primeiramente
[Criando o ambiente de desenvolvimento](https://docs.rocketseat.dev/ambiente-react-native/introducao)

Instalar o NPM a versão estável atual do npm está [aqui](https://github.com/npm/cli/releases/tag/v6.13.6). Para atualizar, execute:

```bash
npm install npm @latest -g
```

Usando `npx` (recomendado) disponível desde react-native@0.60. Esse método é preferido se você não deseja instalar pacotes globais.

```bash
npx react-native init MyApp
```

## Eu faço preferencia pelo gerenciador [Yarn](https://yarnpkg.com/) e o instalo globalmente.

Instalar o CLI (Command Line Interface) do React Native:

```bash
yarn global add react-native-cli
ou
npm i -g react-native-cli
```

Quando você estiver dentro de um projeto MyApp, um binário local nativo de React estará disponível para você usar. Sinta-se livre para usar o Yarn para chamá-lo diretamente.

```bash
react-native run-android
# ou
react-native run-ios # se estiver em Mac
```

Esse comando abrirá uma terminal rodando o Metro Bundler, caso esse terminal não abra rode o comando seguinte. E para dar continuidade uma vez que o computador telha desligado ou por acaso tenha fechado o terminal rodando o Metro Bundler, uma vez que o App já foi instalado em seu emulador/device é só abrir o App e rodar esse comando.

Exemplo de execução do comando start no terminal:

```bash
yarn react-native start
# ou:
npx react-native start
# ou:
node ./node_modules/.bin/react-native start
```

Você também pode adicionar scripts npm para chamá-lo com o gerenciador de pacotes que você usa:

```json
{
  "scripts": {
    "start": "react-native start"
  }
}
```
