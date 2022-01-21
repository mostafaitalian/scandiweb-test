import React, {Component} from 'react';
import styled from 'styled-components'
// import '../styles.css'
import {Link, NavLink} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import FadingBalls from 'react-cssfx-loading/lib/FadingBalls'
import {ReactComponent as DownArrow} from '../logos/da.svg';
import {ReactComponent as EmptyCart} from '../logos/emptycart.svg';
import {ReactComponent as FullCart} from '../logos/fullcart.svg';
import {ReactComponent as ColorCart} from '../logos/colorcart.svg';
import {ReactComponent as PutCart} from '../logos/putcart.svg';
import {ReactComponent as TakeOutCart} from '../logos/takeoutcart.svg';
import {connect} from 'react-redux'
import CurrencyList from './CurrencyList';
import MiniCart from './MiniCart';
import '../style/navcomponent.style.css'
//import styled from 'styled-components'



class NavComponent extends Component{

    constructor(props){
        super(props)
        // this.state={
        //     currency:{showCurrency:false, class:"hide"},
        //     cart:{showCart:false, class:"hide"},
        // }
        this.cartRef = React.createRef()
        this.curRef = React.createRef()
    }
    componentDidMount(){
        console.log("nav component mount")
        console.log(this.cartRef.current)
        console.log(this.curRef.current)
    }
    handleOnClick = (t)=>{
        this.props.changeInitialTitle(t)
    }
    // handleCloseCurMenu=()=>{
    //     this.setState({currency:{showCurrency:false, class:"hide"}})
    // }
    // handleCloseCarMenu=()=>{
    //     this.setState({cart:{showCart:false, class:"hide"}})
    // }
    handleShowHide= (e)=>{
        console.log(e.target, this.cartRef.current, this.curRef.current)
        console.log(e.target===this.cartRef.current)
        if(e.target===this.curRef.current){
            this.props.handleCloseCarMenu()
            // this.setState(prev=>{
            //     return {
            //         cart:{showCart:false, class:"hide"},
            //         currency:{showCurrency: !(prev.cart.showCurrency), class: prev.currency.class==="hide"?"show":"hide"}
            //     }
            // })
            this.props.handleShowCurrency()
        }
        else if(e.target===this.cartRef.current){
            this.props.handleCloseCurMenu()

            this.props.handleShowCart()
            // this.setState(prev=>{
            //     return {
            //         currency:{showCurrency:false, class:"hide"},
            //         cart:{showCart: !(prev.cart.showCart), class: prev.cart.class==="hide"?"show":"hide"}
            //     }
            // })
        }

    }
    handleNavToCart = ()=>{
        this.props.handleCloseCarMenu()
        this.props.handleCloseCurMenu()
        this.props.history.push('/cart')

    }
    render(){
    const activeStyle = {
        fontWeight: "bold",
        color: "green",
        // paddingBottom: '50px',
        lineHeight: "200%",
        borderBottom: "2px solid",
        // boxSizing: "content-box"
    }
    const NavHeader = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 20px 0px 20px;
        outline-offset: 50px;

        /* background-color: yellow; */
        color: black;
        box-sizing: border-box`;
    // const ArrowConaiter = styled.div`
    //     position:"absolute";
    //     display: flex;
    //     align-items: center;
    //     top:20;
    //     left:0;
    //     width:"90px";
    //     box-shadow: 1px, 1px, 4px, 1px;
    // `;
        const { loading, categoriesTitles: titles} = this.props;
        console.log(this.props.cart, this.props.currency);
    const ItemDiv = styled.div`
        margin-right: 40px;
        position: relative;
        backgroundColor:red;
        display: flex;
        alignItems: center;
    `;

        return(
            <NavHeader>
                <div className='item'>
                { (loading===true) && <FadingBalls color="#00FF00"/>}
                {(loading===false && titles) && (titles.categories).map(category=><NavLink to={{pathname: `/${category.name}`}} isActive={()=>this.props.location.pathname.includes(category.name)} activeStyle={activeStyle} onClick={()=>this.handleOnClick(category.name)} className='cat-item' key={category.name}>{category.name.toUpperCase()}</NavLink>)}
                </div>
                <div className='item' onClick={()=>this.handleNavToCart()}><ColorCart width={25} height={25}/></div>

                <div className='item'>

                <ItemDiv>
                <div style={{marginRight:"5px"}}>
                {this.props.currentCurrency.symbol}
                </div>
                <div style={{textAlign:'center', paddingBottom:"5px"}}>
                <DownArrow ref={this.curRef} width={7} height={7} onClick={(e)=>this.handleShowHide(e)}/>

                </div>
                <div  className={`arrow-layout ${this.props.currency!==undefined?this.props.currency.class:'hide'}`}>
                <CurrencyList currencies={this.props.currencies} handleCloseCurMenu={this.props.handleCloseCurMenu}/>
                </div>
                </ItemDiv>


                <ItemDiv>
                {
                    this.props.cart.length===0?
                    <EmptyCart ref={this.cartRef} width={15} height={15} onClick={(e)=>this.handleShowHide(e)}/>

                    :<div className="full-cart-container">
                    <FullCart ref={this.cartRef} width={15} height={15} onClick={(e)=>this.handleShowHide(e)}/>
                    <div className="cart-items-count">{this.props.cart.length}</div>
                    </div>


                }

                <div className={`cart-layout ${this.props.car!==undefined?this.props.car.class:'hide'}`}  style={{position:"absolute",top:20, right:-50,zIndex:3}}>
                        <MiniCart/>
                </div>
                </ItemDiv>

                </div>
            </NavHeader>
        )
    }
}


function mapStateToProps(state, props){
    // console.log("mapstate", state, props)
    const category = state.categories.filter(category=>category.name===state.title)
    return {
        category,
        currencies: state.currencies,
        currentCurrency: state.currentCurrency,
        cart: state.cart
    }
  }

export default connect(mapStateToProps)(withRouter(NavComponent))