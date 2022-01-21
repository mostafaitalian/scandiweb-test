import React, {Component} from 'react';
import TitleComponent from './TitleComponent';


class Categories extends Component{


    render(){
        console.log(this.props)
        return(
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <div>
            <TitleComponent initialTitle={this.props.title}/>

            </div>
            <div style={{height: '300px'}}>
            Categories

            </div>
            </div>
        )
    }
}

export default Categories