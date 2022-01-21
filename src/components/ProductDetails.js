import React, {Component} from 'react'
import {connect} from 'react-redux'
// import '../styles.css'
import {client} from '../index'
import {gql} from '@apollo/client';
import Spin from 'react-cssfx-loading/lib/Spin'
import { checkAllAttributesSelected, getPrice} from '../utils/index'
import Attributes from './Attributes';
import {addProductCart, incProductQuantity, incProductQuantityNoAttr} from '../actions/Cart'
import {arrayInArrays} from '../utils'
import {reshapeAttributes} from '../utils'
import '../style/productdetail.style.css'




class ProductDetails extends Component{

    state={
        product: {},
        loading: true,
        mainSrc: "",
        subSrc:"",
        selectedAttrs:{},
        flag: false,
        btnClass:""

    }



    componentDidMount(){
        // console.log("productdetails", this.props)
        // const product = this.props.category.products
        // .filter(product=>product.id===this.props.match.params.productId)[0]
        // console.log(product, reshapeAttributes(product.attributes))
        this.props.handleCloseCarMenu()
        this.props.handleCloseCurMenu()
        this.props.changeInitialTitle(this.props.match.params.categoryName)
        const {productId} = this.props.match.params
        const productQuery = gql`query ExampleQuery($productId: String!) {
            product(id: $productId) {
              id
              name
              inStock
              gallery
              description
              category
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
              brand
            }
          }`
        client.query({
            query: productQuery,
            variables: {productId}
        }).then(result=>{
            this.setState({product: result.data.product, loading: result.loading, mainSrc: result.data.product.gallery[0]},()=>{
                localStorage.setItem('product', JSON.stringify(this.state.product))
            })
            
        }).then(()=>{if(Object.keys(this.props.currentCurrency).length!==0){localStorage.setItem('currentCurrency', JSON.stringify(this.props.currentCurrency))}}
        )
        .catch(error=>console.log(error))
    }
    // componentDidUpdate(prevProps, prevState){
    //     if(prevState.btnClass !== this.state.btnClass){
    //         console.log('it is updatedddddd')
    //         this.setState({flag: false,btnClass:''})
    //     }
    // }
    handleClickimage=(e)=>{
        // console.log(e)
        const src = e.target.currentSrc
        const mainSrc = this.state.mainSrc
        e.target.attributes[0].nodeValue = mainSrc
        this.setState({mainSrc: src})

    }

    handleAddToCart=()=>{
        this.props.handleCloseCarMenu()
        this.props.handleCloseCurMenu()
        const product = this.props.category.products.filter(product=>product.id===this.props.match.params.productId)[0]
        const sameProductsInCart = this.props.cart.filter(cartItem=>cartItem.product.id===product.id)
        let a = [product.id]
        let b = []
        // if user didnot select any attribute for a product ex size or color
        if(Object.keys(this.state.selectedAttrs).length===0 && product.attributes.length !==0 ){
            console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            this.setState({btnClass:"btn-no-attr", flag:true}, ()=>{
                setTimeout(()=>this.setState({btnClass:""}), 500)
            })
   
        }
        else if(Object.keys(this.state.selectedAttrs).length===0 && product.attributes.length ===0 ){
            let cartProductIds = []
            for(const sProduct of this.props.cart){
                cartProductIds.push(sProduct.product.id)
            }
            if(cartProductIds.includes(product.id)){
                this.props.dispatch(incProductQuantityNoAttr(product.id))
                this.props.history.push(`/${product.category}`)
            }
            else{
                this.props.dispatch(addProductCart(product, 1, this.state.selectedAttrs))
                this.props.history.push(`/${product.category}`)
            }


        }
        else if(!checkAllAttributesSelected(this.state.selectedAttrs)){
            this.setState({btnClass:"btn-no-attr", flag:true}, ()=>{
                setTimeout(()=>this.setState({btnClass:""}), 500)})
        }
        else {
            const sAttributes = this.state.selectedAttrs['attr']
            for(const att of Object.keys(sAttributes)){
                for(const attItem of Object.keys(sAttributes[att])){
                    if(sAttributes[att][attItem].selected===true){
                         a.push(attItem)                        
                    }
    
                }
            }
            for(const sProduct of sameProductsInCart){
                let c = [sProduct.product.id]
                const attributes=sProduct.selectedAttrs['attr']
                for(const att of Object.keys(attributes)){
                    for(const attItem of Object.keys(attributes[att])){
                        if(attributes[att][attItem].selected===true){                           
                             c.push(attItem)
                        }
                    }
                }
                b.push(c)
            }

            // if user select an item with attributes exists already in the cart
            // this means that we only need to increase the quantity of that item
            if(arrayInArrays(a, b)){
                console.log("selectedattr1",this.state.selectedAttrs)
                this.props.dispatch(incProductQuantity(product.id,a))
                this.props.history.push(`/${product.category}`)                
            }
            // add new item in the cart
            else{
                this.props.dispatch(addProductCart(product, 1, this.state.selectedAttrs))
                this.props.history.push(`/${product.category}`)
            }
        }

    }
    handleAddSelectedAttrs=(attr)=>{
        this.setState(prev=>({selectedAttrs:{...prev.selectedAttrs, attr}}),()=>console.log(this.state))
    }
    resetFlag = ()=>{
        this.setState({flag:false})
    }
    render(){
        const {loading, mainSrc} = this.state
        const {category, match} = this.props
        let currentCurrency = this.props.currentCurrency
        const product = category !== undefined? category.products.filter(product=>product.id===match.params.productId)[0]:JSON.parse(localStorage.getItem('product'))
        if(Object.keys(currentCurrency).length===0){
            currentCurrency = JSON.parse(localStorage.getItem('currentCurrency'))
        }

        const pricing = getPrice(currentCurrency,product)
        const htmlFrom= `
        ${product.description}`;

        if(loading){
            return <div className="loading-container"><Spin color="#00FF00"/></div>
        }
        return(
            <div className="product-container" onClick={()=>{
                this.props.handleCloseCarMenu()
                this.props.handleCloseCurMenu()
            }}>
                <div className="product-image-collection">
                <div className='product-other-images'>
                {(product.gallery.slice(1)).map(img=><img src={img} key={img}  onClick={(e)=>this.handleClickimage(e)} alt="product collection"/>)}
                </div>
                <div className="product-main-image">
                <img src={mainSrc} alt="product collection"/>
                </div>

                </div>
                <div className="product-info">
                    <div className='product-header'>
                    <h2>{product.name}</h2>
                    <h3>{product.brand}</h3>
                    </div>
                    <div className='attrs-container'>
                        <Attributes resetFlag={this.resetFlag} attributes={product.attributes} inStock={product.inStock} handleAddSelectedAttrs={this.handleAddSelectedAttrs}/>
                    </div>
                    <div className='price-container'>
                        <h5>PRICES:</h5>
                        <div>
                            <h4>{pricing.symbol} {pricing.amount}</h4>
                        </div>
                    </div>
                    <div className='button-container'>
                        
                        <button className={product.inStock?`btn-available ${this.state.btnClass}`:'btn-unavailable'} disabled={!product.inStock} onClick={()=>this.handleAddToCart()}>Add To Cart</button>
                    </div>
                    {this.state.flag&&<div className="text-danger">*you have to select from attributes</div>}

                    <div className='product-description' dangerouslySetInnerHTML={{__html: htmlFrom}}>
                    
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props){
    // console.log("mapstate", state, props, state.currentCurrency)
    return {
        category: (state.categories.filter(category=> category.name===props.match.params.categoryName))[0],
        currentCurrency: state.currentCurrency,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(ProductDetails)