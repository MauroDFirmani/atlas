import * as http from "http";
import App from "./app";
import environments from "./utils/environments";

App.set("port", environments.apiPort,);
const server = http.createServer(App);
server.listen(environments.apiPort, () => {
    console.log(`Server is running on: ${environments.apiPort}`);
});

server.on("listening", function(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
 });

module.exports = App;