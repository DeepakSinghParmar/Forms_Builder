const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.CLOUD_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    })
    .catch(() => console.log("Database Error"));
};

module.exports = connectDatabase;
