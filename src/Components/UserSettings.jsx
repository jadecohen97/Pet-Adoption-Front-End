function UserSettings(){
    // function handleChange(event) {
    //     const value = event.target.value;
    //     setUserInfo({
    //       ...userInfo,
    //       [event.target.name]: value
    //     });
    //   }
    

    
      function SaveUserSettings(event) {
        event.preventDefault();
      }


return(
    <div>
        <form onSubmit={(event) => SaveUserSettings(event)} className="UserProfile">
        <h3>YOUR PROFILE</h3>
        <div className="gridWrapper">
        <input
          className="inputField"
          type="text"
        //   value={userInfo.firstName}
          name="firstName"
        //   onChange={handleChange}
          placeholder="Jade"
        />
        <input
          className="inputField"
          type="text"
        //   value={userInfo.lastName}
          name="lastName"
        //   onChange={handleChange}
          placeholder="last name"
        />
        <input
          className="inputField"
          type="email"
        //   value={userInfo.email}
          name="email"
        //   onChange={handleChange}
          placeholder="email"
        />
        <input
          className="inputField"
          type="tel"
        //   value={userInfo.cellNo}
          name="cellNo"
        //   onChange={handleChange}
          placeholder="cell number"
        />
        <input
          className="inputField"
          type="password"
        //   value={userInfo.password}
          name="password"
        //   onChange={handleChange}
          placeholder="password"
        />
        <textarea
        className="inputField"
        type="text"
        name="text"
        placeholder="bio"
        />
        <button type="submit" className="submitBtn">
          SAVE
        </button>
        </div>
        </form>
    </div>
)
}

export default UserSettings;