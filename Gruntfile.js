module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            combine: {
                files: {
                    'easygallery.min.css': ['easygallery.css'],
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'jquery.easygallery.min.js': ['jquery.easygallery.js'],
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'jquery.easygallery.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['jquery.easygallery.js'],
            tasks: ['jshint', 'uglify', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

};
