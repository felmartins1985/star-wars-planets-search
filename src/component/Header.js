import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { filter: { filterByName: { name } }, setFilter,
    filter } = useContext(PlanetContext);

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <input
        data-testid="name-filter"
        placeholder="Digite o nome do planeta"
        value={ name }
        onChange={ (e) => setFilter({
          ...filter,
          filterByName: { name: e.target.value },
        }) }
      />
    </div>
  );
}

export default Header;
