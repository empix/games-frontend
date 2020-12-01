import React, { useState } from 'react';

import './style.css';

import { FiTrash2 } from 'react-icons/fi';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import api from '../../services/api';

export default function ListData() {
  const [allData, setAllData] = useState([]);
  const [currentRoute, setCurrentRoute] = useState('');

  async function getData(route) {
    try {
      const { data: result } = await api.get(route);

      setAllData(result);
      setCurrentRoute(route);
    } catch (err) {
      alert('Ocorreu um erro inesperado!');
    }
  }

  async function handleDeleteData(id) {
    try {
      await api.delete(`${currentRoute}/${id}`);

      setAllData(allData.filter((data) => data.id !== id));
    } catch (err) {
      alert('Ocorreu um erro inesperado!');
    }
  }

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="data-selection">
          <button
            onClick={() => {
              getData('/engines');
            }}
          >
            Engines
          </button>
          <button
            onClick={() => {
              getData('/genres');
            }}
          >
            Genres
          </button>
          <button
            onClick={() => {
              getData('/developers');
            }}
          >
            Developers
          </button>
          <button
            onClick={() => {
              getData('/publishers');
            }}
          >
            Publishers
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {allData.length > 0 &&
                  Object.keys(allData[0]).map((prop) => (
                    <th key={prop}>{prop}</th>
                  ))}
                {allData.length > 0 && <th>Options</th>}
              </tr>
            </thead>
            <tbody>
              {allData.length > 0 &&
                allData.map((data) => (
                  <tr key={data.id}>
                    {Object.entries(data).map(([columnName, columnData]) => (
                      <td key={`${columnName}-${data.id}`}>{columnData}</td>
                    ))}
                    <td>
                      <button onClick={() => handleDeleteData(data.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {allData.length === 0 && (
            <h1 className="not-found">Não foi encontrado nenhum dado :(</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
