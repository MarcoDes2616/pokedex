import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
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
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={pokemonSelected}>Search</button>
            <div className='pokemon__container'>
                {pokemonsToShow?.map((pokemon) => (
                    <div key={pokemon.url}>
                        <GetPokemons url={pokemon.url} />
                    </div>
                ))
                }
            </div>
            {acces?.map((num) => (
                <button key={num} onClick={() => setPage(num)}>
                    <Pagination num={num} />
                </button>

            ))
            }
        </div>
    );
};

export default Pokedex;