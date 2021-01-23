const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const template = `import { createIcon } from './iconFunc';

<%- content %>
`;
const templateIcon = `
export const <%= iconName %> = createIcon({
  displayName: '<%= iconName %>',
  viewBox: '0 0 2048 2048',
  d:
    '<%= iconContent %>',
});
`;

const svgMinFolder = 'svg_min';

function str2camelcase(str) {
  if (str.length > 0 && str.indexOf('_') === -1) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }
  const strArr = str.split('_');
  const resultArr = strArr.map((word) => {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  });
  return resultArr.join('');
}

fs.readdir(svgMinFolder, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  let result = [];
  let iconNames = [];
  files.forEach((file) => {
    if (path.extname(file) == '.svg') {
      let iconName = str2camelcase(path.basename(file, '.min.svg'));
      iconName = iconName + 'Icon';
      console.log(iconName);
      iconNames.push(iconName);
      const fileData = fs.readFileSync(`${svgMinFolder}/${file}`, { encoding: 'utf-8', flag: 'r' });
      const pathRegex = /(?:\sd=\")(.*?)(?:\")/g;
      const matchData = pathRegex.exec(fileData);
      //console.log('matchData', matchData.length);
      if (matchData.length >= 2) {
        const iconContent = matchData[1];
        result.push(ejs.render(templateIcon, { iconName, iconContent }));
      }
    }
  });
  if (result.length >= 2) {
    const allIcons = result.join('\n');
    const fileStr = ejs.render(template, { content: allIcons });
    console.log('Icons.jsx is generated');
    fs.writeFileSync('../../shared/components/Element/Icons.jsx', fileStr);
  } else {
    console.log('warning: please more then 1 svg file to generate');
  }
  // /* for index entry */
   //fs.appendFileSync(
     //'../../shared/components/Element/index.js',
     //`export {\n ${iconNames.join(',\n')}\n} from './Icons'`
   //);
});
