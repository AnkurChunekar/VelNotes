import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, useNotes } from "../../context";
import {
  AsideNav,
  CreateNoteModal,
  FilterRow,
} from "../../components";
import "./Home.css";

export function Home() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authState, userLogoutService } = useAuth();
  const { getNotesData } = useNotes();
  const user = authState.user || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (pathname === "/home") {
      navigate("/home/notes");
    }
  }, []);

  useEffect(() => {
    getNotesData();
  }, []);

  const [labelModalVisible, setIsLabelModalVisible] = useState(false);
  const [createNoteModalVisible, setCreateNoteModalVisible] = useState(false);
  const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/home/notes":
        return "Notes";
      case "/home/trash":
        return "Trash";
      case "/home/archive":
        return "Archive";
      default:
        return "Notes";
    }
  };

  return (
    <div className="flex page-container">
      <AsideNav
        labelModalVisible={labelModalVisible}
        setIsLabelModalVisible={setIsLabelModalVisible}
      />

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
              <span>
                {user.firstName + " " + user.lastName}{" "}
                <i
                  className={`fas fa-caret-${
                    accountMenuVisible ? "up" : "down"
                  }`}
                />
              </span>
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
          <div className="m-left-auto">
            <button
              onClick={() => setCreateNoteModalVisible(true)}
              className="btn btn-primary"
            >
              <i className="fas fa-plus" /> Create New Note
            </button>
          </div>
          {createNoteModalVisible ? (
            <CreateNoteModal
              labelModalVisible={labelModalVisible}
              setIsLabelModalVisible={setIsLabelModalVisible}
              setCreateNoteModalVisible={setCreateNoteModalVisible}
            />
          ) : null}
        </section>
        <FilterRow />
        <Outlet context={[setIsLabelModalVisible]} />
      </main>
    </div>
  );
}
