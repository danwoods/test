module.exports = {
  smt: {
    options: {
      name: "smt",
      baseUrl: "<%= smtStatic %>js",
      mainConfigFile: "<%= smtStatic %>js/smt.js",
      out: "<%= smtStatic %>js/smt.min.js",
      inlineText: true
    }
  }
};
