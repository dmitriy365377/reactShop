import React from 'react'
import styles from './Box.module.css';
import { connect } from 'react-redux'
import { bookDeletedFromCart } from '../../../redux/reducers/beers-reducer'

class Box extends React.Component {

    constructor(props) {
        super(props)   
    }


    render() {
        debugger
        let basket = (
            <div className={styles.modal}>
                <table className={styles.modalContent}>
                    <span
                        onClick={this.props.closeBasket}
                        className={styles.close}
                        title="Close Modal">&times;
                            </span>
                    <tbody>
                        <tr className={styles.boxHeader}>
                            <td>#</td>
                            <td>Item</td>
                            <td>Count</td>
                        </tr>
                        {
                            this.props.cartItems.map((item, idx) => {
                                return (
                                    <tr className={styles.items} key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.count}</td>
                                        <td>
                                            <button
                                                onClick={() => this.props.onDeleted(item.id)}
                                            >Удалить</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )

        if (!this.props.isOpenBox) {
            basket = null
        }

        return (
            <>
                {basket}
            </>
        )
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onDeleted: (id) => {
            dispatch(bookDeletedFromCart(id))
            console.log(`Deleted ${id}`)
        }
    }
}

export default connect(null, mapDispatchToProps)(Box)
