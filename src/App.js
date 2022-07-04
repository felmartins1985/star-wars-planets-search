import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './component/Table';
import Header from './component/Header';

function App() {
  return (
    <Provider>
      <Header />
      <div className="tableDiv">
        <Table />
      </div>
    </Provider>
  );
}

export default App;
