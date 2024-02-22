import mongoose from "mongoose";
const config = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (config.isConnected) {
    return;
  } else {
    try {
      const { connection } = await mongoose.connect(process.env.MONGO_DB_URL);
      console.log("Connected to Database!!");
      console.log("Ready State : ", connection.readyState);
      config.isConnected = connection.readyState;
    } catch (error) {
      console.log("Error While Connecting to data : ", error);
    }
  }
};
