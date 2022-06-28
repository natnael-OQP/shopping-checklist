// * Add items with name, time, cost and description                   ------------ X
// * Edit items and save                                               ------------
// * Delete items                                                      ------------ X
// * Check/uncheck items bought, with color difference                 ------------ X
// * Shows cost of  items bought vs total cost with progress bar       ------------
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

    console.log(updateModal)

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
    }, [])

    if (!items) {
        return <h1>loading.....</h1>
    }

    const handelUpdate = async (id) => {
        console.log('id=>', id)
        setUpdateModal(!updateModal)
    }

    return (
        <div className="max-w-3xl pt-20 mx-auto ">
            <h1 className="text-5xl font-semibold text-center font-popi ">
                Shopping item checklist
            </h1>
            <div className="my-4">
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
                    setItems={setItems}
                />
            )}
        </div>
    )
}

export default ShoppingItemLists
