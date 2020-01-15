const initialState = {
    infoBeer: [],
    loading: true,
    pageSize: 5,
    totalUsersCount: 25,
    currentPage: 1,
    searchBeer: '',
    isOpen: false,
    isReady: true,
    cartItems: []
}

const beersReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SET_BEERS':
            debugger
            return {
                ...state,
                infoBeer: action.payload,
                isReady: false,
            }
        case 'SET_IS_READY':
            return {
                ...state,
                isReady: action.payload
            }
        case "BOOK_ADDED_TO_CART":
            const beerId = action.payload
            const beer = state.infoBeer.find((beer) => beer.id === beerId)
            const itemIndex = state.cartItems.findIndex(({ id }) => id === beerId)
            const item = state.cartItems[itemIndex]

            let newItem
            if (item) {
                newItem = {
                    ...item,
                    count: item.count + 1,
                }
            } else {
                newItem = {
                    id: beer.id,
                    name: beer.name,
                    count: 1,
                }
            }

            if (itemIndex < 0) {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        newItem
                    ]
                }
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems.slice(0, itemIndex),
                        newItem,
                        ...state.cartItems.slice(itemIndex + 1)
                    ]
                }
            }
        case "BOOK_DELETED_FROM_CART":
            const beerID = action.payload
            const itemIndex1 = state.cartItems.findIndex(({ id }) => id === beerID)

            if (itemIndex1 < 0) {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                    ]
                }
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems.splice(0, itemIndex1),
                        ...state.cartItems.slice(itemIndex1 + 1)
                    ]
                }
            }
        case "INPUT_CHANGE":
            return Object.assign({}, state, { searchBeer: action.text })
        default:
            return state
    }
}


export const setBeers = (infoBeer) => ({
    type: "SET_BEERS",
    payload: infoBeer
})

export const bookAddedToCart = (beerId) => ({
    type: "BOOK_ADDED_TO_CART",
    payload: beerId
})

export const bookDeletedFromCart = (beerId) => ({
    type: "BOOK_DELETED_FROM_CART",
    payload: beerId
})

export const inputChanged = (e) => ({
    type: 'INPUT_CHANGE',
    text: e.target.value
})


export default beersReducer

