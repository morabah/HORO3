const fs = require('fs');
const files = [
  'src/components/theme/hero-components.tsx',
  'src/components/theme/social-components.tsx',
  'src/components/theme/modal-components.tsx',
  'src/components/theme-preview.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
console.log('Fixed');
