import React, { useState } from 'react';
import '../styles/Account_Style.css';
import TableAccount from '../components/TableAccount.jsx';
import useSearchSubs from '../utils/useSearchSubs.js';
import { MdPersonSearch } from "react-icons/md";

function Account() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const { searchResults, isLoading } = useSearchSubs(searchQuery);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearchQuery(''); 
    };

    return (
        <div className='div-account'>
            <h1>Cuentas</h1>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Buscar...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MdPersonSearch />
                <br />
            </div>
                <div>
                    {Array.isArray(searchResults) && searchResults.length > 0 && (
                    <ul className='search-results'>
                        {searchResults.map(user => (
                            <li key={user.id_Subscription} onClick={() => handleSelectUser(user)}>
                                {user.name_user}
                            </li>
                        ))}
                    </ul>
                    )}
                </div>

            {selectedUser ? (
                <TableAccount userName={selectedUser.name_user} userPass={selectedUser.password} />
            ) : (
                <p>Selecciona un usuario</p>
            )}
        </div>
    );
}

export default Account;