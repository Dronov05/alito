import Menu from "../components/Menu";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login({server_host}) {

    const [user, setUser] = useState({email: '', password: ''})
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

async function login() {
    setMessage('')
    if(!user.email || !user.password) {
        setMessage('Заполните оба поля')
    }

    const res = await fetch(server_host + '/users/login', {
    // const res = await fetch(/*server_host + */'http://localhost:9001/users/login', {
        method: 'post',
        mode: "no-cors",
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // const data = await res.json();
    // if ( data.ok) {
    //     setMessage('Сейчас будет выполнена переадресация')
    //     navigate('/dashboard')
    // } else {
    //     setMessage('Неверный логин или пароль')
    // }
}

    function changeUser(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <div>
            <Menu server_host={server_host}/>
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