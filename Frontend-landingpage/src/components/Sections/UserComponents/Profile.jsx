import axios from "axios";
import { FormattedMessage } from "react-intl";
import { useAuth } from "../../../context/authContext";
import { useState, useEffect } from "react";
import { useUserName } from "../../../context/userContext";
import CommentUser from "./CommentsUser";
import CommentsAdmin from "./UserPostComponents/AdminComponents/CommentsAdmin";
import Loader from "../../Parts/Loader";
import PostsAdmin from "./UserPostComponents/AdminComponents/PostsAdmin";
import PostUser from "./UserPostComponents/PostUser";
import TestimonialsAdmin from "./UserPostComponents/AdminComponents/TestimonialsAdmin";

const ProfileURL = process.env.REACT_APP_MongoDB_Login_URL;
const UserURL = process.env.REACT_APP_MongoDB_USER_POST_URL;

export default function Profile({
  onNewPost,
  onReadMore,
  setErrorModal,
  setModalMessage,
  setConfirm,
}) {
  const { token } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { setUserName } = useUserName();
  const [editing, setEditing] = useState(false);
  const [loader, setLoader] = useState(true);

  //Handle edit user name
  const handleEdit = async () => {
    if (editing) {
      try {
        const response = await axios.put(
          `${UserURL}/uid`,
          {
            Body: {
              name: profile.name,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setUserName(profile.name);
          setConfirm("modal.edit.user");
        }
      } catch (error) {
        setModalMessage("modal.error.edit.user");
        setErrorModal(true);
      }
    }
    setEditing(!editing);
  };

  //Get user information
  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await axios.post(ProfileURL, { token });
        if (!response.ok) {
          if (response.status === 200) {
            const userProfile = response.data.userData;
            setProfile(userProfile);
          }
        }
      } catch (error) {
        setModalMessage("error.info.user");
        setErrorModal(true);
      } finally {
        setLoader(false);
      }
      if (!token) {
        userProfile();
      }
    };
    userProfile();
  }, []);

  if (loader) {
    return <Loader duration={3000} />;
  }

  return (
    <>
      <div className="profile">
        <h1>
          <FormattedMessage id="profile.title" defaultMessage="Profile" />
        </h1>
        <p>
          <FormattedMessage id="profile.name" defaultMessage="Name:" />
          {editing ? (
            <input
              className="profile-input"
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          ) : (
            profile.name
          )}
        </p>
        <p>
          <FormattedMessage id="profile.email" defaultMessage="Email:" />
          {profile.email}
        </p>
        {profile.role !== "user" && (
          <p>
            <FormattedMessage id="profile.role" defaultMessage="Role: " />
            {profile.role}
          </p>
        )}
        <button className="edit-profile-button" onClick={handleEdit}>
          <FormattedMessage
            id={editing ? "profile.edit.save.button" : "profile.edit.button"}
            defaultMessage={editing ? "Save changes" : "Edit profile"}
          />
        </button>
      </div>
      {profile.role && (
        <>
          {profile.role !== "user" ? (
            <>
            {/*Admin page*/}
              <PostsAdmin
                onReadMore={onReadMore}
                setErrorModal={setErrorModal}
                setModalMessage={setModalMessage}
                setConfirm={setConfirm}
                userView={profile.role}
              />
              <TestimonialsAdmin
                setErrorModal={setErrorModal}
                setModalMessage={setModalMessage}
                setConfirm={setConfirm}
                userView = {profile.role}
              />
              <CommentsAdmin
                onReadMore={onReadMore}
                setErrorModal={setErrorModal}
                setModalMessage={setModalMessage}
                setConfirm={setConfirm}
                userView={profile.role}
              />
              <PostUser
                onNewPost={onNewPost}
                onReadMore={onReadMore}
                setErrorModal={setErrorModal}
                setModalMessage={setModalMessage}
                setConfirm={setConfirm}
                userName={profile.name}
                userView={"user"}
              />
              <CommentUser
                onReadMore={onReadMore}
                setErrorModal={setErrorModal}
                setModalMessage={setModalMessage}
                setConfirm={setConfirm}
                userName={profile.name}
                userView={"user"}
              />
            </>
          ) : (
            <>
            {/*User page*/}
              <PostUser
                onNewPost={onNewPost}
                onReadMore={onReadMore}
                setErrorModal={setErrorModal}
                setModalMessage={setModalMessage}
                setConfirm={setConfirm}
                userName={profile.name}
                userView={profile.role}
              />
              <CommentUser
                onReadMore={onReadMore}
                setErrorModal={setErrorModal}
                setModalMessage={setModalMessage}
                setConfirm={setConfirm}
                userName={profile.name}
                userView={profile.role}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
