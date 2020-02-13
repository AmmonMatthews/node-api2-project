const express = require("express");

const postRouter = require("./routers/post-router.js")

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);



const port = 5000;
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})