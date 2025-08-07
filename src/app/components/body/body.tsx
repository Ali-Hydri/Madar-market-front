import React from 'react'
import SwiperGallery from './photos/photosSlider'
import Timer from './timer/timer'
import Categories from './Product categories/categories'
import Special from './Special products/specials'
import AdvertisingBox from './Advertising box/advertisingBox'


function body() {
  return (
    <div className='w-full mx-auto ' >
        <SwiperGallery />
        <Timer />
        <Categories />
        <Special />
        <AdvertisingBox />
    </div>
  )
}

export default body