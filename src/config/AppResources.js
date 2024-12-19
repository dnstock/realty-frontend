// Dynamically import all Resource files from the '/resources' folder
// Resource filenames *must* begin with a capital letter
//
import { generatePath } from 'react-router-dom';
import startCase from 'lodash.startcase';
import pluralize from 'pluralize';
import { capitalize } from '@mui/material';

// Display error message on screen (move to util function if needed elsewhere)
const displayError = (message, sanitize) => {
  // Sanitize error message
  if (sanitize) message = message.replace(/[<>]/g, '');
  // Create error element
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ff0000;
    color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 9999;
    font-size: 18px;
    font-family: sans-serif;
  `;
  errorDiv.innerHTML = message;
  document.body.appendChild(errorDiv);
}

// Avoid duplication (e.g. './property.js' and 'resources/property.js')
const ctx = require.context('./resources', false, /^\.\/[a-z].+\.js$/);

const AppResources = ctx.keys().reduce((modules, path) => {
   // Remove filename artifacts
  const moduleName = path.replace(/^\.\/|\.js$/g, '');
  const moduleNamePlural = pluralize(moduleName);

  // Import the module
  // The module must export an object with the same name as the filename
  let module;
  try {
    module = ctx(path)[moduleName];
    if (!module) {
      throw new Error();
    }
  } catch (error) {
    displayError(`<b>Failed to load resource [ ${moduleName}.js ]</b><br/>Component must export an object named <i>${moduleName}</i>`);
    // Stop reduce operation
    throw new Error(`Cannot import resource from [ ${moduleName}.js ]: Component must export an object with the same name`);
  }

  // Set model name
  module.name = {
    singular: moduleName,
    plural: moduleNamePlural,
    singularTitle: capitalize(moduleName),
    pluralTitle: capitalize(moduleNamePlural),
  };

  // Set default database table name
  module.dbTable = module.dbTable || moduleNamePlural.toLowerCase();

  // 1. Replace '..' with the plural lowercase model name in routes
  // 2. Set path functions for routes
  // Example:
  //  routes.view: '/..',
  //  => routes.view = '/properties/:id'
  //  => routes.viewPath = (params = {}) => generatePath(routes.view, params)
  module.routes = Object.keys(module.routes).reduce((routes, key) => {
    routes[key] = module.routes[key].replace('..', moduleNamePlural.toLowerCase());
    routes[key + 'Path'] = (params = {}) => generatePath(routes[key], params);
    return routes;
  }, {});

  // Normalize column header names (don't rely on DataGrid to do this)
  module.columns = module.columns.map((column) => ({
    ...column,
    headerName: column.headerName || startCase(column.field),
  }));

  Object.assign(modules, { [moduleName]: module });
  return modules;
}, {});

export default AppResources;
