const request = require("request-promise");
const cheerio = require("cheerio");
const data = require("./brand");

async function innisfree() {
  try {
    const { url, base, types, acronym } = data.innisfree;
    const listTypes = {};
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
        const total = $(".resultSort p.resultNum > strong")
          .text()
          .trim();
        console.log(total);
        // const refs = $(".productList ul li")
        //   .map((i, e) => {
        //     let href = $(e)
        //       .find("a")
        //       .attr("href");
        //     return base + href;
        //   })
        //   .get();
        let i = 0;
        let refs = [];
        if (refs.length < total) {
          const pageHtml = await request(`${link}+&pageNo=${i}`);
          const $ = cheerio.load(pageHtml);
          refs = [
            ...refs,
            $(".productList ul li")
              .map((i, e) => {
                let href = $(e)
                  .find("a")
                  .attr("href");
                return base + href;
              })
              .get()
          ];
        }
        console.log(refs)
        const data = await Promise.all(
          refs.map(async ref => {
            try {
              const subHtml = await request(ref);
              const $ = cheerio.load(subHtml);
              let name = $(".pdtName em")
                .eq(0)
                .text()
                .trim();
              let quantities = $(".pdtName em")
                .eq(1)
                .text()
                .trim();
              let desc = $(".pdtDesc")
                .text()
                .trim();
              let price = $(".price")
                .text()
                .trim();
              let using = $(".howTo > p")
                .text()
                .trim();
              let img = $(".thumbList ul li")
                .map((i, li) => {
                  let src = $(li)
                    .find("img")
                    .attr("src");
                  return base + src;
                })
                .get();
              let product = {
                brand: "innisfree",
                name,
                type,
                // skin:"",
                // advance_filter:"",
                // detail:desc,
                quantities,
                // price,
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
innisfree();

// module.exports = innisfree;
