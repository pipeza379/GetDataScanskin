var fs = require("fs");
var json2xls = require("json2xls");
// var data = require("../data/innisfree.json");
// var json = [
//   {
//     foo: "bar",
//     qux: "moo",
//     poo: 123,
//     stux: new Date()
//   },
//   { foo: "bar", qux: "moo", poo: 123, stux: new Date() },
//   {
//     foo: "bar",
//     qux: "moo",
//     poo: 123,
//     stux: new Date()
//   }
// ];

function saveXlsx(filename, json) {
  var xls = json2xls(json, {
    fields: [
      "id",
      "brand",
      "name",
      "type",
      "skin",
      "advance_filter",
      "detail",
      "quantities",
      "price",
      "using",
      "img",
      "link"
    ]
  });
  fs.writeFileSync(process.cwd() + `/data/${filename}.xlsx`, xls, "binary");
}
// saveXlsx("innisfree", data);
module.exports = saveXlsx;
