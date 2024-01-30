import userlist from '../styles/Userlist.module.scss';
const UserListItem = ({ user, clickHandler, page }) => {
  //console.log('[UserListItem] page:', page);

  return (
    <div className={userlist.userContainer} onClick={clickHandler}>
      <div className={userlist.firstRow}>
        <img
          className={userlist.thumbnail}
          src={user.picture.thumbnail}
          alt="avatar"
        />
        <div className={userlist.nameRow}>
          <div
            className={userlist.name}
          >{`${user.name.first} ${user.name.last}`}</div>
          <div className={userlist.age}>{`${user.dob.age} yrs`}</div>
        </div>
      </div>
      <div
        className={userlist.secondRow}
      >{`${user.location.city}, ${user.location.country}`}</div>
    </div>
  );
};

export default UserListItem;
