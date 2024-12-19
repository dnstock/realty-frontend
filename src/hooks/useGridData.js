import { useEffect, useReducer, useRef } from 'react';
import debounce from 'lodash/debounce';
import { apiService } from 'services';

const initialState = {
  data: [],
  totalCount: 0,
  loading: true,
  error: null,
  pageSize: 10,
  page: 0,
  cache: {}, // Store cached page data
};

function reducer(state, action) {
  switch (action.type) {
    case 'REQUEST_DATA':
      return { ...state, loading: true, error: null };
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload.data,
        totalCount: action.payload.totalCount,
        loading: false,
        cache: {
          ...state.cache,
          [action.payload.page]: action.payload.data, // Cache current page
        },
      };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload };
    default:
      return state;
  }
}

function useGridData(resource) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cacheRef = useRef({}); // Prevent re-fetches
  const debouncedFetch = useRef(
    debounce(async (page, pageSize) => {
      // If cached, use it
      if (cacheRef.current[page]) {
        dispatch({
          type: 'SET_DATA',
          payload: {
            data: cacheRef.current[page],
            totalCount: state.totalCount,
            page,
          },
        });
        return;
      }

      dispatch({ type: 'REQUEST_DATA' });
      try {
        const { rows, totalCount } = await apiService.resourceIndex(resource, {
          skip: page * pageSize,
          limit: pageSize,
        });
        cacheRef.current[page] = rows;
        dispatch({ type: 'SET_DATA', payload: { data: rows, totalCount, page } });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Error fetching data' });
      }
    }, 300)
  ).current;

  useEffect(() => {
    debouncedFetch(state.page, state.pageSize);
  }, [state.page, state.pageSize, debouncedFetch]);

  const setPage = (page) => dispatch({ type: 'SET_PAGE', payload: page });
  const setPageSize = (pageSize) => dispatch({ type: 'SET_PAGE_SIZE', payload: pageSize });

  return {
    state,
    setPage,
    setPageSize,
  };
}

export default useGridData;
