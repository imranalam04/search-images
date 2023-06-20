import React, { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // function to handle search query change

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // function to handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    searchImages();
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  }

  const handleCloseImage = () => {
    setSelectedImage(null);
  }
  // Function to search for images using the Unsplash API
  const searchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=oNL5gbZWcLNw6-ul6SG3_LmdUm8feqC61-GpZALHpx0`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        style={{width:"20%",padding:"10px",marginTop:"3%",textAlign:"center", paddingTop:"1%",borderRadius:"3px"}}
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="search for images..."
        />
      </form>
      <div style={{ marginTop: "5%" }}>
        {results.map((result) => (
          <div className="img-grid">
            <img
              key={result.id}
              src={result.urls.small}
              alt={result.alt_description}
              onClick={() => handleImageClick(result.urls.regular)}

            />
          </div>
          
        ))}
        {selectedImage && (
            <div className="overlay" onClick={handleCloseImage}>
              <img className="popup-image" src={selectedImage} alt="Selected" />
            </div>
          )}
      </div>
    </div>
  );
};

export default ImageSearch;
