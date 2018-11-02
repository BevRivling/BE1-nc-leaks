#!/usr/bin/env node

const [, , info] = process.argv;

// Requires
const http = require("http");
const fs = require("fs");
const { getInfo } = require("./getInfo");

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
      person => person.job.workplace === "northcoders"
    );
    fs.writeFile(`northcodersRaw.txt`, JSON.stringify(northcoders), () => {});

    // Get array of usernames
    const ncUsernames = northcoders.reduce((acc, northcoder) => {
      acc.push(northcoder.username);
      return acc;
    }, []);

    if (info === "interests") {
      //Get interests
      getInfo(ncUsernames, "interests");
    } else if (info === "pets") {
      //Get pets
      getInfo(ncUsernames, "pets");
    } else {
      console.log("please state interests or pets");
    }
  });
  response.on("error", error => {
    console.error(error);
  });
});

req.end();
