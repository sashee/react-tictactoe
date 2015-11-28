module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			dist: ["dist"]
		},
		copy: {
			dist: {
				files: [
					{ expand: true, cwd: 'src/', src: ['**','!**/*.jsx'], dest: "dist"}
				]
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ["es2015", "react"]
			},
			dist: {
				files: [
					{ expand: true, src: ['**/*.jsx','**/*.js'], cwd: 'src', dest: "dist", ext: '.js'}
				]
			}
		},
		watch: {
			options: {
				livereload: true
			},
			jsx: {
				files: ['src/**/*.jsx'],
				tasks: ['babel:dist'],
				options: {
					spawn: false
				}
			},
			other: {
				files: ['src/**/*.*', '!**/*.jsx'],
				tasks: ['copy:dist'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('dev', ['default','watch']);
	grunt.registerTask('default', ['clean:dist', 'copy:dist', 'babel:dist']);
};
