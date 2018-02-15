const fs = require('fs');
const breakpoint = '//--Cache';
let version = parseInt(fs.readFileSync('version.txt', 'utf8')) + 1;
let content = fs.readFileSync('sw.js', 'utf8').split(breakpoint);

content[0] = `const name = 'swcache-${version}';`;

fs.writeFileSync('sw.js', content.join(breakpoint));
fs.writeFileSync('version.txt', version);
