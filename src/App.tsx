import { useState } from 'react'
import './App.css'
import './Store/RTKQuery/apiAnimals.css'
import { AddAnimalForm } from './Store/LocalStorage/addAnimalForm';
import { AnimalsList } from './Store/LocalStorage/animalsList';
import { useGetAnimalsQuery, useAddNewAnimalMutation, useDeleteAnimalMutation } from './Store/RTKQuery/apiSlice';


interface Animal {
  id: number,
  name: string,
  image: string,
  species: string
}

function App() {

  const { data, error, isLoading } = useGetAnimalsQuery('animals')
  const [name, setName] = useState('');
  const [image, setImage] = useState('')
  const [species, setSpecies] = useState('')
  const [addNewAnimal] = useAddNewAnimalMutation();
  const [deleteAnimal] = useDeleteAnimalMutation();

  const canSave = [name, image, species].every(Boolean) && !isLoading

  const handleSaveAnimal = async () => {
    if (canSave) {
      try {
        await addNewAnimal({ image, name, species }).unwrap()
        setImage('')
        setName('')
      } catch (error) {
        console.error('Failed!', error)
      }
    }
  }
  

  return (
    <div className="App">

      <h1 className='App__heading'>
        Animals
      </h1>

      <section>
        <AddAnimalForm />
        <AnimalsList />
      </section>

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
              type='text'
              className='form__input'
              value={name}
              required
              name='name'
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
              value={species}
              name='species'
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
          onClick={handleSaveAnimal}
          >
          ADD
        </button>
      </form>

      <div className='animal__container'>
        {error ? (
          <>OOOH, no</>
        ): isLoading ? (
          <>Loading...</>
        ): data ? (
          <>
            {data.map((animal: Animal) => {
              return (
                <div 
                  key={animal.id}
                  className='animal__card'>
                  <div className='animal__container--img'>
                    <img 
                    className='animal__image'
                    src={animal.image}></img>
                  </div>
                  <div>
                    <h3
                      className='animal__heading'>
                      {animal.name}
                    </h3>
                    <span
                      className='animal__species'>
                      {animal.species}
                    </span>
                    <br />
                    <br />
                    <button
                      onClick={() => deleteAnimal(animal.id)}
                    >
                      delete animal
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        ): null}
      </div>
    </div>
  )
}

export default App
