import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import { AsideNav, CreateNoteModal, FilterRow } from "../../components";
import "./MainWrapper.css";

export function MainWrapper({ children }) {
  const { pathname } = useLocation();
  const { authState, userLogoutService } = useAuth();

  const user = authState.user || JSON.parse(localStorage.getItem("user"));

  const [createNoteModalVisible, setCreateNoteModalVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/notes":
        return "Notes";
      case "/trash":
        return "Trash";
      case "/archive":
        return "Archive";
      default:
        return "Notes";
    }
  };

  const publicPathnames = ["/", "/login", "/signup"];

  return publicPathnames.includes(pathname) ? (
    <> {children} </>
  ) : (
    <div className="flex page-container">
      <AsideNav />

      {/* Header for notes */}

      <main className="notes-page w-100pc">
        <header className="page-header flex jc-space-b p-s">
          <div className="input-wrapper bd-rad-sm input-w-btn">
            <input
              type="text"
              className="p-xxs"
              placeholder="Search All Notes here.."
            />
            <button className="p-xxs btn-unset search-icon">
              <i className="fas fa-search" />
            </button>
          </div>
          <button
            onClick={() => setAccountMenuVisible((pv) => !pv)}
            className="user-profile btn-unset flex"
          >
            <div className="flex flex-column ai-end jc-center m-xs m-tb0">
              <span className="gray-text fs-6"> Welcome </span>

              {user ? (
                <span>
                  {user.firstName + " " + user.lastName}{" "}
                  <i
                    className={`fas fa-caret-${
                      accountMenuVisible ? "up" : "down"
                    }`}
                  />
                </span>
              ) : null}
            </div>
            <img
              className="profile-img"
              src="https://raw.githubusercontent.com/AnkurChunekar/VelocityUI/development/images/avatar-image1.jpg"
              alt="user profile"
            />
          </button>

          {accountMenuVisible ? (
            <div className="account-menu flex flex-column">
              <button onClick={userLogoutService}>Logout</button>
            </div>
          ) : null}
        </header>
        <section className="notes-header flex">
          <h1 className="fw-600 fs-2">
            {getPageTitle(pathname)}{" "}
            <span className="gray-text fs-4">(12)</span>
          </h1>
          <div className="m-left-auto flex ai-center c-gap-1rem">
            <FilterRow />

            <button
              onClick={() => setCreateNoteModalVisible(true)}
              className="btn btn-primary"
            >
              <i className="fas fa-plus" /> Create Note
            </button>
          </div>
          {createNoteModalVisible ? (
            <CreateNoteModal
              setCreateNoteModalVisible={setCreateNoteModalVisible}
            />
          ) : null}
        </section>
        {children}
      </main>
    </div>
  );
}
