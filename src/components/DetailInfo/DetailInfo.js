import React, {useState} from 'react';
import '../../scss/DetailInfo.scss';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

const DetailInfo = ({ film, setDetail, handleDelete}) => {
    const [confirmDel, setConfirmDel] = useState(false);
    return (
        <div className="detailInfo">
            <p>Release year: {film.release_year}</p>
            <p>Format: {film.format}</p>
            <p>List of Stars:</p>
            <div className="listOfStars">
                {film.stars.map((star, i) => (
                    <a key={i} className="actorLink" href={`https://www.google.ru/search?q=${star}`} target="_blank" rel="noopener noreferrer">{star} </a>
                ))}
            </div>
            <div className="buttons">
                <button className="buttonLeft" onClick={() => setConfirmDel(film._id)}>DELETE FILM FROM LIST</button>
                <button className="buttonRight" onClick={() => { setDetail(false) }}>Close</button>
            </div>
            {confirmDel === film._id && <ConfirmDelete title={film.title} id={film._id} setConfirmDel={setConfirmDel} handleDelete={handleDelete} />}
        </div >
    );
}

export default DetailInfo;