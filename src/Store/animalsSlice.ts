import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Animal = {
  id: number,
  name: string,
  image: string,
  species: string
}

const initialState= [
  {
    "id": 1,
    "name": "Fluffy",
    "image": "https://dinozoopasaule.lv/lv/getimage/uploads/newstype/voXXW9VUeTrwdMuQOqh2BiJXclEvpIgm.png?w=960",
    "species": "cat"
  },
  {
    "id": 3,
    "name": "Doggo",
    "image": "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/580540_mjznrj.jpg",
    "species": "dog"
  },
  {
    "id": 4,
    "name": "Golden",
    "image": "https://www.luminor.lv/sites/default/files/styles/base_image_1440/public/documents/images/common/goldfish-cropped.png?itok=kwZAcD1J",
    "species": "fish"
  }
]


const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    animalAdded(state, action) {
      state.push(action.payload)
      localStorage.setItem('animal', JSON.stringify(state))
    },
  }
})

export const { animalAdded } = animalSlice.actions

export default animalSlice.reducer







// const serialisedState = localStorage.getItem("animal");
// if (serialisedState === null) return undefined;
// return JSON.parse(serialisedState);