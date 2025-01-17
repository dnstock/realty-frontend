import { Typography } from '@mui/material';

export const property = {
  // '..' is a placeholder for the plural lowercase resource name
  // See AppResources.js for more details and examples
  routes: {
    index: '/../',
    view: '/../:id/',
    edit: '/../edit/:id/',
    create: '/../create/',
    delete: '/../delete/:id/',
  },
  endpoints: {
    index: '/../',
    create: '/../',
    read: '/../:id/',
    update: '/../:id/',
    delete: '/../:id/',
  },
  columns: [
    { field: 'id', flex: 0.5, minWidth: 50 },
    { field: 'name', flex: 2, minWidth: 100 },
    { field: 'address', flex: 2.5, minWidth: 150 },
    { field: 'city', flex: 1.5, minWidth: 100 },
    { field: 'state', flex: 1, minWidth: 70 },
    { field: 'zip_code', flex: 1, minWidth: 90 },
    { field: 'type', flex: 2, minWidth: 130 },
    { field: 'manager', flex: 1.5, minWidth: 100,
      renderCell: (params) => (
        <Typography variant='body2' component='span'
          color={params.value ? 'textPrimary' : 'text.disabled'}
        >
          {params.value ? params.value : '[none]'}
        </Typography>
      )
    },
  ],
};
