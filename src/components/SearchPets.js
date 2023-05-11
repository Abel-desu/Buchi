import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PetsList from './PetList';
import petFinder from '../helpers/petFinderApi';
/* eslint-disable camelcase */
const SearchPets = ({
  pets = [],
  fetchPets,
  filterPets,
  filter,
  filterSize,
  size,
  // eslint-disable-next-line react/prop-types
  gender,
  // eslint-disable-next-line react/prop-types
  filterGender,
}) => {
  const [petSize, petSizeSet] = useState(size);
  const [petFilter, petFilterSet] = useState(filter);
  const [petGender, petGenderSet] = useState(gender || 'All');
  const [updatePets, setUpdatePets] = useState(pets || []);
  const [petAge, petAgeSet] = useState('All');
  const [good_with_children, filtergood_with_children] = useState(false);
  const ANIMALS = ['Cat', 'Dog'];
  const sizes = ['Small', 'Medium', 'Large'];
  const genders = ['Male', 'Female'];
  const Age = ['Baby', 'Young', 'Adult', 'Senior'];
  const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

  function petsRequest() {
    return petFinder.animal
      .search({
        type: petFilter,
        gender: petGender,
        size: petSize,
        species: 'cat, dog',
        good_with_children: true,

      })
      .then((data) => {
        const { animals } = data.data;
        fetchPets(animals);
        setUpdatePets(animals);
        filterPets(petFilter);
        filterSize(petSize);
        filterGender(petGender);
        filtergood_with_children(true);
      })
      .catch((error) => error);
  }

  const onFilterChange = (e) => {
    const { value } = e.target;
    petFilterSet(value);
  };

  const onSizeChange = (e) => {
    const { value } = e.target;
    petSizeSet(value);
  };

  const onGenderChange = (e) => {
    const { value } = e.target;
    petGenderSet(value);
  };

  useEffect(() => {
    petFinder.animal
      .search({
        species: 'cat, dog',
        gender: 'Male',
        size: 'Small',
      })
      .then((data) => {
        const { animals } = data.data;
        fetchPets(animals);
        setUpdatePets(animals);
      });
  }, []);

  return (
    <div className="main__wrapper" data-testid="search-pets-id">
      <div className="search__form__wrapper">
        <form
          data-testid="search-pets-form"
          className="search__form__wrapper-form"
          onSubmit={(e) => {
            e.preventDefault();
            petsRequest();
          }}
        >
          <div className="search__form__wrapper-form-box">
            <label htmlFor="id-1">
              Animal
              <select value={petFilter} onChange={onFilterChange}>
                <option>Select</option>
                {ANIMALS.map((option) => (
                  <option value={option} key={option}>
                    {capitalize(option)}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="id-2">
              Size
              <select value={petSize} onChange={onSizeChange}>
                <option>Select</option>
                {sizes.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="id-3">
              Gender
              <select value={petGender} onChange={onGenderChange}>
                <option>Select</option>
                {genders.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="id-4">
              Good with children
              <select value={good_with_children} onChange={filtergood_with_children}>
                <option>Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <label htmlFor="id-5">
              Age
              <select value={petAge} onChange={petAgeSet}>
                <option>Select</option>
                {Age.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" className="search__form__wrapper-form-btn">
            Search
          </button>
        </form>
      </div>
      <div className="pets__wrapper" data-testid="pets-list-id">
        <PetsList pets={updatePets} />
      </div>
    </div>
  );
};

SearchPets.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pets: PropTypes.arrayOf(PropTypes.any),
  fetchPets: PropTypes.func,
  filterPets: PropTypes.func,
  filter: PropTypes.string,
  filterSize: PropTypes.func,
  size: PropTypes.string,
};

SearchPets.defaultProps = {
  pets: [],
  fetchPets: () => {},
  filterPets: () => {},
  filter: '',
  filterSize: () => {},
  size: '',
};

export default SearchPets;
