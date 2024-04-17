import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'

import Testimonials from './Testimonials'
import OurServices from './OurServices'
import SpecialDishes from './SpecialDishes'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      <Testimonials/>
      <OurServices/>
      
    </div>
  )
}

export default Home