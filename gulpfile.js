let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let jsImport = require('gulp-js-import');
let pump = require('pump');
let uglifycss = require('gulp-uglifycss');


// copy all files to 'dest' folder

gulp.task('copyPlugins', function () {
    gulp.src('./src/assets/plugins/**')
        .pipe(gulp.dest('./dist/plugins/**/'));
});
gulp.task('copy-index', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-about', function () {
    gulp.src('./src/about/*.html')
        .pipe(gulp.dest('./dist/about'))
});
gulp.task('copy-contact', function () {
    gulp.src('./src/contact/*.html')
        .pipe(gulp.dest('./dist/contact'))
});
gulp.task('copy-works', function () {
    gulp.src('./src/works/**/*.html')
        .pipe(gulp.dest('./dist/works'))
});


// optimise images
gulp.task('imagesMin', function () {
    gulp.src('./src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/images'))
});

//compile css to sass
gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css/'));
});

//css minify
gulp.task('mincss', function () {
    gulp.src('./src/assets/css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/assets/css'));
});

//js compression
gulp.task('compress', function (cb) {
    pump([
            gulp.src('.src/js/**/.js'),
            uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );
});


gulp.task('scripts', function () {
    return gulp.src('./src/js/*js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))

});

gulp.task('import', function () {
    return gulp.src('index.js')
        .pipe(jsImport({hideConsole: true}))
        .pipe(gulp.dest('dist'));
});

// watch files
gulp.task('default', ['watch']);

gulp.task('watch', function () {
    gulp.watch('./src/assets/scss/**/*.scss', ['sass']);
    gulp.watch('./src/assets/images/**/*', ['imagesMin']);
    gulp.watch('./src/works/**/*.html', ['copy-works']);
    gulp.watch('./src/about/*.html', ['copy-about']);
    gulp.watch('./src/contact/*.html', ['copy-contact']);
});

gulp.task('default', ['sass','mincss', 'scripts', 'compress']);