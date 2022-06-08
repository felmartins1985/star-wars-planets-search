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
  const [data2, setData2] = useState([]);
  const columnChanges = {
    population: 'population',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    rotation_period: 'rotation_period',
    surface_water: 'surface_water',
  };
  const [changes, setChanges] = useState(columnChanges);
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
  });
  const requestPlanets = async () => {
    const request = await ApiPlanets();
    request.results.map((result) => delete result.residents);
    setData(request.results);
    setData2(request.results);
    setIsLoading(false);
  };
  const deleteChanges = () => {
    const newChanges = changes;
    delete newChanges[column];
    setChanges(newChanges);
  };
  useEffect(() => {
    requestPlanets();
  }, []);

  const context = {
    data,
    setData,
    filter,
    setFilter,
    isLoading,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    data2,
    changes,
    setChanges,
    deleteChanges,
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
