module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		paths: {
			source: 'source',
			build: 'build',
			dist: 'dist'
		},

		livescript: {
			src: {
				files: {
					'<%= paths.build %>/server/index.js': '<%= paths.source %>/server/index.ls',
					'<%= paths.build %>/client/assets/js/index.js': '<%= paths.source %>/client/assets/js/index.ls',
					'<%= paths.build %>/server/test/test.js': '<%= paths.source %>/**/test/**/test-*.ls'
				}
			}
		},

		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: '<%= paths.build %>/server/test/test.js'
			}
		},

		clean: {
			build: [ '<%= paths.build %>/*' ],
			dist: [ '<%= paths.dist %>/*' ]
		},

		copy: {
			build: {
				files: [{
					// Copy over everything to build dir. TODO: omit sources of builds.
					expand: true,
					cwd: '<%= paths.source %>/',
					src: [ '**', '!**/*.ls' ],
					dest: '<%= paths.build %>/'
				}]
			},
			dist: {
				files: [{
					// Dist everything that gets built
					expand: true,
					cwd: '<%= paths.build %>',
					src: [ '**', '!**/test/**' ],
					dest: '<%= paths.dist %>'
				}]
			}
		},

		watch: {
			livescript: {
				files: [
					'<%= paths.source %>/server/**/*.ls',
					'<%= paths.source %>/client/**/*.ls',
				],
				tasks: [ 'livescript', 'test', 'dist' ]
			}
		}
	});

	require( 'load-grunt-tasks' )( grunt );

	grunt.registerTask( 'test', [ 'mochaTest' ]);
	grunt.registerTask( 'build', [ 'clean:build', 'livescript', 'test', 'copy:build' ]);
	grunt.registerTask( 'dist', [ 'clean:dist', 'build', 'copy:dist' ]);
	// grunt.registerTask( 'deployStaging', []); // Create git repo if needed, copy from dist, commit, pull, push.
	grunt.registerTask( 'default', [ 'dist' ]);
};
