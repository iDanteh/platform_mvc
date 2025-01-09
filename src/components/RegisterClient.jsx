import React from 'react';

function RegisterClient({ client }) {
    return (
        <div className="client-item">
            <span>{client.name}</span> {}
        </div>
    );
}

export default RegisterClient;
