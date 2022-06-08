import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const { filter: { filterByName: { name } }, setFilter,
    filter, column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue, setData, data,
    changes,
    deleteChanges,
  } = useContext(PlanetContext);

  const filteredData = (isFilter) => {
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
        {Object.keys(changes).map((option, index) => (
          <option key={ index } value={ option }>{option}</option>
        ))}
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
          });
          setData(filteredData(true));
          deleteChanges();
          console.log(changes);
        } }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Header;
