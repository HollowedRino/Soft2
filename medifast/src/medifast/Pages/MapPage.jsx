import React from 'react'
import MapComponent from '../components/MapComponent'

export const MapPage = () => {
  return (
    <div className="flex flex-col py-5 px-5 sm:px-10">
        <h1 className="text-1xl font-bold mb-3 text-left">
            
        </h1>

        <div className="w-full bg-green-100 min-h-150 rounded-3xl">
            <div className=" w-full p-6 sm:px-10">
                    <MapComponent />
                

            </div>
        </div>
    </div>
  )
}
