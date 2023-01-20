import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ByType from './ByType';
import Card from './Card';
import Pagination from './Pagination';

const GetPokemons = ({ pokemons, setPokemons }) => {
    const perPage = 20
    const [page, setPage] = useState(1)
    const lastIndex = perPage * page
    
    let shortRoutePokemons
    let shortRouteCount
    const route = () => {
        if(pokemons?.results){
            shortRoutePokemons = pokemons?.results
            shortRouteCount = pokemons?.count
        } else {
            shortRoutePokemons = pokemons.pokemon
            shortRouteCount = pokemons.pokemon?.length
        }
    }
    route()

    const pokemonsToShow = shortRoutePokemons?.slice(lastIndex - perPage, lastIndex)

    const totalPages = Math.ceil( shortRouteCount / perPage);

    const arrayIteracion = []
    const iteracion = () => {
        for (let i = 1; i <= totalPages; i++) {
            arrayIteracion.push(i)
        }
    }
    iteracion()

    let acces
    const selectAcces = () => {
        if (totalPages > 10) {
        if (page > totalPages - 5) {
            acces = arrayIteracion.slice(totalPages - 10, totalPages)
        } else if (page > 5) {
            acces = arrayIteracion.slice(page - 5, page + 5)
        } else {
            acces = arrayIteracion.slice(0, 10)
        }} else {
            acces = arrayIteracion.slice(0, totalPages)
        }
    }
    selectAcces()

    const getPokemonsType = (obj) => {
        setPage(1)
        axios.get(obj)
            .then(res => setPokemons(res.data))
    }

    return (
        <div>
            <ByType getPokemonsType={getPokemonsType} />
            <div className='pokemon__container'>
            {pokemonsToShow?.map((pokemon) => (
                <Card key={pokemon.url ? pokemon.url : pokemon.pokemon.url} url={pokemon.url ? pokemon.url : pokemon.pokemon.url}/>
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

export default GetPokemons;
