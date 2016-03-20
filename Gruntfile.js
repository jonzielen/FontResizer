module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      regularJS: {
        options: {
          compress: true,
          mangle: true
        },
        files: {
          'js/main.min.js':'js/main.src.js'
        }
      },
    },
    watch: {
      scripts: {
        files: ['js/main.src.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify']);

};
