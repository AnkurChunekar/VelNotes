import { Link } from "react-router-dom";
import { homepageGif, logoBlue } from "../../assets";
import "./Landing.css";

export function Landing() {
  return (
    <>
      <nav className="flex ai-center jc-space-b homepage-nav flex-wrap">
        <div className="nav-brand flex flex-center">
          <img className="brand-logo" src={logoBlue} alt="Brand Logo" />
          <a className="brand fw-600"> VelNotes </a>
        </div>
        <div className="nav-actions">
          <Link to="/login">
            <button className="btn-unset">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-dark m-xs btn-unset">Sign Up</button>
          </Link>
        </div>
      </nav>
      <main className="flex notes-homepage ai-center jc-space-e">
        <div>
          <div className="text-content flex flex-column">
            <h1 className="fw-600 title">
              All your notes, Organised, Effortlessly.
            </h1>
            <p className="gray-text subtitle">
              Inspiration strikes anywhere, VelNotes helps you capture, organize
              and save you ideas, across all platforms.
            </p>
            <Link to="/notes">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
        <img
          className="notes-illustration"
          src={homepageGif}
          alt="man with notes illustration"
        />
      </main>
      <svg
        className="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#84D2F6"
          fillOpacity={1}
          d="M0,96L40,106.7C80,117,160,139,240,144C320,149,400,139,480,112C560,85,640,43,720,69.3C800,96,880,192,960,218.7C1040,245,1120,203,1200,165.3C1280,128,1360,96,1400,80L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
    </>
  );
}
