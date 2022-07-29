const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contect", contactSchema);
