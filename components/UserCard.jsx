import React from 'react';
import users from '../styles/usercard.module.scss';

const Address = ({ address }) => {
  return (
    <div className={users.addressContainer}>
      <div>{`${address.street_num} ${address.street_name}`}</div>
      <div>{`${address.city}, ${address.state} ${address.zip}`}</div>
      <div>{`${address.country}`}</div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const address = {
    street_num: user.location.street.number,
    street_name: user.location.street.name,
    city: user.location.city,
    state: user.location.state,
    zip: user.location.postcode,
    country: user.location.country,
  };

  return (
    <div className={users.displayCardContainer}>
      <div className={users.firstRow}>
        <img
          className={users.portrait}
          src={user.picture.large}
          alt="user portrait"
        />
        <div className={users.identity}>
          <div className={users.userName}>
            {`${user.name.first} ${user.name.last}`}
          </div>
          <Address address={address} />
          <div className={users.contactInfo}>
            <div>{`ph: ${user.phone}`}</div>
            <div>{`cel: ${user.cell}`}</div>
            <div>{`${user.email}`}</div>
          </div>
        </div>
      </div>
      <div className={users.secondRow}>
        <div>{`DOB: ${new Date(user.dob.date).toLocaleDateString()}`}</div>
        <div className={users.ageInfo}>{`(${user.dob.age} yrs)`}</div>
      </div>
    </div>
  );
};

export default UserCard;
