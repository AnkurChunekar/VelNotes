import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth, useTags } from "../../context";
import { EditTagsModal } from "../modals/EditTagsModal";
import { capitalizeString } from "../../helpers";
import { logoWhite } from "../../assets";
import "./AsideNav.css";

export function AsideNav() {
  const [sideNavCompressed, setSideNavCompressed] = useState(false);
  const { userLogoutService } = useAuth();

  const {
    tagsState: { tags, tagsModalVisible },
    tagsDispatch,
  } = useTags();

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

      <NavLink to="/notes" className="item">
        <span>
          <i className="fa-solid fa-lightbulb" />
        </span>
        <span className="text"> Notes </span>
      </NavLink>

      {tags.map((item) => (
        <NavLink key={item.id} to={`/tags/${item.tagName}`} className="item">
          <span>
            <i className="fa-solid fa-tag" />
          </span>
          <span className="text"> {capitalizeString(item.tagName)} </span>
        </NavLink>
      ))}

      <button
        onClick={() => tagsDispatch({ type: "TOGGLE_TAG_MODAL_VISIBILITY" })}
        className="item"
      >
        <span>
          <i className="fa-solid fa-pen" />
        </span>
        <span className="text"> Edit Tags </span>
      </button>

      <NavLink to="/archive" className="item">
        <span>
          <i className="fa-solid fa-box-archive" />
        </span>
        <span className="text"> Archive </span>
      </NavLink>

      <NavLink to="/trash" className="item">
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

      {tagsModalVisible ? <EditTagsModal /> : null}
    </nav>
  );
}
