module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      options: {
        files: {
          "style.css": "style.less"
        }
      }
    },
    watch: {
      files: ['*.less'],
      task: ['less']
    }
  })

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
}
