import Menu from "../components/menu";
import {useEffect, useState} from "react";

export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(loadUsers,[]);

    function loadUsers() {
        fetch('http://localhost:9001/users/get/all', {
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
            <Menu />
            <div className={'container'}>
                <h1>
                    Позьзователи
                </h1>
                <div>{JSON.stringify(users)}</div>
            </div>

        </div>
    )
}