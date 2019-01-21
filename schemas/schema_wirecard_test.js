'use strict';

const Joi = require('joi');


const schemaCreditcard = Joi.object({
    id: Joi.string(),
    brand: Joi.string(),
    first6: Joi.string(),
    last4: Joi.string(),
    store: Joi.boolean(),
});

const schemaFndInst = Joi.object({
    creditCard: schemaCreditcard,
    method: Joi.string(),
});

const schemaHosted = Joi.object({
    redirectHref:  Joi.string(),
});

const schemaSelf = Joi.object({
    href:  Joi.string(),
});

const schemaLinks = Joi.object({
    self: schemaSelf,
    hostedAccount: schemaHosted,
});

const schemaAddress = Joi.object({
    zipCode: Joi.string(),
    street: Joi.string(),
    streetNumber: Joi.string(),
    complement: Joi.string(),
    city: Joi.string(),
    district: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
});

const schemaTaxDoc = Joi.object({
    type: Joi.string(),
    number: Joi.string(),
});

const schemaPhone = Joi.object({
    countryCode: Joi.string(),
    areaCode: Joi.string(),
    number: Joi.string(),
});

const shemaCustomers = Joi.object({
    id: Joi.string().required(),
    ownId: Joi.string().required(),
    fullname: Joi.string().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string(),
    birthDate: Joi.string().required(),
    email: Joi.string().required(),
    phone: schemaPhone,
    taxDocument: schemaTaxDoc,
    shippingAddress: schemaAddress,
    _links: schemaLinks,
    fundingInstrument: schemaFndInst,
    fundingInstruments: Joi.array().items(schemaFndInst),
});


const shemaCustomersFull = Joi.object({
    customers: Joi.array().items(shemaCustomers),
});



  module.exports = {
    shemaCustomersFull,
  };