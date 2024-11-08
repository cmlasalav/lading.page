const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  HomeTitle :{
    type: String,
    required: true
  },
  HomeDescription_EN : {
    type: String,
    required : true
  },
  HomeDescription_ES : {
    type: String,
    required : true
  },
  HomeImg : {
    type: String,
    required : true
  }
});

module.exports = mongoose.model('Genera.Home', homeSchema, 'Genera.Home');
