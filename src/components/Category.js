import React, {Component} from 'react'
// import Product from './Product'
import {connect} from 'react-redux'
// import {get_all_categories} from '../actions/Categories'
import ProductItem from './ProductItem'
import '../style/category.style.css'

class Category extends Component{
    state={
        name: "",
        category: {}
    
    }

    componentDidMount(){
        // console.log("category", this.props)
        // console.log("component is here")
        // this.props.dispatch(get_all_categories())
        const title = this.props.match.params.name;
        // this.setState({name:title})
        // const {categories} = this.props
        // const category = categories.filter(category=>category.name===title)


        // const category = this.props.dispatch(getCategory(title));
    }

    // componentDidUpdate(prevProps, prevState){
        // console.log('ssssssssssssssssssssssss', prevProps)
        // this.props.dispatch()
        // if(prevProps.initialTitle !== this.props.initialTitle){
            // const category = this.props.categories.filter(category=>category.name===this.props.match.params.name)
            // console.log("trueeeeeeeeeeeeeeeeeeeeeeeeeee")
            // this.setState({name: this.props.initialTitle})
        // }

    // }
    render(){
        const title = this.props.match.params.name
        // const products = this.props.category.products
        // if(this.props.categories.length !== 0){
        // }
        return(
            <div onClick={()=>{
                this.props.handleCloseCarMenu()
                this.props.handleCloseCurMenu()}}>
                <div className="category-title">{this.props.category&&this.props.category.name.toUpperCase()}</div>
                <div className='product-list-container'>
                {
                    (this.props.category !== undefined && (this.props.category.products).map(product=><ProductItem product={product} title={title} key={product.id}/>))
                }

                {/* {(this.props.categories.filter(category=>category.title===title).products).map(product=>(<div>{product.name}</div>))} */}
            </div>
            </div>
            
        )
    }
}


function mapStateToProps(state, props){
    // console.log("mapstate", state, props)
    return {
        category: (state.categories.filter(category=> category.name===props.match.params.name))[0],
        currentCurrency: state.currentCurrency
    }
}
export default connect(mapStateToProps)(Category)