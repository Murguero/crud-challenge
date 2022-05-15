# Crud_Challenge

- Esse projeto tem a finalidade de armazenar/gerenciar os usuários e seus endereços.

## Configuração do Projetos

- Para baixar as dependências para o projeto execute o comando:

```shell
yarn
```

- Caso queria utilizar o banco de dados, após configurar o arquivo `ormconfig.json` com suas credenciais, basta executar o comando:

```shell
yarn typeorm migration:run
```

- Para executar o projeto execute o comando:

```shell
yarn dev:server
```

---

## Testes

- Para executar os testes automatizados basta executar o seguinte comando:

```shell
yarn test
```

---

## Estrutura do projeto

- O projeto foi organizado de modo a ser escalável à medida que ele venha a crescer

### src/modules

- Separa as funcionalidades de forma modular, pode conter um ou mais módulos

- Dentro de cada módulo podemos ter:
  - `infra` - Pasta que contém as definições de infraestrutura;
    - `http` - Pasta referente a comunicação interna;
      - `controllers/` - Onde deve ficar os controllers referente a esse módulo;
      - `routes/` nessa pasta contém as rotas referente ao módulo;
        - O Mesmo deve ser importado em `shared/routes.ts` que são as rotas gerais da aplicação;
    - `typeorm`: Pasta referente as definições de comunicação com o banco de dados;
  - `repositories` - Pasta que contém as definições das funções que serão implementadas para consultas no banco de dados;
  - `services/` - Funcionalidade de responsabilidade única, por mais que não tenha uma especificação sobre como devem ser escritos, o ideal é que ele possua apenas um método.
    - Opcionalmente podemos separar os serviços em:
      - `store/ ou create/ e update/`: services que criam e/ou atualizam registros
      - `show/ ou list/`: services que retornam um ou mais registros consultados em um repositório ou tabela
      - `delete/`: services que removem um ou mais registros

## src/shared

- Quando há funções que podem e devem ser compartilhadas para todos os modules devem ser salvas dentro dessa pasta!

  - `erros/` - Contém o CustomError que é responsável por lidar com as exceções em geral;
  - `server.ts` - Estrutura inicial do projeto utilizando express;
  - `container` - Pasta que contém a definição dos modelues que serão utilizados a injeção de dependencia;
  - `infra` - Pasta que contém as definições de infra-estrutura;
    - `http` - Pasta referetne a comunicação interna;
      - `middlewares/`: intercepta uma requisição para realizar alguma validação ou verificação e com isso definir se o fluxo pode ser continuado ou se deve lançar uma exceção;
      - `routes.ts` - Contém o agrupamento das rotas de todos os módulos, as rotas de cada módulo devem ser importadas nesse arquivo para que o módulo seja acessível via http;
    - `typeorm`: Pasta referente as definições de migration e conexão com o banco de dados;

## src/config

- Não contém funcionalidades em si, mas em geral objetos que servem como configuração inicial para diversas funcionalidades

## src/@types

- Adiciona tipos a módulos já existente
- Permite criação de definição de tipos que fica disponível de uma forma global, ou seja, que não precisa importar o arquivo para sua utilização

---

## API

- Veja como utilizar essa api:

  - modo [Users](./src/modules/users/docs/users.md)
  - modo [Address](./src/modules/address/docs/address.md)

- Utilize a [collection](./src/assets/api/collection.json) para realizar as chamadas de api!

## Alguma tecnologias utilizadas

- Typscript
- Express
- JWT Token
- TypeOrm
- Postgress
- Jest
- Celebrate
- Class-Transformer
