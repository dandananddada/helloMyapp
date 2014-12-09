/*global module:false*/
module.exports = function(grunt) {

    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,
        //sass->css编译插件
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles/sass',
                    src: ['*.scss'],
                    dest: 'app/styles/',
                    ext: '.css'
                }]
            }
        },
        //清除build后生成的文件（清空dist目录）
        clean: {
            dist: {
                files: [{
                      dot: true,
                      src: [
                          '.tmp',
                          '<%= config.dist %>/*',
                          '!<%= config.dist %>/.git*'
                      ]
                }]
            },
        },
        //合并js和css文件
        concat: {
            js: { 
                src: ['<%= config.app %>/js/**/*.js'],
                // 注释可以选择不生成目录
                dest: '<%= config.dist %>/combine/<%= pkg.name %>.js'
            },
            css: {
                src: ['<%= config.app %>/styles/**/*.css'],
                dest: '<%= config.dist %>/combine/<%= pkg.name %>.css'   
            }
        },
        // 压缩css文件
        cssmin: {
            // 保持目录结构压缩
            compress: {
                files: [{
                      expand: true,
                      cwd: '<%= config.app %>/styles/',
                      src: ['*.css', '!*.min.css'],
                      dest: '<%= config.dist %>/release/css/',
                      ext: '.min.css'
                    }]
            },
            // 合并为一个文件后压缩
            build: {
                files: [{
                      expand: true,
                      cwd: '<%= config.dist %>/combine/',
                      src: ['*.css', '!*.min.css'],
                      dest: '<%= config.dist %>/release',
                      ext: '.min.css'
                    }]
            }
        },
        // 压缩js文件
        uglify: {
            options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            // 保持目录结构压缩
            compress: { 
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min"
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/js', 
                    src: '**/*.js', 
                    dest: '<%= config.dist %>/release/js', 
                    ext: '.min.js' 
                }]
            },
            // 合并为一个文件后压缩
            build: { 
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min"
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/combine', 
                    src: '**/*.js', 
                    dest: '<%= config.dist %>/release', 
                    ext: '.min.js' 
                }]
            }
        },
        // 配置ctrl+s触发任务
        watch: {
            compile: {
                files: ['<%= config.app %>/styles/sass/**/*.scss'],
                tasks: ['sass'],
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*'
                ]
            }
        },
        // 将当前站点作为服务器启动
        connect: {
            options: {
                port: 9001,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static(config.app)
                        ];
                    }
                }
            }
        },
        // 启动单元测试服务器karma
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        //启动集成测试服务器webdriver
        protractor_webdriver: {
            integrate: {
                options: {
                    path: '/path/to/',
                    command: 'custom-webdriver-manager start',
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-webdriver');


    // 将sass文件编译为css文件
    grunt.registerTask('compile', ['sass']);
    // 清理dist目录
    // grunt clean,grunt-contrib-clean内置任务
    // 分别合并js和css文件为一个文件
    grunt.registerTask('combine',['compile','concat:css','concat:js']);
    // 保持原目录结构压缩css文件和js文件
    grunt.registerTask('compress',['compile','cssmin:compress','uglify:compress']);
    // 部署js文件和css文件（分别将js和css文件合并压缩为一个文件）
    grunt.registerTask('build',['clean:dist','compile','combine','cssmin:build','uglify:build']);
    //将当前站点作为服务启动
    grunt.registerTask('server', ['connect:livereload','watch','watch:compile']);
    // 启动js单元测试服务
    grunt.registerTask('unit', ['karma']);
    //启动e2e集成测试服务
    grunt.registerTask('integrate', ['protractor_webdriver']);
    
    // 设置grunt默认任务为server
    grunt.registerTask('default', ['server']);
};
