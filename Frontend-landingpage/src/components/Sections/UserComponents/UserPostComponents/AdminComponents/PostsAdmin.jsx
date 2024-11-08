import axios from "axios";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Loading from "../../../../Parts/Loading";
import { useAuth } from "../../../../../context/authContext";
import Post from "../../../../BlogComponents/PostComponents/Post";

const AdminURL = process.env.REACT_APP_MongoDB_Admin_URL;

export default function PostsAdmin({
  onReadMore,
  setErrorModal,
  setModalMessage,
  setConfirm,
  userView,
}) {
  const { token } = useAuth();
  const [adminPost, setAdminPost] = useState([]);
  const [adminPostActive, setAdminPostActive] = useState([]);

  //Get all posts made
  useEffect(() => {
    const AdminPost = async () => {
      try {
        const response = await axios.get(`${AdminURL}/Blog/${token}`);
        if (response.status === 200) {
          const adminPostActive = response.data.map((post) => post.Active);
          const adminPosts = response.data.sort(
            (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
          );
          setAdminPost(adminPosts);
          setAdminPostActive(adminPostActive);
        } else if (response.status === 500) {
          setModalMessage("modal.general.error");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.general.error");
        setErrorModal(true);
      }
    };
    if (token) {
      AdminPost();
    }
  }, [token]);

  return (
    <>
      <Loading data={adminPost} messageLoading="loading.post" />

      {adminPost.length > 0 && (
        <h1>
          <FormattedMessage
            id="profile.post.admin.title"
            defaultMessage="All Post"
          />
        </h1>
      )}
      {/*Posts*/}
      <Post
        onReadMore={onReadMore}
        post={adminPost}
        isVisible={adminPostActive}
        user={userView}
        setConfirm={setConfirm}
        setErrorModal={setErrorModal}
        setModalMessage={setModalMessage}
      />
    </>
  );
}
