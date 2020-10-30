import React from "react";
import PropTypes from "prop-types"; // validate props

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {/* check value and continue to add stars */}
      <span>
        <i className={value >= 1 ? "fas fa-star" : value >= 0.5 ? "fas fa-star-half-alt" : "far fa-star"} style={{ color: color }}></i>
      </span>
      <span>
        <i className={value >= 2 ? "fas fa-star" : value >= 1.5 ? "fas fa-star-half-alt" : "far fa-star"} style={{ color: color }}></i>
      </span>
      <span>
        <i className={value >= 3 ? "fas fa-star" : value >= 3.5 ? "fas fa-star-half-alt" : "far fa-star"} style={{ color: color }}></i>
      </span>
      <span>
        <i className={value >= 4 ? "fas fa-star" : value >= 3.5 ? "fas fa-star-half-alt" : "far fa-star"} style={{ color: color }}></i>
      </span>
      <span>
        <i className={value >= 5 ? "fas fa-star" : value >= 4.5 ? "fas fa-star-half-alt" : "far fa-star"} style={{ color: color }}></i>
      </span>
      <span> {text && text}</span>
    </div>
  );
};

// instead of passing color prop in Product.js to Rating.js
Rating.defaultProps = {
  color: "#44d62c"
};

// validation
Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Rating;
