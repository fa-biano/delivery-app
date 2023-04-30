const chai = require("chai");
const chaihttp = require("chai-http");
const { Model } = require("sequelize");
const sinon = require("sinon");
const app = require("../../api/app");
const jwt = require("jsonwebtoken");

chai.use(chaihttp);
const { expect } = chai;

describe("Testes na rota Seller na aplicação", function () {
  describe("Testes em todos os verbos HTTP que pertencem a rota '/seller' da aplicação", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("/seller/orders - GET - deve retornar status 200 e todas as ordens de vendas registradas, com a pessoa que comprou, a pessoa que vendeu, os produtos comprados, e o status da compra", async function () {
      const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY4MDY2NTU5N30.olicHsUQlEmapC2lcrghdS9VW48tm5oql3LwnC638Sg";
      const pedidomock = [
        {
          id: 1,
          userId: 1,
          sellerId: 2,
          totalPrice: "6.98",
          deliveryAddress: "",
          deliveryNumber: "",
          saleDate: "2023-04-05T03:32:37.000Z",
          status: "Em Trânsito",
          user: {
            name: "Delivery App Admin",
            email: "adm@deliveryapp.com",
          },
          seller: {
            name: "Fulana Pereira",
            email: "fulana@deliveryapp.com",
          },
          salesProducts: [
            {
              saleId: 1,
              productId: 11,
              quantity: 2,
            },
          ],
          products: [
            {
              id: 11,
              name: "Stella Artois 275ml",
              price: "3.49",
              urlImage: "http://localhost:3001/images/stella_artois_275ml.jpg",
            },
          ],
        },
      ];
      sinon.stub(jwt, 'verify').callsFake(() => Promise.resolve({ success: 'Token is valid' }))
      sinon.stub(Model, "findAll").resolves(pedidomock);
      const response = await chai
        .request(app)
        .get("/seller/orders")
        .set({ Authorization: tokenValid });
      expect(response.status).to.equal(200);
    });
  });
});
