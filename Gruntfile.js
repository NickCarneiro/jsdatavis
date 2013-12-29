'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint', 'copy', 'includes'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ],
                tasks: ['clean', 'copy', 'includes']
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        'dist/'
                    ],
                    files: [
                        '<%= yeoman.app %>/{,*/}*.html',
                        '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                    ],
                    interrupt: true
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>',
                    livereload: false
                }
            },
            server: {
                options: {
                    port: 9001,
                    base: '<%= yeoman.app %>/dist',
                    keepalive: true
                }
            }

        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded',
                    loadPath: '<%= yeoman.app %>/bower_components/',
                    noCache: true
                },
                files: {                         // Dictionary of files
                    'dist/styles/main.css': '<%= yeoman.app %>/styles/main.scss',       // 'destination': 'source'
                    '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.scss'       // 'destination': 'source'
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['**'], dest: 'dist/', cwd: '<%= yeoman.app %>/'}
                ]
            }
        },
        clean: ['dist/'],
        concurrent: {
            watch: {
                tasks: ['watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        includes: {
            files: {
                src: ['*.html'],
                dest: 'dist/', // Destination directory
                flatten: true,
                cwd: 'app'
            },
            debug: 'true'
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-includes');

    grunt.registerTask('default', ['clean', 'sass', 'copy', 'includes']);
    grunt.registerTask('serve', function () {

        grunt.task.run([
            'clean',
            'sass',
            'copy',
            'includes',
            'connect:livereload',
            'concurrent:watch',
            'connect:server'
        ]);
    });

};
