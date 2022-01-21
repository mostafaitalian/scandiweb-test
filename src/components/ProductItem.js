import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import '../style/productitem.style.css'
import {ReactComponent as InCart} from '../logos/incart.svg'
import {ReactComponent as ColorCart} from '../logos/colorcart.svg';


class ProductItem extends Component{
    


    handleNavToPD = ()=>{
        this.props.history.push(`/products/${this.props.product.category}/${this.props.product.id}`)
    }
    render(){
        const {product} = this.props
        let amount, symbol
        if(this.props.currentCurrency!==undefined && Object.keys(this.props.currentCurrency)){
            const a = this.props.product.prices.filter(price=>price.currency.label===this.props.currentCurrency.label)
            const p = a[0]
            if(p!==undefined){
                amount=p.amount
                symbol = p.currency.symbol

            }
            // console.log(p.amount)
        }
        // console.log(product, currentCurrency)
        return(
            <div className="product-item">
            <div className='img-container' onClick={()=>this.handleNavToPD()} style={{position:"relative"}}>
            {(this.props.cart.find(pc=>pc.product.id===product.id)) && (
                <div className='product-in-cart'>
                <InCart height={25} width={25}/>
            </div>
            )}
            {product.inStock?<img className="product-item-img" src={product.gallery[0]} alt="product-item"/>
            :<Fragment>
            <div  style={{position:"absolute", top: "50%", left:"-50", width:"100%", color: "rgb(117, 117, 117)", fontSize:"1.75rem", fontWeight:"500", lineHeight:'2'}}>Out of Stock</div>
            {/* <Link to={`/products/${product.productId}`}></Link> */}
            <img className="product-item-img"  src={product.gallery[0]} style={{opacity:'0.4'}} alt="product-item"/>
            </Fragment>

            }

            </div>
            <div className="product-item-info">
            <h4>
            {product.name}
            </h4>
            <h4>
            {symbol} {amount}
            </h4>
            </div>
            </div>
        )
    }
}
function getPrice(curCurrency,product){
    let amount, symbol
    if(curCurrency!==undefined && Object.keys(curCurrency)){
        console.log(curCurrency)
        const a = product.prices.filter(price=>price.currency.label===curCurrency.label)
        console.log(a)
        const p = a[0]
        console.log(p)
        if(p!==undefined){
            amount=p.amount
            symbol = p.currency.symbol
            console.log(amount)
            return {
                amount,
                symbol
            }
        }
        // console.log(p.amount)
    }
}

function mapStateToProps(state, props){
    return {
        currentCurrency: state.currentCurrency,
        cart: state.cart
    }
}
export default connect(mapStateToProps)(withRouter(ProductItem))