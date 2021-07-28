"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const siteConfig = require("../site-config.js");

/**
 * Start local development server
 */
gulp.task("serve", function serveTask(done) {
  browserSync.init({
    server: "./public",
    startPath: siteConfig.basePath,
    port: 3003,
    // "tunnel" is commented out because it throws an error:
    // connection refused: localtunnel.me:37608 (check your firewall settings)
    // tunnel: "tgam",
    notify: false,
    // open: false, // You may want to uncomment this while testing
    // browser: ["google chrome", "firefox"],
    ghostMode: false,
    // "injectChanges" is false because some of the Gulp tasks are synchronous
    // and are chained together into sequences that must complete before the
    // page can be updated
    injectChanges: false,
    logFileChanges: false
  });
  done();
});

/**
 * Watch tasks
 */
gulp.task("watch", function watchTask(done) {
  gulp.watch([
    "./gulp/tasks/templates.js",
    "./src/site/templates/*",
    "./src/site/pages/**/*",
    "./src/specimens/**/*",
  ], gulp.series("templates", browserSync.reload));

  gulp.watch([
    "./gulp/tasks/styles.js",
    "./src/site/stylesheets/**/*.scss",
    "./src/patterns/**/*.scss",
  ], gulp.series("styles", browserSync.reload));

  gulp.watch([
    "./gulp/tasks/scripts.js",
    "./src/site/javascripts/**/*.js",
    "./src/site/vendor/javascripts/**/*.js"
  ], gulp.series("scripts", browserSync.reload));

  gulp.watch([
    "./gulp/tasks/images.js",
    "./src/site/images/**/*",
  ], gulp.series("images", browserSync.reload));

  done();
});
