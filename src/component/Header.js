import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
// import estreladamorte from '../img/estreladamorte.gif';

function Header() {
  const { filter: { filterByName: { name } }, setFilter,
    filter, column, data,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue, setData,
    changes,
    deleteChanges,
    filterExclude,
    setFilterExclude,
    setChanges,
    applyFiltersData,
    columnChanges,
    sortOrderColumn, setSortOrderColumn,
  } = useContext(PlanetContext);

  const functionSortRegular = (columnFunc, sortFunc) => {
    const planetsWithOutUnknown = [];
    const planetsWithUnknown = [];
    const planetsSort = [];
    data.forEach((planet) => {
      if (planet[columnFunc] === 'unknown') {
        planetsWithUnknown.push(planet);
      } else {
        planetsWithOutUnknown.push(planet[columnFunc]);
      }
    });
    if (sortFunc === 'ASC') {
      planetsWithOutUnknown.sort((a, b) => a - b);
    }
    if (sortFunc === 'DESC') {
      planetsWithOutUnknown.sort((a, b) => b - a);
    }
    planetsWithOutUnknown.forEach((number) => {
      data.forEach((planet2) => {
        if (planet2[columnFunc] === number) {
          planetsSort.push(planet2);
        }
      });
    });
    const allPlanetsSort = [
      ...planetsSort,
      ...planetsWithUnknown,
    ];
    setData(allPlanetsSort);
  };
  return (
    <div>
      {/* <img src={ estreladamorte } alt="starwars" /> */}
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
          setData(applyFiltersData([...filterExclude, { column, comparison, value }]));
          deleteChanges();
          // console.log(changes);
          setFilterExclude([...filterExclude, { column, comparison, value }]);
        } }
      >
        Filtrar
      </button>
      <ul>
        {filterExclude.map((item, index) => (
          <li
            data-testid="filter"
            key={ index }
          >
            {`${item.column} ${item.comparison} ${item.value}`}
            <button
              type="button"
              onClick={ () => {
                const newFilterExclude = filterExclude.filter((_, i) => i !== index);
                setFilterExclude(newFilterExclude);
                setChanges(
                  {
                    ...changes,
                    [item.column]: [item.column],
                  },
                );
                // console.log(changes);
                const newApplyFiltersData = applyFiltersData(newFilterExclude);
                setData(newApplyFiltersData);
              } }
            >
              Delete

            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setFilterExclude([]);
          setChanges(columnChanges);
          // console.log(changes);
          const newApplyFiltersData = applyFiltersData([]);
          setData(newApplyFiltersData);
        } }
      >
        Delete All

      </button>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => {
          setSortOrderColumn({
            ...sortOrderColumn,
            order: {
              ...sortOrderColumn.order,
              column: target.value,
            },
          });
        } }
        value={ sortOrderColumn.order.column }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="input-radio">
        Ascendente
        <input
          id="input-radio"
          data-testid="column-sort-input-asc"
          type="radio"
          name="order"
          value="ASC"
          onChange={ ({ target }) => {
            setSortOrderColumn({
              ...sortOrderColumn,
              order: {
                ...sortOrderColumn.order,
                sort: target.value,
              },
            });
          } }
        />
      </label>
      <label htmlFor="input-radio2">
        Descendente
        <input
          id="input-radio2"
          data-testid="column-sort-input-desc"
          type="radio"
          name="order"
          value="DESC"
          onChange={ ({ target }) => {
            console.log(target.value);
            setSortOrderColumn({
              ...sortOrderColumn,
              order: {
                ...sortOrderColumn.order,
                sort: target.value,
              },
            });
          } }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {
          functionSortRegular(sortOrderColumn.order.column,
            sortOrderColumn.order.sort);
        } }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Header;
