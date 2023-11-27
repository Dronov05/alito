import Menu from "../components/Menu";
import {useState} from "react";
import emailValidator from 'email-validator';
import {useNavigate} from "react-router-dom";
export default function SignUp({server_host}) {
    const [user, setUser] = useState({email: '', password: ''})
    const [repeatPassword, setRepeatPassword] = useState('')
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate()

    function changeUser(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }

    async function submitHandler() {
        setDisabled(true)
        setMessage('')
        if (!user.email || !user.password || !repeatPassword) {
    setMessage('Необходимо заполнить все поля ниже')
            setDisabled(false)
            return
        }
        if(repeatPassword !== user.password) {
            setMessage('Пароли не совпадают')
            setDisabled(false)
            return
        }
        if(!emailValidator.validate(user.email)) {
            setMessage('Неверный email')
            setDisabled(false)
            return
        }

        const res = await fetch(server_host +'/users/signup', {
        // const res = await fetch(/*server_host +*/ 'http://localhost:9001/users/signup', {
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
            navigate('/dashboard')
        } else {
            setDisabled(false)
            setMessage('Пользователь с таким email уже зарегиститрован!')
        }
    }

    return (
        <div>
            <Menu server_host={server_host}/>
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

                    <button className={'button-sign-up'} type={'button'} onClick={submitHandler} disabled={disabled}>Зарегистироваться</button>
                </form>
            </div>

        </div>
    )
}