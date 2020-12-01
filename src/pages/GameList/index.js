import React, { useEffect, useState } from 'react';

import './style.css';

import { FiTrash2, FiEdit } from 'react-icons/fi';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import api from '../../services/api';

export default function ListGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get('games').then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleDeleteGame(id) {
    try {
      await api.delete(`/games/${id}`);

      setGames(games.filter((game) => game.id !== id));
    } catch (err) {
      alert('Ocorreu um erro inesperado!');
    }
  }

  return (
    <div className="container">
      <Header />
      <section className="content">
        {games.map((game) => (
          <div className="game" key={game.id}>
            <h1 className="title">{game.name}</h1>
            <div className="details">
              <p>
                <strong>Release Date:</strong>{' '}
                {new Date(game.release_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Genres:</strong>{' '}
                {game.genres.map((genre) => genre.name).join(', ')}
              </p>
              <p>
                <strong>Engine:</strong> {game.engine.name}
              </p>
              <p>
                <strong>Developers: </strong>{' '}
                {game.developers.map((developer) => developer.name).join(', ')}
              </p>
              <p>
                <strong>Publishers: </strong>{' '}
                {game.publishers.map((publisher) => publisher.name).join(', ')}
              </p>
            </div>
            <p className="description">
              <strong>Description:</strong> {game.description}
            </p>
            <div className="actions">
              <button type="button" onClick={() => handleDeleteGame(game.id)}>
                <FiTrash2 size={20} color="#222" />
              </button>
              <button type="button">
                <FiEdit size={20} color="#222" />
              </button>
            </div>
          </div>
        ))}
        {games.length === 0 && (
          <h1 className="not-found">Não foi encontrado nenhum jogo :(</h1>
        )}
      </section>
      <Footer />
    </div>
  );
}
