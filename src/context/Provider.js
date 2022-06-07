import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ApiPlanets from '../services/ApiPlanets';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
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

  const value = { data, filter, setFilter, isLoading };

  return (
    !isLoading && (
      <PlanetContext.Provider value={ value }>
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
