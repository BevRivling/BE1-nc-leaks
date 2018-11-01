const http = require("http");
const fs = require("fs");

const getInfo = (usernamesArr, info) => {
  let body = [];
  let counter = 0;

  usernamesArr.forEach(user => {
    let userInt = "";
    const userOptions = {
      hostname: "nc-leaks.herokuapp.com",
      path: `/api/people/${user}/${info}`,
      method: "GET"
    };

    const userReq = http.request(userOptions, response => {
      response.on("data", data => {
        userInt += data;
      });

      response.on("end", () => {
        counter++;
        body.push(JSON.parse(userInt));
        if (counter === usernamesArr.length) {
          // console.log(body);
          fs.writeFile(`nc-${info}.json`, JSON.stringify(body), () => {});
        }
      });
    });
    userReq.end();
  });
};

module.exports = { getInfo };
