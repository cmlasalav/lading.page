const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  AboutUsTitle_EN :{
    type: String,
    required: true
  },
  AboutUsDescription_EN : {
    type: String,
    required : true
  },
  AboutUsTitle_ES :{
    type: String,
    required: true
  },
  AboutUsDescription_ES : {
    type: String,
    required : true
  },
  AboutUsImg : {
    type: String,
    required : true
  }
});

module.exports = mongoose.model('Genera.AboutUs', aboutUsSchema, 'Genera.AboutUs');

