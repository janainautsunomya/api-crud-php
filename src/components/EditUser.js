import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:8080/api/user/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8080/api/user/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Editar usuario</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Nome: </label>
                            </th>
                            <td>
                                <input value={inputs.name} type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Telefone: </label>
                            </th>
                            <td> 
                                <input value={inputs.phone} type="text" name="phone" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Data de Nascimento: </label>
                            </th>
                            <td>
                                <input value={inputs.birth_date} type="text" name="birth_date" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>CPF: </label>
                            </th>
                            <td>
                                <input value={inputs.cpf} type="text" name="cpf" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>RG: </label>
                            </th>
                            <td>
                                <input value={inputs.rg} type="text" name="rg" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Endereço: </label>
                            </th>
                            <td>
                                <input value={inputs.address} type="text" name="address" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            
                            <td colSpan="2" align ="right">
                                <button>Salvar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
