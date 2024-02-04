import { useEffect, useState } from 'react';

import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { getAdverts } from '../service';
import { defaultFilters, filterAdverts } from './filters';
import useQuery from '../../../hooks/useQuery';

import { useSelector, useDispatch } from 'react-redux';
import { setAdverts } from '../../../store/action'; 
import { getAdverts as selectAdverts } from '../../../store/selector'; 

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  const dispatch = useDispatch();
  const advertsFromRedux = useSelector(selectAdverts); 

  const [filters, setFilters] = useState(getFilters);

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  useEffect(() => {
    // Usa la acción "setAdverts" para almacenar los anuncios en el estado de Redux
    dispatch(setAdverts(advertsFromRedux));
  }, [dispatch, advertsFromRedux]); 

  const { isLoading, data: advertsFromQuery = [] } = useQuery(getAdverts); 

  const filteredAdverts = filterAdverts(advertsFromQuery, filters); 

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      {advertsFromQuery.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={advertsFromQuery.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={advertsFromQuery.length} />
      )}
    </>
  );
}

export default AdvertsPage;
