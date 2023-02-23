import { useSelector, useDispatch } from 'react-redux'
import { Animal, filterItems, setFilterValue } from './animalsSlice'
import './localAnimals.css'
import { removeAnimal } from './animalsSlice';
import { RootState } from '../store';


export const AnimalsList = () => {

  const dispatch = useDispatch();
  const animals = useSelector((state: RootState )=> state.animals.animals)
  const filteredItems = useSelector((state: RootState) => state.animals.filteredItems);
  const filterValue = useSelector((state: RootState) => state.animals.filterValue);

  const handleRemoveAnimal = (id: string) => {
    dispatch(removeAnimal(id))
  }


  return (
    <>
      <div className='animal__filtering__container'>
        <div>
          <label
            className='animal__filtering__label'>
            Search by species: 
            <input
              type='search'
              className='animal__filtering__input'
              value={filterValue}
              onChange={(e) => {
                dispatch(setFilterValue(e.target.value));
                dispatch(filterItems());
              }}
            ></input>  
          </label>
          <div className='animals__filtered'>
            {filteredItems.map((animal: Animal) => {
              return (
                <article
                  className='animals__card'
                  key={animal.id}>
                    <div className='animals__container--img'>
                      <img 
                        className='animals__image'
                        src={animal.image}></img>
                    </div>
                    <div>
                      <h3
                        className='animals__heading'>
                        {animal.name}
                      </h3>
                      <span
                        className='animals__species'>
                        {animal.species}
                      </span>
                    </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      <div className='animals__container'>
        {animals.map((animal: Animal) => {
          return (
            <article
              className='animals__card'
              key={animal.id}>
                <div className='animals__container--img'>
                  <img 
                    className='animals__image'
                    src={animal.image}></img>
                </div>
                <div>
                  <h3
                    className='animals__heading'>
                    {animal.name}
                  </h3>
                  <span
                    className='animals__species'>
                    {animal.species}
                  </span>
                </div>
                <br />
                <button
                  type='button'
                  onClick={() => handleRemoveAnimal(animal.id)}
                >
                  Delete animal
                </button>
            </article>
          )
        })}
      </div>
    </>
  )
}