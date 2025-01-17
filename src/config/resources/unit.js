import { Chip, Typography, Checkbox } from '@mui/material';

export const unit = {
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
    subindex: '/:parentName/:parentId/../',
    create: '/../?:parentName=:parentId',
    read: '/../:id/',
    update: '/../:id/',
    delete: '/../:id/',
  },
  columns: [
    { field: 'id', flex: 0.5, minWidth: 50 },
    { field: 'building', flex: 2, minWidth: 100,
      valueGetter: (params) => params.name || '[ Error ]', },
    { field: 'unit_number', headerName: 'Unit', flex: 1, minWidth: 100 },
    { field: 'floor_number', headerName: 'Floor', flex: 1, minWidth: 90 },
    { field: 'bedrooms', flex: 1, minWidth: 90 },
    { field: 'bathrooms', flex: 1, minWidth: 90 },
    { field: 'sqft', headerName: 'Area', flex: 1, minWidth: 90,
      valueFormatter: (val) => `${val} ft²` },
    { field: 'is_vacant', headerName: 'Vacancy', flex: 1, minWidth: 90,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Vacant' : 'Occupied'}
          color={params.value ? 'success' : 'error'}
          size='small'
          variant='outlined'
        />
        // <Checkbox
        //   checked={params.value}
        //   disabled
        //   size='small'
        // />
      )},
  ],
};
