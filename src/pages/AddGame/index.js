import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import api from '../../services/api';

export default function AddGame() {
  const [name, setName] = useState('');
  const [release, setRelease] = useState('');
  const [description, setDescription] = useState('');
  const [engine, setEngine] = useState('');
  const [genres, setGenres] = useState('');
  const [developers, setDevelopers] = useState('');
  const [publishers, setPublishers] = useState('');

  const history = useHistory();

  async function handleAddGame(event) {
    event.preventDefault();

    const data = {
      name,
      release_date: release,
      description,
    };

    try {
      const { data: engineData } = await api.post('/engines', { name: engine });
      data.engine_id = engineData.id;

      data.genres_ids = await Promise.all(
        genres.split(', ').map(async (genre) => {
          const { data: genreData } = await api.post('/genres', {
            name: genre,
          });

          return genreData.id;
        })
      );

      data.developers_ids = await Promise.all(
        developers.split(', ').map(async (developer) => {
          const { data: developerData } = await api.post('/developers', {
            name: developer,
          });

          return developerData.id;
        })
      );

      data.publishers_ids = await Promise.all(
        publishers.split(', ').map(async (publisher) => {
          const { data: publisherData } = await api.post('/publishers', {
            name: publisher,
          });

          return publisherData.id;
        })
      );

      await api.post('/games', data);

      history.push('/');
    } catch (err) {
      alert('Ocorreu um erro inesperado!');
    }
  }

  return (
    <div className="container">
      <Header />
      <section className="content">
        <form onSubmit={handleAddGame}>
          <div className="input-box">
            <label htmlFor="name">Name:</label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>

          <div className="input-box">
            <label htmlFor="release">Release:</label>
            <input
              required
              type="date"
              id="release"
              value={release}
              onChange={({ target }) => setRelease(target.value)}
            />
          </div>

          <div className="input-box">
            <label htmlFor="description">Description:</label>
            <textarea
              required
              id="description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </div>

          <div className="input-box">
            <label htmlFor="engine">Engine:</label>
            <input
              required
              type="text"
              id="engine"
              value={engine}
              onChange={({ target }) => setEngine(target.value)}
            />
          </div>

          <div className="input-box">
            <label htmlFor="genres">Genres:</label>
            <input
              required
              type="text"
              id="genres"
              value={genres}
              onChange={({ target }) => setGenres(target.value)}
            />
          </div>

          <div className="input-box">
            <label htmlFor="developers">Developers:</label>
            <input
              required
              type="text"
              id="developers"
              value={developers}
              onChange={({ target }) => setDevelopers(target.value)}
            />
          </div>

          <div className="input-box">
            <label htmlFor="publishers">Publishers:</label>
            <input
              required
              type="text"
              id="publishers"
              value={publishers}
              onChange={({ target }) => setPublishers(target.value)}
            />
          </div>

          <div className="action">
            <button type="submit">ADD GAME</button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
}
