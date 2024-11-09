// Avoid duplication (e.g. './Home.js' and 'pages/Home.js')
const ctx = require.context('./', false, /^\..+\.js$/);

const pages = ctx.keys().reduce((modules, path) => {
   // Remove './' and '.js' from filenames
  const moduleName = path.replace(/^\.\/|\.js$/g, '');
  if (moduleName === 'index') return modules; // Skip index.js (this file)
  Object.assign(modules, { [moduleName]: ctx(path).default });
  return modules;
}, {});

export default pages;

