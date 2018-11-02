const http = require("http");
const {
  getNorthcoders,
  getSingleNorthcoder
} = require("./controllers/controller.js");

const server = http.createServer((request, response) => {
  const { url, method } = request;
  response.setHeader("Content-Type", "text/json");
  if (method === "GET") {
    const ncReg = /\/api\/northcoders\/[A-z]+$/;
    if (url === "/api/northcoders") getNorthcoders(request, response);
    if (ncReg.test(url)) {
      const [northcoder] = url.match(/[A-z]+$/g);
      getSingleNorthcoder(request, response, northcoder);
    }
  }
});

server.listen(3001);

console.log("listening in and around port 3000");
