import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { data, isLoading, filter: { filterByName } } = useContext(PlanetContext);
  return (
    !isLoading && (
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((planet, index) => <th key={ index }>{planet}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.filter((planet) => planet.name.includes(filterByName.name))
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
    ));
}

export default Table;
