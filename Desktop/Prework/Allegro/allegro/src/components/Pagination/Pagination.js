import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'
import PropTypes from 'prop-types';

const Pagination = ({ count, handlePageChangeMethod }) => {

    return (
        <>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={count}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChangeMethod}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </>
    )
};

Pagination.propTypes = {
    count: PropTypes.number,
    name: PropTypes.string
};

export default Pagination; 