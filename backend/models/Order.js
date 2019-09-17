const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Order = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   address: {
      type: String
   },
   PageName: {
    type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'orders'
})

module.exports = mongoose.model('Order', Order)