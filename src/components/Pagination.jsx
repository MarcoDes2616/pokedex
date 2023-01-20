import React from 'react';

const Pagination = ({num, setPage, page}) => {

    return (
        <button onClick={() => setPage(num)}>
            {num}
        </button >
    );
};

export default Pagination;