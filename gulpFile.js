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
gulp.task('js', function(){
		return gulp.src('js/*js');
	});
gulp.task('css', function(){
		return gulp.src('css/*css');
	});
gulp.task('default', ['browser-sync'], function(){
		gulp.watch("js/*js", "css/*css", ['js','css', sync.reload]);
	});