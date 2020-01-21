import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/AddFilmsPopup.scss'
import Dropdown from '../Dropdown/Dropdown';


const AddFilmsPopup = ({ films, forceRerender, setForceRerender }) => {

    const [title, setTitle] = useState('');
    const [release_year, setReleaseYear] = useState('');
    const [format, setFormat] = useState('');
    const [enterStars, setEnterStars] = useState('');
    const [posted, setPosted] = useState(false);
    const [repeat, setRepeat] = useState(true);
    const [confirmYear, setConfirmYear] = useState(false);

    const checkYear = (year) => {
        setReleaseYear(year);
        if (year > 1850 && year < 2020) {
            setConfirmYear(true);
        } else {
            setConfirmYear(false);
        }
    }

    const compareArray = (film) => {
        return (enterStars.split(', ').filter((star, index) => { return index === enterStars.split(', ').indexOf(star) }).sort().join(', ') !== film.stars.sort().join(', '))
    }

    const povtor = (e) => {
        e.preventDefault();
        if (films.filter(film => (film.title !== title) || (Number(film.release_year) !== Number(release_year)) || (film.format !== format) || (compareArray(film))).length === films.length) {
            handlAdd();
            setRepeat(true);
        }
        else {
            setRepeat(false);
        }
    }

    const handlAdd = () => {
        axios.post(`http://ec2-18-185-132-63.eu-central-1.compute.amazonaws.com:4000/api/films`, {
            title: title,
            release_year: release_year,
            format: format,
            stars: enterStars.split(', ').filter((star, index) => { return index === enterStars.split(', ').indexOf(star) })
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setPosted(true);
            })
    }

    return (
        <div>{!posted &&
            <form className="addFilmForm">
                <button className="button" onClick={() => { setForceRerender(!forceRerender) }}>
                    &times;
                </button>
                <div className="inputInst">
                    <input className="addInput" placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <p>Enter the title of film</p>
                </div>
                <div className="inputInst">
                    <input className="addInput" placeholder="Released year" type="text" value={release_year} onChange={(e) => checkYear(e.target.value.replace(/[^0-9]/gim, ''))} />
                    <p>Enter the relesed year of film(only digits)</p>
                </div>
                <div className="inputInst">
                    <Dropdown format={format} setFormat={setFormat} />
                    <p>Enter the format of film</p>
                </div>
                <div className="inputInst">
                    <input className="addInput" placeholder="Stars" type="text" value={enterStars} onChange={(e) => { setEnterStars(e.target.value.replace(/[0-9.*+?!@#%_~+=&;'"./<>:`№/^${}()|[\]\\]/gim, '')) }} />
                    <p>Enter the stars of film(Example: Max Bezvugliak, Steve Jobs)</p>
                </div>
                <button className="button" type="submit" onClick={(e) => { povtor(e) }} disabled={!title || !confirmYear || !format || !enterStars}>Add to list</button>
                {!repeat && <p>Sorry, but this movie is already on the list.</p>}
            </form>
        }
            {posted &&
                <div>
                    <button className="button" onClick={() => { window.location.reload() }}>
                        &times;
                    </button>
                    <p style={{ color: "black" }}>The movie was successfully added to the collection.</p>
                </div>}
        </div>


    );
}

export default AddFilmsPopup;