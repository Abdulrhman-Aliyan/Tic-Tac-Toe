import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        console.log("Edit button clicked");
        setIsEditing(editing => !editing);
    }

    function handleChange(event) {
        console.log('event: ' + event)
        console.log('event target: ' + event.target)
        console.log('event target value: ' + event.target.value)
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    }

    return (
        <li className={ isActive ? 'active' : undefined }>
            <span className="player">
                {editablePlayerName}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
