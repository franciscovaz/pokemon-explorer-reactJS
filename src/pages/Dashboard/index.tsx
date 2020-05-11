import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import pokeLogo from '../../assets/pokemon.png';

import api from '../../services/api';

import { Title, Form, Error, PokemonsList } from './styles';

interface Pokemon {
  name: string;
  abilities: Array<{}>;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

const Dashboard: React.FC = () => {
  const [newPoke, setNewPoke] = useState('');
  const [inputError, setInputError] = useState('');

  const [pokemons, setPokemons] = useState<Pokemon[]>(() => {
    const storedPokemons = localStorage.getItem('@PokemonExplorer: pokemons');

    if (storedPokemons) {
      return JSON.parse(storedPokemons);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@PokemonExplorer: pokemons',
      JSON.stringify(pokemons),
    );

    console.log(pokemons[0].types[0].type.name);
  }, [pokemons]);

  async function handleAddPokemon(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newPoke) {
      setInputError('Digite o nome do pokemon.');
      return;
    }

    try {
      const response = await api.get<Pokemon>(`pokemon/${newPoke}`);

      const pokemon = response.data;

      setPokemons([...pokemons, pokemon]);

      setInputError('');
      setNewPoke('');
    } catch (err) {
      setInputError('Erro na busca do pokemon.');
    }
  }
  return (
    <>
      <img src={pokeLogo} width="150px" alt="Pokemon Explorer" />
      <Title>Explore Pokémons usando o Pokedex </Title>
      <Form hasError={!!inputError} onSubmit={handleAddPokemon}>
        <input
          value={newPoke}
          onChange={e => setNewPoke(e.target.value)}
          placeholder="Digite o nome do pokémon"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <PokemonsList>
        {pokemons.map(pokemon => (
          <Link key={pokemon.name} to={`/info/${pokemon.name}`}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div>
              <strong>{pokemon.name}</strong>
              <p>
                <b>Número de abilidades:</b> {pokemon.abilities.length} |{' '}
                <b>Experiência base:</b> {pokemon.base_experience}
              </p>

              <p>
                <b>Tipo Principal:</b> {pokemon.types[0].type.name}
              </p>
            </div>
          </Link>
        ))}
      </PokemonsList>
    </>
  );
};

export default Dashboard;
