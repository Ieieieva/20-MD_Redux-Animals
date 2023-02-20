import { useState } from 'react'
import './App.css'
import { useAddNewAnimalMutation, useDeleteAnimalMutation, useGetAnimalsQuery } from './Store/apiSlice'
import { AnimalsList } from './Store/animalsList'
import { AddAnimalForm } from './Store/addAnimalForm'

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
        <h2>Animaļi no RTK Query</h2>  
        <div className='form__one'>
          <label
            className='form__label'>
            Name:
            <input
              type='text'
              value={name}
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
              name='animal'
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
          onClick={handleSaveAnimal}
          >
          add
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
                  <img 
                    className='animal__image'
                    src={animal.image}></img>
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
                    {/* <button
                      onClick={() => deleteAnimal(animal.id)}
                    >
                      delete animal
                    </button> */}
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
