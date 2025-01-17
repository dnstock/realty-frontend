export const insurance = {
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
    { field: 'provider', flex: 2, minWidth: 100 },
    { field: 'policy_number', flex: 1, minWidth: 90 },
    { field: 'premium', flex: 1, minWidth: 90,
      valueFormatter: (value) => `$${value}` },
    { field: 'effective_date', headerName: 'Start', flex: 1, minWidth: 90,
      // valueFormatter: (value) => value.toLocaleDateString()
    },
    { field: 'expiration_date', headerName: 'End', flex: 1, minWidth: 90,
      // valueFormatter: (value) => value.toLocaleDateString()
    },
  ],
};
