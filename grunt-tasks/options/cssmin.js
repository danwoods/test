// cssmin config
module.exports = {
  smt: {
    files: [
      { // Smt main
        dest: '<%= smtStatic %>css/smt.min.css',
        src: [
         '<%= smtStatic %>css/smt.css' 
        ]
      }
    ] 
  },
  common: {
    files: [
      { // Common all
        dest:'<%= commonStatic %>css/all.min.css',
        src: [
          '<%= commonStatic %>css/style.css', 
          '<%= commonStatic %>css/common.css' 
        ]
      },
      { // Common jQuery UI
        dest:'<%= commonStatic %>lib/jquery/css/themes/base/ui.all.css',
        src: [
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.core.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.resizable.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.dialog.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.tabs.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.theme.min.css'
        ]
      },
      { // Common print
        dest:'<%= commonStatic %>css/print.css',
        src: [
          '<%= sfCoreStatic %>css/normalize.css',
          '<%= sfCoreStatic %>css/style.css'
        ]
      },
      { // Common responsive
        dest:'<%= commonStatic %>css/responsive.min.css',
        src: [
          '<%= commonStatic %>css/common_responsive.css',
          '<%= commonStatic %>css/style-responsive.css'
        ]
      }
    ]
  },
  cleanerfilters: {
    files: [
      { // CF all
        dest:'<%= clftrStatic %>css/all.min.css',
        src: [
          '<%= sfCoreStatic %>css/style.css', 
          '<%= commonStatic %>css/common.css', 
          '<%= clftrStatic %>css/main.css' 
        ]
      },
      { // CF jQuery UI
        dest:'<%= clftrStatic %>lib/jquery/css/themes/base/ui.all.css',
        src: [
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.core.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.resizable.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.dialog.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.tabs.min.css',
          '<%= commonStatic %>lib/jquery/css/themes/base/ui.theme.min.css'
        ]
      },
      { // CF print
        dest:'<%= clftrStatic %>css/print.css',
        src: [
          '<%= sfCoreStatic %>css/normalize.css',
          '<%= sfCoreStatic %>css/style.css'
        ]
      }
    ]
  },
  mags: {
    files: [
      { // mags main
        dest:'<%= magsStatic %>css/main.min.css',
        src: [
          '<%= sfCoreStatic %>css/normalize.css', 
          '<%= sfCoreStatic %>css/style.css', 
          '<%= magsStatic %>css/mags_style.css', 
          '<%= magsStatic %>css/sections/standard/home-slider.css', 
          '<%= magsStatic %>css/sections/standard/category-4x1.css' 
        ]
      },
      { // mags jQuery UI
        dest:'<%= magsStatic %>lib/jquery/css/themes/base/ui.all.css',
        src: [
          '<%= magsStatic %>lib/jquery/css/themes/base/ui.core.min.css',
          '<%= magsStatic %>lib/jquery/css/themes/base/ui.resizable.min.css',
          '<%= magsStatic %>lib/jquery/css/themes/base/ui.dialog.min.css',
          '<%= magsStatic %>lib/jquery/css/themes/base/ui.tabs.min.css',
          '<%= magsStatic %>lib/jquery/css/themes/base/ui.theme.min.css'
        ]
      },
      { // mags print
        dest:'<%= magsStatic %>css/print.css',
        src: [
          '<%= sfCoreStatic %>css/normalize.css',
          '<%= sfCoreStatic %>css/style.css'
        ]
      },
      { // mags responsive
        dest: '<%= magsStatic %>css/responsive.min.css',
        src: [
          '<%= magsStatic %>css/style-responsive.css',
          '<%= magsStatic %>css/mags_responsive.css',
          '<%= magsStatic %>css/sections/responsive/home-slider.css' 
        ]
      }
    ]
  }
};
