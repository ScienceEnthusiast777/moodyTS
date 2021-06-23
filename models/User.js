const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: String,
  memberSince: Date,
  registeredMoods: [
    {
      time: Date,
      amOrPm: {
        type: string,
        enum: ["AM", "PM"],
      },
      mood: {
        type : string, 
        enum : ["sad","half-sad","neutral","half-happy","happy"]
      }
    }
  ]
});

const User = model("User", userSchema);

module.exports = User;
