/* eslint-disable max-lines */
import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import darthvaderback from '../img/darthvaderback.gif';
import starWarsLogo from '../img/star-wars-logo.png';
import './Header.css';

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
    data.forEach((planet) => {
      if (planet[columnFunc] === 'unknown') { // se a chave column tiver como valor unkown
        planetsWithUnknown.push(planet);
      } else { // se a chave column tiver como valor diferente de unkown
        planetsWithOutUnknown.push(planet);
      }
    });
    // if (sortFunc === 'ASC') { // se a chave sortFunc for igual a ASC eu faço um sort dos planetas sem unkown
    //   planetsWithOutUnknown.sort((a, b) => a[columnFunc] - b[columnFunc]);
    // }
    // if (sortFunc === 'DESC') { // se a chave sortFunc for igual a DESC eu faço um sort dos planetas sem unkown
    //   planetsWithOutUnknown.sort((a, b) => b[columnFunc] - a[columnFunc]);
    // }
    if (sortFunc === 'ASC') { // se a chave sortFunc for igual a ASC eu faço um sort dos planetas com unkown
      // planetsWithOutUnknown.sort((a, b) => a[columnFunc] - b[columnFunc]);
      setData([...planetsWithUnknown,
        ...planetsWithOutUnknown.sort((a, b) => a[columnFunc] - b[columnFunc])]);
      // console.log(planetsWithOutUnknown2);
    } else {
      setData([...planetsWithOutUnknown
        .sort((a, b) => b[columnFunc] - a[columnFunc]), ...planetsWithUnknown]);
    }
  };
  return (
    <div className="Headers form-group">
      <img className="image" src={ starWarsLogo } alt="starWarsLogo" />
      <img className="dartdeathstar" src={ darthvaderback } alt="darthvaderback" />
      {/* <img className="dartvader" src={ darthvader } alt="darthvader" /> */}

      <div className="typePlanetName">
        <input
          className="form-control"
          data-testid="name-filter"
          placeholder="Digite o nome do planeta"
          value={ name }
          onChange={ (e) => setFilter({ // essa função criada joga dentro do filter, filterByName, name, o que estou digitando no input
            ...filter,
            filterByName: { name: e.target.value },
          }) }
        />
      </div>

      <div className="filterDiv">
        <select
          data-testid="column-filter"
          className="form-control dropdown-toggle"
          value={ column }
          onChange={ (e) => {
            setColumn(e.target.value); // envio o valor do select para o setColumn para poder enviar depois
          } }
        >
          {/* requisito 05==> retorna as chaves do state changes atualizadas a cada momento q eu retiro umas das opçoes da column */}
          {Object.keys(changes).map((option, index) => (
            <option
              className="form-control"
              key={ index }
              value={ option }
            >
              {option}

            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          className="form-control"
          value={ comparison }
          onChange={ (e) => { setComparison(e.target.value); } }// envio o valor do select para o setComparison para poder enviar depois
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          className="form-control"
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ (e) => { setValue(e.target.value); } }
        />
        <button
          className="btn btn-warning btn-filter"
          type="button"
          data-testid="button-filter"
          onClick={ () => { // ao clicar no botao filtrar, ele chama a função setFilter e vai definir na chave filterByNumericValues, o valor do column, o valor da comparison e o valor do value que eu pus ao chamar o set de cada uma no onChange
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
            deleteChanges(); // chamo a changes aqui para deletar a column filtrada para nao poder ser usada depois
            // console.log(changes);
            setFilterExclude([...filterExclude, { column, comparison, value }]); // é nessa função que eu demonstro o column que vai ser excluido da lista de column e os valores passados para filtrar
          } }
        >
          Filtrar
        </button>

        <select
          className="form-control"
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
          <option className="form-control" value="population">population</option>
          <option className="form-control" value="orbital_period">orbital_period</option>
          <option className="form-control" value="diameter">diameter</option>
          <option
            className="form-control"
            value="rotation_period"
          >
            rotation_period
          </option>
          <option className="form-control" value="surface_water">surface_water</option>
        </select>
        <label htmlFor="input-radio">

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
          ASC
        </label>
        <label htmlFor="input-radio2">

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
          DSC
        </label>
        <button
          className="btn btn-info"
          type="button"
          data-testid="column-sort-button"
          onClick={ () => {
            functionSortRegular(sortOrderColumn.order.column,
              sortOrderColumn.order.sort); // recebe esses parametros, que são definidos nos Onchange do ascendente e do descendente e no onChange da linha 157 que define qual column vai ser usada, para ordenar da forma correta
          } }
        >
          Ordenar
        </button>
      </div>
      <div className="btn-delete-ul">
        <ul>
          {filterExclude.map((item, index) => ( // aqui que aparece os filtros utilizados
            <li
              data-testid="filter"
              key={ index }
            >
              {`${item.column} ${item.comparison} ${item.value}`}
              <button
                className="btn"
                type="button"
                onClick={ () => { // faço um filtro para excluir o index do filtro excluido
                  const newFilterExclude = filterExclude.filter((_, i) => i !== index);
                  setFilterExclude(newFilterExclude); // aqui eu seto o novo valor do filterExclude sem o index que eu exclui
                  setChanges( // seto o novo changes, que sao as columns
                    {
                      ...changes,
                      [item.column]: [item.column],
                    },
                  );
                  // console.log(changes);
                  const newApplyFiltersData = applyFiltersData(newFilterExclude);
                  setData(newApplyFiltersData); // seto o data novamente para receber todos os valores antigos antes de filtrar
                } }
              >
                <span className="material-symbols-outlined">
                  delete
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-danger btn-delete"
          data-testid="button-remove-filters"
          onClick={ () => {
            setFilterExclude([]);// retiro todos os valores do filterExclude
            setChanges(columnChanges); // recebe os filtros originais
            // console.log(changes);
            const newApplyFiltersData = applyFiltersData([]);
            setData(newApplyFiltersData);// digo que o data vai receber os valores originais
          } }
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
export default Header;
// const functionSortRegular = (columnFunc, sortFunc) => {
//   const planetsWithOutUnknown = [];
//   const planetsWithOutUnknown2 = [];
//   const planetsWithUnknown = [];
//   const planetsSort = [];
//   data.forEach((planet) => {
//     if (planet[columnFunc] === 'unknown') { // se a chave column tiver como valor unkown
//       planetsWithUnknown.push(planet);
//     } else { // se a chave column tiver como valor diferente de unkown
//       planetsWithOutUnknown.push(planet[columnFunc]);
//       planetsWithOutUnknown2.push(planet);
//     }
//   });
//   if (sortFunc === 'ASC') { // se a chave sortFunc for igual a ASC eu faço um sort dos planetas sem unkown
//     planetsWithOutUnknown.sort((a, b) => a - b);
//     planetsWithOutUnknown2.sort((a, b) => a[columnFunc] - b[columnFunc]);
//   }
//   if (sortFunc === 'DESC') { // se a chave sortFunc for igual a DESC eu faço um sort dos planetas sem unkown
//     planetsWithOutUnknown.sort((a, b) => b - a);
//     planetsWithOutUnknown2.sort((a, b) => b[columnFunc] - a[columnFunc]);
//   }
//   planetsWithOutUnknown.forEach((plnt2) => { // para cada planeta adicionado na primeira lista, eu faço um forEach para cada planeta retornado de data
//     data.forEach((planet2) => { // se o valor retornado do planetsWithOutUnknown for igual ao valor retornado planet2[columnFunc] do data, eu  adiciono planet2 no array planetsSort
//       // console.log(planet2, column, plnt2);
//       if (planet2[columnFunc] === plnt2) {
//         planetsSort.push(planet2);
//       }
//     });
//   });
//   console.log(planetsWithOutUnknown2, planetsWithUnknown);
//   if (planetsWithUnknown.length === 0) {
//     setData(planetsWithOutUnknown2);
//     // console.log(planetsWithOutUnknown2);
//   } else {
//     // console.log('teste');
//     // se o array planetsWithUnknown tiver mais de 0 planetas, eu adiciono os planetas como ultimo elemento do array planetsSort
//     const allPlanetsSort = [// array que recebe os planetas ordenados e os que possuem unkown
//       ...planetsSort,
//       ...planetsWithUnknown,
//     ];
//     setData(allPlanetsSort);
//   } // seto o data com os planetas ordenados
// };
