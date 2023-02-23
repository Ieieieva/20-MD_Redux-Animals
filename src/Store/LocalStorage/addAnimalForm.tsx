import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addAnimal } from './animalsSlice';
import './localAnimals.css'

export const AddAnimalForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [species, setSpecies] = useState('');

  const dispatch = useDispatch(); 

  const handleAddAnimal = () => {
    if (name && image && species) {
      dispatch(
        addAnimal({
          id: nanoid(),
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
        <span className='form__heading'>
          Add new animal
        </span>
        <div>
          <label
            className='form__label'>
            Name:
            <input
              className='form__input'
              type='text'
              value={name}
              name='name'
              required
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></input>
          </label>
        </div>
        <div>
          <label
            className='form__label'>
            Image src:
            <input
              type='text'
              className='form__input'
              value={image}
              name='image'
              required
              onChange={(e) => {
                setImage(e.target.value)
              }}
            ></input>
          </label>
        </div>
        <div>
          <label
            className='form__label'>
            Select species:
            <select
              className='form__input'
              name='species'
              value={species}
              required
              onChange={(e) => {
                setSpecies(e.target.value)
              }}>
              <option defaultValue="animal">animal</option>
              <option value="cat">cat</option>
              <option value="dog">dog</option>
              <option value="fish">fish</option>
            </select>
          </label>
        </div>
        <button
          onClick={handleAddAnimal}
          >
          ADD
        </button>
      </form>
    </>
  )
}