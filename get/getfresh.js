const request = require("request-promise");
const cheerio = require("cheerio");
const data = require("../brand");

async function fresh() {
  try {
    const { url, base, types, acronym } = data.fresh;
    const listTypes = {};
    // link of skin types
    const linksOfTypes = await Object.keys(types).map(type => {
      return [type, url + types[type]];
    });
    console.log(linksOfTypes);
    const getData = await Promise.all(
      linksOfTypes.map(async list => {
        let [type, link] = list;
        console.log(type, link);
        const html = await request(link);
        const $ = cheerio.load(html);

        // find href of all products
        let i = 0;
        let refs = [];
        refs = [
          ...refs,
          $(".product-image")
            .map((i, e) => {
              let href = $(e)
                .find("a")
                .attr("href");
              return href;
            })
            .get()
        ];
        // console.log(refs[0]);

        //get all products

        const data = await Promise.all(
          refs[0].map(async ref => {
            try {
              const subHtml = await request(ref);
              // console.log("####",ref)
              const $ = cheerio.load(subHtml);
              let name = $("#product-content h1")
                .text()
                .trim();
              let quantities = $(".product-variations ul li span")
                .text()
                .trim();
              // let desc = $(".pdtDesc")
              //   .text()
              //   .trim();
              let price = $(".product-price span.price-sales")
                .text()
                .trim();
              let using = $(".product-howtouse")
                .text()
                  // .trim();
              let img = $("img.primary-image").attr("src");
              img = base + img;
              console.log(using)
              let product = {
                brand: "fresh",
                name,
                type,
                // skin:"",
                // advance_filter:"",
                // detail:desc,
                quantities,
                price,
                using,
                img
              };
              return product;
            } catch (err) {
              console.log("error", err);
            }
          })
        );
        listTypes[type] = await data;
        let typeOfProduct = $("ul.list li.on >a").text();
        console.log(typeOfProduct, " get :", listTypes[type].length);
        return listTypes;
      })
    );
  } catch (err) {
    console.log("error to connect ", err);
  }
}
fresh();

// module.exports = innisfree;
