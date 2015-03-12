var gulp = require('gulp');
var less = require('gulp-less');
var html5lint = require('gulp-html5-lint');
var recess = require('gulp-recess');
var uglify = require('gulp-uglify');
var jslint = require('gulp-jslint');
var sourcemaps = require('gulp-sourcemaps');

var browserify = require('browserify');
var transform = require('vinyl-transform');

var LessPluginCleanCss = require('less-plugin-clean-css');
var autoprefixer = require('gulp-autoprefixer');


var cleancss = new LessPluginCleanCss();


/*var getBundleName = function(){
	return 'sandbox'
};*/

gulp.task('default', ['less', 'htmllint', 'jslint', 'scripts'], function(){});

gulp.task('less', function(){
	var lessOptions = {
        // autoprefix as a less plugin breaks source mapping!
		plugins: [/*autoprefix,*/ cleancss]
	};
	return gulp.src('less/*.less')
		.pipe(recess())
		.pipe(recess.reporter({fail: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer())
		.pipe(less(lessOptions))
        .pipe(sourcemaps.write('../../dist/maps'))
		.pipe(gulp.dest('dist/css'));

});

gulp.task('htmllint', function(){
	return gulp.src('*.html').pipe(html5lint());
});

gulp.task('jslint', function(){
	return gulp.src('js/*.js')
		.pipe(jslint({
            vars: true,
            sloppy: true,
            unparam: true,
            todo: true,
            predef: ['angular', 'require', 'console', 'module']
        }));

});

gulp.task('scripts', function(){

	// node stream -> vinyl
	var browserified = transform(function(filename){
		return browserify(filename).bundle();
	});

	return gulp.src('js/app.js')
		.pipe(browserified)
        .pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
        .pipe(sourcemaps.write('../../dist/maps'))
		.pipe(gulp.dest('dist/js'));

});

