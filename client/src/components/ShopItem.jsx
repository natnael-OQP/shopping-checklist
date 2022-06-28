import { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function Item({ item: { image, name, price, description, createdAt } }) {
    return (
        <div className=" p-4    bg-gray-200">
            <div className="bg-white w-full flex flex-grow items-center">
                <input
                    className="   h-8 w-8 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                />
                {image && (
                    <div className="w-30 h-10">
                        <img className="w-30 h-10" src={image} alt={name} />
                    </div>
                )}
                <div>
                    <h3>{name}</h3>
                    <h3>{price}</h3>
                    <h3>{description}</h3>
                </div>
                <div>
                    <RiCloseCircleLine />
                    <TiEdit />
                </div>
            </div>
        </div>
    )
}

export default Item
