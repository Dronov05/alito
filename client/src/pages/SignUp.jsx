import Menu from "../components/menu";
import {useState} from "react";
import emailValidator from 'email-validator';
export default function SignUp() {

    const [user, setUser] = useState({email: '', password: ''})
    const [repeatPassword, setRepeatPassword] = useState('')
    const [message, setMessage] = useState('')

    function changeUser(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }

    async function submitHandler() {
        setMessage('')
        if (!user.email || !user.password || !repeatPassword) {
    setMessage('Необходимо заполнить все поля ниже')
            return
        }
        if(repeatPassword !== user.password) {
            setMessage('Пароли не совпадают')
            return
        }
        if(!emailValidator.validate(user.email)) {
            setMessage('Неверный email')
            return
        }

        const res = await fetch('http://localhost:9001/users/signup', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        if(data.ok) {
            setMessage('Регистрация прошла успешно. Сейчас вы будете перенаправлены в личный кабинет')
        } else {
            setMessage('Пользователь с таким email уже зарегиститрован!')
        }
    }

    return (
        <div>
            <Menu />
            <div className={'container'}>
                <h1 className={'sign-up__title'}>
                    Регистрация
                </h1>
                <div className={'message'}>{message}</div>
                <form className={'sign-up'}>
                    <label className={'sign-up__label'}>Email
                        <input type={'text'} name={'email'} onChange={e => changeUser('email', e.target.value)} value={user.email}/></label>

                    <label className={'sign-up__label'}>Пароль
                        <input type={'password'} onChange={e => changeUser('password', e.target.value)} value={user.password}/></label>

                    <label className={'sign-up__label'}>Пароль ещё раз
                        <input type={'password'} onChange={e => setRepeatPassword(e.target.value)}/></label>

                    <button className={'button-sign-up'} type={'button'} onClick={submitHandler}>Зарегистироваться</button>
                </form>
            </div>

        </div>
    )
}