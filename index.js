var fs = require('fs'),
  format = require('util').format,
  extend = require('util')._extend,
  through = require('through2'),
  HBars = require('handlebars'),
  Path = require('path'),
  defaultOptions = {
    basePath: './',
    out: './'
  },
  template;

function toId(src) {
  return src.replace(/^\/\//, '').replace(/[\/\.]/g, '_');
}

fs.readFile(format('%s/lib/template.js.stache', __dirname), function(err, content) {
  if (err) {
    throw err;
  }

  content = content.toString();

  template = HBars.compile(content, {
    noEscape: true
  });
});

module.exports = function(options) {
  options = options || defaultOptions,
  options = extend(defaultOptions, options);

  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    var content = {
      id: toId(Path.relative(format('%s/%s',process.cwd(), options.basePath), file.history[0])),
      content: file.contents.toString('ascii').replace(/(\r|\t|\n)/g, '')
    };

    file.contents = new Buffer(template(content));

    callback(null, file);
  });
};