const http = require("http");
const fs = require("fs");

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

exports.getInfo = (req, res, northcoder, info) => {
  fs.readFile(`./nc-${info}.json`, "utf8", (err, ncstr) => {
    const ncEmp = JSON.parse(ncstr)
      .filter(nc => nc.person)
      .filter(nc => nc.person.username === northcoder);
    if (ncEmp.length === 0) {
      res.statusCode = 404;
      res.write("ERROR 404: page not found");
    } else {
      res.write(JSON.stringify(ncEmp));
    }
    res.end();
  });
};
