import PropTypes from 'prop-types';
import FriendListItem from '../FriendListItem/FriendListItem.jsx';
import css from './FriendList.module.css';

const FriendList = ({ friends }) => (
  <ul className={css.friendList}>
    {friends.map((friend) => (
      <FriendListItem
        key={friend.id}
        avatar={friend.avatar}
        name={friend.name}
        isOnline={friend.isOnline}
      />
    ))}
  </ul>
);

FriendList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isOnline: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default FriendList;

