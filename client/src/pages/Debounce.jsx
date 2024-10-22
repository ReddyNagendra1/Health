import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

export function useDebounceNavigation(delay = 300) {
    const navigate = useNavigate();

    const debouncedNavigate = useCallback(
        debounce((path) => {
            navigate(path);
        }, delay),
        [navigate, delay]
    );

    return debouncedNavigate;
}

export default useDebounceNavigation;