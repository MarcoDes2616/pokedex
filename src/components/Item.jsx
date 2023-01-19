import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Item = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => setPokemon(res.data) )
    }, [])

    return (
        <div>
            pokemon {id}
            <img src={pokemon.sprites?.other.home.front_default} alt="" />
            <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
};

export default Item;