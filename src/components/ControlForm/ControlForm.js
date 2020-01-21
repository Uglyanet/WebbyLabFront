import React from 'react';
import Popup from 'reactjs-popup';
import '../../scss/ControlForm.scss';
import ArrowUp from '../../icon/icons-up.png';
import ArrowDown from '../../icon/icons-down.png';
import AddFilmsPopup from '../AddFilmsPopup/AddFilmsPopup';
import UploadFile from '../UploadFile/UploadFile';

const ControlForm = ({ films, sorting, searchLine, setSearchLine, radio, setRadio, forceRerender, setForceRerender }) => {

    return (
        <div className="controlForm">
            <form className="searchForm">
                <input placeholder="Search" className="searchInput" type="text" value={searchLine} onChange={(e) => { setSearchLine(e.target.value) }} />
                <div>
                    <p className="searchOptionText">Choose search option</p>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="option-one"
                            name="selector"
                            value="title"
                            checked={radio === "title"}
                            onChange={() => { setRadio("title") }} />
                        <label htmlFor="option-one">Title</label>
                        <input
                            type="radio"
                            id="option-two"
                            name="selector"
                            value="stars"
                            checked={radio === "stars"}
                            onChange={() => { setRadio("stars") }} />
                        <label htmlFor="option-two">Stars</label>
                    </div>
                </div>
            </form>
            <div className="sortingButtons">
                <button className="button up" onClick={() => { sorting(1) }}><p>Sort by alphabet</p><img src={ArrowUp} alt="arrow up" /></button>
                <button className="button down" onClick={() => { sorting(0) }}><p>Sort by alphabet</p><img src={ArrowDown} alt="arrow down" /></button>
            </div>
            <Popup modal trigger={<button className="button">Upload File</button>}>
                <UploadFile films={films} />
            </Popup>
            <Popup modal trigger={<button className="button">Add Film</button>}>
                <AddFilmsPopup films={films} forceRerender={forceRerender} setForceRerender={setForceRerender} />
            </Popup>
        </div >
    );
}

export default ControlForm;
