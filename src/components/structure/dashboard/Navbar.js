import logo from "../../../styles/logo.svg";

import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/atoms/username";
import { logout } from "../../../config/firebase";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userState);

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <h1>SOUNDSCOPE</h1>
      </div>

      <div>
        <a
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          RECOMENDAR
        </a>
        <a
          onClick={() => {
            navigate("/feed");
          }}
        >
          DESCOBRIR
        </a>

        <a
          onClick={async (e) => {
            e.preventDefault();
            logout();
            alert("Logged Out");
            window.sessionStorage.clear();
            setUsername("");
            navigate("/login");
          }}
        >
          SAIR
        </a>

        <div className="displayWelcome">Olá, {username}</div>
      </div>
    </header>
  );
}
