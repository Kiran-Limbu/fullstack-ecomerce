import { Link } from 'react-router-dom'

const FlashSaleProduct = ({product}) => {
  return (
        <div className="h-full w-full relative">
            <Link to={`/product/${product._id}`}>
            <img 
            className='md:w-[30vw] h-[40vh] w-full object-cover overflow-hidden rounded-md'
            src={product.image} alt={product.name} />
            <div className="px-4 py-3 flex flex-col gap-2">
                <h1 className='capitalize font-semibold md:text-xl text-md'>{product.name}</h1>
                <span className='md:text-sm text-md font-semibold text-red-500'>$ {product.price.toFixed(2)}</span>
            </div>
            </Link>
        </div>
  )
}

export default FlashSaleProduct
