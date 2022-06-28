import { Items } from '../Data'
import ShopItem from './ShopItem'

function ShoppingItemLists() {
    return (
        <div className="max-w-3xl mx-auto   pt-20  ">
            <h1 className="text-5xl font-popi font-semibold text-center mb-4">
                Shopping item checklist
            </h1>
            {Items.map((item) => (
                <ShopItem key={item.id} item={item} />
            ))}
        </div>
    )
}

export default ShoppingItemLists
