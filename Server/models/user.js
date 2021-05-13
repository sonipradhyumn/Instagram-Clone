//creating schemas forr storing data in mongoose
const mongoose = require ('mongoose');
const UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    require: true,
  },
  // here phoneNO is new
  phoneNo: {
    type: Number,
    require: true,
    unique: true,
    maxlength: [10, 'phone no can not be more then 10 number '],
  },

  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  timestamp: {type: Date, default: Date.now},
});
mongoose.model ('User', UserSchema);
