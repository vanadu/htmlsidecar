// Gulp.js configuration
// Commenting out everything except dev operations
var
// modules
gulp = require('gulp'),
  // plugins = require('gulp-load-plugins'),
  // newer = require('gulp-newer'),
  // newer = require('gulp-newer'),
  // imagemin = require('gulp-imagemin'),
  // htmlclean = require('gulp-htmlclean'),
  // concat = require('gulp-concat'),
  // deporder = require('gulp-deporder'),
  // stripdebug = require('gulp-strip-debug'),
  // uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  // postcss = require('gulp-postcss'),
  // assets = require('postcss-assets'),
  // autoprefixer = require('autoprefixer'),
  // mqpacker = require('css-mqpacker'),
  // cssnano = require('cssnano'),
  sourcemaps = require('gulp-sourcemaps');
  browserSync = require('browser-sync').create();

// development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

// folders
folder = {
  src: 'src/',
  build: 'build/'
};
// image processing - newer/imagenim
gulp.task('images', function() {
  var out = folder.build + 'img/';
  return gulp.src(folder.src + 'img/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});
// HTML processing - htmlclean
gulp.task('html', ['images'], function() {
  var
    //out = folder.build + 'html/', :VA
    out = folder.build + '/',
    // page = gulp.src(folder.src + 'html/**/*') :VA
    page = gulp.src(folder.src + '/**/*')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});
// JavaScript processing - deporder, concat, strip-debug, uglify
gulp.task('js', function() {
  
  var jsbuild = gulp.src(folder.src + 'js/**/*')
    .pipe(deporder())
    // Changed :VA
    .pipe(concat('scripts.js'));

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }
  
  return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
  
});
// CSS processing -- sass, postcss, postcss-assets, autoprefixer, cssmqpacker, cssnano
gulp.task('css', ['images'], function() {
  
  var postCssOpts = [
    assets({ loadPaths: ['img/'] }),
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'scss/style.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'img/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build + 'css/'));

});
// run all tasks
// gulp.task('run', ['html', 'css', 'js']);
// watch for changes -- only applies to production operations, so add
// to task list when prepping for production
gulp.task('watch', function() {
  
  // image changes -- commented out for dev :VA
  // gulp.watch(folder.src + 'img/**/*', ['images']);

  // html changes -- commented out for dev :VA
  // gulp.watch(folder.src + '/**/*', ['html']);

  // javascript changes - commented out for dev :VA
  // gulp.watch(folder.src + 'js/**/*', ['js']);

  // css changes -- not necessary because this is in the browser-sync routine now :VA
  // gulp.watch(folder.src + 'scss/**/*', ['css']);
  
});

// There are old sourcemap scripts I couldn't get to work when I was
// originally just trying to get something to work -- revisit later

// From https://blog.yipl.com.np/using-gulp-browser-sync-and-source-maps-ef14e0903982
/*
 * Compile files from _scss
 */
// gulp.task('sass', function () {
//   return gulp.src('scss/main.scss')
//       .pipe(sourcemaps.init())
//           .pipe(sass({
//               includePaths: ['css'],
//               onError: browserSync.notify
//           }))
//           .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//           .pipe(gulp.dest('css'))
//           .pipe(browserSync.reload({stream:true}))
//       .pipe(sourcemaps.write('../maps'))
//       .pipe(gulp.dest('css'));
// });

// From https://gist.github.com/marceloogeda/5a449caa50462ab2667540a93d34009f
// gulp.task('styles', () => {
//   return gulp.src('scss/**/*.scss')
//       .pipe(plugins().sourcemaps.init())
//       .pipe(plugins().sass().on('error', plugins().sass.logError))
//       .pipe(plugins().sourcemaps.write('../maps'))
//       .pipe(gulp.dest('css'))
//       .pipe(browserSync.stream());
// });

// Don't know where this is from but works for me now
gulp.task('map', function() {
  gulp.src('src/scss/style.scss')
  // .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', function (err) {
      console.log(err.toString());

      this.emit('end');
    })
    // .pipe(sourcemaps.write('.'))
    // had a hell of a time figuring out the pattern for writing files
    .pipe(gulp.dest('src/css'));
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  
  browserSync.init({
    server: "./src",
    port: 3300,
    // Port for the browser-sync UI
    ui: {
      port: 3301
    }
    // Tried to use reload delay but the main img still doesn't load 
    // reloadDelay: 3000
    // Might need this... :VA
    // server: {
    //   baseDir: "public" // Change this to your web root dir
    // }
  });
  
        
  // gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("src/scss/**/*.scss", ['sass']);

  //enclose multiple file parameters in brackets -- works :VA
  gulp.watch(['src/*.html', 'src/js/*.js']).on('change', browserSync.reload);
  // gulp.watch("").on('change', browserSync.reload); don't need anymore, see above :VA
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    // Prevent gulp from abort on error every time a property is replaced with a variable
    // hence preventing an 'undeclared variable' error. Not the most elegant of solutions
    // because it writes an ugly error to the console ever time but it works for now. :VA
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});
  
// default task
// gulp.task('default', ['run', 'maps', 'watch', 'serve']);
// gulp.task('default', ['map', 'serve']);
gulp.task('default', ['serve']);
  
  

