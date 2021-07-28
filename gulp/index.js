"use strict";

const gulp = require("gulp");
const sassLint = require("gulp-sass-lint");
const requireDir = require("require-dir");

requireDir("./tasks", { recurse: true });

/**
 * Generate static website
 */
gulp.task("generate", gulp.series(
  "clean",
  "styles",
  "templates",
  "scripts",
  "images"
));

/**
 * Launch local development server
 */
gulp.task("launch", gulp.series("serve", "watch"));

/**
 * Default task
 */
gulp.task("default", gulp.series("generate", "launch"));

/**
 * Publish to root docs folder and dist folder
 */
gulp.task("publish", gulp.series("generate", "release"));

/**
 * Lint the SASS files
 */
gulp.task("sass:lint", function sassLintTask() {
  let lintPaths = [
    "src/patterns/flexboxgrid/*.scss"
  ];
  return gulp.src(lintPaths, { base: "./" })
    // gulp-sass-lint's "configFile" option doesn't always work properly when
    // .sass-lint.yml is not in the same directory as .gulpfile, so it's safer
    // to use the "options" parameter instead. See:
    // https://github.com/sasstools/gulp-sass-lint/issues/34
    .pipe(sassLint({
      options: { "config-file": "./src/patterns/flexboxgrid/configs/.sass-lint.yml" }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
