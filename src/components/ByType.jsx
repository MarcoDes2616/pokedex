import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ByType = ({getPokemonsType}) => {
    const [pokemonsType, setPokemonsType] = useState([])

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setPokemonsType(res.data?.results))
    }, [])

    return (
        <select name="" id="" onChange={e => getPokemonsType(e.target.value)}>
            <option default value="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279">AllPokemons</option>
            {
                pokemonsType.map((obj) => (
                    <option key={obj.name} value={obj.url}>{obj.name}</option>
                ))
            }
        </select>
    );
};

export default ByType;