import React, {Component} from 'react'
import '../style/attributes.style.css'


class Attributes extends Component{
    constructor(props){
        super(props)
        this.state={
            items:{},
            defaultItems:{},
            x:""
        }
    }

    componentDidMount= async()=>{
        // reshape the attributes put selected attribute to control the behaviour of the component
        const {attributes}= this.props
        let h ={}
        // i should use here for---of 
        const result = attributes.map(att=>{
            if(att.items.length!==0){
                const r = att.items.map(item=>{
                    h={
                        ...h, [att.name]: {
                            ...h[att.name], ...{[item.value]:{class:"", value: item.value, selected:false}}
                        }
                    }
                    // {[item.value]:{class:''}}
                    return h
                })
            }
            return h
        })
    // put the reshaped attributes in state
    this.setState({ items: h, defaultItems:h },()=>console.log(this.state))
    }
    // handle selecting certain attribute value ex. size 40
    handleSelect = (e,attr)=>{

        this.props.resetFlag()
        // first put state to default value
        this.setState(prev=>({items:{...prev.items, [attr.attrName]: this.state.defaultItems[attr.attrName]}}))
        // change the selected attribute totrue depending on dataset of the target
        this.setState(prev=>(
            {items: 
                {...prev.items
                    , [attr.attrName]:{...prev.items[attr.attrName]
                        ,[e.target.dataset.g]:{...prev.items[attr.attrName][e.target.dataset.g]
                            ,class: attr.attrName !=='Color'?"selected":"selected colo", selected: true}}}})
                            , ()=>{
                                this.props.handleAddSelectedAttrs(this.state.items)

                            })
    }
    render(){
        // destructing attributes from props
        const {attributes} = this.props
        return(
            <div>
            {
                attributes&&attributes.map(attribute=>{
                    let items
                    if(attribute.items&&attribute.items.length!==0){
                        items = attribute.items
                    }
                    return(
                        <div className='attr-container' key={attribute.name}>
                            <div className='attr-title'>{attribute.name}:</div>
                            {
                                attribute.type!=='swatch'?(
                                <div className='items-container'>{
                                        (items !== undefined&&(items.map((item)=>{
                                            let v, x =''
                                            if((this.state.items[attribute.name])!== undefined && Object.keys(this.state.items).length!==0){
                                                v = item.value
                                                x = ((this.state.items[attribute.name]))
                                            }
                                    
                                        return <div ref={this.divRef} data-g={`${item.value}`} className={(x!==undefined&&v!==undefined)&&`${x[v].class}`} onClick={(e)=>this.handleSelect(e, {attrName :attribute.name, selectedItem:{id:item.id, value: item.value, displayValue:item.displayValue}})} key={item.value}>
                                            {item.value}
                                            </div>
                                        }))
                                           
 
                                    
                                )}
                                </div>
                                ):(
                                    <div className='sitems-container'>{
                                        (items !== undefined&&(items.map((item)=>{
                                            let v, x =''
                                            if((this.state.items[attribute.name])!== undefined && Object.keys(this.state.items).length!==0){
                                                v = item.value
                                                x = ((this.state.items[attribute.name]))
                                            }
                                    
                                        return <div style={{backgroundColor: `${item.value}`}} ref={this.divRef} data-g={`${item.value}`} className={(x!==undefined&&v!==undefined)&&`${x[v].class}`} onClick={(e)=>this.handleSelect(e, {attrName :attribute.name, selectedItem:{id:item.id, value: item.value, displayValue:item.displayValue}})} key={item.value}>
                                            {/* {item.value} */}
                                            </div>
                                        }))
                                           
 
                                    
                                )}
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
            </div>
        )
    }
}
export default Attributes