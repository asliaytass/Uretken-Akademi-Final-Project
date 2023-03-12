import {fetchUser,fetchCard} from '../utils/fetchLocalStorage'

const userInfo =fetchUser()

const cardInfo = fetchCard()


export const initialState ={
    user: userInfo,
    foodItems: null,
    cardItems: cardInfo

}
