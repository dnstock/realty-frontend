import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';
import baseTheme from './baseTheme';
import fbPalette from './fbPalette';

export const theme = createTheme(deepmerge(baseTheme, fbPalette));
export * from './styledComponents';
export { default as Icons } from './icons';

export default theme;
