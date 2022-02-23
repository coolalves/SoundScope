import logoSongScope from '../../../styles/logoSongScope.svg'


export default function Navbar (){

    return(
        <navbar>
            <img src={logoSongScope}></img>
            <div>
                <a>Descobrir</a>
                <a>Recomendados</a>
            </div>
        </navbar>
    )
}