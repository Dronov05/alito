import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Menu({server_host}) {

    const [loading, setLoading] = useState(true)
    const [authorised, setAuthorised] = useState(null)
    const [role, setRole] = useState(null)

    useEffect(() => {
        (async () => {
            await checkAuth()
        })()
    }, [])
    async function checkAuth() {
        const res = await fetch(server_host + '/users/check/auth', {
        // const res = await fetch(/*server_host +*/ 'http://localhost:9001/users/check/auth', {
            method: "POST",
            credentials: 'include'
        })
        const data = await res.json()
        console.log(data)
        if (data.ok) {
            setLoading(false)
            setAuthorised(true)
            setRole(data.role)
        } else {
            setLoading(false)
        }
    }

    return(
        <div className={'menu'}>
            <span><NavLink to={'/'}>Главная</NavLink></span>
            {!authorised &&<span><NavLink to={'/login'}>Вход</NavLink></span>}
            {authorised &&<span><NavLink to={'/dashboard'}>Личный кабинет</NavLink></span>}
            {!authorised &&<span><NavLink to={'/signup'}>Регистрация</NavLink></span>}
            {role === 'admin' &&<span><NavLink to={'/admin'}>Админ</NavLink></span>}
            {authorised && <span><a href={server_host + '/users/logout'}>Выход</a></span>}
        </div>
    )
}