const ejs = require('ejs');
const fs = require('fs');
const opentype = require('opentype.js');

const inputFontPath = 'font/FabricMDL2Assets.woff';
const outputPath = 'svg_fluent_ui';
const nameUnicodeFile = 'name_unicode.json';
const template = `<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 <%= width %> <%= width %>"><path transform="scale(1,-1) translate(0,-<%= width %>)" fill="#666" class="" d="<%= svg %>"/></svg>`;

function formatUnicode(unicode) {
  unicode = unicode.toString(16);
  if (unicode.length > 4) {
    return ('000000' + unicode.toUpperCase()).substr(-6);
  } else {
    return ('0000' + unicode.toUpperCase()).substr(-4);
  }
}
var Interpreter = function () {
  this.stack = [];
};

Interpreter.prototype = {
  beginPath: function () {},
  moveTo: function (x, y) {
    this.stack.push(['M', x, y].join(' '));
  },
  lineTo: function (x, y) {
    this.stack.push(['L', x, y].join(' '));
  },
  quadraticCurveTo: function (x1, y1, x, y) {
    this.stack.push(['Q', x1, y1, x, y].join(' '));
  },
  cubicCurveTo: function (x1, y1, x2, y2, x, y) {
    this.stack.push(['C', x1, y1, x2, y2, x, y].join(' '));
  },
  closePath: function () {
    this.stack.push('Z');
  },
  fill: function (f) {
    this.fillStyle = f;
  },
  stroke: function (s) {
    this.strokeStyle = s;
  },
  toPath: function () {
    return this.stack.join(' ');
  },
};

let jsonArray = JSON.parse(fs.readFileSync(nameUnicodeFile));
let jsonObject = {};
console.log('jsonArray length:', jsonArray.length);
for (let i = 0; i < jsonArray.length; i++) {
  jsonObject[jsonArray[i]['unicode'].toUpperCase()] = jsonArray[i]['name'];
}

opentype.load(inputFontPath, function (err, font) {
  if (err) {
    console.error('Font could not be loaded: ' + err);
  } else {
    console.log('glyph length:', font.glyphs.length);
    let result = [];
    for (var i = 0; i < font.glyphs.length; i++) {
      //for (var i = 0; i < 5; i++) {
      let glyph = font.glyphs.get(i);
      if (glyph.name && glyph.name.startsWith('uni')) {
        if (glyph.unicodes.length > 0) {
          let unicode = glyph.unicodes.map(formatUnicode).join(',');
          console.log(
            `${glyph.name} => ${unicode} => ${glyph.advanceWidth} => ${glyph.xMin}-${glyph.xMax} => ${glyph.yMin}-${glyph.yMax}`
          );
          result.push(glyph.name);
          let width = glyph.advanceWidth;
          let patchX = (glyph.advanceWidth - (glyph.xMax - glyph.xMin)) / 2;
          let patchY = (glyph.advanceWidth - (glyph.yMax - glyph.yMin)) / 2;
          let interpreter = new Interpreter();
          glyph.path.draw(interpreter);
          let svg = interpreter.toPath();
          //console.log('svg:', svg);

          if (unicode in jsonObject) {
            const fileName = `${jsonObject[unicode]}.svg`;
            const fileStr = ejs.render(template, { svg, width, patchX, patchY });
            console.log(`File '${fileName}' is generated`);
            fs.writeFileSync(`${outputPath}/${fileName}`, fileStr);
          }
        }
      } else {
        //console.log(`!= ${glyph.index}  ${glyph.name}`);
      }
    }
    console.log('svg length:', result.length);
  }
});
