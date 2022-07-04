import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import './Header.css';

function Table() {
  const { data, filter: { filterByName }, data2 } = useContext(PlanetContext);
  const createLink = (linkList, string) => (linkList.map((link, index) => (
    <a href={ link } key={ `${string}-${index}` } className="table-film-display">
      {`${link.split('/')[5]}º`}
    </a>
  )));
  return (
    <table className="table table-dark table-striped align-middle table-hover tableCss">
      <thead>
        <tr className="align-middle">
          {Object.keys(data2[0]).map((planet, index) => <th key={ index }>{planet}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.filter((planet) => planet.name
          .toLowerCase().includes(filterByName.name.toLowerCase()))
          .map((plnt, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{plnt.name}</td>
              <td>{plnt.rotation_period}</td>
              <td>{plnt.orbital_period}</td>
              <td>{plnt.diameter}</td>
              <td>{plnt.climate}</td>
              <td>{plnt.gravity}</td>
              <td>{plnt.terrain}</td>
              <td>{plnt.surface_water}</td>
              <td>{plnt.population}</td>
              <td className="films">{createLink(plnt.films, 'f')}</td>
              <td>{plnt.created}</td>
              <td>{plnt.edited}</td>
              <td>
                <a
                  className="table table-dark table-striped"
                  href={ plnt.url }
                >
                  Link
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
