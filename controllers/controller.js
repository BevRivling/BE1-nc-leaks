const http = require("http");
const fs = require("fs");

// const bodBuilder = (req, cb) => {
//   let bod = "";
//   req.on("data", d => {
//     bod += d;
//   });
//   req.on("end", () => {
//     cb(null, JSON.parse(bod));
//   });
//   req.on("error", () => {
//     console.error("error");
//   });
// };

exports.getNorthcoders = (req, res) => {
  fs.readFile("./northcodersRaw.txt", "utf8", (err, ncstr) => {
    res.write(ncstr);
    res.end();
  });
};

exports.getSingleNorthcoder = (req, res, northcoder) => {
  fs.readFile("./northcodersRaw.txt", "utf8", (err, ncstr) => {
    const ncEmp = JSON.parse(ncstr).filter(nc => {
      return nc.username === northcoder;
    });

    res.write(JSON.stringify(ncEmp));

    res.end();
  });
};

exports.getPet = (req, res, northcoder) => {
  fs.readFile("./nc-pets.json", "utf8", (err, ncstr) => {
    const test = JSON.parse(ncstr);
    const ncEmp = JSON.parse(ncstr)
      .filter(nc => nc.person)
      .filter(nc => nc.person.username === northcoder);

    res.write(JSON.stringify(ncEmp));

    res.end();
  });
};
