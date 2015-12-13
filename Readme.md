# jqmx-compile

##### A Gulp template compiler for EJS in the jquerymx framework

#### Installation
```
npm install --save jqmx-compile
```

#### Usage
```
var compile = require('jqmx-compile'),

gulp.task('views', function() {
	return gulp.src('./*.ejs')
		.pipe(compile({
			 basePath: 'app/views'
		}))
		.pipe(gulp.dest('./public));
});
```