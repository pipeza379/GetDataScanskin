const request = require("request-promise");
const cheerio = require("cheerio");
const data = require("./brand");
const genID = require("./genID");

async function getInnisfree() {
  try {
    const { url, base, types, acronym } = data.innisfree;
    const listTypes = {};
    const linksOfTypes = await Object.keys(types).map(type => {
      return [type, url + types[type]];
    });
    // console.log("link",linksOfTypes);
    await Promise.all(
      linksOfTypes.map(async list => {
        let [type, link] = list;
        // console.log(type, link);
        const html = await request(link);
        const $ = cheerio.load(html);
        const total = $(".resultSort p.resultNum > strong")
          .text()
          .trim();
        console.log("find", type, total);
        let refs = [];
        // let refs = await $(".productList ul li > a")
        //   .map(e => {
        //     let href = $(e)
        //       // .find("a")
        //       .attr("href");
        //     return base + href;
        //   })
        //   .get();
        let page = 1;
        let old = 0;
        while (refs.length < total) {
          // console.log("get", type, page, refs.length);
          const pageHtml = await request(`${link}+&pageNo=${page}`);
          const $ = cheerio.load(pageHtml);
          $(".productList ul li > a").map((i, e) => {
            let href = $(e).attr("href");
            refs.push(base + href);
          });
          if (old === refs.length) break;
          // console.log(old);
          old = refs.length;
          // console.log(old);
          page++;
        }
        // console.log(refs);
        // console.log("get link",type, refs.length);
        let data = await Promise.all(
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
                .map(li => {
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
              // console.log(name)
              return product;
            } catch (err) {
              console.log("error", err);
            }
          })
        );
        listTypes[type] = await data;
        let typeOfProduct = $("ul.list li.on >a").text();
        // console.log("product ",listTypes[type])
        console.log(typeOfProduct, " get :", listTypes[type].length);
        return listTypes;
      })
    );
    

    // MAPPING DATA
    let count = 1;
    let dataProduct=[]
    Object.keys(types).map(type => {
      listTypes[type].map(product => {
        product.id = genID(acronym,count);
        dataProduct.push(product)
        count++;
      });
    });
    return dataProduct
  } catch (err) {
    console.log("error to connect ", err);
  }
}
// innisfree();

module.exports = getInnisfree;
