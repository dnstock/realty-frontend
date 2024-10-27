import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';
import baseTheme from './baseTheme';
import fbPalette from './fbPalette';

const theme = createTheme(deepmerge(baseTheme, fbPalette));
export default theme;
export * from './styledComponents';
export { default as Icons } from './icons';
