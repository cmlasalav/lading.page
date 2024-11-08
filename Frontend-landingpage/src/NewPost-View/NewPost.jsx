import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useAuth } from "../context/authContext.js";
import { useUserName } from "../context/userContext.js";
import Tags from "../components/BlogComponents/PostComponents/Tags.jsx";
import Loader from "../components/Parts/Loader.jsx";
import PostPreview from "./PostPreview.jsx";
import PostImages from "./PostImages.jsx";
import { langContext } from "../context/langContext.js";

const BlogURL = process.env.REACT_APP_MongoDB_Blog_URL;
const ImageURL = process.env.REACT_APP_MongoDB_Blog_Image_URL;
const typeBucket = process.env.REACT_APP_Firebase_TypeBuckett_Blog;

const NewPost = ({
  setModalMessage,
  setConfirm,
  setErrorModal,
  postSelected,
}) => {
  //Context
  const { token } = useAuth(); //User Token
  const { userName } = useUserName(); //User Name
  const { locale } = useContext(langContext); //Lang

  //Post states
  const [bodyContent, setBodyContent] = useState();
  const [validatedImage, setValidatedImage] = useState(false);
  const [post, setPost] = useState({
    IdPost: Math.random().toString().substring(2, 9),
    Titulo: "",
    Categoria: "",
    Autor: token,
    PostBody: [],
    IdTags: [],
    TagsSeleccionados_ES: [],
    TagsSeleccionados_EN: [],
    Active: true,
  });

  //Loader
  const [loader, setLoader] = useState(false);

  
  //Edit post
  useEffect(() => {
    if (postSelected) {
      setModalMessage("modal.error.postContent");
      setErrorModal(true);
      setPost((prevPost) => ({
        ...prevPost,
        ...postSelected,
        TagsSeleccionados_ES: postSelected.TagsSeleccionados_ES || [],
        TagsSeleccionados_EN: postSelected.TagsSeleccionados_EN || [],
      }));

      // setBodyContent(
      //     postSelected.PostBody.map((item) => item.contentBody).join("\n") || ""
      //   );
    }
  }, [postSelected]);

  //Handle for post or edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Edit post
    if (postSelected) {
      const postEdited = postSelected._id;
      try {
        const response = await axios.put(`${BlogURL}/${postEdited}`, {
          Body: post,
        });
        if (response.status === 200) {
          setConfirm("modal.edit.post");
          setValidatedImage(false);
        }
      } catch (error) {
        setModalMessage("modal.error.edit.post");
        setErrorModal(true);
      }
    } else {
      //Create post
      try {
        const response = await axios.post(BlogURL, post);
        if (response.status === 200) {
          setConfirm("modal.confirm.newPost");
          setValidatedImage(false);
        }
      } catch (error) {
        setModalMessage("modal.error.newPost");
        setErrorModal(true);
      }
    }
  };

  //#region Images Upload

  useEffect(() => {
    const lastImageContent = post.PostBody[post.PostBody.length - 1];
    if (lastImageContent && lastImageContent.contentType === "image") {
      uploadImages(lastImageContent.contentBody);
    }
  }, [validatedImage]);

  //Upload images to buckett
  const uploadImages = async (file) => {
    if (validatedImage) {
      const ImageData = new FormData();
      ImageData.append("imageId", typeBucket);
      ImageData.append("images", file);
      setLoader(true);
      try {
        const ImageResponse = await axios.post(
          `${ImageURL}/Bucket.Images/${typeBucket}`,
          ImageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        //Get the images url
        if (ImageResponse.status === 200) {
          const ImageURLs = ImageResponse.data.map((item) => item.publicUrl);
          setPost((prevPost) => ({
            ...prevPost,
            PostBody: prevPost.PostBody.map((item) => {
              if (item.contentType === "image" && item.contentBody === file) {
                return { ...item, contentBody: ImageURLs[0] };
              }
              return item;
            }),
          }));
          setValidatedImage(false);
        } else if (ImageResponse.status === 500) {
          setModalMessage("modal.invalidate.image");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.invalidate.image");
        setErrorModal(true);
      } finally {
        setLoader(false);
        setModalMessage("modal.validate.image");
        setErrorModal(true);
      }
    }
  };

  //#endregion

  //#region PostContent
  //Post Body
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "visibility") {
      const isActive = value === "public";
      setPost((prevPost) => ({
        ...prevPost,
        Active: isActive,
      }));
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    }
  };

  //New content
  const handleNewContentChange = (e) => {
    setBodyContent(e.target.value);
  };

  //Add text
  const addTextContent = () => {
    setPost((prevPost) => ({
      ...prevPost,
      PostBody: [
        ...prevPost.PostBody,
        {
          contentType: "text",
          contentBody: bodyContent,
        },
      ],
    }));
    setBodyContent("");
  };

  //Add image
  const addImageContent = async (file) => {
    if (file) {
      setValidatedImage(true);
      const previewURL = URL.createObjectURL(file);
      setPost((prevPost) => ({
        ...prevPost,
        PostBody: [
          ...prevPost.PostBody,
          {
            contentType: "image",
            contentBody: file,
            previewURL,
          },
        ],
      }));
    } else {
      setValidatedImage(false);
      setModalMessage("modal.general.error");
      setErrorModal(true);
    }
  };

  //Add tags
  const handleSelectTag = (tagId, tagName_es, tagName_en) => {
    if (!post.IdTags.includes(tagId)) {
      setPost((prevPost) => ({
        ...prevPost,
        IdTags: [...prevPost.IdTags, tagId],
        TagsSeleccionados_ES: [...prevPost.TagsSeleccionados_ES, tagName_es], //Tags
        TagsSeleccionados_EN: [...prevPost.TagsSeleccionados_EN, tagName_en], //Tags
      }));
    }
  };

  //#endregion

  //Button message, class and title view
  const postTitle = postSelected ? "section.newpost.edit" : "section.newpost";
  const buttonClass = postSelected ? "edit-button-post" : "button-image";
  const buttonMessageId = postSelected ? "post.edit.button" : "newpost.button";

  //Tags
  const tagsLang =
    locale === "es-MX" ? "TagsSeleccionados_ES" : "TagsSeleccionados_EN";
  const selectedTags = Array.isArray(post[tagsLang]) ? post[tagsLang] : [];

  return (
    <div>
      {loader ? (
        <Loader duration={3000} />
      ) : (
        <>
          <h2 className="title-new-edit-post">
            <FormattedMessage
              id={postTitle}
              defaultMessage={postSelected ? "Edit Post" : "New Post"}
            />
          </h2>
          <form className="newpost-form" onSubmit={handleSubmit}>
            <br />
            <label>
              <FormattedMessage id="newpost.title" defaultMessage="Title:" />
              <input
                type="text"
                name="Titulo"
                value={post.Titulo}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              <FormattedMessage
                id="newpost.category"
                defaultMessage="Category:"
              />
              <input
                type="text"
                name="Categoria"
                value={post.Categoria}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              <FormattedMessage id="newpost.author" defaultMessage="Author:" />
              <input type="text" name="Autor" value={userName} readOnly />
            </label>
            <label className="Visibility-label">
              <FormattedMessage
                id="newpost.visibility"
                defaultMessage="Visibility"
              />
              <select
                className="visibility-post"
                name="visibility"
                value={post.Active ? "public" : "private"}
                onChange={handleChange}
              >
                <option value="public">
                  <FormattedMessage
                    id="newpost.visibility.public"
                    defaultMessage="Public"
                  />
                </option>
                <option value="private">
                  <FormattedMessage
                    id="newpost.visibility.private"
                    defaultMessage="Private"
                  />
                </option>
              </select>
            </label>
            <br />
            <label>
              <FormattedMessage
                id="newpost.content"
                defaultMessage="Post Content:"
              />
              :
            </label>
            <textarea
              name="PostBody"
              value={bodyContent}
              className="newpost-textarea"
              onChange={handleNewContentChange}
            />
            <button
              className="button-image"
              type="button"
              onClick={addTextContent}
            >
              <FormattedMessage
                id="newpost.paragraph"
                defaultMessage="Add Paragraph:"
              />
            </button>
            <br />
            {/*Images component*/}
            <PostImages
              onAddImageContent={addImageContent}
              setErrorModal={setErrorModal}
              setModalMessage={setModalMessage}
            />
            <br />
            <label>
              {/*Selected tags*/}
              <FormattedMessage
                id="newpost.tags"
                defaultMessage="Selected Tags:"
              />
              {selectedTags.map((tagName) => (
                <span className="tags-selected" key={tagName}>
                  {tagName + ","}
                </span>
              ))}
            </label>
            <br />
            {/*Tags component*/}
            <Tags
              onSelect={handleSelectTag}
              showSearch={true}
              setModalMessage={setModalMessage}
              setErrorModal={setErrorModal}
            />
            <button className={buttonClass} type="submit">
              <FormattedMessage
                id={buttonMessageId}
                defaultMessage="Create Post"
              />
            </button>
          </form>
          {/*Post preview component*/}
          <PostPreview postContent={post.PostBody} title={post.Titulo} />
        </>
      )}
    </div>
  );
};

export default NewPost;
