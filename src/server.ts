/* eslint-disable no-undef */
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const main = async () => {
  try {
    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening at ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
