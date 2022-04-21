import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context";
import { EditLabelModal } from "../modals/EditLabelModal";
import { logoWhite } from "../../assets";
import "./AsideNav.css";

export function AsideNav() {
  const [labelModalVisible, setIsLabelModalVisible] = useState(false);
  const [sideNavCompressed, setSideNavCompressed] = useState(false);
  const { userLogoutService } = useAuth();

  return (
    <nav
      className={`side-nav flex flex-column ${
        sideNavCompressed ? "compressed" : ""
      }`}
    >
      <div className="brand-container flex ai-center">
        <button
          onClick={() =>
            setSideNavCompressed((sideNavCompressed) => !sideNavCompressed)
          }
          className="ham-icon btn-unset"
        >
          <i className="fas fa-bars" />
        </button>
        <div className="nav-brand flex flex-center">
          <img className="brand-logo" src={logoWhite} alt="Brand Logo" />
          <a className="brand fw-600"> Notes </a>
        </div>
      </div>

      <NavLink to="/home/notes" className="item">
        <span>
          <i className="fa-solid fa-lightbulb" />
        </span>
        <span className="text"> Notes </span>
      </NavLink>

      <button onClick={() => setIsLabelModalVisible(true)} className="item">
        <span>
          <i className="fa-solid fa-pen" />
        </span>
        <span className="text"> Edit Labels </span>
      </button>

      <NavLink to="/home/archive" className="item">
        <span>
          <i className="fa-solid fa-box-archive" />
        </span>
        <span className="text"> Archive </span>
      </NavLink>

      <NavLink to="/home/trash" className="item">
        <span>
          <i className="fa-solid fa-trash" />
        </span>
        <span className="text"> Trash </span>
      </NavLink>

      <button onClick={userLogoutService} className="item">
        <span>
          <i className="fa-solid fa-right-from-bracket" />
        </span>
        <span className="text"> Logout </span>
      </button>

      {labelModalVisible ? (
        <EditLabelModal
          labelModalVisible={labelModalVisible}
          setIsLabelModalVisible={setIsLabelModalVisible}
        />
      ) : null}
    </nav>
  );
}
