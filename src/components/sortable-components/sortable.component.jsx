import React, { useState, useEffect } from 'react';
import { arrayMoveImmutable } from 'array-move';
import SortableList from './sortable-list/sortable-list.component';
import axios from 'axios';
import './sortable.styles.scss';
import Input from '../input/input.component';

const MAPBOX_KEY = `pk.eyJ1IjoiYmVsZWdpYyIsImEiOiJja3pqcmM0OXAwbzIwMnZsbDQ2dm10eGUwIn0.P0fE9iepzeRc19GZVV2cHA`;

const SortableComponent = () => {
  const [items, setItems] = useState([
    [20.4612, 44.8125],
    [55.2962, 25.2684],
    [46.6753, 24.7136],
    [16.3736, 48.20833],
  ]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState('');

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  useEffect(() => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?types=place%2Cpostcode%2Caddress&access_token=${MAPBOX_KEY}`;
    if (query) {
      axios
        .get(url)
        .then((res) => setFilter(res.data.features))
        .catch((err) => console.error(err.message));
    }
  }, [query]);

  const removeItem = (c) => {
    setItems(items.filter((i) => i !== c));
  };

  const handleClick = (city) => {
    setItems([city.geometry.coordinates, ...items]);
    setFilter();
    setQuery('');
  };
  const handleInput = (e) => setQuery(e.target.value);

  


  return (
    <div>
      <div className="search">
        <div className="search_places">
          <Input
            filter={filter}
            handleClick={handleClick}
            query={query}
            handleInput={handleInput}
          />
        </div>
      </div>
      <SortableList
        items={items}
        removeItem={removeItem}
        onSortEnd={onSortEnd}
        axis="xy"
      />
    </div>
  );
};

export default SortableComponent;
