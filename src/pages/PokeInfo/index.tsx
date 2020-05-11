import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { useRouteMatch, Link } from 'react-router-dom';

import api from '../../services/api';
import pokeLogo from '../../assets/pokemon.png';

import { Header, PokemonInfo } from './styles';

interface PokemonParams {
  pokemon_name: string;
}

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

const PokeInfo: React.FC = () => {
  const { params } = useRouteMatch<PokemonParams>();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    api.get(`/pokemon/${params.pokemon_name}`).then(response => {
      setPokemon(response.data);
    });
  }, [params.pokemon_name]);

  return (
    <>
      <Header>
        <img src={pokeLogo} width="150px" alt="Pokemon Explorer" />
        <Link to="/">
          <FiArrowLeft size={16} />
          Voltar
        </Link>
      </Header>
      {pokemon && (
        <PokemonInfo>
          <header>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <strong>{pokemon.name}</strong>
          </header>
        </PokemonInfo>
      )}
    </>
  );
};

export default PokeInfo;
