import React from 'react'
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";

const Navbar = ({handleClickC,handleClickF,handleChange,city,handleGet}) => {
    return (
        <nav className='flex w-full justify-between py-3 items-center sticky top-0 z-10 bg-[#d5d4fd]'>
            <div className='font-medium'>Weather App</div>
            <div className="searchbox w-1/2 flex gap-3 justify-center">
                <input onChange={handleChange} className="rounded-lg p-1 px-3 w-1/2 shadow-sm bg-violet-100 border-2 border-violet-100 hover:border-violet-700 focus:border-violet-700 outline-none" name='city' value={city} type="text" placeholder='Search for cities' autoFocus />
                <button onClick={handleGet} className='bg-violet-500 rounded-lg p-1 text-white px-2'>Get Weather</button>
            </div>
            <div className='flex rounded-full bg-violet-100 p-[2px] gap-1'>
                <div onClick={handleClickC} className="rounded-full cursor-pointer temp-button">
                    <div className="p-1"><TbTemperatureCelsius /></div>
                </div>
                <div onClick={handleClickF} className="rounded-full cursor-pointer temp-button">
                    <div className="p-1"><TbTemperatureFahrenheit /></div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar