const request = require("request-promise")
const cheerio = require("cheerio")
const data = require("../brand")
const genID = require("../features/genID")

async function getFresh() {
  try {
    const { url, base, types, acronym } = data.fresh
    const listTypes = {}
    const linksOfTypes = await Object.keys(types).map(type => {
      return [type, url + types[type]]
    })
    // console.log("link", linksOfTypes);
    await Promise.all(
      linksOfTypes.map(async list => {
        let [type, link] = list
        if (type[type.length - 1] === "2") {
          type = type.slice(0, type.length - 1)
        }
        // console.log(type, link);
        const html = await request(link)
        const $ = cheerio.load(html)
        console.log("find", type)
        let refs = []
        refs = [
          ...refs,
          ...$(".product-image > a")
            .map((i, e) => {
              let href = $(e).attr("href")
              return href
            })
            .get()
        ]
        // console.log(refs);
        console.log("get link", type, refs.length)
        let data = await Promise.all(
          refs.map(async ref => {
            try {
              const subHtml = await request(ref)
              const $ = cheerio.load(subHtml)

              let name = $("#product-content h1")
                .text()
                .trim()
              let quantities = $(".product-variations ul li span")
                .text()
                .trim()
              if (quantities === "") {
                $(".variation-select.fresh-dd > option").each((i, option) => {
                  if ($(option).attr("selected") === "selected") {
                    quantities = $(option)
                      .text()
                      .trim()
                      .split("\t")
                      .join("")
                      .split("\n")
                      .join("")
                    console.log(name) //this has problem
                  }
                })
              }
              let price = $(".product-price span.price-sales")
                .text()
                .trim()

              let using = $(".product-howtouse")
              using = using
                .text()
                .split("How to Use")[1]
                .trim()
                .split("\t")
                .join("")
                .split("\n")
                .join("")

              let img = $(".product-image > img")
                .map((i, img) => {
                  let src =
                    $(img).attr("src") === ""
                      ? $(img).attr("data-lazy")
                      : $(img).attr("src")
                  return base + src
                })
                .get()

              let desc = $(".product-information")
              desc = desc
                .text()
                .split("Product Details")[1]
                .trim()
                .split("\t")
                .join("")
                .split("\n")
                .join("")
              let product = {
                brand: "fresh",
                name,
                type,
                skin: "",
                advance_filter: "",
                detail: desc,
                quantities,
                price,
                using,
                img,
                link: ref
              }
              return product
            } catch (err) {
              console.log("error", err)
            }
          })
        )
        listTypes[type] =
          listTypes[type] === undefined
            ? await data
            : [...listTypes[type], ...(await data)]
        return listTypes
      })
    )

    // MAPPING DATA
    let count = 1
    let dataProduct = []
    Object.keys(types).map(type => {
      if (type[type.length - 1] !== "2") {
        listTypes[type].map(product => {
          product.id = genID(acronym, count)
          dataProduct.push(product)
          count++
        })
      }
    })
    return dataProduct
  } catch (err) {
    console.log("error to connect ", err)
  }
}
// getFresh();

module.exports = getFresh
