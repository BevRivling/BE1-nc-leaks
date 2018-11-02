const http = require("http");
const fs = require("fs");

const bodBuilder = (req, cb) => {
  let bod = "";
  req.on("data", d => {
    bod += d;
  });
  req.on("end", () => {
    cb(null, JSON.parse(bod));
  });
  req.on("error", () => {
    console.error("error");
  });
};

exports.getNorthcoders = (req, res) => {
  console.log("hello!");
  fs.readFile("northcodersRaw.txt", (err, res) => {
    bodBuilder(req, (err, nc) => console.log(nc));
  });
};
