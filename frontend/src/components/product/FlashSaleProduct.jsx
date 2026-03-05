import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const FlashSaleProduct = ({product}) => {
  return (
        <div className="relative">
            <HeartIcon product={product} />
            <Link className='p-5' to={`/product/${product._id}`}>
            <div className='md:w-fit w-full border-1 border-zinc-500 hover:shadow-xl shadow-indigo-500/50 rounded-md transition-all'>
            <img 
            className='md:w-[30vw] h-[40vh] w-full object-cover overflow-hidden rounded-md'
            src={product.image} alt={product.name} />
            <div className="px-4 py-3 flex flex-col gap-2">
                <h1 className='capitalize font-semibold md:text-xl text-md'>{product.name}</h1>
                <div className="relative">
                <div className='text-2xl font-semibold text-red-500'>$ {product.discountPrice.toFixed(2)}</div>
                <div className='text-xl font-semibold text-gray-500'>$ {product.actualPrice.toFixed(2)}</div>
                <div className="line absolute bottom-3 w-1/2 h-[0.5px] bg-white"></div>
                </div>
            </div>
            </div>
            </Link>
        </div>
  )
}

export default FlashSaleProduct
