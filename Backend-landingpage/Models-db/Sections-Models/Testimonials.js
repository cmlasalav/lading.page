const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
    User : {
        type : String,
        required : true
    },
    TestimonialBody : {
        type : String,
        required : true
    },
    TestimonialDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
});

module.exports = mongoose.model('Genera.Testimonials', testimonialsSchema, 'Genera.Testimonials');
