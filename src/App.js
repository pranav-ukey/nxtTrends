import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (existingProduct) {
        return {
          cartList: prevState.cartList.map(eachItem =>
            eachItem.id === product.id
              ? {...eachItem, quantity: eachItem.quantity + 1}
              : eachItem,
          ),
        }
      }
      return {
        cartList: [...prevState.cartList, {...product, quantity: 1}],
      }
    })
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachProduct => eachProduct.id !== productId,
      ),
    }))
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.id === productId
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      ),
    }))
  }

  decrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(eachItem =>
          eachItem.id === productId
            ? {...eachItem, quantity: eachItem.quantity - 1}
            : eachItem,
        )
        .filter(eachItem => eachItem.quantity > 0),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
