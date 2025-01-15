import { useEffect, useState, useCallback } from 'react';
import { apiService } from 'services';

function useGridData({ resource, parent = {} }) {
  const [data, setData] = useState({
    resource: resource,
    rows: [],
    rowCount: 0,
    loading: true,
    error: null,
  });

  const fetchRows = useCallback(async ({page, pageSize}) => {
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }));
      const pagination = {
        skip: page * pageSize,
        limit: pageSize,
      };

      let result;
      if (parent.name && parent.id) {
        result = await apiService.resourceSubindex(resource, parent.name, parent.id, pagination);
      } else if (parent.name || parent.id) {
        throw new Error('Parent name and parent ID must both be defined');
      } else {
        result = await apiService.resourceIndex(resource, pagination);
      }

      setData({
        resource: resource,
        rows: result.rows,
        rowCount: result.rowCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setData({
        resource: resource,
        rows: [],
        rowCount: 0,
        loading: false,
        error: error.message || 'Error fetching data',
      });
    }
  }, [resource, parent]);

  return {
    ...data,
    fetchRows,
  };
}

export default useGridData;
