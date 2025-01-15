import { useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A case-insensitive drop-in replacement for useSearchParams.
 * Usage example:
 *   const [searchParams, setSearchParams] = useCaseInsensitiveSearchParams();
 *   const queryValue = searchParams.get('Foo');  // matches ?foo=123
 */
export default function useCaseInsensitiveSearchParams() {
  const location = useLocation();
  const navigate = useNavigate();

  // Create a wrapped URLSearchParams that performs key lookups case-insensitively
  const createCaseInsensitiveParams = useCallback((searchString) => {
    const realParams = new URLSearchParams(searchString);

    return new Proxy(realParams, {
      get(target, prop, receiver) {
        // Handle get, getAll, has, set, append, delete in a case-insensitive way
        if (prop === 'get') {
          return (name) => {
            for (const [key, value] of target.entries()) {
              if (key.toLowerCase() === name.toLowerCase()) return value;
            }
            return null;
          };
        }

        if (prop === 'getAll') {
          return (name) => {
            const values = [];
            for (const [key, value] of target.entries()) {
              if (key.toLowerCase() === name.toLowerCase()) values.push(value);
            }
            return values;
          };
        }

        if (prop === 'has') {
          return (name) => {
            for (const [key] of target.entries()) {
              if (key.toLowerCase() === name.toLowerCase()) return true;
            }
            return false;
          };
        }

        if (prop === 'set') {
          return (name, value) => {
            // Remove any existing keys matching case-insensitively
            const toRemove = [];
            for (const [key] of target.entries()) {
              if (key.toLowerCase() === name.toLowerCase()) toRemove.push(key);
            }
            toRemove.forEach((key) => target.delete(key));
            target.set(name, value);
          };
        }

        if (prop === 'append') {
          return (name, value) => target.append(name, value);
        }

        if (prop === 'delete') {
          return (name) => {
            const toRemove = [];
            for (const [key] of target.entries()) {
              if (key.toLowerCase() === name.toLowerCase()) toRemove.push(key);
            }
            toRemove.forEach((key) => target.delete(key));
          };
        }

        // Default behavior for everything else (e.g., .toString())
        return Reflect.get(target, prop, receiver);
      },
    });
  }, []);

  // Case-insensitive URLSearchParams object for the current URL
  const caseInsensitiveParams = useMemo(
    () => createCaseInsensitiveParams(location.search),
    [location.search, createCaseInsensitiveParams]
  );

  // Setter function, similar to useSearchParams
  const setSearchParams = useCallback(
    (newParams, options) => {
      let updatedParams = new URLSearchParams(location.search);

      // If newParams is a function, pass a case-insensitive version for modifications
      if (typeof newParams === 'function') {
        const temp = createCaseInsensitiveParams(location.search);
        newParams(temp);
        updatedParams = new URLSearchParams(temp.toString());
      } else if (newParams instanceof URLSearchParams) {
        updatedParams = newParams;
      } else if (typeof newParams === 'object') {
        // Merge in new object key/value pairs (case-insensitive delete + set)
        for (const key of Object.keys(newParams)) {
          for (const [k] of updatedParams.entries()) {
            if (k.toLowerCase() === key.toLowerCase()) {
              updatedParams.delete(k);
            }
          }
          updatedParams.set(key, newParams[key]);
        }
      }

      // Navigate to the updated query string
      navigate(`${location.pathname}?${updatedParams.toString()}`, options);
    },
    [location, navigate, createCaseInsensitiveParams]
  );

  return [caseInsensitiveParams, setSearchParams];
}
