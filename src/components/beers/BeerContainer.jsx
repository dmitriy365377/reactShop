import React from 'react'
import Beers from './Beer'
import { connect } from 'react-redux'
import Server from '../../services/service';
import { setBeers, bookAddedToCart,inputChanged } from '../../redux/reducers/beers-reducer'


import Header from '../header/Header'

class BeerContainer extends React.Component {

    server = new Server

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.updateInformation(this.props.state.currentPage);
    }

    updateInformation(pageNumber) {
        this.server.getAllBeers(pageNumber)
            .then((data) => {
                const infoBeer = data.body
                this.props.setBeers(data.body)
                console.log(infoBeer)

            })
    }


    render() {

        console.log(this.props)
        return (
            <>
                <Header
                    {...this.props}
                    cartItems={this.props.state.cartItems}
                />
                <Beers
                    {...this.props}
                    updateInformation={this.updateInformation.bind(this)}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    state: state.beersReducer
})


const mapDispatchToProps = (dispatch) => {
    return {
        setBeers: (infoBeer) => {
            dispatch(setBeers(infoBeer))
        },
        onAdded: (id) => {
            dispatch(bookAddedToCart(id))
        },
        inputChanged: (e) => {
            // console.log('changed', e.target.value)
            // const action = { type: 'INPUT_CHANGE', text: e.target.value }
            // dispatch(action)
            dispatch(inputChanged(e))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerContainer)
