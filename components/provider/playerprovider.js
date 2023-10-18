import React, { useState } from 'react';
import PlayerContext from '../../context/playerContext';

const PlayerProvider = ({ children }) => {
    const [playerData, setPlayerData] = useState(null);

    const updatePlayerData = (data) => {
        setPlayerData(data);
    };

    return (
        <PlayerContext.Provider value={{ playerData, updatePlayerData }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
