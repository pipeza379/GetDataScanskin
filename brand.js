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
      MASK: "UAEE"
    }
  },
  // fresh: {
  //   base: "https://www.fresh.com",
  //   url: "https://www.fresh.com/US/skincare/",
  //   acronym: "FRS",
  //   types: {
  //     CLEANSER: "cleanse/all-cleansers",
  //     // MOITURIZER: "moisturize/all-moisturizers/",
  //     // MASK: "mask/all-masks/"
  //   }
  // }
  fresh: {
    base: "https://th.fresh.com",
    url: "https://th.fresh.com/TH/%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%9A%E0%B8%B3%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%9C%E0%B8%B4%E0%B8%A7%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2/",
    acronym: "FRS",
    types: {
      CLEANSER: "%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B0%E0%B8%AD%E0%B8%B2%E0%B8%94",
      SERUME: "%E0%B9%80%E0%B8%8B%E0%B8%A3%E0%B8%B1%E0%B9%88%E0%B8%A1",
      MOITURIZER: "%E0%B8%84%E0%B8%A3%E0%B8%B5%E0%B8%A1%E0%B8%9A%E0%B8%B3%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%9C%E0%B8%B4%E0%B8%A7",
      //MINIMASK
      MASK: "%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%A1%E0%B8%B2%E0%B8%AA%E0%B8%81%E0%B9%8C",
      MASK2: "%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%A1%E0%B8%B2%E0%B8%AA%E0%B8%81%E0%B9%8C",
      ESSENCE: "%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9C%E0%B8%B4%E0%B8%A7%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%9C%E0%B8%B4%E0%B8%A7"
    }
  }
};

module.exports = data;
