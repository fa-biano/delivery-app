const chai = require("chai")
const sinon = require("sinon");
const chaihttp = require("chai-http")
const app = require("../../api/app");
const { userService } = require("../../api/services");
const { Model } = require("sequelize");

chai.use(chaihttp)
const {expect} = chai

describe("Testes na rota Register na aplicação", async () => {
    describe("Testes em todos os verbos HTTP que pertencem a rota '/register' da aplicação", async () => {
      afterEach(() => {
        sinon.restore()
    })
     it("/register - POST - deve retornar status 201, um token e as informações do usuario quando ele se cadastra na aplicação", async () => {
      const outputMock = {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        // senha: '--adm2@21!!--'
        role: 'administrator',
      }
            sinon.stub(Model, 'findOrCreate').resolves([outputMock, true])
              const response = await chai.request(app).post('/register').send({
                name: 'Jean Paulo Gonçalves',
                email: 'adm@deliveryapp.com',
                password: '--adm2@21!!--' 
              })
              expect(response.status).to.equal(201)
              expect(response.body).to.property('token')
        })
     it("/register - POST - deve retornar status 409 e uma mensagem de erro caso o usuario tente cadastrar um email já existente no banco de daods", async () => {
      const outputMock = {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        // senha: '--adm2@21!!--'
        role: 'administrator',
      }
            sinon.stub(Model, 'findOrCreate').resolves([outputMock, false])
              const response = await chai.request(app).post('/register').send({
                name: 'Jean Paulo Gonçalves',
                email: 'adm@deliveryapp.com',
                password: '--adm2@21!!--' 
              })
              expect(response.status).to.equal(409)
              expect(response.body).to.property('message').to.equal("Email or Name already registered")
     })
    })
    })