// Dynamically import all Page files from the current folder
// Page filenames *must* begin with a capital letter

// Avoid duplication (e.g. './Home.js' and 'pages/Home.js')
const ctx = require.context('./', false, /^\.\/[A-Z].+\.js$/);

const pages = ctx.keys().reduce((modules, path) => {
   // Remove './' and '.js' from filenames
  const moduleName = path.replace(/^\.\/|\.js$/g, '');
  Object.assign(modules, { [moduleName]: ctx(path).default });
  return modules;
}, {});

export default pages;
