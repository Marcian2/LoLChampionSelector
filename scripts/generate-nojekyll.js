const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, '../dist');
// Ensure dist exists (Expo creates it during export)
if (fs.existsSync(distPath)) {
  fs.writeFileSync(path.join(distPath, '.nojekyll'), '');
  console.log('Created .nojekyll file in dist folder');
}