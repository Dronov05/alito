import Menu from "../components/Menu";

export default function Home({server_host}) {
    return (
        <div>
            <Menu server_host={server_host}/>
            <div className={'container'}>
                <h1>
                    Главная
                </h1>
            </div>

        </div>
    )
}