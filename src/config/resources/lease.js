export const lease = {
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
    { field: 'start_date', headerName: 'Start', flex: 1, minWidth: 90 },
    { field: 'end_date', headerName: 'End', flex: 1, minWidth: 90 },
    { field: 'rent', flex: 1, minWidth: 90,
      valueFormatter: (value) => `$${value}` },
  ],
};
