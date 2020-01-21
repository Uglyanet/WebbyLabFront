import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../scss/ListOfFilms.scss';
import DetailInfo from '../DetailInfo/DetailInfo';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import Pagination from '../Pagination/Pagination';

const ListOfFilms = ({ films, setFilms, forceRerender, setForceRerender, searchLine, radio }) => {

    const [detail, setDetail] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPost - postsPerPage;

    const paginate = (number) => {
        setCurrentPage(number);
    }

    useEffect(() => {
        axios.get('http://ec2-18-185-132-63.eu-central-1.compute.amazonaws.com:4000/api/films')
            .then(res => {
                console.log(res);
                setFilms(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = (id) => {
        films.splice(films.findIndex(item => item._id === id), 1);
        axios.delete(`http://ec2-18-185-132-63.eu-central-1.compute.amazonaws.com:4000/api/films/${id}`)
        setForceRerender(!forceRerender);
        console.log(films);
    }

    const searching = (searchLine, radio) => {
        if (radio === "title") {
            return (x) => {
                return x.title.toLowerCase().includes(searchLine.toLowerCase()) || !searchLine;
            }
        } else {
            return (x) => {
                return x.stars.find(actor => actor.toLowerCase().includes(searchLine.toLowerCase()));
            }
        }
    }

    return (
        <div className="listOfFilms">
            {films.filter(searching(searchLine, radio)).slice(indexOfFirstPage, indexOfLastPost).map((film) => (
                <div key={film._id} className="film">
                    <p className="title" >{film.title}</p>
                    {detail !== film._id &&
                        <div className="buttons">
                            <button className="buttonLeft" onClick={() => setConfirmDel(film._id)}>DELETE FILM FROM LIST</button>
                            <button className="buttonRight" onClick={() => { setDetail(film._id) }}>DETAIL INFO</button>
                        </div>}
                    {detail === film._id && <DetailInfo film={film} setDetail={setDetail} handleDelete={handleDelete} />}
                    {confirmDel === film._id && <ConfirmDelete title={film.title} id={film._id} setConfirmDel={setConfirmDel} handleDelete={handleDelete} />}
                </div>
            ))}
            {films.filter(searching(searchLine, radio)).length > 5 && <Pagination postsPerPage={postsPerPage} totalPosts={films.filter(searching(searchLine, radio)).length} paginate={paginate} currentPage={currentPage} />}
            {films.filter(searching(searchLine, radio)).length === 0 && <p className="title">Sorry library is empty. You can add film to library</p>}
        </div>
    );
}

export default ListOfFilms;
