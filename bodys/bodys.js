'use strict';

const Joi = require('joi');


const BodyOrder = {  
        "ownId":"meu_id_order2",
        "amount":{  
           "currency":"BRL",
           "subtotals":{  
              "shipping":1500
           }
        },
        "items":[  
           {  
              "product":"Descrição do pedido",
              "category":"CLOTHING",
              "quantity":1,
              "detail":"Camiseta estampada branca",
              "price":9000
           }
        ],
        "customer":{  
           "id":"CUS-JEWJ13Q0O281"
        }
};


const BodyOrderWithOutID = {  
    "amount":{  
       "currency":"BRL",
       "subtotals":{  
          "shipping":1500
       }
    },
    "items":[  
       {  
          "product":"Descrição do pedido",
          "category":"CLOTHING",
          "quantity":1,
          "detail":"Camiseta estampada branca",
          "price":9000
       }
    ],
    "customer":{  
       "id":"CUS-JEWJ13Q0O281"
    }
};

const BodyPayment = {  
    "statementDescriptor":"Minha Loja",
    "fundingInstrument":{  
       "method":"BOLETO",
       "boleto":{  
          "expirationDate":"2020-06-20",
          "instructionLines":{  
             "first":"Atenção,",
             "second":"fique atento à data de vencimento do boleto.",
             "third":"Pague em qualquer casa lotérica."
          },
          "logoUri":"http://www.lojaexemplo.com.br/logo.jpg"
       }
    }
 };

 const BodyPaymentWithOutMtd = {  
    "statementDescriptor":"Minha Loja",
    "fundingInstrument":{  
       "boleto":{  
          "expirationDate":"2020-06-20",
          "instructionLines":{  
             "first":"Atenção,",
             "second":"fique atento à data de vencimento do boleto.",
             "third":"Pague em qualquer casa lotérica."
          },
          "logoUri":"http://www.lojaexemplo.com.br/logo.jpg"
       }
    }
 };

module.exports = {
    BodyOrderWithOutID,
    BodyOrder,
    BodyPayment,
    BodyPaymentWithOutMtd,
};