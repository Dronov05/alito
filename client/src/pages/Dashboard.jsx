import Menu from "../components/Menu";
import {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

export default function Dashboard({server_host}) {

    const [loading, setLoading] = useState(true)
    const [needAuth, setNeedAuth] = useState(false)
    const [user, setUser] = useState({username: ''})
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate()
    const navigateToMain = useNavigate()

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
                {/*{navigate('/login')}*/}
            </div>
        )
    }

    function changeUser(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }

    async function save(){
        setDisabled(true)
        setMessage('')
        const res = await fetch(/*server_host +*/ "http://localhost:9001/users/update", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setDisabled(false)
        if(data.ok) {
            setMessage('Изменения сохранены')
        } else {
            setMessage('Ошибка')
        }
    }

    return (
        <div>
            <Menu server_host={server_host}/>
            <div className={'container'}>
                <h1>
                    Личный кабинет
                </h1>
                <div>{message}</div>
                <form className={'dashboard-form'}>
                    <label>Username
                        <input type={"text"} value={user.username} onChange={e => changeUser('username', e.target.value)}/>
                    </label>
                    <div>
                        <button onClick={save} disabled={disabled}>Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}