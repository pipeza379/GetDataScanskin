const inquirer = require("inquirer");
const saveJSON = require("./features/saveJSON");
const saveXlsx = require("./features/saveXlsx")

const getInnisfree = require("./get/getinnisfree");
const getFresh = require("./get/getfresh")

const brands = [
  {
    name: "Innisfree",
    func: getInnisfree
  },
  {
    name:"Fresh",
    func: getFresh
  }
];

var msg = "Please choose number to get data\n";
brands.forEach((brand, i) => (msg += `\t${i + 1}. ${brand.name}\n`));
// msg += '\n if you want get all please enter "all"\n';

var questions = [
  {
    type: "input",
    name: "name",
    message: msg
  }
];

var save = [
  {
    type: "input",
    name: "name",
    message: "Do you want to save data?"
  }
];

inquirer.prompt(questions).then(async answers => {
  let select = answers["name"];
  if (isFinite(select)) {
    select -= 1;
    console.log(`GET ${brands[select].name}`);
    var dataProduct = await brands[select].func();
    await inquirer.prompt(save).then(async answers => {
      if (answers["name"] === "yes" || answers["name"] === "y") {
        let path = brands[select].name.toLowerCase();
        await saveJSON(path, dataProduct);
        await saveXlsx(path, dataProduct);
      }
    });
    console.log("complete");
    // else if(select==="all")
  } else console.log("YOU ENTER INCORRECT PLEASE CHOOSE AGAIN");
});
