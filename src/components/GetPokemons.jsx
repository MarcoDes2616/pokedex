import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import avatar from "../assets/img/avatar.png"

const GetPokemons = ({ url }) => {
    const [pokemon, setPokemon] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
    }, [])

    const getImage = () => {
        if (pokemon.sprites?.other.home.front_default){
            return pokemon.sprites?.other.home.front_default
        } else {
            return avatar
        }
    }

    return (
        <div onClick={() => navigate(`/pokedex/${pokemon.id}`)}>
            pokemon: {pokemon.name}
            <img width={"100px"} src={getImage()} alt="" />
        </div>
    );
};

export default GetPokemons;
