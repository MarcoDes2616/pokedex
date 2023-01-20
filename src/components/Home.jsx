import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../store/slices/username.slice'

const Home = () => {
    const navigate = useNavigate();
    const username = useSelector(state => state.username)
    const [inputName, setImputName] = useState("")

    const dispatch = useDispatch();

    const getPokedex = () => {
        if (inputName != "") {
            dispatch(getUsername(inputName));
            navigate('/pokedex')
        }
    }

    return (
        <div>
            <h1>home</h1>
            <h2>{username}</h2>
            <input type="text" value={inputName} onChange={e => setImputName(e.target.value)} />
            <button onClick={getPokedex}>Ingresar</button>
        </div>
    );
};

export default Home;