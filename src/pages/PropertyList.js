import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { useDialog, useContent } from 'context';
import { apiService } from 'services';
import { ResourceTable } from 'components';
import { Icons } from 'theme';

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

const PropertyList = () => {
  const { openDialog } = useDialog();
  const [state, dispatch] = useReducer(reducer, initialState);
  const cacheRef = useRef({}); // Ref to store cache and prevent re-fetches
  const navigate = useNavigate();

  useContent({
    title: 'Properties',
    actions: [
      { label: 'Add Property', icon: Icons.Add, onClick: () => navigate('/properties/create') },
    ]
  });

  const debouncedFetch = useRef(
    debounce((page, pageSize) => fetchProperties(page, pageSize, dispatch, cacheRef, state.totalCount), 300)
  ).current;

  useEffect(() => {
    debouncedFetch(state.page, state.pageSize);
  }, [state.page, state.pageSize, debouncedFetch]);

  const columns = [
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
    navigate(`/properties/edit/${id}`);
  };

  const handleDelete = (params) => {
    openDialog('ConfirmDelete', params.row, { onConfirmDelete: () => console.log('Deleted!') });
  };

  return (
    <>
      {state.loading ? (
        <CircularProgress />
      ) : state.error ? (
        <Typography color="error">{state.error}</Typography>
      ) : (
        <ResourceTable
          columns={columns}
          state={state}
          dispatch={dispatch}
          handlers={{ handleView, handleEdit, handleDelete }}
          flaggable
          noteable
        />
      )}
    </>
  );
};

export default PropertyList;
