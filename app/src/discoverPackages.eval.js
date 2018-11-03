// Runs via https://github.com/webpack-contrib/val-loader
// babel-preval doesn't seem to provide a way for us to output
// require() instructions with a string value that we need to
// generate for webpack to pick them up.

const path = require('path');
const fs = require('fs');

const packageDirectories = [path.join(__dirname, '../internal_packages')];


const packageSetCodeLines = [];


for (const dir of packageDirectories) {  
  let filenames = [];
  filenames = fs.readdirSync(dir);  

  for (const filename of filenames) {
    const packageDir = path.join(dir, filename);

    // Load the package.json file
    const json = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json')).toString());

    //
    let requireModuleLine = "null";
    if (json.main) {
      requireModuleLine = `() => require("${path.join(packageDir, json.main)}")`;
    }

    packageSetCodeLines.push(
`
packages["${filename}"] = {
  // Restrict to relevant subset
  'package.json': ${JSON.stringify(json)},
  'requireModule': ${requireModuleLine}
}
`);
  }
}

module.exports = module.exports = () => {
  const generatedCode = `
    const packages = {};
    ${packageSetCodeLines.join('\n')}
    module.exports = packages;
  `;
  return { code: generatedCode }
};