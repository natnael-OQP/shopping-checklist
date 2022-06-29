import { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import instance from '../config/axios'

import moment from 'moment'

function Item({
    item: { _id, image, name, price, desc, createdAt, isChecked, updatedAt },
    setItems,
    handelUpdate,
}) {
    const [check, setIsChecked] = useState(isChecked)

    const truncate = (str) => {
        if (Number(str.length) >= 60) {
            return str.substring(0, 70) + '...'
        } else {
            return str
        }
    }

    const handelChecked = async () => {
        const ischecked = !check
        setIsChecked(!check)
        try {
            await instance.put(`/${_id}`, {
                isChecked: ischecked,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handelDelete = async () => {
        // create optimistic ui for
        setItems((prev) => prev.filter((item) => item?._id !== _id))
        try {
            await instance.delete(`/${_id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=" px-6 py-5 bg-[#EBECF4] rounded-md cursor-pointer">
            <div
                className={`${
                    check ? 'bg-violet-300' : 'bg-white'
                }  w-full flex flex-grow items-center p-3 rounded-md shadow-md relative`}
            >
                <input
                    className="float-left w-8 h-8 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm cursor-pointer checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                    type="checkbox"
                    checked={check}
                    values={check}
                    onChange={handelChecked}
                />
                {image && (
                    <>
                        <img
                            className="h-20 bg-transparent w-30 "
                            src={image}
                            alt={name}
                        />
                    </>
                )}
                <div className="w-full ml-3 ">
                    {check ? (
                        <h3 className="text-base font-semibold font-popi ">
                            <s>{name}</s>
                        </h3>
                    ) : (
                        <h3 className="text-base font-semibold font-popi ">
                            {name}
                        </h3>
                    )}

                    {check ? (
                        <h3 className="py-1 text-sm font-medium text-gray-500 font-popi">
                            <s>{truncate(desc)}</s>
                        </h3>
                    ) : (
                        <h3 className="py-1 text-sm font-medium text-gray-500 font-popi">
                            {truncate(desc)}
                        </h3>
                    )}

                    {check ? (
                        <h3 className="text-xs font-medium text-gray-500 font-popi">
                            <s>
                                {price}{' '}
                                <span className="text-[10px] ">birr</span>
                            </s>
                        </h3>
                    ) : (
                        <h3 className="text-xs font-medium text-gray-500 font-popi">
                            {price} <span className="text-[10px] ">birr</span>
                        </h3>
                    )}
                </div>
                <div className="flex flex-col ">
                    <button
                        onClick={handelDelete}
                        className="bg-[#EBECF4] m-1 p-[5px] hover:scale-105 rounded-sm active:scale-100 hover:sm"
                    >
                        <MdDelete size={24} color="#333" />
                    </button>
                    <button
                        onClick={() => handelUpdate(_id)}
                        className="bg-[#EBECF4] m-1 p-[5px] hover:scale-105 rounded-sm active:scale-100 hover:sm"
                    >
                        <MdEdit size={24} color="#333" />
                    </button>
                </div>
                <span className="text-xs font-medium text-slate-400 font-popi text-[10px] absolute bottom-0 left-5 ">
                    created at : {moment(createdAt).fromNow()}
                </span>
                <span className="text-xs font-medium text-slate-400 font-popi text-[10px] absolute bottom-0 right-5 ">
                    updated at : {moment(updatedAt).fromNow()}
                </span>
            </div>
        </div>
    )
}

export default Item
