import React, { useState, useEffect, FormEvent } from 'react';

import pokeLogo from '../../assets/pokemon.png';

import api from '../../services/api';

import { Title, Form } from './styles';

const Dashboard: React.FC = () => {
  const [newPoke, setNewPoke] = useState('');

  async function handleAddPokemon(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    try {
      const response = await api.get(`pokemon/${newPoke}`);

      const pokemon = response.data;

      console.log('Pokemon: ', pokemon);
    } catch (err) {
      console.log('Apanhei um erro: ', err);
    }
  }
  return (
    <>
      <img src={pokeLogo} width="150px" alt="Pokemon Explorer" />
      <Title>Explore Pokémons como no Pokedex </Title>
      <Form onSubmit={handleAddPokemon}>
        <input
          value={newPoke}
          onChange={e => setNewPoke(e.target.value)}
          placeholder="Digite o nome do pokémon"
        />
        <button type="submit">Pesquisar</button>
      </Form>
    </>
  );
};

export default Dashboard;
