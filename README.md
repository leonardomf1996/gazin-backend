## Instalação e utilização

-   Tenha o docker, dbeaver e yarn instalados
-   No terminal, digite: docker run --name postgres_gazin -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
-   No dbeaver, crie uma conexão com o postgres e crie uma database chamada postgres_smarkio
-   Clone o projeto do Github
-   yarn no terminal, para instalar as dependências
-   Para executar as migrations, execute no terminal: yarn typeorm migration:run
-   Para colocar o servidor em funcionamento, no terminal: yarn dev:server
- - Para executar os testes, no terminal: yarn test