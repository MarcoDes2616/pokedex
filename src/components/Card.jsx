import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from "../assets/img/avatar.png";
import axios from 'axios';

const Card = ({url}) => {
    const [pokemon, setPokemon] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
    }, [])
    
    const getImage = () => {
        if (pokemon.sprites?.other.home.front_default) {
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

export default Card;