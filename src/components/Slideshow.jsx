// import React, { useState, useEffect, useCallback } from 'react';
// import './Slideshow.css';

// const Slideshow = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Stabilize nextImage using useCallback
//   const nextImage = useCallback(() => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [images.length]); // Dependency on images.length

//   // Automatically cycle through images every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(nextImage, 3000);
//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, [nextImage]); // Add nextImage to the dependency array

//   return (
//     <div className="slideshow-container">
//       <img
//         src={images[currentImageIndex]}
//         alt={`Slide ${currentImageIndex + 1}`}
//         className="slideshow-image"
//       />
//       <div className="slideshow-indicators">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`indicator ${
//               index === currentImageIndex ? 'active' : ''
//             }`}
//             onClick={() => setCurrentImageIndex(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slideshow;
import React, { useState, useEffect, useCallback } from "react";
import "./Slideshow.css";

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Stabilize nextImage using useCallback
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Automatically cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [nextImage]);

  // Function to handle manual navigation
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className="slideshow-container relative overflow-hidden rounded-lg shadow-lg bg-gray-800"
      style={{ backgroundColor: "#2c3e50" }} // Dark blue background color
    >
      {/* Main Image */}
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className="slideshow-image w-full h-96 object-cover transition-transform duration-500 ease-in-out"
      />

      {/* Navigation Indicators */}
      <div className="slideshow-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentImageIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToImage(index)}
          ></span>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          className="arrow-button bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
          onClick={() =>
            setCurrentImageIndex(
              currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
            )
          }
        >
          &#10094;
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          className="arrow-button bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
          onClick={nextImage}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Slideshow;