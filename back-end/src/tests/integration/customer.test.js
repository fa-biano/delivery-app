const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');
// const { describe } = require('pm2');
const app = require('../../api/app');
const { Model } = require('sequelize');
const { userService, orderService } = require('../../api/services');

chai.use(chaihttp);

const { expect } = chai;

describe('Testes na rota Costumer na aplicação', async () => {
  describe("Testes em todos os verbos HTTP que pertencem a rota '/costumer' da aplicação", async () => {
    afterEach(() => {
      sinon.restore()
    })
    it('/costumer/products - GET - deve retornar status 200 e a lista dos produtos registrados no banco de dados', async () => {
      const tokenValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjgwNTcxODE5fQ.LCJCLsd67u6YXXg5wDyHkPaAcyZsVmbiYTdxJYaqDGU'
      const productsMock = [
        {
          id: 1,
          name: "Skol Lata 250ml",
          price: 2.20,
          url_image: "http://localhost:3001/images/skol_lata_350ml.jpg",
        },
        {
          id: 2,
          name: "Heineken 600ml",
          price: 7.5,
          url_image: "http://localhost:3001/images/heineken_600ml.jpg",
        },
        {
          id: 3,
          name: "Antarctica Pilsen 300ml",
          price: 2.49,
          url_image: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
        },
      ]
      sinon.stub(Model, 'findAll').resolves(productsMock)
      const response = await chai.request(app).get('/customer/products').set({
        'Authorization': tokenValid
      })
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(productsMock);
    })

    it('/costumer/products - GET - deve retornar status 401 e uma mensagem de erro caso o usuário tente acessar a lista de produtos cadastrados no banco de dados', async () => {
      const tokenInvalid = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjgwNTcxODE5fQ.LCJCLsd67u6YXXg5wDyHkPaAcyZsVmbiYTdxJYaqDGU'
      const response = await chai.request(app).get('/customer/products').set({
        'Authorization': tokenInvalid
      })
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('message').equal('Expired or invalid token');
    })

    it("/costumer/products - GET - deve retornar status 401 e uma mensagem de erro caso o usuário não informe o 'token'", async () => {
      const response = await chai.request(app).get('/customer/products')
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('message').equal('Token not found');
    })

    it('/costumer/checkout - GET - deve retornar status 200 e a lista dos usuarios registrados no banco de dados', async () => {
      const tokenValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjgwNTcxODE5fQ.LCJCLsd67u6YXXg5wDyHkPaAcyZsVmbiYTdxJYaqDGU'
      const usersMock = [
        {
          id: 1,
          name: 'Delivery App Admin',
          email: 'adm@deliveryapp.com',
          password: 'a4c86edecc5aee06eff8fdeda69e0d04',
          // senha: '--adm2@21!!--'
          role: 'administrator',
        },
        {
          id: 2,
          name: 'Fulana Pereira',
          email: 'fulana@deliveryapp.com',
          password: '3c28d2b0881bf46457a853e0b07531c6', 
          // senha:'fulana@123' 
          role: 'seller',
        },
        {
          id: 3,
          name: 'Cliente Zé Birita',
          email: 'zebirita@email.com',
          password: '1c37466c159755ce1fa181bd247cb925', 
          // senha:'$#zebirita#$'
          role: 'customer',
        },
      ]
      sinon.stub(Model, 'findAll').resolves(usersMock)
      const response = await chai.request(app).get('/customer/checkout').set({
        'Authorization': tokenValid
      })
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(usersMock);
    })

    it('/costumer/checkout - GET - deve retornar status 401 e uma mensagem de erro caso o usuário tente acessar a lista de usuarios registrados no banco de dados', async () => {
      const tokenInvalid = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjgwNTcxODE5fQ.LCJCLsd67u6YXXg5wDyHkPaAcyZsVmbiYTdxJYaqDGU'
      const response = await chai.request(app).get('/customer/checkout').set({
        'Authorization': tokenInvalid
      })
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('message').equal('Expired or invalid token');
    })

    it("/costumer/checkout - GET - deve retornar status 401 e uma mensagem de erro caso o usuário não informe o 'token'", async () => {
      const response = await chai.request(app).get('/customer/checkout')
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('message').equal('Token not found');
    })

    it("/costumer/orders - GET - deve retornar status 200 e a lista dos pedidos feitos pelos usuários que acessam a nossa aplicação", async () => {
      const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY4MDY2NTU5N30.olicHsUQlEmapC2lcrghdS9VW48tm5oql3LwnC638Sg"
              const pedidomock = [
                  {
                      "id": 1,
                      "userId": 1,
                      "sellerId": 2,
                      "totalPrice": "6.98",
                      "deliveryAddress": "",
                      "deliveryNumber": "",
                      "saleDate": "2023-04-05T03:32:37.000Z",
                      "status": "Em Trânsito",
                      "user": {
                          "name": "Delivery App Admin",
                          "email": "adm@deliveryapp.com"
                      },
                      "seller": {
                          "name": "Fulana Pereira",
                          "email": "fulana@deliveryapp.com"
                      },
                      "salesProducts": [
                          {
                              "saleId": 1,
                              "productId": 11,
                              "quantity": 2
                          }
                      ],
                      "products": [
                          {
                              "id": 11,
                              "name": "Stella Artois 275ml",
                              "price": "3.49",
                              "urlImage": "http://localhost:3001/images/stella_artois_275ml.jpg"
                          }
                      ]
                  }
              ]
              sinon.stub(Model, 'findAll').resolves(pedidomock)
              const response = await chai.request(app).get("/customer/orders").set({"Authorization": tokenValid})
              
              expect(response.status).to.equal(200);
            
    })

    it("/costumer/orders:id - GET - deve retornar status 200 e o pedido feito pelo usuario buscando pelo id na aplicação", async () => {
      const tokenValid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY4MDY2NTU5N30.olicHsUQlEmapC2lcrghdS9VW48tm5oql3LwnC638Sg"
      const pedidomock = [
        {
            "id": 1,
            "userId": 1,
            "sellerId": 2,
            "totalPrice": "6.98",
            "deliveryAddress": "",
            "deliveryNumber": "",
            "saleDate": "2023-04-05T03:32:37.000Z",
            "status": "Em Trânsito",
            "user": {
                "name": "Delivery App Admin",
                "email": "adm@deliveryapp.com"
            },
            "seller": {
                "name": "Fulana Pereira",
                "email": "fulana@deliveryapp.com"
            },
            "salesProducts": [
                {
                    "saleId": 1,
                    "productId": 11,
                    "quantity": 2
                }
            ],
            "products": [
                {
                    "id": 11,
                    "name": "Stella Artois 275ml",
                    "price": "3.49",
                    "urlImage": "http://localhost:3001/images/stella_artois_275ml.jpg"
                }
            ]
        },
        {
          "id": 2,
          "userId": 1,
          "sellerId": 2,
          "totalPrice": "6.98",
          "deliveryAddress": "alskdjflkasjdflkjasdfh",
          "deliveryNumber": "1234567891235",
          "saleDate": "2023-04-05T03:32:37.000Z",
          "status": "Em Trânsito",
          "user": {
              "name": "Delivery App Admin",
              "email": "adm@deliveryapp.com"
          },
          "seller": {
              "name": "Fulana Pereira",
              "email": "fulana@deliveryapp.com"
          },
          "salesProducts": [
              {
                  "saleId": 1,
                  "productId": 11,
                  "quantity": 13
              }
          ],
          "products": [
              {
                  "id": 11,
                  "name": "Stella Artois 275ml",
                  "price": "3.49",
                  "urlImage": "http://localhost:3001/images/stella_artois_275ml.jpg"
              }
          ]
      }
    ]
    sinon.stub(orderService, 'getOrdersById').resolves(pedidomock)
    const response = await chai.request(app).get("/customer/orders/2654654654654654654654").set({"Authorization": tokenValid})
    expect(response.status).to.equal(200)
    })

    it("/costumer/checkout - POST - deve retornar status 201 e ")


  } )
}  )