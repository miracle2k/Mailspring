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

    // If there is a main module, load it.
    let requireModuleLine = "null";
    if (json.main) {
      requireModuleLine = `() => require("${path.join(packageDir, json.main)}")`;
    }

    // Load any stylesheets that might exist.
    const stylesRoot = path.join(packageDir, 'styles');
    let filenames = [];
    try {
      filenames = fs.readdirSync(stylesRoot);
    }
    catch(e) {
      filenames = [];
    }
    const index = filenames.find(fn => fn.startsWith('index.'));
    if (index) {
      stylesheets = [path.join(stylesRoot, index)];
    } else {
      stylesheets = filenames
        .filter(fn => fn.endsWith('ss'))
        .map(fn => path.join(stylesRoot, fn));
    }
    const styleRequireMap = {};
    stylesheets.forEach(path => {
      styleRequireMap[path] = `require("${path}")`
    });

    packageSetCodeLines.push(
`
packages["${filename}"] = {
  // Restrict to relevant subset
  'package.json': ${JSON.stringify(json)},
  requireModule: ${requireModuleLine},
  requireStylesheets: () => { return ${buildCodeArray(styleRequireMap)}; },
}
`);
  }
}


function buildCodeArray(object) {
  let assignmentLines = [];
  Object.keys(object).forEach(key => {
    const value = object[key];
    assignmentLines.push(`"${key}": ${value},`);
  });
  return `{
  ${assignmentLines.join('\n')}
};
  `
};

module.exports = module.exports = () => {
  const generatedCode = `
    const packages = {};
    ${packageSetCodeLines.join('\n')}
    module.exports = packages;
  `;
  return { code: generatedCode }
};