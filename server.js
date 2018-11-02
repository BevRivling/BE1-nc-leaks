const http = require("http");
const { getNorthcoders } = require("./controllers/controller.js");

const server = http.createServer((request, response) => {
  const { url, method } = request;
  response.setHeader("Content-Type", "text/json");
  if (method === "GET") {
    if (url === "/api/northcoders") getNorthcoders(request, response);
  }

  response.end();
});

server.listen(3001);

console.log("listening in and around port 3000");
