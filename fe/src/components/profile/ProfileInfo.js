function ProfileInfo({
  userData,
  isEdit,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  changeHandler,
}) {
  return (
    <>
      {/* <div className="inputChanging">
        <label className="account">帳號</label>
        <div className="inputWord">Jodie@test.com</div>
      </div> */}
      <div className="inputChanging">
        <label className="name">姓名 : </label>
        {isEdit ? (
          <input
            type="text"
            placeholder="Jodie"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className="inputWord">{userData.name}</div>
        )}
      </div>
      <div className="inputChanging">
        <label className="email">E-mail : </label>
        {isEdit ? (
          <input
            type="email"
            placeholder="jodie@test.com"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        ) : (
          <div className="inputWord">{userData.email}</div>
        )}
      </div>
      <div className="inputChanging">
        <label className="phone">行動電話 : </label>
        {isEdit ? (
          <input
            type="text"
            placeholder="0966666666"
            className="input"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        ) : (
          <div className="inputWord">{userData.phone}</div>
        )}
      </div>
      <div className="inputChanging">
        <label className="address">地址 : </label>
        {isEdit ? (
          <input
            type="text"
            placeholder="桃園市桃園區"
            className="input"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        ) : (
          <div className="inputWord">
            {userData.address}
          </div>
        )}
      </div>
      {isEdit ? (
        <div className="inputEditing">
          <input
            type="file"
            class="form-control"
            id="customFile"
            onChange={changeHandler}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default ProfileInfo;
