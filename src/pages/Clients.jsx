import React,{useState} from 'react';
import '../styles/Clients_Style.css';
import NavBar from '../components/NavBar';

function Clients() {
    const [isNavHidden, setIsNavHidden] = useState(false);
    const handleToggleNav = (isHidden) => {
        setIsNavHidden(isHidden);
    };
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telephone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo al backend
        console.log("Cliente agregado:", formData);
        // Opcional: Limpiar el formulario después del envío
        setFormData({ name: "", email: "", phone: "" });
    };

    return (
        <>
            <div className={`clients ${isNavHidden ? 'expanded' : ''}`}>
                <h1>Clientes</h1> 
                <form onSubmit={handleSubmit}>
                   
                   <div>
                        <label htmlFor="iName">Nombre:</label>
                        <input type="text" name='name' id='iName'
                        value={formData.name}
                        onChange={handleChange}
                        required/>
                   </div>
                   
                    <div>
                        <label htmlFor="iEmail">Correo:</label>
                        <input type="email"  id='iEmail'
                            placeholder='client@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            required/>
                    </div>
                    
                    <div>
                        <label htmlFor="telephone">Teléfono:</label>
                        <input type="tel" name="telephone" id="nTel" 
                            placeholder='951-000-00-00'
                            value={formData.telephone}
                            onChange={handleChange}
                            required/>
                    </div>
                    
                    
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </>
    )
}

export default Clients;