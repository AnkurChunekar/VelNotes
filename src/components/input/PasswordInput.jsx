import { useState } from "react";

export function PasswordInput({
  labelText, id, name, placeholder, setUserData, userData,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`input-wrapper m-xxxs m-rl0 ${userData.passwordsDifferent ? "error" : ""}`}
    >
      <label htmlFor={id}> {labelText} </label>
      <div className="input-wrapper bd-rad-sm input-w-btn flex flex-row ai-center m-xxs m-rl0">
        <input
          type={isVisible ? "text" : "password"}
          className="p-xxs input"
          placeholder={placeholder}
          name={name}
          value={userData[name]}
          onChange={(e) => setUserData({ ...userData, [name]: e.target.value })} />
        <div
          className="p-xxs gray-text input-btn"
          onClick={() => setIsVisible((pv) => !pv)}
        >
          <i className={`fa-solid ${isVisible ? "fa-eye" : "fa-eye-slash"}`} />
        </div>
      </div>
      <label className="error-msg fs-6">Passwords Don't Match</label>
    </div>
  );
}
