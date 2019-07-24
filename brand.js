const brands = ["innisfree", "fresh"];
const data = {
  innisfree: {
    base: "http://www.innisfree.com",
    url:
      "http://www.innisfree.com/th/th/product/productList.do?catCd01=UA&catCd02=",
    acronym: "INF",
    types: {
      CLEANSER: "UAFF",
      TONER: "UAAA",
      SERUME: "UACC",
      MOITURIZER: "UABB",
      SUNSKIN: "UAGG",
      MASK: "UAEE",
    }
  },
  fresh: {
    base: "https://www.fresh.com",
    url: "https://www.fresh.com/US/skincare/",
    acronym: "FRS",
    types: {
      CLEANSER: "cleanse/all-cleansers",
      // MOITURIZER: "moisturize/all-moisturizers/",
      // MASK: "mask/all-masks/"
    }
  }
};

module.exports = data;
