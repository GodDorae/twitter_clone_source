import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { authService, dbService } from "../myBase";
import { updateProfile } from "firebase/auth";
import Tweet from "../components/Tweet";

function Profile({ userObj, refreshUser }) {
  const [myTweets, setMyTweets] = useState([]);

  const onLogOutClick = () => authService.signOut();
  const getMyTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyTweets(tweetArray);
    });
  };

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <div className="container">
      {myTweets.map((tweet) => (
        <Tweet
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObj.uid}
          key={tweet.id}
        />
      ))}
      <form className="profileForm" onSubmit={onSubmit}>
        <input
          className="formInput"
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
          autoFocus
        />
        <input
          className="formBtn"
          type="submit"
          value="Update Profile"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
}

export default Profile;
