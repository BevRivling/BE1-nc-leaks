const http = require("http");
const {
  getNorthcoders,
  getSingleNorthcoder,
  getInfo
  // getPet,
  // getInterests
} = require("./controllers/controller.js");

const server = http.createServer((request, response) => {
  const { url, method } = request;
  response.setHeader("Content-Type", "text/json");
  if (method === "GET") {
    const ncUser = /\/api\/northcoders\/[\w]+$/;
    const ncPets = /\/api\/pets\/[\w]+$/;
    const ncInterests = /\/api\/interests\/[\w]+$/;
    const [northcoder] = /[\w]+$/g.test(url) ? url.match(/[\w]+$/g) : [];

    if (url === "/api/northcoders") getNorthcoders(request, response);
    if (ncUser.test(url)) {
      getSingleNorthcoder(request, response, northcoder);
    }
    if (ncPets.test(url)) {
      getInfo(request, response, northcoder, "pets");
    }
    if (ncInterests.test(url))
      getInfo(request, response, northcoder, "interests");
  }
});

server.listen(3001);

console.log("listening in and around port 3000");
