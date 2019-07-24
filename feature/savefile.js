let fs = require("fs");

// const newdata = [
//   {
//     foo: "bar",
//     qux: "moo",
//     poo: "123"
//   },
//   {
//     foo: "bar2",
//     qux: "moo2",
//     poo: "1232"
//   }
// ];

function saveJSON(filename, newdata) {
  fs.readFile(`../data/${filename}.json`, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      //   APPEND DATA
      //   const file = JSON.parse(data);
      //   newdata = [...file,newdata]


      //   NEW DATA
      const json = JSON.stringify(newdata);
      // console.log(json);

      fs.writeFile(`../data/${filename}.json`, json, "utf8", function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("save")
          //Everything went OK!
        }
      });
    }
  });
}

// saveJSON("test", newdata);
module.exports = saveJSON;
