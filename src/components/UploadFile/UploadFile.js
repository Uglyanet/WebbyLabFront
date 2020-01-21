import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/UploadFile.scss';


const UploadFile = ({films}) => {
    const [fileName, setFileName] = useState('')
    const [data, setData] = useState([])
    const [titles, setTitles] = useState([])
    const [releaseYears, setReleaseYears] = useState([])
    const [formats, setFormats] = useState([])
    const [stars, setStars] = useState([])
    const [posted, setPosted] = useState(false)

    const uploadFile = (e) => {
        const reader = new FileReader();
        setFileName(reader.fileName);
        reader.onload = handleFileLoad;
        reader.readAsText(e.target.files[0]);
    }

    const handleFileLoad = (event) => {
        setData(event.target.result.split('\n'));
    }

    const sortingBetweenArray = () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes('Title: ')) {
                setTitles(titles.push(data[i].replace(/Title: /g, '').replace(/\r/g, '')))
            }
            if (data[i].includes('Release Year: ')) {
                setReleaseYears(releaseYears.push(data[i].replace(/Release Year: /g, '').replace(/\r/g, '')))
            }
            if (data[i].includes('Format: ')) {
                setFormats(formats.push(data[i].replace(/Format: /g, '').replace(/\r/g, '')))
            }
            if (data[i].includes('Stars: ')) {
                setStars(stars.push(data[i].replace(/Stars: /g, '').replace(/\r/g, '')))
            }
        }
        for (let i = 0; i < titles.length; i++) {
            postFilms(i);
        }
    }

    const compareArray = (i, film) => {
        return (stars[i].split(', ').filter((star, index) => { return index === stars[i].split(', ').indexOf(star) }).sort().join(', ') !== film.stars.sort().join(', '))
    }

    const postFilms = (i) => {
        if (films.filter(film => (film.title !== titles[i]) || (Number(film.release_year) !== Number(releaseYears[i])) || (film.format !== formats[i]) || (compareArray(i, film))).length === films.length) {
            axios.post(`http://localhost:4000/api/films`, {
                title: titles[i],
                release_year: Number(releaseYears[i]),
                format: formats[i],
                stars: stars[i].split(', ').filter((star, index) => { return index === stars[i].split(', ').indexOf(star) })
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                            setPosted(true);
                })
        }

    }


    return (
        <div >
            {!posted &&
                <div className="upload">
                    <input id="fileInput" type="file" name="file" className="chooseFile" onChange={(e) => { uploadFile(e) }} />
                    <p>{fileName}</p>
                    <button className="sendButton" onClick={() => { sortingBetweenArray() }}>send</button>
                </div>
            }

            {posted && <div>
                <button className="button" onClick={() => { window.location.reload() }}>
                    &times;
                </button>
                <p style={{ color: "black" }}>All movies with correct data was successfully added to the collection.</p>
            </div>}

        </div>
    )

}

export default UploadFile;
