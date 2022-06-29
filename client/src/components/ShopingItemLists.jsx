// * Items sorted by "time to buy" when fetched                        ------------

import ShopItem from './ShopItem'
import AddItemModal from './AddItemModal'
import { useEffect, useState } from 'react'
import instance from '../config/axios'
import UpdateItemsModal from './UpdateItemsModal'

function ShoppingItemLists() {
    const [showModal, setShowModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [items, setItems] = useState([])
    const [updatedItem, setUpdatedItem] = useState({})

    const percentage = () => {
        let totalSumOfItemsPrice = 0
        let boughtItemTotalPrice = 0

        items.forEach((item) => {
            totalSumOfItemsPrice += Number(item.price)
            if (item.isChecked) {
                boughtItemTotalPrice += Number(item.price)
            }
        })

        return (totalSumOfItemsPrice / boughtItemTotalPrice).toFixed(2)
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await instance.get('/')
                setItems(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetch()
    }, [updatedItem])

    if (!items) {
        return <h1>loading.....</h1>
    }

    const handelUpdate = async (id) => {
        const item = items.find((item) => item._id === id)
        setUpdatedItem(item)
        setUpdateModal(true)
    }

    return (
        <div className="max-w-3xl py-10 mx-auto ">
            <h1 className="text-5xl font-semibold text-center font-popi py-3 ">
                Shopping item checklist
            </h1>
            {/* shopping in progress */}
            <div className="relative py-6">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                        <span className="text-xs font-semibold inline-block py-[5px] px-2  rounded-full text-sky-600 bg-sky-200 font-popi">
                            Items bought in progress
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-sky-600">
                            {Number(percentage())}
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-sky-200">
                    <div
                        style={{ width: `${Number(percentage())}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-sky-500"
                    ></div>
                </div>
            </div>
            {/*X */}
            <div className="my-3">
                <button
                    onClick={() => setShowModal(!showModal)}
                    className="px-4 py-2 text-lg font-semibold rounded-md shadow-md bg-color3 text-color1 an font-popi "
                >
                    Add Items
                </button>
            </div>
            <div className="flex flex-col flex-wrap w-full ">
                {items.map((item) => (
                    <ShopItem
                        key={item.id}
                        item={item}
                        setItems={setItems}
                        handelUpdate={handelUpdate}
                    />
                ))}
            </div>
            {showModal && (
                <AddItemModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setItems={setItems}
                />
            )}
            {updateModal && (
                <UpdateItemsModal
                    updateModal={updateModal}
                    setUpdateModal={setUpdateModal}
                    updatedItem={updatedItem}
                    setItems={setItems}
                />
            )}
        </div>
    )
}

export default ShoppingItemLists
