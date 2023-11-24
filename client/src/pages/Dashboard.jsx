import Menu from "../components/menu";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

export default function Dashboard({server_host}) {

    const [loading, setLoading] = useState(true)
    const [needAuth, setNeedAuth] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            await checkAuth()
        })()
    }, [])

    async function checkAuth() {
        const res = await fetch(server_host + '/users/check/auth', {
            method: "POST",
            credentials: 'include'
        })
        const data = await res.json()

        if (data.ok) {
            setLoading(false)
            await loadData()
        } else {
            setNeedAuth(true)
            setLoading(false)
        }
    }

    async function loadData() {
        const res = await fetch(server_host + '/users/me/', {
            method: "GET",
            credentials: 'include'
        })
        const data = await res.json()

        if (data.ok) {
            setUser(data.user)
        }
    }

    if (loading) {
        return (
            <div className={'container dashboard__title'}>
                <h3>Загрузка...</h3>
            </div>
        )
    }

    if(needAuth) {
        return (
            <div className={'container dashboard__title'}>
                <h3>Необходимо авторизоваться</h3>
                <div><NavLink to={'/login'}>Перейти на форму входа</NavLink></div>
            </div>
        )
    }

    return (
        <div>
            <Menu />
            <div className={'container'}>
                <h1>
                    Личный кабинет
                </h1>
                <div>{JSON.stringify(user)}</div>
                <div><a href={server_host + "/users/logout"}>Выход</a></div>
            </div>
        </div>
    )
}