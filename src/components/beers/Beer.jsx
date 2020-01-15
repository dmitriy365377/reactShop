import React from 'react'
import Spinner from '../spinner/spinner';
import styles from './Beer.module.css';


export default class Beers extends React.Component {
    render() {

        let pagesCount = Math.ceil(this.props.state.totalUsersCount / this.props.state.pageSize);
        console.log(this.props)
        const pageNumbers = [];
        for (let i = 1; i <= pagesCount; i++) {
            pageNumbers.push(i);
        }


        let renderPageNumbers = pageNumbers.map(p => {
            return (
                <span
                    key={p}
                    onClick={() => { this.props.updateInformation(p) }}>
                    {p}
                </span>
            )
        })

        let filterBeer = this.props.state.infoBeer.filter((beer) => {
            return beer.name.toLowerCase().includes(this.props.state.searchBeer.toLowerCase())
        })

        return (
            <>
                <BeerView
                    filterBeer={filterBeer}
                    isReady={this.props.state.isReady}
                    onAdded={this.props.onAdded}
                />
                <div className={styles.pagination}>
                    <span onClick={() => this.props.updateInformation(1)}>&laquo;</span>
                    {renderPageNumbers}
                    <span onClick={() => this.props.updateInformation(1)}>&raquo;</span>
                </div>
            </>
        )
    }
}



class BeerView extends React.Component {
    render() {
        // if(this.props.isReady) {
        //     return <Spinner/>
        // }
        return (
            <React.Fragment>
                {
                    this.props.filterBeer.map((elements, id) => {
                        return (
                            <div className={styles.beer} key={elements.id}>
                                {/* {props.loading ? <Spinner /> : null} */}
                                {/* !this.props.isReady ? <Spinner /> : */}
                                {this.props.isReady ? <Spinner /> :
                                    <>
                                        <img className={styles.planetImg}
                                            src={elements.image_url}
                                            alt="planet" />
                                        <div className={styles.text}>
                                            <h2>{elements.name}</h2>
                                            <ul className={styles.description}>
                                                {elements.description}
                                            </ul>
                                            <button
                                                onClick={() => this.props.onAdded(elements.id)}
                                            >Добавить в корзину</button>
                                        </div>
                                    </>
                                }
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

