const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datauserSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  _id:{
    type:String
  },
   
    fname: {
        type: String,//required: true
    },
    lname: {
        type: String,//required: true
      },
      dob: {
        type: Date,//required: true
      },
      email: {
        type: String,//unique: true, required: true
      },
      password: {
        type: String,//unique: true, required: true
      },
    imagepath:
    {
        type: String,//required: true
    },
    
   
},
{
  timestamps: true,
},

{
    collection: 'datausers'
  })


module.exports = mongoose.model('datauser', datauserSchema)

   