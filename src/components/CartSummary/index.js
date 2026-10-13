import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )
      return (
        <div className="cardContainer">
          <div className="orderTotalContainer">
            <h1 className="orderTotalText">Order Total: </h1>
            <h1 className="orderTotalPriceText">Rs {totalPrice}/-</h1>
          </div>
          <p className="cartQuantityDescription">
            {cartList.length} items in cart
          </p>
          <button type="button" className="checkoutBtn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
