import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");
// warning 안떠서 그냥 진행
// 문제 생기면 #6.8 9분경으로 가서 보자

const db = mongoose.connection;

const handleOpen = () => console.log("✓ Connected to DB");
const handleError = () => (error) => console.log("✋ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);