import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './component/Table';
import Header from './component/Header';

function App() {
  return (
    <Provider>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;
