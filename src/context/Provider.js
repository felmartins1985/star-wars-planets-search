import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ApiPlanets from '../services/ApiPlanets';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [data, setData] = useState([]); // criação de um estado para armazenar os dados da API;
  const [isLoading, setIsLoading] = useState(true); // criação de um estado para armazenar o status de carregamento da API;
  const [column, setColumn] = useState('population'); // estado criado para mexer especificamente com a coluna
  const [comparison, setComparison] = useState('maior que'); // estado criado para mexer especificamente com a comparison
  const [value, setValue] = useState('0'); // estado criado para mexer especificamente com o value
  const [data2, setData2] = useState([]);
  const columnChanges = { // req 05
    population: 'population',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    rotation_period: 'rotation_period',
    surface_water: 'surface_water',
  };
  const [filterExclude, setFilterExclude] = useState([]); // req 06
  const [changes, setChanges] = useState(columnChanges); // req 05
  const [sortOrderColumn, setSortOrderColumn] = useState({ // req 07
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  const [filter, setFilter] = useState({ // é esse estado que salva o que estou escrevendo para filtrar os planetas que procuro
    filterByName: {
      name: '',
    },
    filterByNumericValues: [ // esse estado salva os valores numericos que estou escrevendo para filtrar os planetas que procuro
      {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      }],
  });
  const orderInitialPlanets = (requestApi) => { // req 07
    const arrayOrderInitial = [];
    const arrayOrderInitialPlanets = requestApi.map((planet) => planet.name); // faço um map para retornar só os nomes dos planetas e faço um sort nos nomes
    arrayOrderInitialPlanets.sort();
    arrayOrderInitialPlanets.forEach((planet) => { // para cada nome de planeta eu faço um foreach
      // dentro de cada planeta, eu faço um outro foreach utilizando a resposta da api
      // depois faço uma condicional analisando se o nome do planeta é igual ao nome do planeta que vem na api
      // se for igual, eu adiciono o planeta na arrayorderinitial com todos os seus valores
      requestApi.forEach((planetApi) => {
        if (planet === planetApi.name) {
          arrayOrderInitial.push(planetApi);
        }
      });
    });
    return arrayOrderInitial;
  };
  const requestPlanets = async () => {
    // função criada para pegar a API de planetas e deletar a chave results da API
    // eu crio 2 datas e chamo aqui dentro para poder mexer com um deles completo depois
    // faço o isloading falso para que, assim que tiver a resposta da api, os componentes apareçam
    const request = await ApiPlanets();
    request.results.map((result) => delete result.residents);
    setData(orderInitialPlanets(request.results)); // chamo a função orderInitialPlanets para quando eu entrar na pagina os planetas ja venham ordenados
    setData2(request.results);
    setIsLoading(false);
  };
  // função usada para deletar o filtro que ja foi utilizado
  // eu crio uma constante para receber os changes ja usados e peço para deletar a column utilizada e seto o novo changes sem o que foi deletado
  const deleteChanges = () => {
    const newChanges = changes;
    delete newChanges[column];
    setChanges(newChanges);
  };

  useEffect(() => { // chamo a função de requestPlanets quando o componente for montado para aparecer os planetas asssim que entrar na pagina
    requestPlanets();
  }, []);

  // const applyFiltersData = (filterArray) => { // essa função serve para filtrar o data
  //   let arrayInitial = data2; // é o resultado da API sem ser modificado
  //   filterArray.forEach((singFilterArray) => { // para cada componente do array que eu passo como parametro faço um forEach
  //     arrayInitial = arrayInitial.filter((planet) => { // eu chamo o data completo e faço um filter para cada planeta
  //       if (singFilterArray.comparison === 'maior que') { // se no array que eu passo como parametro o comparison for maior que, eu retorno o planeta que possua a coluna usada como filtro maior que o valor da chave value do paramentro passado
  //         return Number(planet[singFilterArray.column]) > Number(singFilterArray.value);
  //       }
  //       if (singFilterArray.comparison === 'menor que') {
  //         return Number(planet[singFilterArray.column]) < Number(singFilterArray.value);
  //       }
  //       return planet[singFilterArray.column] === singFilterArray.value;
  //     });
  //   });
  //   return arrayInitial;
  // };
  const applyFiltersData = (arrayFilter) => arrayFilter
    .reduce((arrayInitial, filterMap) => arrayInitial.filter((planets) => {
      switch (filterMap.comparison) {
      case 'maior que':
        return Number(planets[filterMap.column]) > filterMap.value;
      case 'menor que':
        return Number(planets[filterMap.column]) < filterMap.value;
      case 'igual a':
        return planets[filterMap.column] === filterMap.value;
      default:
        return '';
      }
    }), data2);

  const context = {
    applyFiltersData,
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
    filterExclude,
    setFilterExclude,
    columnChanges,
    sortOrderColumn,
    setSortOrderColumn,
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
