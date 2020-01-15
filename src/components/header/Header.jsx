import React from 'react'
import styles from './Header.module.css'
import Auth from './Auth/Auth'
import Box from './Box/Box'
import { connect } from 'react-redux'

class Header extends React.Component {

    state = {
        isOpen: false,
        isOpenBox: false,  
    }

    openModal = () => {
        this.setState({ isOpen: true })
        const x = window.scrollX;
        const y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };
    }

    closeModal = () => {
        window.onscroll = function () { };
        this.setState({ isOpen: false })
    }

    openBasketModal = () => {
        this.setState({ isOpenBox: true })
        const x = window.scrollX;
        const y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };
    }

    closeBasket = () => {
        window.onscroll = function () { };
        this.setState({ isOpenBox: false })
    }
 
    render() {

        console.log(this.props.state)
        return (
            <>
                <div className={styles.head}>

                    <div className={styles.logoAndSearch}>
                        <div className={styles.logo}>
                            <h1>
                                <a href="#">Beer Shop</a>
                            </h1>
                        </div>
                        <div className={styles.search}>
                            <input
                                value={this.props.state.searchBeer}
                                onChange={this.props.inputChanged}
                                type="text"
                                placeholder="Поиск . ."
                            />
                        </div>
                    </div>

                    <div className={styles.basketAndSignUp}>
                        <div className={styles.signUp} >
                            <img src="https://image.flaticon.com/icons/svg/2038/2038985.svg"
                                alt=""
                                onClick={this.openModal}
                            />
                        </div>
                        <Auth
                            isOpen={this.state.isOpen}
                            onClose={this.closeModal}
                        />
                        <div className={styles.basket}
                            onClick={this.openBasketModal}
                        > </div>
                        <Box
                            cartItems={this.props.cartItems}
                            isOpenBox={this.state.isOpenBox}
                            closeBasket={this.closeBasket}
                        />
                    </div>
                </div>

            </>
        )
    }
}

export default Header