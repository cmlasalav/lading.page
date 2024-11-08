import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { useAuth } from "../../context/authContext.js";
import AuthorName from "../Parts/AuthorName.jsx";
import Comentarios from "./CommentComponents/Comentarios.jsx";
import Loading from "../Parts/Loading.jsx";
import Tags from "./PostComponents/Tags.jsx";
import PostPrivate from "../Parts/PostPrivate.jsx";
import Footer from "../Layout/Footer.jsx";
import Loader from "../Parts/Loader.jsx";
import { useView } from "../../context/viewContext.js";
import { langContext } from "../../context/langContext.js";

const BlogURLId = process.env.REACT_APP_MongoDB_Blog_URL;
const UserPostURL = process.env.REACT_APP_MongoDB_USER_POST_URL;

export default function BlogId({ _id, setModalMessage, setErrorModal, rol }) {
  const [postId, setPostId] = useState({
    Titulo: "",
    Categoria: "",
    Autor: "",
    PostBody: [],
    IdTags: [],
    PostDate: "",
  });

  //Context
  const { token } = useAuth(); //Token
  const { locale } = useContext(langContext); //Lang

  //Post States
  const [tags, setTags] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //Get post by id
        const response = await axios.get(`${BlogURLId}/${_id}`);
        if (response.status === 200) {
          const postInfo = response.data;
          const postVisibility = postInfo.Active;
          setPostId(postInfo);
          //Post visibility
          if (rol !== "user") {
            setVisibility(true);
          } else {
            if (!postVisibility) {
              //Post Visibility for the author
              const userResponse = await axios.get(`${UserPostURL}/postID/`, {
                params: {
                  token: token,
                  id: _id,
                },
              });
              if (userResponse.status === 200) {
                const { isAuthor, active } = userResponse.data;
                setVisibility(active || isAuthor);
              } else {
                setVisibility(false);
              }
            } else {
              setVisibility(true);
            }
          }
        } else {
          setModalMessage("modal.general.error");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.general.error");
        setErrorModal(true);
      } finally {
        setLoader(false);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [_id]);

  //Loader and Loading component
  if (loader) {
    return <Loader duration={3000} />;
  }
  if (loading) {
    return <Loading data={postId} messageLoading="loading.postId" />;
  }

  return (
    <div className="post-container">
      {visibility ? (
        <>
          <ul key={postId._id}>
            <h2 id="post-title">{postId.Titulo}</h2>
            <div className="post-content">
              <div className="content-post">
                {postId.PostBody.map((content, index) => (
                  <div key={index}>
                    {content.contentType === "text" ? (
                      <p>{content.contentBody}</p>
                    ) : (
                      <img src={content.contentBody} alt="Post content" />
                    )}
                  </div>
                ))}
              </div>
              <div className="post-info">
                <p>
                  <FormattedMessage
                    id="blogId.author"
                    defaultMessage="Author: "
                  />
                  <AuthorName authorToken={postId.Autor} />
                </p>
                <p>
                  <FormattedMessage
                    id="blogId.category"
                    defaultMessage="Category: "
                  />
                  {postId.Categoria}
                </p>
                <p>
                  <FormattedMessage id="blogId.date" defaultMessage="Date: " />{" "}
                  <FormattedDate
                    value={postId.PostDate}
                    year="numeric"
                    month="long"
                    day="numeric"
                    weekday="long"
                  />
                </p>
                <p>
                  <FormattedMessage id="blogId.tags" defaultMessage="Tags: " />
                  {tags.map((tagLang, index) => {
                    return (
                      <span className="tags-selected" key={index}>
                        {locale === "es-MX" ? tagLang[0] : tagLang[1]}
                        {index !== tags.length - 1 && ","}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            <Comentarios postId={postId._id} />
          </ul>
          <Tags
            postIds={postId.IdTags}
            onTagsLoaded={(loadedTags) => setTags(loadedTags)}
            showSearch={false}
            setModalMessage={setModalMessage}
            setErrorModal={setErrorModal}
          />
        </>
      ) : (
        <PostPrivate />
      )}
      <Footer />
    </div>
  );
}
