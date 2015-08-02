var gulp = require('gulp')
var replace = require('gulp-replace')
var ngAnnotate = require('gulp-ng-annotate')
var htmlmin = require('gulp-htmlmin')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var cssmin = require('gulp-cssmin')
var autoprefixer = require('gulp-autoprefixer')
var fs = require('fs')
var runsequence = require('run-sequence')
var del = require('del')

gulp.task('build', function (cb) {
	runsequence('backup', 'clean', 'build-js', 'build-html', 'build-sass', cb)
})

gulp.task('build-js', function () {
	return gulp.src('src/**.js')
		.pipe(replace("/*the place to place the generated angular templateCache*/", function () {
			return fs.readFileSync('.tmp/borderLayout.tpl.html', 'utf8').toString().replace(/'/gm, '\\\'').replace(/"/gm, '\\"')
		}))
		.pipe(ngAnnotate())
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'))
})

gulp.task('build-html', function () {
	return gulp.src('src/**.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			conservativeCollapse: true
		}))
		.pipe(gulp.dest('.tmp/'))
})

gulp.task('build-sass', function () {
	return gulp.src('src/**.scss')
		.pipe(gulp.dest('dist'))
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer('last 5 version', '> 1%', 'ie 9'))
		.pipe(gulp.dest('dist'))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'))
})

gulp.task('backup', function () {
	return gulp.src('dist/**')
		.pipe(gulp.dest('backup/dist-' + Date.now()))
})

gulp.task('clean', function (cb) {
	del.sync('dist')
	cb()
})