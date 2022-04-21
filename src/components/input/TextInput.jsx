export function TextInput({
    labelText,
    id,
    name,
    placeholder,
    type,
    setUserData,
    userData,
  }) {
    return (
      <div className="input-wrapper m-xxxs m-rl0">
        {labelText ? <label htmlFor={id}> {labelText} </label> : null}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          onChange={(e) => setUserData({ ...userData, [name]: e.target.value })}
          value={userData[name]}
          className="input p-xxs m-xxs m-rl0 bd-rad-sm"
          required
        />
      </div>
    );
  }
