// Avoid duplication (e.g. './Home.js' and 'pages/Home.js')
const ctx = require.context('./', false, /^\..+\.js$/);

const pages = ctx.keys().reduce((modules, path) => {
   // Remove './' and '.js' from filenames
  const moduleName = path.replace(/^\.\/|\.js$/g, '');
  // Skip this file
  if (moduleName === 'index') return modules;
  return {
    ...modules,
    [moduleName]: ctx(path).default,
  };
}, {});

export default pages;

