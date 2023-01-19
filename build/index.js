"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const environments_1 = require("./utils/environments");
app_1.default.set("port", environments_1.default.apiPort);
const server = http.createServer(app_1.default);
server.listen(environments_1.default.apiPort, () => {
    console.log(`Server is running on: ${environments_1.default.apiPort}`);
});
server.on("listening", function () {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
});
module.exports = app_1.default;
