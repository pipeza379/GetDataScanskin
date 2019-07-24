const inquirer = require("inquirer");
const saveJSON = require("./savefile");

const getInnisfree = require("./getinnisfree");

const brands = [
  {
    name: "Innisfree",
    func: getInnisfree
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
        let path =brands[select].name.toLowerCase()
        await saveJSON(path, dataProduct);
    }
    });
    console.log("complete");
  } else console.log("YOU ENTER INCORRECT PLEASE CHOOSE AGAIN");
  // else if(select==="all")
});

// saveJSON("innisfree",dataProduct)
