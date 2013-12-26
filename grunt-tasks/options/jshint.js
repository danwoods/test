// JSHint config
module.exports = {
  files: [
    'Gruntfile.js',
    '<%= magsStatic %>/**/*.js', // Cartridges to scan
    '<%= clftrStatic %>/**/*.js',
    '<%= commonStatic %>/**/*.js',
    '<%= smtStatic %>/**/*.js',
    '!**/analytics/**', // Ignores
    '!**/node_modules/**',
    '!**/lib/**',
    '!**/*.min.js',
  ],
  options: {
    smarttabs: true,
    "-W099": true,  // allow mixed tabs/spaces
    "-W014": true,  // allow odd line breaks (like during long string concatination)
    force: true,    // Just show errors, don't stop build
    globals: {
      jQuery: true,
      console: true,
      module: true,
      document: true
    }
  }
};
