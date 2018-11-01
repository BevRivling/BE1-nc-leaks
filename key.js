#!/usr/bin/env node
const request = require("superagent");

request
  .get("https://nc-leaks.herokuapp.com/api/superSecret")

  .set("secretkey", "fae53351b9effc708e764e871bef3119")
  .end((err, res) => {
    console.log(res.body);
  });
