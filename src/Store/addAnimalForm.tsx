import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { animalAdded } from './animalsSlice';

export const AddAnimalForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [species, setSpecies] = useState('');

  const dispatch = useDispatch(); 

  const handleAddAnimal = () => {
    if (name && image && species) {
      dispatch(
        animalAdded({
          id: nanoid,
          image,
          name,
          species
        })
      )
      setImage('')
      setName('')
    }
  }

  return (
    <>
      <form
        className='App__form'
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <h2>Animaļi no initialState</h2>
        <div className='form__one'>
          <label
            className='form__label'>
            Name:
            <input
              type='text'
              value={name}
              name='name'
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></input>
          </label>
        </div>
        <div className='form__two'>
          <label
            className='form__label'>
            Image src:
            <input
              type='text'
              value={image}
              name='image'
              onChange={(e) => {
                setImage(e.target.value)
              }}
            ></input>
          </label>
        </div>
        <div className='form__three'>
          <label
            className='form__label'>
            Select species:
            <select
              className='dropdown'
              name='species'
              value={species}
              onChange={(e) => {
                setSpecies(e.target.value)
              }}>
              <option value="cat">cat</option>
              <option value="dog">dog</option>
              <option value="fish">fish</option>
            </select>
          </label>
        </div>
        <button
          onClick={handleAddAnimal}
          >
          add
        </button>
      </form>
    </>
  )

}