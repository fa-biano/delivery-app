const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../../api/app');
const sinon = require('sinon');

chai.use(chaihttp)
const { expect } = chai;

describe("Testes na rota Admin na aplicação", () => {
  describe("Testes em todos os verbos HTTP que pertencem a rota /admin da aplicação", () => {
    afterEach(() => {
      sinon.restore()
  })
    it('/admin/manage - GET - deve retornar status 200 e a lista dos usuários registrados no banco de dados', async () => {
      const usersMock = [
        {
          "id": 2,
          "name": "Fulana Pereira",
          "email": "fulana@deliveryapp.com",
          "role": "seller"
        },
        {
          "id": 3,
          "name": "Cliente Zé Birita",
          "email": "zebirita@email.com",
          "role": "customer"
        }
      ]
      const tokenValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjgwNTcxODE5fQ.LCJCLsd67u6YXXg5wDyHkPaAcyZsVmbiYTdxJYaqDGU'
      const response = await chai.request(app).get('/admin/manage').set({
        'Authorization': tokenValid
      })
      expect(response.body).to.deep.equal(usersMock)
      console.log(response.body);


    })
  })
})