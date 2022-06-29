import { useId } from 'react'
import { useState } from 'react'
import instance from '../config/axios.js'

function UpdateItemsModal({
    updateModal,
    setUpdateModal,
    setItems,
    updatedItem,
}) {
    const id = useId()
    const [name, setName] = useState(updatedItem.name)
    const [image, setImage] = useState(updatedItem.image)
    const [price, setPrice] = useState(updatedItem.price)
    const [desc, setDesc] = useState(updatedItem.desc)

    const handelSave = async () => {
        const item = {
            name,
            image,
            price,
            desc,
        }
        // optimistic ui
        setItems((prev) => {
            const newItem = prev.filter((item) => item._id !== updatedItem._id)
            return [...newItem, item]
        })
        setUpdateModal(!updateModal)
        try {
            await instance.put(`/${updatedItem._id}`, item)
        } catch (error) {
            console.log(error)
        }
    }

    const truncate = (str) => {
        if (Number(str?.length) >= 30) {
            return str.substring(0, 30) + '...'
        } else {
            return str
        }
    }

    return (
        <div className="cursor-pointer ">
            <>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-sm mx-auto my-6">
                        {/*content*/}
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-2xl outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                <h3 className="text-3xl font-semibold font-popi">
                                    Update Item
                                </h3>
                                <button
                                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                    onClick={() => setUpdateModal(false)}
                                >
                                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative flex-auto p-6">
                                {/* name */}
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="text"
                                        name={'name' + id}
                                        className="block py-2.5 px-0 w-full text-lg font-popi text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                    <label
                                        htmlFor={'name' + id}
                                        className="peer-focus:font-medium absolute text-md font-popi text-gray-500 dark:text-gray-400 duration-300 -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {updatedItem.name}
                                    </label>
                                </div>
                                {/* description */}
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="text"
                                        name={'desc' + id}
                                        className="block py-2.5 px-0 w-full text-lg font-popi text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        // value={desc}
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                        required
                                    />
                                    <label
                                        htmlFor={'desc' + id}
                                        className="peer-focus:font-medium absolute text-md font-popi text-gray-500 dark:text-gray-400 duration-300   -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {truncate(updatedItem.desc)}
                                    </label>
                                </div>
                                {/* imageURL */}
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="text"
                                        name={'image' + id}
                                        className="block py-2.5 px-0 w-full text-lg font-popi text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        // value={image}
                                        onChange={(e) =>
                                            setImage(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor={'image' + id}
                                        className="peer-focus:font-medium absolute text-md font-popi text-gray-500 dark:text-gray-400 duration-300 -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {updatedItem?.image
                                            ? `${truncate(updatedItem?.image)}`
                                            : 'empty 😒  please add image url'}
                                    </label>
                                </div>
                                {/* Price */}
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="text"
                                        name={'price' + id}
                                        className="block py-2.5 px-0 w-full text-lg font-popi text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        // value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        required
                                    />
                                    <label
                                        htmlFor={'price' + id}
                                        className="peer-focus:font-medium absolute text-md font-popi text-gray-500 dark:text-gray-400 duration-300 -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        {updatedItem.price}
                                    </label>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                                <button
                                    className="px-6 py-2 mb-1 mr-1 text-lg font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent font-popi focus:outline-none"
                                    type="button"
                                    onClick={() => setUpdateModal(!updateModal)}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold font-popi text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                    type="button"
                                    onClick={handelSave}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25 cursor-pointer"></div>
            </>
        </div>
    )
}

export default UpdateItemsModal
