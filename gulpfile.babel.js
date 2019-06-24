"use strict";

import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import browsersync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import sass from "gulp-sass";
import mqpacker from "css-mqpacker";
import sortCSSmq from "sort-css-media-queries";
import mincss from "gulp-clean-css";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";
import replace from "gulp-replace";
import include from "gulp-file-include";
import plumber from "gulp-plumber";
import debug from "gulp-debug";
import clean from "gulp-clean";
import yargs from "yargs";

const webpackConfig = require("./webpack.config.js"),
	argv = yargs.argv,
	production = !!argv.production,

	paths = {
		views: {
			src: [
				"./src/index.html"
			],
			dist: "./dist/",
			watch: "./src/**/*.html"
		},
		styles: {
			src: "./src/styles/main.scss",
			dist: "./dist/styles/",
			watch: [
				"./src/styles/**/*.scss"
			]
		},
		scripts: {
			src: "./src/js/main.js",
			dist: "./dist/js/",
			watch: [
				"./src/js/**/*.js",
				"./src/js/**/*.vue"
			]
		},
		images: {
			src: [
				"./src/img/**/*.{jpg,jpeg,png,gif,svg}"
			],
			dist: "./dist/img/",
			watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
		}
	};

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

export const server = () => {
	browsersync.init({
		server: "./dist/",
		tunnel: false,
		notify: true
	});

	gulp.watch(paths.views.watch, views);
	gulp.watch(paths.styles.watch, styles);
	gulp.watch(paths.scripts.watch, scripts);
	gulp.watch(paths.images.watch, images);
};

export const cleanFiles = () => gulp.src("./dist/*", {read: false})
	.pipe(clean())
	.pipe(debug({
		"title": "Cleaning..."
	}));

export const views = () => gulp.src(paths.views.src)
	.pipe(include({
		prefix: "@@",
		basepath: "@file"
	}))
	.pipe(gulpif(production, replace("main.css", "main.min.css")))
	.pipe(gulpif(production, replace("main.js", "main.min.js")))
	.pipe(gulp.dest(paths.views.dist))
	.pipe(debug({
		"title": "HTML files"
	}))
	.on("end", browsersync.reload);

export const styles = () => gulp.src(paths.styles.src)
	.pipe(gulpif(!production, sourcemaps.init()))
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([
		mqpacker({
			sort: sortCSSmq
		})
	]))
	.pipe(gulpif(production, autoprefixer({
		browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"]
	})))
	.pipe(gulpif(production, mincss({
		compatibility: "ie8", level: {
			1: {
				specialComments: 0,
				removeEmpty: true,
				removeWhitespace: true
			},
			2: {
				mergeMedia: true,
				removeEmpty: true,
				removeDuplicateFontRules: true,
				removeDuplicateMediaBlocks: true,
				removeDuplicateRules: true,
				removeUnusedAtRules: false
			}
		}
	})))
	.pipe(gulpif(production, rename({
		suffix: ".min"
	})))
	.pipe(plumber.stop())
	.pipe(gulpif(!production, sourcemaps.write("./maps/")))
	.pipe(gulp.dest(paths.styles.dist))
	.pipe(debug({
		"title": "CSS files"
	}))
	.pipe(browsersync.stream());

export const scripts = () => gulp.src(paths.scripts.src)
	.pipe(webpackStream(webpackConfig), webpack)
	.pipe(gulpif(production, rename({
		suffix: ".min"
	})))
	.pipe(gulp.dest(paths.scripts.dist))
	.pipe(debug({
		"title": "JS files"
	}))
	.on("end", browsersync.reload);

export const images = () => gulp.src(paths.images.src)
	.pipe(gulpif(production, imagemin([
		imageminGiflossy({
			optimizationLevel: 3,
			optimize: 3,
			lossy: 2
		}),
		imageminPngquant({
			speed: 5,
			quality: [0.6, 0.8]
		}),
		imageminZopfli({
			more: true
		}),
		imageminMozjpeg({
			progressive: true,
			quality: 70
		})
	])))
	.pipe(gulp.dest(paths.images.dist))
	.pipe(debug({
		"title": "Images"
	}))
	.on("end", browsersync.reload);

export const development = gulp.series(cleanFiles,
	gulp.parallel(views, styles, scripts, images),
	gulp.parallel(server));

export const prod = gulp.series(cleanFiles, views, styles, scripts, images);

export default development;