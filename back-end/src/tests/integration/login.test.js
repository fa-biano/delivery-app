const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');
const { Model } = require('sequelize');
const app = require('../../api/app');
const { userService } = require('../../api/services');

chai.use(chaihttp);
const { expect } = chai;

describe('Testes na rota Login na aplicação', function () {
  describe('Testes em todos os verbos HTTP que pertencem a rota \'/login\' da aplicação', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('/login - POST - deve retornar status 200 e um token caso o usuario esteja registrado no banco de dados', 
    async function () {
      sinon.stub(Model, 'findOne').resolves({
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        // senha: '--adm2@21!!--'
        role: 'administrator',
      });
      const response = await chai.request(app).post('/login').send({
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      });
      expect(response.status).to.equal(200);
      expect(response.body).to.property('token');
    },
);
    it('/login - POST - deve retornar status 500 e uma mensagem de erro caso o usuario não passe nenhum campo \'email\' no body da requisição', async function () {
      const response = await chai.request(app).post('/login').send({
        lalala: 'lalala',
        password: '--adm2@21!!--',
      });
      expect(response.status).to.equal(500);
    });
    it('/login - POST - deve retornar status 500 caso o usuario não passe nenhum campo \'password\' no body da requisição', async function () {
      sinon.stub(Model, 'findOne').resolves({
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        // senha: '--adm2@21!!--'
        role: 'administrator',
      });
      const response = await chai.request(app).post('/login').send({
        email: 'lalala',
        lalala: 'macarão',
      });
      expect(response.status).to.equal(500);
    });
    it('/login - POST - deve retornar status 404 e uma mensagem de erro caso o usuario passe um email não registrado no banco de dados', async function () {
      sinon.stub(Model, 'findOne').resolves({
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        // senha:'fulana@123'
        role: 'seller',
      });

      const response = await chai.request(app).post('/login').send({
        email: 'vinicinho@gmail.com',
        password: 'ratinho123',
      });
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('Email or password invalid');
    });
  });
});
