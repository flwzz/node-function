// https://yuqingc.github.io/posts/2019/sse-express/;

import express from "express";
import cors from "cors";
import SseServer from "./sseServer";
("use strict");

const app = express();

const mySseServer = new SseServer({
  maxConnections: 3, // 设置最大链接数量
});

app.use(
  cors({
    origin: "*",
  })
);

app.use("/sse", mySseServer.middleWare());

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening to port :${port}`);
});

// 模拟向客户端推送消息
setInterval(() => {
  // 当前链接的数量
  console.log("current connect number:", mySseServer.sseConnections.size);
  mySseServer.announce(`It is ${new Date()} now!`);
}, 3000);
