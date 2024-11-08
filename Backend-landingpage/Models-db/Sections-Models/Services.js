const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  ServicesName_EN :{
    type: String,
    required: true
  },
  ServiceDescription_EN : {
    type: String,
    required : true
  },
  ServicesName_ES :{
    type: String,
    required: true
  },
  ServiceDescription_ES : {
    type: String,
    required : true
  },
  ServiceImage : {
    type: String,
    required : true
  }
});

module.exports = mongoose.model('Genera.Services', servicesSchema, 'Genera.Services');

