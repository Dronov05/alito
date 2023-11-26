import Menu from "../components/Menu";
import {useEffect, useState} from "react";

export default function Admin({server_host}) {

    const [users, setUsers] = useState([])

    useEffect(loadUsers, [])

    function loadUsers() {
        fetch(server_host + '/users/get/all', {
            method: 'GET',
            credentials: 'include',
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.ok) {
                setUsers(data.users)
            }
        })
    }

    return (
        <div>
            <Menu server_host={server_host}/>
            <div className={'container'}>
                <h1>
                    Админ
                </h1>
                <div>Вы администратор</div>
                <div>
                    <table>
                        <thead>
                        <td>Email</td>
                        <td>password</td>
                        <td>role</td>
                        </thead>
                        <tbody>
                            {users.map(user => <tr><td>{user.email}</td><td>{user.password}</td><td>{user.role}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}