import logoSongScope from "../../../styles/logoSongScope.svg";
import { logout, useAuth, upload } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../../recoil/atoms/username";


export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userState);

  return (
    <header>
      <img src={logoSongScope}></img>
      <div>
        <a
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Descobrir
        </a>
        <a
          onClick={() => {
            navigate("/feed");
          }}
        >
          Recomendados
        </a>

        <a
          onClick={async (e) => {
            e.preventDefault();
            logout();
            alert("Logged Out");
            window.sessionStorage.clear();
            navigate("/login");
          }}
        >
          Log Out
        </a>

        <div className="displayWelcome">
          welcome, {username} 
        </div>
      </div>
    </header>
  );
}
