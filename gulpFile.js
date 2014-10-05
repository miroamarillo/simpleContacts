var gulp 	= require('gulp'),
	sync 	= require('browser-sync');

//Static Server
gulp.task('browser-sync', function(){
	sync({
		server: {
			baseDir: "./"
		}
	});
});
gulp.task('fileChanges', function(){
		return gulp.src(['js/*js', 'css/*css','*html','views/*html']);
	});
gulp.task('default', ['browser-sync'], function(){
		gulp.watch(['js/*js','css/*css','*html', 'views/*html'], ['fileChanges', sync.reload]);
	});