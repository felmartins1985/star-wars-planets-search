import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { data, filter: { filterByName, isFilter },
    comparison, column, value } = useContext(PlanetContext);
  const filteredData = () => {
    if (isFilter) {
      return data.filter((planet) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > value;
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < value;
        }
        if (comparison === 'igual a') {
          return planet[column] === value;
        }
        return null;
      });
    }
    return data;
  };
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((planet, index) => <th key={ index }>{planet}</th>)}
        </tr>
      </thead>
      <tbody>
        {filteredData().filter((planet) => planet.name.includes(filterByName.name))
          .map((plnt, index) => (
            <tr key={ index }>
              <td>{plnt.name}</td>
              <td>{plnt.rotation_period}</td>
              <td>{plnt.orbital_period}</td>
              <td>{plnt.diameter}</td>
              <td>{plnt.climate}</td>
              <td>{plnt.gravity}</td>
              <td>{plnt.terrain}</td>
              <td>{plnt.surface_water}</td>
              <td>{plnt.population}</td>
              <td>{plnt.films}</td>
              <td>{plnt.created}</td>
              <td>{plnt.edited}</td>
              <td>{plnt.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
