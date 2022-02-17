import React from 'react';

const Input = ({ filter, handleInput, query, handleClick }) => {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Select City"
      />

      {filter &&
        filter.map((city, i) => (
          <div className="search_popup" key={i}>
            <button className="pick_city" onClick={() => handleClick(city)}>
              {city.place_name}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Input;
