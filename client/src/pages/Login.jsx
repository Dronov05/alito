import Menu from "../components/menu";
import {useState} from "react";
import {func} from "prop-types";

export default function Login({server_host}) {

    const [user, setUser] = useState({email: '', password: ''})
    const [message, setMessage] = useState('')

async function login() {
    setMessage('')
    if(!user.email || !user.password) {
        setMessage('Заполните оба поля')
    }

    const res = await fetch(server_host + '/users/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
}

    function changeUser(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <div>
            <Menu/>
            <div className={'container'}>
                <h1 className={'sign-up__title'}>
                    Вход
                </h1>
                <div  className={'message'}>{message}</div>
                <div>
                    <form className={'login'}>
                        <div>
                            <input type={'text'} name={'email'} placeholder={'email'} onChange={e => changeUser('email', e.target.value)} value={user.email}/>
                        </div>
                        <div>
                            <input type={'password'} name={'password'} placeholder={'пароль'} onChange={e => changeUser('password', e.target.value)} value={user.password}/>
                        </div>
                        <button className={'button-login'} type={'button'} onClick={login}>Войти</button>
                    </form>
                </div>
            </div>
        </div>
    )
}