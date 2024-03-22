'use strict';

var sass = require('node-sass');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-sw-precache');

  require('time-grunt')(grunt);

  grunt.initConfig({

    folders: {
      src: ['src'],
      dev: ['dev'],
      build: ['build'],
      node: ['node_modules']
    },

    copy: {
      dev: {
        cwd: '<%= folders.src %>/',
        src: ['{images,fonts,js,db}/**/*',
              'manifest.json'],
        dest: '<%= folders.dev %>/',
        expand: true
      },
      build: {
        cwd: '<%= folders.src %>/',
        src: ['{images,fonts,js,db}/**/*',
              'manifest.json'],
        dest: '<%= folders.build %>/',
        expand: true
      },
      webapp: {
        expand: true,
        src: ['manifest.json'],
        dest: '<%= folders.build %>/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: '<%= folders.dev %>/*',
      build: '<%= folders.build %>/*',
      tmp: '.tmp/*',
      sass: '.sass-cache/*',
      all: [
        '<%= folders.dev %>/*',
        '<%= folders.build %>/*',
        '.tmp/*',
        '.sass-cache/*'
      ]
    },

    useminPrepare: {
      html: '<%= folders.build %>/**/*.html',
      options: {
        dest: '<%= folders.build %>/'
      }
    },

    concat: {
      build: {
        src: [
          '<%= folders.node %>/smooth-scroll/dist/smooth-scroll.min.js',
          '<%= folders.build %>/js/strict.js',
          '<%= folders.build %>/js/helper.js',
          '<%= folders.build %>/js/auto-suggest.js',
          '<%= folders.build %>/js/card.js',
          '<%= folders.build %>/js/characters/blank.js',
          '<%= folders.build %>/js/characters/izlara.js',
          '<%= folders.build %>/js/characters/ravich.js',
          '<%= folders.build %>/js/characters/marika.js',
          '<%= folders.build %>/js/characters/nefi.js',
          '<%= folders.build %>/js/characters/nif.js',
          '<%= folders.build %>/js/characters/orrin.js',
          '<%= folders.build %>/js/characters/ro.js',
          '<%= folders.build %>/js/characters/vos.js',
          '<%= folders.build %>/js/hard-coded-characters.js',
          '<%= folders.build %>/js/armor-shield.js',
          '<%= folders.build %>/js/character-image.js',
          '<%= folders.build %>/js/character-select.js',
          '<%= folders.build %>/js/check-block.js',
          '<%= folders.build %>/js/check-url.js',
          '<%= folders.build %>/js/classes.js',
          '<%= folders.build %>/js/clone.js',
          '<%= folders.build %>/js/demo.js',
          '<%= folders.build %>/js/data.js',
          '<%= folders.build %>/js/display.js',
          '<%= folders.build %>/js/encumbrance.js',
          '<%= folders.build %>/js/events.js',
          '<%= folders.build %>/js/exp.js',
          '<%= folders.build %>/js/feats-data.js',
          '<%= folders.build %>/js/fireball.js',
          '<%= folders.build %>/js/fullscreen.js',
          '<%= folders.build %>/js/header.js',
          '<%= folders.build %>/js/input-block.js',
          '<%= folders.build %>/js/input-range-block.js',
          '<%= folders.build %>/js/log.js',
          '<%= folders.build %>/js/menu.js',
          '<%= folders.build %>/js/modal.js',
          '<%= folders.build %>/js/minimise.js',
          '<%= folders.build %>/js/nav.js',
          '<%= folders.build %>/js/night.js',
          '<%= folders.build %>/js/onboarding.js',
          '<%= folders.build %>/js/page.js',
          '<%= folders.build %>/js/pill.js',
          '<%= folders.build %>/js/prompt.js',
          '<%= folders.build %>/js/radio-block.js',
          '<%= folders.build %>/js/register-service-worker.js',
          '<%= folders.build %>/js/repair.js',
          '<%= folders.build %>/js/select-block.js',
          '<%= folders.build %>/js/sheet.js',
          '<%= folders.build %>/js/shade.js',
          '<%= folders.build %>/js/size.js',
          '<%= folders.build %>/js/skills.js',
          '<%= folders.build %>/js/snack.js',
          '<%= folders.build %>/js/spells.js',
          '<%= folders.build %>/js/stats.js',
          '<%= folders.build %>/js/tabs.js',
          '<%= folders.build %>/js/text-block.js',
          '<%= folders.build %>/js/textarea-block.js',
          '<%= folders.build %>/js/theme-color.js',
          '<%= folders.build %>/js/tip.js',
          '<%= folders.build %>/js/total-block.js',
          '<%= folders.build %>/js/update.js',
          '<%= folders.build %>/js/wealth.js',
          '<%= folders.build %>/js/vendor-options.js',
          '<%= folders.build %>/js/updateCharacterDescription.js',
          '<%= folders.build %>/js/init.js' // invoke calls
        ],
        dest: '<%= folders.build %>/js/awesomeSheet.js'
      },
      dev: {
        src: [
          '<%= folders.node %>/smooth-scroll/dist/smooth-scroll.min.js'
        ],
        dest: '<%= folders.dev %>/js/vendor.min.js'
      },
    },

    uglify: {
      build: {
        src: '<%= folders.build %>/js/awesomeSheet.js',
        dest: '<%= folders.build %>/js/awesomeSheet.min.js'
      }
    },

    usemin: {
      html: '<%= folders.build %>/**/*.html'
    },

    sass: {
      dev: {
        options: {
          implementation: sass,
          style: 'compact',
          compass: false
        },
        files: [{
          '<%= folders.dev %>/css/vendor.css': '<%= folders.src %>/sass/vendor.scss'
        }, {
          '<%= folders.dev %>/css/awesomeSheet.css': '<%= folders.src %>/sass/awesomeSheet.scss'
        }]
      },
      build: {
        options: {
          implementation: sass,
          style: 'compact',
          compass: false
        },
        files: [{
          '<%= folders.build %>/css/vendor.css': '<%= folders.src %>/sass/vendor.scss'
        }, {
          '<%= folders.build %>/css/awesomeSheet.css': '<%= folders.src %>/sass/awesomeSheet.scss'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 6 versions']
      },
      dev: {
        files: {
          '<%= folders.dev %>/css/awesomeSheet.css': '<%= folders.dev %>/css/awesomeSheet.css'
        }
      },
      build: {
        files: {
          '<%= folders.build %>/css/awesomeSheet.css': '<%= folders.build %>/css/awesomeSheet.css'
        }
      }
    },

    cssmin: {
      build: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '<%= folders.build %>/',
          src: ['css/**/*.css'],
          dest: '<%= folders.build %>/',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      sass: {
        files: ['<%= folders.src %>/sass/**/*.{scss,sass}'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      },
      hbs: {
        files: ['<%= folders.src %>/hbs/**/*.hbs'],
        tasks: ['assemble:dev'],
        options: {
          livereload: true
        }
      },
      assets: {
        files: ['<%= folders.src %>/{images,fonts,js,db}/**/*', '<%= folders.src %>/manifest.json'],
        tasks: ['copy:dev'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      dev: {
        options: {
          port: 9000,
          base: '<%= folders.dev %>',
          hostname: '0.0.0.0',
          livereload: 35729,
          open: {
            target: 'http://0.0.0.0:9000'
          }
        }
      },
      build: {
        options: {
          port: 9001,
          base: '<%= folders.build %>',
          hostname: 'localhost',
          livereload: 35729,
          open: {
            target: 'http://localhost:9001'
          }
        }
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= folders.build %>/index.html': '<%= folders.build %>/index.html'
        }
      }
    },

    assemble: {
      options: {
        flatten: false,
        layout: '<%= folders.src %>/hbs/layouts/default.hbs',
        layoutdir: '<%= folders.src %>/hbs/layouts',
        partials: '<%= folders.src %>/hbs/partials/**/*.hbs'
      },
      dev: {
        options: {
          // layout: 'default.hbs'
          layout: false
        },
        files: [{
          expand: true,
          cwd: '<%= folders.src %>/hbs/pages/',
          src: '**/*.hbs',
          dest: '<%= folders.dev %>/'
        }]
      },
      build: {
        options: {
          // layout: 'default.hbs'
          layout: false
        },
        files: [{
          expand: true,
          cwd: '<%= folders.src %>/hbs/pages/',
          src: '**/*.hbs',
          dest: '<%= folders.build %>/'
        }]
      }
    },

    'sw-precache': {
      options: {
        baseDir: '<%= folders.build %>/',
        stripPrefix: 'build/',
        cacheId: 'aS',
        workerFileName: 'service-worker.js',
        verbose: false,
      },
      'default': {
        staticFileGlobs: [
          '**/*.html',
          '**/*.json',
          'db/**/*.csv',
          'css/**/*.css',
          'fonts/**/*.{woff,ttf,svg,eot,woff,woff2}',
          'images/**/*.{gif,png,jpg}',
          'js/**/*.js'
        ],
      }
    }
  });

  grunt.registerTask('dev', [
    'clean:dev',
    'clean:tmp',
    'assemble:dev',
    'copy:dev',
    'concat:dev',
    'sass:dev',
    'autoprefixer:dev',
    'connect:dev',
    'watch'
  ]);

  grunt.registerTask('aslive', [
    'connect:build',
    'watch'
  ]);

  grunt.registerTask('sw', [
    'sw-precache:default'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'clean:tmp',
    'assemble:build',
    'copy:build',
    'copy:webapp',
    'sass:build',
    'autoprefixer:build',
    'cssmin:build',
    'useminPrepare',
    'concat:build',
    'uglify:build',
    'usemin',
    'htmlmin',
    'sw-precache:default'
  ]);

  grunt.registerTask('beta', [
    'clean:build',
    'clean:tmp',
    'assemble:build',
    'copy:build',
    'copy:webapp',
    'concat:dev',
    'sass:build',
    'autoprefixer:build',
    'sw-precache:default'
  ]);

};
