import React from 'react'
import '../../scss/Pagination.scss'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <button className="numberButton" key={number} onClick={() => { paginate(number) }} href="!#" style={(number) === currentPage ? { color: "white", backgroundColor: "#2979ff" } : null}>
                        {number}
                    </button>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;