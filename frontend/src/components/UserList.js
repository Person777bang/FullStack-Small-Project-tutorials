import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const UserList = () => {
const [users, setUser] = useState([]);
 
useEffect(()=>{
    getUsers();
},[]);

const getUsers = async () =>{
    const response = await axios.get('http://localhost:5000/users');
    console.log(response.data);
    setUser(response.data);
}

    const deleteUser = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="columns mt-6 is-centered">
        <div className="column is-two-thirds">
            <h1 className="page-title">Data Pengguna</h1>

            <div className="card-container">
                <div className="mb-4">
                    <Link to={`/add`} className='button btn-luxury mr-2'>+ Add New</Link>
                    <Link to={`/products`} className='button btn-outline-luxury'>Product List</Link>
                </div>

                <table className="table is-fullwidth table-luxury">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Umur</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.umur}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <Link to={`edit/${user.id}`} className='button action-btn btn-outline-luxury mr-2'>Edit</Link>
                                    <button onClick={() => deleteUser(user.id)} className='button action-btn btn-luxury'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)};
export default UserList;