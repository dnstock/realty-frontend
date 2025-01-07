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
};

function reducer(state, action) {
  switch (action.type) {
    case 'REQUEST_DATA':
      return { ...state, loading: true, error: null };
    case 'SET_DATA':
      return { ...state, ...action.payload, loading: false };
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

// Use cache to prevent re-fetches
const createCache = () => ({
  data: {},
  clear: function() { this.data = {}; }
});

function useGridData({resource, parentName, parentId}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cache = useRef(createCache()).current;

  const debouncedFetch = useRef(
    debounce(async (page, pageSize, r) => {
      const cacheKey = [
        r.parentName ? `${r.parentName}-${r.parentId}` : 'root',
        r.resource.name.plural,
        page,
        pageSize,
      ].join('-');

      dispatch({ type: 'REQUEST_DATA' });
      // console.log('Fetching data | cacheKey:', cacheKey);

      // If resource exists and is cached, use it
      if (cache.data[cacheKey]) {
        console.log('Using cached data');
        dispatch({
          type: 'SET_DATA',
          payload: cache.data[cacheKey],
        });
        return;
      }

      // Otherwise, fetch data
      try {
        let data;
        const params = {
          skip: page * pageSize,
          limit: pageSize,
        };
        if(r.parentName && r.parentId) {
          data = await apiService.resourceSubindex(r.resource, r.parentName, r.parentId, params);
        } else if(r.parentName || r.parentId) {
          throw new Error('Parent resource and parent ID must both be defined');
        } else {
          data = await apiService.resourceIndex(r.resource, params);
        }
        const payload = {
          resource: r.resource,
          data: data.rows,
          totalCount: data.totalCount,
          page,
        };
        cache.data[cacheKey] = payload;
        dispatch({ type: 'SET_DATA', payload });
        // console.log('cache:', cache.data);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Error fetching data' });
      }
    }, 300)
  ).current;

  useEffect(() => {
    if(resource) {
      cache.clear(); // Clear cache when resource changes
      debouncedFetch(state.page, state.pageSize, { resource, parentName, parentId });
    }
  }, [resource, state.page, state.pageSize]);

  const setPage = (page) => dispatch({ type: 'SET_PAGE', payload: page });
  const setPageSize = (pageSize) => dispatch({ type: 'SET_PAGE_SIZE', payload: pageSize });

  return {
    state,
    setPage,
    setPageSize,
  };
}

export default useGridData;
