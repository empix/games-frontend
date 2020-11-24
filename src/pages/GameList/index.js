import React from 'react';

import './style.css';

import { FiTrash2, FiEdit } from 'react-icons/fi';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ListGames() {
  return (
    <div className="container">
      <Header />
      <section className="list-container">
        {(() => {
          let games = [];

          for (let i = 0; i < 10; i++) {
            games.push(
              <div className="game" key={i}>
                <h1 className="title">Undertale</h1>
                <div className="details">
                  <p>
                    <strong>Release Date:</strong> 15/09/2015
                  </p>
                  <p>
                    <strong>Genres:</strong> Adventure, Indie, Role-playing
                    (RPG), Shooter, Turn-based strategy (TBS)
                  </p>
                  <p>
                    <strong>Developer</strong> tobyfox
                  </p>
                  <p>
                    <strong>Publisher</strong> tobyfox
                  </p>
                </div>
                <p className="description">
                  <strong>Description:</strong> A small child falls into the
                  Underground, where monsters have long been banished by humans
                  and are hunting every human that they find. The player
                  controls the child as they try to make it back to the Surface
                  through hostile environments, all the while engaging with a
                  turn-based combat system with puzzle-solving and bullet hell
                  elements, as well as other unconventional game mechanics.
                </p>
                <div className="actions">
                  <button type="button">
                    <FiTrash2 size={20} color="#eee" />
                  </button>
                  <button type="button">
                    <FiEdit size={20} color="#eee" />
                  </button>
                </div>
              </div>
            );
          }

          return games;
        })()}
      </section>
      <Footer />
    </div>
  );
}
