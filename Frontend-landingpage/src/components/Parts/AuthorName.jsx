import axios from "axios";
import { useState, useEffect } from "react";

const UserURL = process.env.REACT_APP_MongoDB_Login_URL;

export default function AuthorName({ authorToken }) {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const getAuthor = async () => {
      try {
        //Author name
        const response = await axios.get(`${UserURL}/${authorToken}`);
        if (response.status === 200) {
          const name = response.data.userName;
          setUserName(name);
        } else {
          setUserName("");
        }
      } catch (error) {
        console.error("Error fetching author:", error);
        setUserName("user");
      }
    };

    if (authorToken) {
      getAuthor();
    }
  }, [authorToken]);

  return <span>{userName}</span>;
}
