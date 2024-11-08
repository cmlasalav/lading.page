import axios from "axios";
import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Loading from "../Parts/Loading";
import Post from "./PostComponents/Post";

const BlogURL = process.env.REACT_APP_MongoDB_Blog_URL;

export default function Blog({ onReadMore, onNewPost, setModalMessage }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //Get all post
        const response = await axios.get(BlogURL);
        if (response.status === 200) {
          const datePosts = response.data.sort(
            (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
          );
          setPosts(datePosts);
        } else {
          setModalMessage("error.post.user");
        }
      } catch (error) {
        setModalMessage("error.post.user");
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="GeneraBlog">
      <div>
        <h1>
          <span className="first-word">Blog</span>
          <span className="second-word">
            <FormattedMessage id="section.blog" defaultMessage="/News" />
          </span>
        </h1>
        <p className="description-blog">
          <FormattedMessage
            id="blog.paragraph"
            defaultMessage="Explore our latest insights on industry trends, management strategies, and success stories to stay informed and inspired."
          />
        </p>
        <Loading data={posts} messageLoading="loading.post" />
        <Post post={posts} onNewPost={onNewPost} onReadMore={onReadMore} />
      </div>
    </section>
  );
}
