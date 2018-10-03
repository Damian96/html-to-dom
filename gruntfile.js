/*global module:false*/
module.exports = function (grunt) {

    const path = require('path');
    const sass = require('node-sass');

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        datetime: Date.now(),

        paths: {
            build: './docs',
            src: './src',
            modules: './node_modules',
            vendor: './vendor'
        },

        clean: [
            '<%= paths.build %>/*'
        ],

        jshint: {
            options: {
                force: true,
                undef: true,
                unused: true,
                devel: true,
                esversion: 6,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    chrome: true,
                    console: true
                }
            },
            main: {
                src: ['<%= paths.src %>/js/main.js']
            },
            htmltodom: {
                src: ['<%= paths.src %>/js/htmltodom.js']
            },
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            main: {
                src: '<%= paths.build %>/css/main.css',
                dest: '<%= paths.build %>/css/main.css'
            },
            hightlight: {
                src: '<%= paths.build %>/css/highlight.css',
                dest: '<%= paths.build %>/css/highlight.min.css'
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    // require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                ]
            },
            main: {
                src: '<%= paths.build %>/css/main.css',
                dest: '<%= paths.build %>/css/main.css'
            }
        },

        sass: {
            options: {
                implementation: sass,
                style: 'compressed',
                sourceMap: true
            },
            build: {
                src: '<%= paths.src %>/sass/main.scss',
                dest: '<%= paths.build %>/css/main.css'
            },
            src_sass: {
                src: '<%= paths.src %>/sass/main.scss',
                dest: '<%= paths.src %>/css/main.css'
            }
        },

        copy: {
            bootstrapjs: {
                src: '<%= paths.modules %>/bootstrap/dist/js/bootstrap.min.js',
                dest: '<%= paths.build %>/js/bootstrap.min.js'
            },
            jquery: {
                src: '<%= paths.modules %>/jquery/dist/jquery.min.js',
                dest: '<%= paths.build %>/js/jquery.min.js'
            },
            clipboard: {
                src: '<%= paths.modules %>/clipboard/dist/clipboard.min.js',
                dest: '<%= paths.build %>/js/clipboard.min.js'
            },
            highlightjs: {
                src: '<%= paths.vendor %>/highlight/highlight.pack.js',
                dest: '<%= paths.build %>/js/highlight.min.js'
            },
            highlightcss: {
                src: '<%= paths.vendor %>/highlight/styles/default.css',
                dest: '<%= paths.build %>/css/highlight.css'
            },
            bootstrapcss: {
                src: '<%= paths.modules %>/bootstrap/dist/css/bootstrap.min.css',
                dest: '<%= paths.build %>/css/bootstrap.min.css'
            },
            maincss: {
                src: '<%= paths.src %>/css/main.css',
                dest: '<%= paths.build %>/css/main.css'
            },
            fontawesomecss: {
                src: '<%= paths.src %>/css/fontawesome.min.css',
                dest: '<%= paths.build %>/css/fontawesome.min.css'
            },
            primercss: {
                src: '<%= paths.src %>/css/primer.min.css',
                dest: '<%= paths.build %>/css/primer.min.css'
            },
            webfonts: {
                expand: true,
                cwd: '<%= paths.src %>',
                src: 'css/webfonts/*.*',
                dest: '<%= paths.build %>'
            },
            index: {
                src: '<%= paths.src %>/index.html',
                dest: '<%= paths.build %>/index.html'
            },
        },

        uglify: {
            options: {
                mangle: {
                    toplevel: false
                }
            },
            domparser: {
                src: '<%= paths.src %>/js/dom-parser.js',
                dest: '<%= paths.build %>/js/dom-parser.js'
            },
            htmltodom: {
                src: '<%= paths.src %>/js/htmltodom.js',
                dest: '<%= paths.build %>/js/htmltodom.js'
            },
            main: {
                src: '<%= paths.src %>/js/main.js',
                dest: '<%= paths.build %>/js/main.js'
            },
        },

        watch: {
            options: {
                spawn: false,
                debounceDelay: 750,
                interval: 2000,
                event: ['changed', 'added']
            },
            src_sass: {
                files: ['<%= paths.src %>/sass/*.scss'],
                tasks: ['sass:src_sass'],
            },
            // debug_main: {
            //     files: ['<%= paths.src %>/js/main.js'],
            //     tasks: ['jshint:main'],
            // },
            // debug: {
            //     files: ['<%= paths.src %>/js/htmltodom.js'],
            //     tasks: ['jshint:htmltodom'],
            // }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');

    // Default task.- alias of 'build'
    grunt.registerTask( 'default', [
        'clean', 'sass:build', 'copy', 'cssmin', 'uglify'
    ] );

    // same as 'default'
    grunt.registerTask( 'build', [
        'clean', 'sass:build', 'copy', 'postcss:main', 'cssmin', 'uglify' 
    ] );

    // same as 'watch'
    grunt.registerTask( 'dev', [ 'watch' ] );

    // same as 'jshint'
    grunt.registerTask( 'debug', [ 'jshint' ] );

};