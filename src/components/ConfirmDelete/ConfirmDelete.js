import React, { useState } from 'react';
import '../../scss/ConfirmDelete.scss';

const ConfirmDelete = ({ title, id, setConfirmDel, handleDelete }) => {
    const [buttonStatus, setButtonStatus] = useState(false);


    const confirm = (e) => {
        if (e.target.value === title) {
            setButtonStatus(true);
        } else {
            setButtonStatus(false);
        }
    }

    return (
        <div >
            <p>Input the film title</p>
            <div className="confirm">
                <input placeholder="TITLE" className="delInput" onChange={(e) => { confirm(e) }} />
                <button disabled={!buttonStatus} className="med_button" onClick={() => { handleDelete(id) }}>Confirm Delete</button>
                <button className="left_button" onClick={() => { setConfirmDel(false) }}>Close</button>
            </div>

        </div >
    );
}

export default ConfirmDelete;