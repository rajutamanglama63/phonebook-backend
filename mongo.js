const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://raju1234:${password}@practiseprojects.skbuf.mongodb.net/phonebook?retryWrites=true&w=majority`;

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Contact = mongoose.model("Contact", phonebookSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const contact = new Contact({
      name: "Jaru",
      number: 9876789876,
    });

    return contact.save();
  })
  .then((res) => {
    console.log(res);
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
