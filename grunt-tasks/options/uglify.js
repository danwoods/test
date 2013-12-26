// Uglify config
module.exports = {
  common: {
    files: [
      { // Common main
        dest:'<%= commonStatic %>js/main.min.js',
        src: [
          '<%= sfRichUIStatic %>js/app.js',
          '<%= commonStatic %>js/mags_app.js',
          '<%= commonStatic %>js/responsive.js',
          '<%= commonStatic %>js/api.js'
        ]
      },
      { // Common plugins
        dest: '<%= commonStatic %>js/plugins.min.js',
        src: [
          '<%= sfRichUIStatic %>lib/jquery/jcarousel/jquery.jcarousel.min.js',
          '<%= sfRichUIStatic %>lib/jquery/tooltip/jquery.tooltip.min.js',
          '<%= sfRichUIStatic %>lib/jquery/hashchange/jquery.ba-hashchange.min.js',
          '<%= sfRichUIStatic %>lib/jquery/validate/jquery.validate.min-1.9.0.js',
          '<%= sfRichUIStatic %>lib/jquery/zoom/jquery.jqzoom.dw.js',
          '<%= commonStatic %>lib/jquery/mask.js',
          '<%= commonStatic %>lib/jquery/jquery.creditCardValidator.js'
        ]
      },
      { // Common pages
        expand: true,
        ext: '.min.js',
        src: [ 
          '<%= commonStatic %>js/pages/*.js', 
          '!<%= commonStatic %>js/pages/*.min.js' 
        ],
      },
      { // Mags analytics
        dest: '<%= commonStatic %>js/analytics/omniture/s_code.min.js',
        src: [ 
          '<%= commonStatic %>js/analytics/omniture/s_code.js' 
        ]
      }
    ]
  },
  cleanerfilters: {
    files: [
      { // CF main
        dest:'<%= clftrStatic %>js/all.min.js',
        src: [
          '<%= sfRichUIStatic %>js/app.js',
          '<%= commonStatic %>js/common_app.js',
          '<%= clftrStatic %>js/main_app.js',
          '<%= commonStatic %>js/api.js'
        ]
      },
      { // CF plugins
        dest: '<%= clftrStatic %>js/plugins.min.js',
        src: [
          '<%= sfRichUIStatic %>lib/jquery/jcarousel/jquery.jcarousel.min.js',
          '<%= sfRichUIStatic %>lib/jquery/tooltip/jquery.tooltip.min.js',
          '<%= sfRichUIStatic %>lib/jquery/hashchange/jquery.ba-hashchange.min.js',
          '<%= sfRichUIStatic %>lib/jquery/validate/jquery.validate.min-1.9.0.js',
          '<%= sfRichUIStatic %>lib/jquery/zoom/jquery.jqzoom.dw.js',
          '<%= commonStatic %>lib/jquery/mask.js',
          '<%= commonStatic %>lib/jquery/jquery.creditCardValidator.js'
        ]
      },
      { // CF pages
        expand: true,
        ext: '.min.js',
        src: [ 
          '<%= clftrStatic %>js/pages/*.js', 
          '!<%= clftrStatic %>js/pages/*.min.js' 
        ],
      }
    ]
  },
  mags: {
    files: [
      { // Mags main
        dest:'<%= magsStatic %>js/main.min.js',
        src: [
          '<%= sfRichUIStatic %>js/app.js',
          '<%= magsStatic %>js/mags_app.js',
          '<%= magsStatic %>js/responsive.js',
          '<%= magsStatic %>js/api.js'
        ]
      },
      { // Mags plugins
        dest: '<%= magsStatic %>js/plugins.min.js',
        src: [
          '<%= sfRichUIStatic %>lib/jquery/jcarousel/jquery.jcarousel.min.js',
          '<%= sfRichUIStatic %>lib/jquery/tooltip/jquery.tooltip.min.js',
          '<%= sfRichUIStatic %>lib/jquery/hashchange/jquery.ba-hashchange.min.js',
          '<%= sfRichUIStatic %>lib/jquery/validate/jquery.validate.min-1.9.0.js',
          '<%= sfRichUIStatic %>lib/jquery/zoom/jquery.jqzoom.dw.js',
          '<%= magsStatic %>lib/jquery/mask.js',
          '<%= magsStatic %>lib/jquery/jquery.creditCardValidator.js'
        ]
      },
      { // Mags pages
        expand: true,
        ext: '.min.js',
        src: [ 
          '<%= magsStatic %>js/pages/*.js', 
          '!<%= magsStatic %>js/pages/*.min.js' 
        ],
      },
      { // Mags analytics
        dest: '<%= magsStatic %>js/analytics/omniture/s_code.min.js',
        src: [ 
          '<%= magsStatic %>js/analytics/omniture/s_code.js' 
        ]
      }
    ]
  },
  options: {
    report: 'min',
    banner: '/* <%= pkg.name %> | <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  }
};
