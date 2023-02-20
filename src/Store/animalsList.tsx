import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Animal } from './animalsSlice'
import './animalList.css'


export const AnimalsList = () => {
  const animals = useSelector((state: any )=> state.animals)
  
  
  return (
    <div className='animals__container'>
      {animals.map((animal: Animal) => {
        return (
          <article
            className='animals__card'
            key={animal.id}>
               <img 
                  className='animals__image'
                  src={animal.image}></img>
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
  )
}