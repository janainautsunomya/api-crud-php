import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/user/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Criar usuario</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Nome: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Telefone: </label>
                            </th>
                            <td> 
                                <input type="text" name="phone" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Data de Nascimento: </label>
                            </th>
                            <td>
                                <input type="date" name="birth_date" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>CPF: </label>
                            </th>
                            <td>
                                <input type="text" name="cpf" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>RG: </label>
                            </th>
                            <td>
                                <input type="text" name="rg" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Endereço: </label>
                            </th>
                            <td>
                                <input type="text" name="address" onChange={handleChange} />
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
