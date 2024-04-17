import React from 'react'

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
        <div className='py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8'>
        {/* IMAGES */}
        <div className='md:w-1/2'>
                <img src='/images/home/banner.png' alt=''/>
                <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
                <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-2 shadow-md w-64">
                <img src='/images/home/b-food1.png' alt='' className='rounded-2xl'/>
                <div className='space-y-1'>
                <h5 className="font-medium mb-1">Spicy noodles</h5>
                <div className="rating rating-sm">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly/>
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly/>
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly/>
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly/>
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly/>
</div>
<p className="text-red">$18.00</p>
                </div>
                </div>
                <div className=" md:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-2 shadow-md w-64">
                <img src='/images/home/b-food1.png' alt='' className='rounded-2xl'/>
                <div className='space-y-1'>
                <h5 className="font-medium mb-1">Spicy noodles</h5>
                <div className="rating rating-sm">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
<p className="text-red">$18.00</p>
                </div>
                </div>
                </div>
                
            </div>
        {/* TEXTS */}
            <div className='md:w-1/2 space-y-7 px-4'>
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable <span className="text-yellow">Food</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
            Order Now
          </button>
            </div>
            
            
        </div>
    </div>
  )
}

export default Banner