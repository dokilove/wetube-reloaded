import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

// console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
// pug 초기 세팅 폴더가 package.json있는데를 기준으로 하기 때문에 변경
app.set("views", process.cwd() + "/src/views");

app.use(logger);
// form의 value를 자바스크립트 형식으로 먼저 변환시켜야하기 때문에
// 우리가 쓰는 라우터보다 먼저 적용해야 한다
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
