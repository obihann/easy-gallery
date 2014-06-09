module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'jquery.easygallery.min.js': ['jquery.easygallery.js'],
          'easygallery.min.css': ['easygallery.css']
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
      files: ['easygallery.css', 'jquery.easygallery.js'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'uglify']);

};
