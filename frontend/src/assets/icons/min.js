const fs = require('fs');
const path = require('path');
const process = require('process');
const { exec } = require('child_process');

const svgFolder = 'svg_raw';
const svgMinFolder = 'svg_min';

fs.readdir(svgFolder, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (!fs.existsSync(svgMinFolder)) {
    console.error(`svg output folder not exist: ${svgMinFolder}`);
    process.exit(1);
  }
  files.forEach((file) => {
    if (path.extname(file) == '.svg') {
      const command_str = `svgo ${svgFolder}/${file} -o ${svgMinFolder}/${path.basename(
        file,
        '.svg'
      )}.min.svg`;
      console.log(command_str);
      exec(command_str, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
        } else {
          if (stdout) {
            console.log(`stdout: ${stdout}`);
          }
          //console.log(`stderr: ${stderr}`);
        }
      });
    }
  });
});
