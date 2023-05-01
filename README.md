# 🍻 Projeto Delivery App!

Delivery App é uma aplicação full stack desenvolvida para ser um site de compras de bebidas online.
O sistema possui 3 fluxos principais: Cliente, Vendedor e Admin.

Clientes realizam seus pedidos e conseguem acompanhar o tracking da preparação até a entrega. Além de poder consultar o histórico de pedidos anteriores.

Os vendedores visualizam todos os pedidos que estão pendentes de preparação e atualizam o status do tracking até serem enviados aos clientes.

Todo controle de acesso é feito pelo fluxo do Admin, onde são criados os logins para os vendedores/clientes/admins. (Clientes podem criar seu próprio login através de formulário de cadastro no site)

O desenvolvimento desse projeto foi realizado durante o curso de Desenvolvimento Web na [Trybe](https://www.betrybe.com/)!

## 🔥 Tecnologias utilizadas:

  **Front-end:** React.js, React Hooks, Context Api, HTML, CSS e Testes com Jest e RTL </br>
  **Back-end:** Node.js, Express, JWT (jsonwebtoken) para Autenticação e Testes com Mocha, Chai e Sinon</br>
  **Banco de Dados:** SQL MySQL, Sequelize (ORM) </br>
  **Documentação API:** Swagger
  

## ✨ Inicializando:

  Clone o repositório: `git clone git@github.com:fa-biano/delivery-app.git`
  
  Renomeie os arquivos `.env.example` para `.env` nos diretórios `/frontend` e `/backend`

  Execute `docker compose up -d` para subir os 3 containers da aplicaçào: delivery_frontend, delivery_backend e delivery_db

  Acesse a aplicação pelo navegador em `http://localhost:3000` ou a documentação da API em `http://localhost:3001/api-docs`


## 📭 Rotas da API:

O Frontend está rodando na porta `3000` e o Backend na porta `3001`. Seguem as rotas que podem ser acessadas:

  `/api-docs`: </br>
    - GET: documentação com exemplos de todos os endpoints disponíveis na Api; </br>

  `/register`: </br>
    - POST: cria login para novos clientes; </br>

  `/login`: </br>
    - POST: realiza login para usuário existente; </br>
    
  `/customer`: </br>
    - GET: `/products` lista todos os produtos disponíveis; </br>
    - GET: `/checkout` lista todos os vendedores disponíveis; </br>
    - POST: `/checkout` registra os dados do pedido realizado; </br>
    - GET: `/orders` lista todos os pedidos realizados pelo cliente logado; </br>
    - GET: `/orders/:id` exibe os detalhes do pedido especificado pelo id; </br>
    - PUT: `/orders/:id` atualiza status de tracking do pedido, conforme nivel de autorização e validação; </br>

  `/seller`: </br>
    - GET: `/orders` lista todos os pedidos atendido pelo vendedor logado; </br>
    - GET: `/orders/:id` exibe os detalhes do pedido especificado pelo id; </br>
    - PUT: `/orders/:id` atualiza status de tracking do pedido, conforme nivel de autorização e validação; </br>

  `/admin`: </br>
    - GET: `/manage` lista todos os usuarios cadastrados; </br>
    - POST: `/manage` cria novo usuario; </br>
    - DELETE: `/manage` exclui usuario especificado; </br>
  
