'use strict';


var Joi = require('joi'),
request = require('supertest'),
expect = require('chai').expect,
joiAssert = require('joi-assert');

let token = "Basic WUVIOU5BOEhaTTA3QkZRNVBKUVA1RU9WWVVRRlJTSlU6RU1WRElYUU4ySDdTWFdFUE1OS1MyRkZWQjRNR1k2OE9URzNJMlBFTw=="; 
let id_order = "";
let id_pay = "";

const {
    BodyOrder,
    BodyOrderWithOutID,
    BodyPayment, 
    BodyPaymentWithOutMtd,
  } = require('../bodys/bodys');

  const {
    shemaCustomersFull,
  } = require('../schemas/schema_wirecard_test');


const URL = 'https://sandbox.moip.com.br';
const PATH_GET_CUSTOMER = '/v2/customers/';
const PATH_ORDERS = '/v2/orders/';
const PATH_PAYMENTS = '/v2/payments/';
const PATH_EFFECT_PAY = '/simulador/authorize?payment_id=';


describe('Wirecard Testing', function () {
    it('Realizar uma consulta na tabela de clientes ', function (done) {
      this.timeout(10000);
      request(URL)
        .get(PATH_GET_CUSTOMER)
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          expect(res.status).to.be.eql(200);
          joiAssert(res.body, shemaCustomersFull);
          done(err);
        });
    });

    it('Realizar a criação de Pedido para um cliente', function (done) {
        this.timeout(10000);
        request(URL)
          .post(PATH_ORDERS)
          .set('Authorization', token)
          .send(BodyOrder)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(res.status).to.be.eql(201);
            expect(res.body.status).to.eql('CREATED');
            id_order = res.body.id;
            done(err);
          });
      });

      it('Realizar a consulta de um pedido', function (done) {
        this.timeout(10000);
        request(URL)
          .get(PATH_ORDERS + id_order)
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(res.status).to.be.eql(200);
            done(err);
          });
      });

      it('Ao tentar criar um pedido sem identificador deve retornar um erro', function (done) {
        this.timeout(10000);
        request(URL)
          .post(PATH_ORDERS)
          .set('Authorization', token)
          .send(BodyOrderWithOutID)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(res.status).to.be.eql(400);
            expect(res.body.errors[0].description).to.eql('É necessario informar seu identificador próprio');
            done(err);
          });
      });

      it('Realizar a criação de um Pagamento', function (done) {
        this.timeout(10000);
        request(URL)
          .post(`${PATH_ORDERS + id_order}/payments`)
          .set('Authorization', token)
          .send(BodyPayment)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(res.status).to.be.eql(201);
            expect(res.body.status).to.eql('WAITING');
            id_pay = res.body.id;
            done(err);
          });
      });

      it('Realizar consulta de um Pagamento', function (done) {
        this.timeout(10000);
        request(URL)
          .get(PATH_PAYMENTS + id_pay)
          .set('Authorization', token)
          .send(BodyPayment)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(res.status).to.be.eql(200);
            done(err);
          });
      });

      it('Ao tentar criar um pagamento sem metodo definido deve retornar um erro', function (done) {
        this.timeout(10000);
        request(URL)
          .post(`${PATH_ORDERS + id_order}/payments`)
          .set('Authorization', token)
          .send(BodyPaymentWithOutMtd)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(res.status).to.be.eql(400);
            done(err);
          });
      });

      it('Efetuar o Pagamento', function (done) {
        this.timeout(10000);
        request(URL)
          .get(`${PATH_EFFECT_PAY + id_pay}&amount=10500`)
          .set('Authorization', token)
          .end(function (err, res) {
            expect(res.status).to.be.eql(200);
            done(err);
          });
      });

      it('Validar o status do Pagamento, após ter sido efetuado', function (done) {
        this.timeout(10000);
        request(URL)
          .get(PATH_PAYMENTS + id_pay)
          .set('Authorization', token)
          .send(BodyPayment)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(res.status).to.be.eql(200);
            expect(res.body.status).to.eql('AUTHORIZED');
            done(err);
          });
      });

});

