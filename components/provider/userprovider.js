import React, { useState } from 'react';
import UserContext from '../../context/userContext';

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const updateUserData = (data) => {
        setUserData(data);
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
