import { useEffect, useReducer, useRef } from 'react';
import debounce from 'lodash/debounce';
import { apiService } from 'services';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDialog, useContent } from 'context';
import { Icons, ContentLoadingBox } from 'theme';
import { ResourceDataGrid } from 'components';

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

const ResourceIndex = ({ resource }) => {
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const [state, dispatch] = useReducer(reducer, initialState);
  const cacheRef = useRef({}); // Ref to store cache and prevent re-fetches
  const debouncedFetch = useRef(
    debounce((page, pageSize) => fetchTableData(page, pageSize), 300)
  ).current;

  useContent({
    title: resource.name.pluralTitle,
    actions: [
      { label: `New ${resource.name.singularTitle}`, icon: Icons.Add, onClick: () => navigate(resource.routes.create) },
    ],
  });

  const fetchTableData = async (page, pageSize) => {
    // Check if data is already cached
    if (cacheRef.current[page]) {
      dispatch({ type: 'SET_DATA', payload: { data: cacheRef.current[page], totalCount: state.totalCount, page } });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const { rows, totalCount } = await apiService.resourceIndex(resource, {
        skip: page * pageSize,
        limit: pageSize,
      });
      dispatch({ type: 'SET_DATA', payload: { data: rows, totalCount, page } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error fetching data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    debouncedFetch(state.page, state.pageSize);
  }, [state.page, state.pageSize, debouncedFetch]);

  return (
    <>
      {state.loading ? (
        <ContentLoadingBox />
      ) : state.error ? (
        <Typography color="error">{state.error}</Typography>
      ) : (
        <ResourceDataGrid
          resource={resource}
          state={state}
          dispatch={dispatch}
          handlers={{
            handleView: (id) => navigate(resource.routes.viewPath({ id })),
            handleEdit: (id) => navigate(resource.routes.editPath({ id })),
            handleDelete: ({ row }) => openDialog('ConfirmDelete', row),
          }}
          flaggable
          noteable
        />
      )}
    </>
  );
};

export default ResourceIndex;
