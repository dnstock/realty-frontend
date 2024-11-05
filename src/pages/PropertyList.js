import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { apiService } from 'services';
import { Content, ResourceTable } from 'components';

const initialState = {
  data: [],
  totalCount: 0,
  loading: true,
  error: null,
  pageSize: 10,
  page: 0,
  cache: {}, // Store cached page data
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload.data,
        totalCount: action.payload.totalCount,
        cache: {
          ...state.cache,
          [action.payload.page]: action.payload.data, // Cache current page
        },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload };
    default:
      return state;
  }
};

const fetchProperties = async (page, pageSize, dispatch, cacheRef, totalCount) => {
  // Check if data is already cached
  if (cacheRef.current[page]) {
    dispatch({ type: 'SET_DATA', payload: { data: cacheRef.current[page], totalCount, page } });
    return;
  }

  dispatch({ type: 'SET_LOADING', payload: true });

  try {
    const { rows, totalCount: updatedTotalCount } = await apiService.get('/properties', { skip: page * pageSize, limit: pageSize });
    dispatch({ type: 'SET_DATA', payload: { data: rows, totalCount: updatedTotalCount, page } });
  } catch (error) {
    console.error('Error fetching properties:', error);
    dispatch({ type: 'SET_ERROR', payload: error.message || 'Error fetching properties' });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

const PropertyDataGrid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cacheRef = useRef({}); // Ref to store cache and prevent re-fetches
  const navigate = useNavigate();

  const debouncedFetch = useRef(
    debounce((page, pageSize) => fetchProperties(page, pageSize, dispatch, cacheRef, state.totalCount), 300)
  ).current;

  useEffect(() => {
    debouncedFetch(state.page, state.pageSize);
  }, [state.page, state.pageSize, debouncedFetch]);

  const baseColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 50 },
    { field: 'name', headerName: 'Name', flex: 2, minWidth: 100 },
    { field: 'address', headerName: 'Address', flex: 2.5, minWidth: 150 },
    { field: 'city', headerName: 'City', flex: 1.5, minWidth: 100 },
    { field: 'state', headerName: 'State', flex: 1, minWidth: 70 },
    { field: 'zip_code', headerName: 'Zip Code', flex: 1, minWidth: 90 },
    { field: 'type', headerName: 'Type', flex: 2, minWidth: 130 },
    { field: 'manager', headerName: 'Manager', flex: 1.5, minWidth: 100,
      valueGetter: (params) => params.name || '[ Error ]'
    },
  ];

  const handleView = (id) => {
    navigate(`/properties/${id}`);
  };
  
  const handleEdit = (id) => {
    console.log('Edit item with ID:', id);
    // Add your edit logic here
  };
  
  const handleDelete = (id) => {
    console.log('Delete item with ID:', id);
    // Add your delete logic here
  };

  const handleQuickView = (id) => {
    console.log('Quick view item with ID:', id);
    // Add your quick view logic here
  }

  const actionButtons = [{ label: 'Add Property', color: 'primary', onClick: () => navigate('/properties/create') }];

  return (
    <Content title="Properties" actionButtons={actionButtons}>
      {state.loading ? (
        <CircularProgress />
      ) : state.error ? (
        <Typography color="error">{state.error}</Typography>
      ) : (
        <ResourceTable 
          baseColumns={baseColumns}
          state={state}
          dispatch={dispatch}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Content>
  );
};

export default PropertyDataGrid;
