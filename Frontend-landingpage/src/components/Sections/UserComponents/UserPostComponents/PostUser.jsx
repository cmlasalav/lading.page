import axios from "axios";
import { FormattedMessage } from "react-intl";
import { useAuth } from "../../../../context/authContext";
import { useState, useEffect } from "react";
import Loading from "../../../Parts/Loading";
import Post from "../../../BlogComponents/PostComponents/Post";

const UserPostURL = process.env.REACT_APP_MongoDB_USER_POST_URL;

export default function PostUser({
  onNewPost,
  onReadMore,
  setModalMessage,
  setErrorModal,
  setConfirm,
  userName,
  userView,
}) {
  const { token } = useAuth();
  const [userPost, setUserPost] = useState([]);
  const [userPostActive, setUserPostActive] = useState([]);

  //Get post by User
  useEffect(() => {
    const UserPost = async () => {
      try {
        const response = await axios.get(`${UserPostURL}/post/${token}`);
        if (response.status === 200) {
          const userPostsActive = response.data.map((post) => post.Active);
          const userPosts = response.data.sort(
            (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
          );
          setUserPost(userPosts);
          setUserPostActive(userPostsActive);
        } else if (response.status === 404) {
          setUserPost([]);
          setModalMessage("error.post.user");
          setErrorModal(true);
        }
      } catch (error) {
        <Loading data={userPost} messageLoading="loading.post" />;
      }
    };
    if (token) {
      UserPost();
    }
  }, [token]);

  return (
    <>
      <Loading data={userPost} messageLoading="loading.post" />
      {userPost.length > 0 && (
        <h1>
          <FormattedMessage id="profile.post.title" defaultMessage="Post" />{" "}
          {userName}
        </h1>
      )}
      {/*Post by user*/}
      <Post
        post={userPost}
        user="user"
        isVisible={userPostActive}
        onNewPost={onNewPost}
        onReadMore={onReadMore}
        setErrorModal={setErrorModal}
        setModalMessage={setModalMessage}
        setConfirm={setConfirm}
      />
    </>
  );
}
