import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ApiPlanets from '../services/ApiPlanets';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      }],
    isFilter: false,
  });
  const requestPlanets = async () => {
    const request = await ApiPlanets();
    request.results.map((result) => delete result.residents);
    setData(request.results);
    setIsLoading(false);
  };
  useEffect(() => {
    requestPlanets();
  }, []);

  const context = {
    data,
    filter,
    setFilter,
    isLoading,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
  };

  return (
    !isLoading && (
      <PlanetContext.Provider value={ context }>
        {children}
      </PlanetContext.Provider>
    )
  );
}
Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Provider;
