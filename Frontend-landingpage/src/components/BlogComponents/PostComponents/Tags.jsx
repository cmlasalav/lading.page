import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { langContext } from "../../../context/langContext";

const TagsURL = process.env.REACT_APP_MongoDB_Tags_URL;
const TagsByIdsURL = process.env.REACT_APP_MongoDB_Tags_Id_URL;

export default function Tags({
  onSelect,
  postIds,
  onTagsLoaded,
  showSearch,
  setModalMessage,
  setErrorModal,
}) {
  //Context
  const { locale } = useContext(langContext); //Lang

  //Tags States
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagsMap, setTagsMap] = useState([]);

  //Loading states
  const [isLoading, setIsLoading] = useState(false);

  // Tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(TagsURL);
        setTags(response.data);
      } catch (error) {
        setModalMessage("modal.error.tags");
        setErrorModal(true);
      }
    };
    fetchTags();
  }, []);

  // Tags filter
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTags([]);
    } else {
      const filtered = tags.filter((tag) => {
        const tagName = locale === "es-MX" ? tag.Tags_ES : tag.Tags_EN;
        return tagName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredTags(filtered);
    }
  }, [searchTerm, tags]);

  // Id Tags in Blog Id
  useEffect(() => {
    const fetchTagsByIds = async (ids) => {
      const idsToFetch = ids.filter((id) => !tagsMap[id]);
      if (idsToFetch.length === 0 || isLoading) return;
      setIsLoading(true);
      try {
        const tagsResponse = await axios.post(TagsByIdsURL, {
          ids: idsToFetch,
        });
        const tagsData = tagsResponse.data;
        const newTagsMap = tagsData.map((tag) => ([
          tag.Tags_ES,
          tag.Tags_EN,
        ]));
        setTagsMap(newTagsMap);
        onTagsLoaded(newTagsMap);
      } catch (error) {
        setModalMessage("modal.error.tags");
        setErrorModal(true);
      }
    };

    if (postIds && postIds.length > 0) {
      fetchTagsByIds(postIds);
    }
  }, [postIds, tagsMap, onTagsLoaded, locale, isLoading]);

  //Tags handlers
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagSelect = (tagId, tagName_es, tagName_en) => {
    onSelect(tagId, tagName_es, tagName_en);
    setSearchTerm("");
  };

  if (showSearch) {
    return (
      <div>
        <h2>
          <FormattedMessage
            id="tags.available"
            defaultMessage="Available tags"
          />
        </h2>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        {filteredTags.length === 0 && (
          <p>
            <FormattedMessage
              id="tags.unavailable"
              defaultMessage="Unavailable tags"
            />
          </p>
        )}
        {filteredTags.length > 0 && (
          <ul>
            {filteredTags.map((tag) => (
              <li key={tag._id}>
                <button
                  className="button-image"
                  type="button"
                  onClick={() =>
                    handleTagSelect(tag._id, tag.Tags_ES, tag.Tags_EN)
                  }
                >
                  {locale === "es-MX" ? tag.Tags_ES : tag.Tags_EN}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return null;
}
