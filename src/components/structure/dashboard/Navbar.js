import logoSongScope from "../../../styles/logoSongScope.svg";
import { logout, useAuth, upload } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

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
      </div>
    </header>
  );
}
