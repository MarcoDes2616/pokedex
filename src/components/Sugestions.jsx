import React from 'react';

const Sugestions = ({suggestions, setSearch}) => {
    
    return (
        <ul>
            {
                suggestions?.map((suggestion) => (
                    <li key={suggestion} onClick={() => setSearch(suggestion)}>{suggestion}</li>
                ))
            }
        </ul>
    );
};

export default Sugestions;