import { createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store';

const animalsFromLocalStorage = localStorage.getItem('animals') || '[]';
const initialAnimals = JSON.parse(animalsFromLocalStorage);

export type Animal = {
  id: string,
  name: string,
  image: string,
  species: string
}

type InitialState = {
  animals: Animal[],
  filterValue: string,
  filteredItems: []
}

const initialState: InitialState = {
  animals: initialAnimals,
  filterValue: '',
  filteredItems: []
}

const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal(state, action) {
      state.animals.push(action.payload)

      localStorage.setItem('animals', JSON.stringify(state.animals))
    },

    removeAnimal(state, action) {
      state.animals = state.animals.filter((animal) => {

        return animal.id !== action.payload
      })

      localStorage.setItem('animals', JSON.stringify(state.animals))
    },

    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },

    filterItems: (state) => {
      state.filteredItems = state.animals.filter((animal) =>
        animal.species.includes(state.filterValue)
      );
    },

  }
})

export const selectAllAnimals = (state: RootState) => state.animals.animals

export const { addAnimal, removeAnimal, setFilterValue, filterItems } = animalSlice.actions

export default animalSlice.reducer







// const serialisedState = localStorage.getItem("animal") || '[]';
// if (serialisedState === null) return undefined;
// return JSON.parse(serialisedState);