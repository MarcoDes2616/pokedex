import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GetPokemons from './GetPokemons';
import Pagination from './Pagination';

const Pokedex = () => {
    const perPage = 20
    const [page, setPage] = useState(1)
    const lastParam = perPage * page
    const [pokemons, setPokemons] = useState({})
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const username = useSelector(state => state.username);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279`)
            .then(res => setPokemons(res.data))
    }, [])

    const pokemonsToShow = pokemons.results?.slice(lastParam - perPage, lastParam);

    const totalPages = Math.ceil(pokemons.count / perPage);

    const arrayIteracion = []
    const iteracion = () => {
        for (let i = 1; i <= totalPages; i++) {
            arrayIteracion.push(i)
        }
    }
    iteracion()

    let acces
    const selectAcces = () => {
        if (page > totalPages - 5) {
            acces = arrayIteracion.slice(totalPages - 10, totalPages)
        } else if (page > 5) {
            acces = arrayIteracion.slice(page - 5, page + 5)
        } else {
            acces = arrayIteracion.slice(0, 10)
        }
    }
    selectAcces()

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
            <div className='pokemon__container'>
                {pokemonsToShow?.map((pokemon) => (
                    <GetPokemons url={pokemon.url} key={pokemon.url} />
                ))
                }
            </div>
            <div className='acces__container'>
                <h4>{page}</h4>
            {acces?.map((num) => (
                <Pagination num={num} key={num} setPage={setPage} page={page}/>
            ))
            }
            </div>
        </div>
    );
};

export default Pokedex;