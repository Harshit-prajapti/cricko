import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};
const connection: connectionObject = {};
const connectDb = async () => {
  if (connection.isConnected) {
    console.log("Already connected to the database");
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);
    connection.isConnected = db.connections[0].readyState
    console.log("Db connected successfully")
  } catch (error) {
    console.log("Data base not Connected : ",error)
    process.exit(1)
  }
};

export default connectDb;
