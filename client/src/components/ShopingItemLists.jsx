// import { Items } from '../Data
import ShopItem from './ShopItem'
import AddItemModal from './AddItemModal'
import { useEffect, useState } from 'react'
import instance from '../config/axios'

function ShoppingItemLists() {
    const [showModal, setShowModal] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const { data } = await instance.get('/')
            setItems(data)
        }
        fetch()
    }, [])

    console.log(items)

    if (!items) {
        return <h1>loading.....</h1>
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
                    <ShopItem key={item.id} item={item} setItems={setItems} />
                ))}
            </div>
            {showModal && (
                <AddItemModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setItems={setItems}
                />
            )}
        </div>
    )
}

export default ShoppingItemLists
