export const building = {
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
    { field: 'name', flex: 2, minWidth: 100 },
    { field: 'unit_count', headerName: 'Units', flex: 1, minWidth: 90 },
    { field: 'vacancy', flex: 1.5, minWidth: 90,
      valueGetter: (params) => `${params.count} units / ${(params.rate * 100).toFixed(2)}%` },
    { field: 'occupancy', flex: 1.5, minWidth: 90,
      valueGetter: (params) => `${params.count} units / ${(params.rate * 100).toFixed(2)}%` },
    { field: 'property', flex: 2, minWidth: 100,
      valueGetter: (params) => params.name || '[ Error ]', },
  ],
};
