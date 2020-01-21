import React, { useState } from 'react';
import '../../scss/Dropdown.scss';
import DropDownIcon from '../../icon/icons-dropdown.png';

const Dropdown = ({ format, setFormat }) => {

    const [displayMenu, setDisplayMenu] = useState(false);
    const formats = ["DVD", "VHS", "Blue-ray"];

    const showDropdownMenu = (event) => {
        event.preventDefault();
        setDisplayMenu(!displayMenu);
    }

    const hideDropdownMenu = (value) => {
        setFormat(value);
        setDisplayMenu(false);
    }
    return (
        <div className="dropdown">
            <button className="display" placeholder="Format" onClick={showDropdownMenu}>{format ? <p>{format}</p> : <p>Format</p>}<img src={DropDownIcon} alt="dropdown" /></button>
            {displayMenu ? (
                <div className="dropdown_buttons">
                    {formats.map(format => <button className="dropdown_button" key={format} onClick={() => { hideDropdownMenu(format) }}><p>{format}</p></button>)}
                </div>
            ) :
                (
                    null
                )
            }

        </div>

    );
}

export default Dropdown;
