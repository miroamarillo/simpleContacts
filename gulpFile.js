var gulp 		= require('gulp'),
	sync 		= require('browser-sync'),
	minifyCss	= require('gulp-minify-css'),
	uglify		= require('gulp-uglify'),
	concat 		= require('gulp-concat'),
	rename 		= require('gulp-rename');
	jshint 		= require('gulp-jshint');

//Static Server
gulp.task('browser-sync', function(){
	sync({
		server: {
			baseDir: "./"
		}
	});
});
gulp.task('css', function(){
	// gulp.src('./css/*.css')
	// 	.pipe(minifyCss())
	// 	.pipe(gulp.dest('css'));
	return gulp.src(['*.css','css/*.css']);
});
gulp.task('js', function(){
	// gulp.src('/js/contacts.js')
	// 	.pipe(uglify())
	// 	.pipe(gulp.dest('js'));
	return gulp.src(['*.js','js/*.js']);
});
//Js Linting
gulp.task('jsLint', function () {
    gulp.src('./js/contacts.js') // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results
});
gulp.task('html', function(){
		return gulp.src(['*.html','views/*.html']);
	});
gulp.task('default', ['browser-sync'], function(){
		gulp.watch(['js/*.js','css/*.css','*.html', 'views/*.html'], ['css', 'js', 'jsLint', sync.reload]);
		//console.log('Event type: ' + event.type);
	});