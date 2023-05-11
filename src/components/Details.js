import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import petFinder from '../helpers/petFinderApi';

const Details = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [animal, setAnimal] = useState('');
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');
  const [media, setMedia] = useState('');
  const [description, setDescription] = useState('');
  const [adopting, setAdopting] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  useEffect(() => {
    petFinder.animal
      .show(id)
      .then((data) => {
        const { animal } = data.data;
        setUrl(animal.url);
        setName(animal.name);
        setAnimal(animal.type);
        setLocation(
          `${animal.contact.address.city},${animal.contact.address.state}`,
        );
        setBreed(animal.breeds.primary);
        setMedia(animal.photos);
        setDescription(animal.description);
        setLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, [id]);

  if (loading) {
    return (
      /* eslint-disable-next-line jsx-a11y/heading-has-content */
      <h1 className="loading__wrapper" data-testid="details-loading" />
    );
  }

  let hero = 'http://placecorgi.com/300/300';

  if (media.length !== 0) {
    hero = media[0].large;
  }

  const home = () => navigate('/');

  const startAdopting = () => setAdopting(true);

  const handleNameChange = (event) => setNameInput(event.target.value);

  const handlePhoneChange = (event) => setPhoneInput(event.target.value);

  const submitAdoption = () => {
    console.log(`Name: ${nameInput}, Phone: ${phoneInput}`);
    setAdopting(false);
    navigate(url);
  };

  return (
    <div className="pets__details-wrapper">
      <div className="pets__details-wrapper-image">
        <img src={hero} alt="" />
      </div>
      <div className="pets__details-wrapper-box">
        <h1>{name}</h1>
        <h3>{`${location}`}</h3>
        <h4>{`${animal}${breed}`}</h4>
        <h2>{`Meet ${name}`}</h2>
        <p>{` ${description}`}</p>
        {adopting ? (
        /* eslint-disable */
          <>
            <label htmlFor="nameInput">Name:</label>
            <input
              id="nameInput"
              type="text"
              value={nameInput}
              onChange={handleNameChange}
            />

            <label htmlFor="phoneInput">Phone number:</label>
            <input
              type="text"
              id="phoneInput"
              value={phoneInput}
              onChange={handlePhoneChange}
            />
            <button type="button" onClick={submitAdoption}>
              Submit
            </button>
            <button type="button" onClick={() => setAdopting(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={startAdopting}>
            Adopt me
          </button>
        )}
        <button type="button" onClick={home}>
          Back
        </button>
      </div>
    </div>
  );
};
/* eslint-enable */

Details.propTypes = {
  id: PropTypes.string,
};

Details.defaultProps = {
  id: null,
};

export default Details;
