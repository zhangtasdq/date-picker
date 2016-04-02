/* global module */

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            options: {
                jshintrc: true,
                reporter: require("jshint-stylish")
            },

            check: {
                files: {
                    src: ["src/**/*.js"]
                }
            }
        },

        concat: {
            dist: {
                src: ["src/date_picker.js", "src/date_picker_zh.js"],
                dest: "dist/js/date_picker.js",
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
                }
            }
        },

        uglify: {
            compress: {
                options: {
                    sourceMap: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    "dist/js/date_picker.min.js" : ["dist/js/date_picker.js"]
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    "dist/css/date-picker.min.css" : ["css/date-picker.css"]
                }
            }
        },

        copy: {
            main: {
                src: "css/date-picker.css",
                dest: "dist/css/date-picker.css"
            }
        },

        mocha: {

            test: {
                options: {
                    run: true,
                    log: true,
                    logErrors: true,
                    reporter: "Nyan",
                },
                src: ["test/**/*.html"]
            }
        },

        watch: {
            develop: {
                files: "src/*.js",
                tasks: ["compile"],
                options: {
                    debounceDelay: 200
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-mocha");

    grunt.registerTask("test", ["mocha:test"]);
    grunt.registerTask("compile", ["jshint:check", "mocha:test", "concat:dist",
                                   "uglify:compress", "cssmin", "copy"]);
    grunt.registerTask("default", ["compile"]);
    grunt.registerTask("develop", ["watch:develop"]);
};
