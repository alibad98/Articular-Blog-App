import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://alibroid:alibroid98aa@cluster0.ypspn66.mongodb.net/blog-app"
  );
  console.log("DB Connected");
};
