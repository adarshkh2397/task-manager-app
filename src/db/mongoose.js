const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
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
