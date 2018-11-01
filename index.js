// Requires
const http = require("http");
const fs = require("fs");

const options = {
  hostname: "nc-leaks.herokuapp.com",
  path: "/api/people",
  method: "GET"
};

const req = http.request(options, response => {
  let body = "";
  response.on("data", data => {
    body += data;
  });
  response.on("end", () => {
    body = JSON.parse(body);
    // Write file of northcoder objects
    const northcoders = body.people.filter(
      person => (person.job.workplace = "northcoders")
    );
    fs.writeFile(`northcodersRaw.txt`, JSON.stringify(northcoders), () => {});

    // Get array of usernames
    const ncUsernames = northcoders.reduce((acc, northcoder) => {
      acc.push(northcoder.username);
      return acc;
    }, []);

    // Request user interests
    let bodyInterests = [];
    let counter = 0;

    // INTERESTS FROM HERE
    ncUsernames.forEach(user => {
      let userInt = "";
      const userOptions = {
        hostname: "nc-leaks.herokuapp.com",
        path: `/api/people/${user}/interests`,
        method: "GET"
      };

      const userReq = http.request(userOptions, response => {
        response.on("data", data => {
          userInt += data;
        });

        response.on("end", () => {
          counter++;
          bodyInterests.push(JSON.parse(userInt));
          if (counter === ncUsernames.length) {
            fs.writeFile(
              "ncInterests.json",
              JSON.stringify(bodyInterests),
              () => {}
            );
          }
        });
      });
      userReq.end();
    });

    // TO HERE

    // console.log(ncUsernames[0]);
  });
  response.on("error", error => {
    console.error(error);
  });
});

req.end();
