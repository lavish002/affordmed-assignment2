const express = require("express");
let app = express();

app.use(express.json());


let prefix = {};
const myWords = ["express", "node", "car", "carrom", "zebra"];

for (let i = 0; i < myWords.length; i++) {
  presentShort = "";
  let k = 0;
  for (let j = 0; j < myWords.length; j++) {
    if (i == j) continue;
    for (; k < myWords[j].length && k < myWords[i].length; k++) {
      if (myWords[i][k] != myWords[j][k]) break;
      else
        presentShort = presentShort + myWords[i][k];
    }
  }
  prefix[myWords[i]] = presentShort + myWords[i][k];
}

app.get("/prefixes", async (req, res) => {
  let { kw } = req.query;
  let finalRes = [];
  let k = kw.split(",");
  
  k.forEach((t) => {
    if (myWords.includes(t)) {
      finalRes.push({
        keyword: t, status: "found", prefix: prefix[t],
      });
    } else {
      finalRes.push({
        keyword: t, status: "not_found", prefix: "not_applicable",
      });
    }
  });

    res.send(finalRes);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
