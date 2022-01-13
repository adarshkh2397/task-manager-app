const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Could not connect to database :(");
  }
};

main().catch((err) => {
  console.log(err);
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});
