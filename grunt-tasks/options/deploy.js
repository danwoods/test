module.exports = {
  options: {
    inst: "development",
    org: "magazines",
    source: "./cartridges/",
    git: true,
    gitRegex: "^[a-zA-Z]+(-([0-9](.?))*)?",
    maxUploads: 500
  }
};
