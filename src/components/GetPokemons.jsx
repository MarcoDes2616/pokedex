import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetPokemons = ({ url }) => {
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
    }, [])

    return (
        <Link to={`/pokedex/${pokemon.id}`}>
            <div>
                pokemon: {pokemon.name}
                <img width={"100px"} src={pokemon.sprites?.other.home.front_default} alt="" />
            </div>
        </Link>
    );
};

export default GetPokemons;
