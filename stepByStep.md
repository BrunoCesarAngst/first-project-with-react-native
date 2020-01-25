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

## Eu faço preferencia pelo gerenciador [Yarn](https://yarnpkg.com/) e o instalo globalmente

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

Para quando aparecerem error:

```bash
react-native start --reset-cache # para eliminar certas inconsistências no sistema
react-native run android # ou ios
```

Você também pode adicionar scripts npm para chamá-lo com o gerenciador de pacotes que você usa:

```json
{
  "scripts": {
    "start": "react-native start"
  }
}
```

### EditorConfig, ESLint & Prettier

Com o [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) for VS Code instalado damos um Generation .editorconfig dentro do VSCode na raiz do projeto e editamos nesse arquivo as seguintes linhas:

end_of_line = lf,

trim_trailing_whitespace = true,

insert_final_newline = true

Vamos configurar o ESLint

```bash
# Delete os arquivos .eslintrc e .prettierrc se eles já existirem no projeto
comp:~/first-project-with-react$ yarn add eslint -D
comp:~/first-project-with-react$ yarn eslint --init
# E escolhemos
❯ To check syntax, find problems, and enforce code style
❯ JavaScript modules (import/export)
❯ React
? Does your project use TypeScript? (y/N) N
# Deselecionar todos com tecla de espaço e dar enter
❯○ Browser
❯○ Node
❯ Use a popular style guide
❯ Airbnb: https://github.com/airbnb/javascript
❯ JavaScript
? Would you like to install them now with npm? (Y/n) Y
# Removemos o arquivo package-lock.json e rodamos yarn na raiz do projeto
comp:~/first-project-with-react$ yarn
# Damos continuação configurando o Prettier
comp:~/first-project-with-react$ yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
#  Vamos para o arquivo .eslintrc.js e criamos o arquivo .prettierrc
```

```js
// ~/MyApp/.eslintrc.js
module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'react/state-in-constructor': ['error', 'never'],
    'react/static-property-placement': ['error', 'static public field'],
  },
};
```

```json
// ~/MyApp/.prettierrc.json
{
  // aspas simples
  "singleQuote": true,
  // virgula à direita
  "trailingComma": "es5"
}
```

## Padronizando mensagens de commit do Git

Usando [commitlint](https://github.com/conventional-changelog/commitlint), [husky](https://github.com/typicode/husky) e o [commitizen](https://github.com/commitizen/cz-cli)

```bash
comp:~/first-project-with-react$ yarn add @commitlint/config-conventional @commitlint/cli -D
comp:~/first-project-with-react$ echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# Para informar ao commitlint que ele deve rodar depois do git commit colocando uma commit message dentro dele
comp:~/first-project-with-react$ yarn add husky -D
```

No package.json colamos isso

```json
},
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      // usando o poder do husky quando for digitado git commit ele executa o
      //commitizen
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true"
    }
  },
  "devDependencies": {
```

```bash
comp:~/first-project-with-react$ yarn add commitizen -D
comp:~/first-project-with-react$ yarn commitizen init cz-conventional-changelog --yarn --dev --exact
# Não deu certo então
comp:~/first-project-with-react$ npm install commitizen -g
comp:~/first-project-with-react$ npm install commitizen --save-dev
# Apaguei o arquivo package-lock.json e rodei
comp:~/first-project-with-react$ yarn
comp:~/first-project-with-react$ git add . && git commit
? Select the type of change that you are committing:
❯ feat:        A new feature
  fix:         A bug fix
  improvement: An improvement to a current feature
  docs:        Documentation only changes
  style:       Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor:    A code change that neither fixes a bug nor adds a feature
  perf:        A code change that improves performance
  test:        Adding missing tests or correcting existing tests
  build:       Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  ci:          Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
  chore:       Other changes that don not modify src or test files
(Move up and down to reveal more choices)

? Select the type of change that you are committing: feat:        A new feature
# O scope é um detalhamento para projetos grandes para mostrar onde há mudanças
? What is the scope of this change (e.g. component or file name): (press enter to skip) atualizando
# A mensagem o assunto do commit em si
? Write a short, imperative tense description of the change (max 53 chars):
 (39) feat: creating the project from scratch
# Para se desejar colocar mais informações possibilitando quebra de linha \n
? Provide a longer description of the change: (press enter to skip)
 setting eslint, prettier & editorconfig and standardizing Git commit
# Aqui está perguntando se tem algo que funcionáva e agora não funciona mais
? Are there any breaking changes? No
# Aqui está perguntando se isso afeta alguma issue que está aberta colocando essa informação as issue são fechadas automaticamente
? Does this change affect any open issues? No
```

### Configurando Reactotron

O [Reactotron](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) é um aplicativo do macOS, Windows e Linux para inspecionar os aplicativos React JS e React Native.

Use-o para: visualizar o estado do aplicativo, exibir solicitações e respostas da API, executar benchmarks de desempenho rápido, assinar partes do estado do aplicativo, exibir mensagens semelhantes ao console.log, rastrear erros globais com rastreamentos de pilha mapeados de origem, incluindo rastreamentos de saga! envie ações como um experimento de controle mental administrado pelo governo, troque a quente o estado do seu aplicativo usando Redux ou mobx-state-tree rastreie suas sagas mostrar sobreposição de imagens no React Native rastreie seu armazenamento assíncrono no React Native.

Fazer o download e instalar o [Reactotron](https://github.com/infinitered/reactotron/releases) após rodar:

```bash
yarn add reactotron-react-native
```

E configuramos o Reactotron criamos essa estrutura

```bash
src
├── config
│   └── ReactotronConfig.js # Aqui configuramos o Reactotron
└── index.js # Aqui copiamos o que estava no arquivo App.js da raiz e
             # importamos o arquivo do Reactotron
# No index.js da rais do projeto mudo a importação do App para a pasta src.
```

## React Navigation

Criamos uma estrutura de pastas com as páginas específicas com o arquivo index.js dentro.

```bash
src
├── config
│   └── ReactotronConfig.js
├── index.js
├── pages
│   ├── Main
│   │   └── index.js
│   └── Repository
│       └── index.js
└── Routes.js
# Adicionamos a biblioteca react-navigation que configura a roteamento/navegação
yarn add react-navigation
```

O [React Navigation](https://reactnavigation.org/docs/en/getting-started.html) muda constantemente e é de suma importância seguir o passo a passo da documentação para a instalação.
E depois de seguir o passo a passo rodar react-native run android ou ios.

Partimos para configurar o arquivo Routes.js, instalamos o tipo de navegação

```bash
yarn add react-navigation-stack
```

## Configurando StatusBar

Trabalhamos sua configuração no arquivo Routes.js

## Styled Components

```bash
yarn add styled-components

# criamos os arquivos styles.js nas pastas das páginas
src
├── config
│   └── ReactotronConfig.js
├── index.js
├── pages
│   ├── Main
│   │   ├── index.js
│   │   └── styles.js # e trabalhamos nesses aquivos para gerar os estilos
│   └── User
│       ├── index.js
│       └── styles.js
└── routes.js
```

## Estilizando formulário

Trabalhamos no arquivo index.js da pasta pages/Main

Adicionar icons

```bash
yarn add react-native-vector-icons
# instalando ícones em forma de vetor
```

para ios vamos em ios/MyApp/Info.plist e de [List of all available fonts to copy & paste in info.plist](https://github.com/oblador/react-native-vector-icons#ios) dento da documentação do react-native-vector-icons copiamos e colamos antes de fechar a tag dict desse arquivo

para android vamos em android/app/build.gradle e de [To customize the files being copied, add the following instead:](https://github.com/oblador/react-native-vector-icons#android) dento da documentação do react-native-vector-icons copiamos e colamos antes último apply desse arquivo.

E rodar react-native run-android

Para procurar os ícone do pacote [MaterialIcons](https://oblador.github.io/react-native-vector-icons/) por exemplo

## Acessando API do Github

No index.js da Main preparamos a aplicação para receber os dados do input, como o state os métodos/funções que trabalharão com esses dados e configuramos o próprio input.

Usaremos o Axios para fazer a chamada a api

```bash
yarn add axios

src
├── config
│   └── ReactotronConfig.js
├── index.js
├── pages
│   ├── Main
│   │   ├── index.js
│   │   └── styles.js
│   └── User
│       ├── index.js
│       └── styles.js
├── routes.js
└── services
    └── api.js # e criamos o arquivo com essa configuração
```

## Estilizando listagem

No index.js da Main criamos o component `<List />` com os dados de cada usuário e estilizamos a lista.

## Loading e disabled

No index.js da Main aplicamos o loading e o estilizamos

## Salvando no storage

Salvando as informações no banco de dados do device

```bash
yarn add @react-native-community/async-storage
# no android
yarn run-android
# ou no ios
cd ios/
pod install
yarn run-ios
# e rodar novamente
yarn react-native run-android # ou run-ios
```

## Realizando navegação

Usando PropTypes nos componentes para exportar validadores que podem ser usados para certificar que os dados que você recebe são válidos para as propriedades que estão em uso no componente

```bash
# para fazer a validação das propriedades
yarn add prop-types
```

## Buscando dados da API

Usando o navigation

Cada screen componente do seu aplicativo é fornecido com o navigation suporte automaticamente. O suporte contém várias funções de conveniência que despacham ações de navegação no roteador da rota. Se parece com isso:

this.props.navigation
navigate - vá para outra tela, descobre as ações necessárias para fazê-lo
goBack - feche a tela ativa e volte para a pilha
addListener - assine atualizações no ciclo de vida da navegação
isFocused- função que retorna true se a tela estiver focada ou false não.
state - estado atual / rotas
setParams - faça alterações nos parâmetros da rota
getParam - obtenha um parâmetro específico com fallback
dispatch - envia uma ação ao roteador
dangerouslyGetParent - função que retorna o navegador pai, se houver
