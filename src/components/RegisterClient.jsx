import React, {useState} from 'react';

function RegisterClient({ client }) {
    const [informacionModal, setInfoModal] = useState(false);

    const handleInfoClient = () => setInfoModal(true);
    const handleCloseInfoClient = () => setInfoModal(false);
    return (
        <>
            <div className="client-item" onClick={handleInfoClient}>
                <span>{`${client.nombre_user} ${client.apellido_pat} ${client.apellido_mat}`}</span>
                <button className='btn-icon-trash'>
                    <img src="../src/assets/svg/bxs-trash-alt.svg"/>
                </button>
            </div>

            {informacionModal && (
                <div className="modal-info-client">
                    <div className="modal">
                        <h3>Información del Cliente</h3>
                        <br />
                        <p> {client.nombre_user} {client.apellido_pat} {client.apellido_mat}</p>
                        <p><strong>Teléfono:</strong> {client.phone_user}</p>
                        <p><strong>Correo:</strong> {client.email}</p><br />
                        <button>Editar</button>
                        <button onClick={handleCloseInfoClient}>Cerrar</button>
                    </div>
                </div>
            )}
            
        </>
        
    );
}

export default RegisterClient;
