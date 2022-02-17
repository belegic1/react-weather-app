import { SortableElement } from 'react-sortable-hoc';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { BiTrash } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import './sortable-item.styles.scss';
import { timeConverter } from '../../../assets/timeConverter';
import Loading from './load-icon-png-7957.png';
import ErrorMessage from '../../error/error.component';
import PropTypes from 'prop-types';

const WEATHER_API_KEY = '4a95703108e8a4ccddd62d3387e927fd';

const SortableItem = SortableElement(({ city, remove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const [info, setInfo] = useState({
    showSunsetSunrise: false,
    showMinMaxTemp: false,
    showMaxTemp: false,
    showWindSped: false,
    name: '',
    temperature: '',
    temperature_min: '',
    temperature_max: '',
    condition: '',
    wind_speed: '',
    sunrise: '',
    sunset: '',
    icon: '',
  });

  useEffect(() => {
    const fetchData = async (lat, long) => {
      try {
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`;
        const city = await axios.get(url);
        setInfo({
          ...info,
          name: city.data.name,
          temperature: parseInt(city.data.main.temp),
          temperature_min: parseInt(city.data.main.temp_min),
          temperature_max: parseInt(city.data.main.temp_max),
          condition: city.data.weather[0].main,
          wind_speed: city.data.wind.speed,
          sunrise: timeConverter(city.data.sys.sunrise),
          sunset: timeConverter(city.data.sys.sunset),
          icon: city.data.weather[0].icon,
        });
      } catch (error) {
        setError(true);
        console.log(error.message);
      }
    };

    fetchData(city[1], city[0]);
  }, []);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {
    name,
    temperature,
    temperature_max,
    temperature_min,
    condition,
    wind_speed,
    sunrise,
    sunset,
    showMinMaxTemp,
    showWindSped,
    showSunsetSunrise,
    icon,
  } = info;

  if (error) return <ErrorMessage />;

  return info.temperature ? (
    <div className="widget">
      <div className="widget-header">
        <button
          onClick={() => {
            remove(city);
          }}
          className={`${isOpen && 'hidde_buttons'}`}
        >
          <BiTrash style={{ pointerEvents: 'none' }} />
        </button>
        <button
          className={`${isOpen && 'hidde_buttons'}`}
          onClick={handleDropdown}
        >
          <BsFilter style={{ pointerEvents: 'none' }} />
        </button>
        <div className={`${isOpen && 'show_dropdown'} dropdown`}>
          <button className="hidde_dropdown" onClick={handleDropdown}>
            X
          </button>
          <button
            className="show_more"
            onClick={() =>
              setInfo({ ...info, showMinMaxTemp: !showMinMaxTemp })
            }
          >
            {showMinMaxTemp && <AiFillCheckCircle />} Min/Max Temperature
          </button>

          <button
            className="show_more"
            onClick={() =>
              setInfo({ ...info, showSunsetSunrise: !showSunsetSunrise })
            }
          >
            {showSunsetSunrise && <AiFillCheckCircle />} Sunrise/Sunset Time
          </button>

          <button
            className="show_more"
            onClick={() => setInfo({ ...info, showWindSped: !showWindSped })}
          >
            {showWindSped && <AiFillCheckCircle />} Wind
          </button>
        </div>
      </div>
      <div className="widget-main">
        <h3 className="city_name">{name}</h3>
        <h2 className="current_temperature">
          {temperature > 0 && '+'}
          {temperature}°C
        </h2>
        <img
          className="icon"
          src={`https://openweathermap.org/img/w/${icon}.png`}
          alt=""
        />
        <h5 className="current_condition">{condition}</h5>
      </div>
      <div className="widget-footer">
        {showMinMaxTemp && (
          <>
            <div className="additional_info">
              <span className="info_span">Min Temperature:</span>
              <span className="info_span">
                {temperature_min > 0 && '+'}
                {temperature_min}°C
              </span>
            </div>

            <div className="additional_info">
              <span className="info_span"> Max Temperature: </span>

              <span className="info_span">
                {temperature_max > 0 && '+'}
                {temperature_max}°C
              </span>
            </div>
          </>
        )}
        {showSunsetSunrise && (
          <>
            <div className="additional_info">
              <span className="info_span">Sunset:</span>
              <span className="info_span">{sunset}</span>
            </div>

            <div className="additional_info">
              <span className="info_span"> Sunrise: </span>

              <span className="info_span">{sunrise}</span>
            </div>
          </>
        )}
        {showWindSped && (
          <>
            <div className="additional_info">
              <span className="info_span">Wind:</span>
              <span className="info_span">{wind_speed}km/h</span>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="widget">
      <img src={Loading} alt="loading" />
    </div>
  );
});

SortableItem.propTypes = {
  city: PropTypes.arrayOf(PropTypes.number),
  remove: PropTypes.func
}

export default SortableItem;
