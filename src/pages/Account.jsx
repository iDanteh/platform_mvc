import React, { useEffect, useState } from 'react';
import '../styles/Account_Style.css';
import TableAccount from '../components/TableAccount.jsx';
import useSearchUsers from '../utils/useSearchUsers.js';
import { MdPersonSearch } from "react-icons/md";
function Account(){
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const { searchResults, isLoading } = useSearchUsers(searchQuery);

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
                {Array.isArray(searchResults) && searchResults.length > 0 && (
                    <ul className='search-results'>
                        {searchResults.map(user => (
                            <li key={user.id_User} onClick={() => handleSelectUser(user)}>
                                {user.nombre_user}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            { selectedUser ? (
                <TableAccount />
            ):(
                <p>Selecciona un usuario</p>
            )}
            
        </div>
    );
}
export default Account;