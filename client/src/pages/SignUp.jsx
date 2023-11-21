import Menu from "../components/menu";
import {useState} from "react";

export default function SignUp() {

    const [user, setUser] = useState({})

    return (
        <div>
            <Menu />
            <div className={'container text-center'}>
                <h1 className={'sign-up__title'}>
                    Регистрация
                </h1>
                <div className={'message'}></div>
                <form className={'sign-up'}>
                    <label className={'sign-up__label'}>Email
                        <input type={'text'} name={'email'}/></label>

                    <label className={'sign-up__label'}>Пароль
                        <input type={'password'} /></label>

                    <label className={'sign-up__label'}>Пароль ещё раз
                        <input type={'password'} /></label>

                    <button type={'button'}>Зарегистироваться</button>
                </form>
            </div>

        </div>
    )
}

// time video 55-22