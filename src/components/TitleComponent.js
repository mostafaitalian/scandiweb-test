import React, {Component} from 'react';
import NavComponent from './NavComponent';
import {Query} from '@apollo/client/react/components'
import {gql} from '@apollo/client'



const categotiesQuery = gql`query categories{
    categories{
      name
    }
  }`;

class TitleComponent extends Component{

    render(){
        return(
            <Query query={categotiesQuery}>
            {
              (result)=>{
                if(result.loading===true)
                {return <NavComponent loading={true}/>}
                else 
                {return (
                  <NavComponent
                    handleCloseCarMenu={this.props.handleCloseCarMenu}
                    handleCloseCurMenu={this.props.handleCloseCurMenu}
                    handleShowCart={this.props.handleShowCart}
                    handleShowCurrency={this.props.handleShowCurrency}
                    categoriesTitles={result.data}
                    currency={this.props.currency}
                    car={this.props.car}
                    // cartt={this.props.cartt}
                    initialTitle={this.props.initialTitle}
                    changeInitialTitle={this.props.changeInitialTitle}
                    loading={false}
                    />
                  )
                  }
            }
            }
          </Query>
        )
    }
}

export default TitleComponent