import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { filter: { filterByName: { name } }, setFilter,
    filter, column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
  } = useContext(PlanetContext);

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
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ (e) => {
          setColumn(e.target.value);
        } }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => { setComparison(e.target.value); } }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (e) => { setValue(e.target.value); } }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setFilter({
            ...filter,
            filterByNumericValues: [
              {
                column,
                comparison,
                value,
              },
            ],
            isFilter: true,
          });
        } }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Header;
