import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ByType from './ByType';
import GetPokemons from './GetPokemons';
import Pagination from './Pagination';
import Sugestions from './Sugestions';

const Pokedex = () => {
    const [pokemons, setPokemons] = useState({})
    const [search, setSearch] = useState("")
    const username = useSelector(state => state.username);
    const [suggestions, setSuggestions] = useState([])
    const navigate = useNavigate();

    //============= Get all pokemons =============
    useEffect(() => {
        getAllPokemons()
    }, [])

    const getAllPokemons = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279`)
            .then(res => setPokemons(res.data))
    }
    //============= Get suggestions =============
    useEffect(() => {
        getAllPokemons()
        if(search != ""){
            let test = pokemons.results?.filter(pokemon =>
                pokemon.name.startsWith(search));
                setSuggestions(test?.map((poke) => poke.name));
            }
        }, [search])

    //============= Get pokemon selected by name =============
    const pokemonSelected = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then(res => navigate(`/pokedex/${res.data.id}`))
    }

    return (
        <div>
            
            <h1>Bienvenido a la pokedex</h1>
            <p>Hola {username}, aca podrás encontrar tus Pokemones favoritos!</p>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={pokemonSelected}>Search</button>
            <Sugestions suggestions={suggestions} setSearch={setSearch} />
            <GetPokemons pokemons={pokemons} setPokemons={setPokemons}/>
        </div>
    );
};

export default Pokedex;