import {getAllCategories, getAllCurrencies} from '../utils/index'
import {add_all_categories, get_all_categories} from './Categories'
import {addCurrencies} from './Currencies'
import {addCurrentCurrency} from './CurrentCurrency'
import {addProductCart} from './Cart'

// handle initial data and setup store
// add all categories in the store
// add all currencies in the store
// add current currency in the store
// using thunk middleware 
export function handleInitData(){
    return(dispatch, getState)=>{
        Promise.all([getAllCategories(), getAllCurrencies()]).then(([resultCategories, resultCurrencies])=>{
            if(resultCategories.loading===false){
                dispatch(add_all_categories(resultCategories.data))
              }
            if(resultCurrencies.loading===false){
                console.log(resultCurrencies)
                dispatch(addCurrencies(resultCurrencies.data))
                dispatch(addCurrentCurrency(resultCurrencies.data.currencies[0]))
              }
        })
        // .then(()=>dispatch(addCurrencies()))
        .catch(error=>console.log(error))
    }
}


