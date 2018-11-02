const http = require("http");
const {
  getNorthcoders,
  getSingleNorthcoder,
  getPet
} = require("./controllers/controller.js");

const server = http.createServer((request, response) => {
  const { url, method } = request;
  response.setHeader("Content-Type", "text/json");
  if (method === "GET") {
    const ncUser = /\/api\/northcoders\/[\w]+$/;
    const ncPets = /\/api\/pets\/[\w]+$/;
    const [northcoder] = url.match(/[\w]+$/g);

    if (url === "/api/northcoders") getNorthcoders(request, response);
    if (ncUser.test(url)) {
      getSingleNorthcoder(request, response, northcoder);
    }
    if (ncPets.test(url)) {
      getPet(request, response, northcoder);
    }
  }
});

server.listen(3001);

console.log("listening in and around port 3000");
