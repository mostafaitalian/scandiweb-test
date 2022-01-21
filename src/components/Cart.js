import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import  {incProductQuantity, decProductQuantity, removeProductCart} from '../actions/Cart'
import {getSelectedAtt} from '../utils'
import '../style/cart.style.css'

class Cart extends Component{

    // handle increase the product quantity the + button 
    handleInc = (id, selectedAttrs)=>{
        this.props.dispatch(incProductQuantity(id, getSelectedAtt(id, selectedAttrs)))
    }

    // handle decrease the product quantity the - button
    handleDec = (id, selectedAttrs)=>{
        this.props.dispatch(decProductQuantity(id, getSelectedAtt(id, selectedAttrs)))
    }

    // handle remove the product with selected attributes from cart the X button
    handleRemoveCartProduct = (producId, selectedAttrs) => {
        this.props.dispatch(removeProductCart(producId,  getSelectedAtt(producId, selectedAttrs)))
    }


    render(){
        //console.log('Cart ')
        return(
            <div className='cart-container'>
            <div className="cart-header">Cart</div>
                {/* <div className='mini-cart-title'>My Bag: <span>{this.props.totalItems}</span> <span>{this.props.totalItems.length===1?'item':'items'}</span></div> */}
                {
                    this.props.cart.map(cartItem=>{
                        const{product, selectedAttrs, quantity} = cartItem
                        return <div className="cart-Item" key={`${product.id}${quantity}${JSON.stringify(selectedAttrs)}`}>
                            <div key={1} className='cart-item-info'>
                            <div className='cart-item-header' key={1}>
                                <div>{product.name}</div>
                                <div>{product.brand}</div>                                
                            </div>
                            <div key={2}>
                                {this.props.currentCurrency.symbol}{(product.prices.filter(price=>price.currency.label===this.props.currentCurrency.label)[0].amount*quantity).toFixed(2)}
                            </div>
                            <div className='cart-item-attrs' key={3}>
                                {
                                    (selectedAttrs.hasOwnProperty("attr")&&Object.keys(selectedAttrs["attr"]).length!==0) && Object.keys(selectedAttrs["attr"]).map(attrt=>{

                                        if(attrt==='Color'){
                                            return (
                                                <div className='cart-item-attrs-attr' key={attrt}>
                                        {Object.keys(selectedAttrs['attr'][attrt]).map(item=>{
                                            if(selectedAttrs['attr'][attrt][item].selected===true){
                                                return <div key={selectedAttrs['attr'][attrt][item].value} className='selected' style={{backgroundColor: selectedAttrs['attr'][attrt][item].value, border: '5px solid darkgray'}}></div>
                                            }
                                            else{
                                                return <div key={selectedAttrs['attr'][attrt][item].value} style={{backgroundColor: selectedAttrs['attr'][attrt][item].value}}></div>

                                            }
                                        })}
                                        </div>         
                                            )
                                        }
                                        return <div className='cart-item-attrs-attr' key={attrt}>
                                        {Object.keys(selectedAttrs['attr'][attrt]).map(item=>{
                                            if(selectedAttrs['attr'][attrt][item].selected===true){
                                                return <div key={selectedAttrs['attr'][attrt][item].value} className='selected'>{selectedAttrs['attr'][attrt][item].value}</div>
                                            }
                                            else{
                                                return <div key={selectedAttrs['attr'][attrt][item].value}>{selectedAttrs['attr'][attrt][item].value}</div>

                                            }
                                        })}
                                        </div>

                                    })
                                }
                            </div>
                            </div>
                            <div key={2} className='cart-item-qimg'>
                                <div className="dec-inc-product">
                                    <button disabled={quantity>10} onClick={()=>this.handleInc(product.id, selectedAttrs)}>+</button>
                                    <div>{quantity}</div>
                                    <button disabled={quantity<2} onClick={()=>this.handleDec(product.id, selectedAttrs)}>-</button>
                                </div>
                                <div className='cart-img'>
                                    <img src={product.gallery[0]} alt="product overview"/>
                                    <div onClick={()=>this.handleRemoveCartProduct(product.id, selectedAttrs)} className="cart-img-x">
                                    <div>X</div>
                                    </div>
                                </div>
                                

                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
}
function mapStateToProps(state, props){
    console.log("mapstate", state, props, state.currentCurrency)
    let total=0
    let totalItems = 0
    // calculate the total items number and total price
    if(state.cart.length !== 0){
        for(const cartItem of state.cart){
            const quantity = cartItem.quantity
            const price = cartItem.product.prices.filter(price=>price.currency.label===state.currentCurrency.label)[0].amount
            const cartItemPrice = price*quantity
            total += cartItemPrice
            totalItems += quantity
        }
    }
    

    return {
        currentCurrency: state.currentCurrency,
        cart: state.cart,
        total,
        totalItems
    }
}

export default connect(mapStateToProps)(withRouter(Cart))