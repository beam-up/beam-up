import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_WISHES_FROM_SERVER = 'GOT_WISHES_FROM_SERVER'
const GOT_NEW_WISH = 'GOT_NEW_WISH'

/**
 * INITIAL STATE
 */
const wishState = []

/**
 * ACTION CREATORS
 */
const gotNewWish = newWish => ({
  type: GOT_NEW_WISH,
  newWish
})

const gotWishesFromServer = wishes => ({
  type: GOT_WISHES_FROM_SERVER,
  wishes
})

/**
 * THUNK CREATORS
 */

export const createWish = wish => async dispatch => {
  const {data} = await axios.post('/api/wishes', wish)
  dispatch(gotNewWish(data))
}

export const getWishes = () => async dispatch => {
  const {data} = await axios.get('api/wishes')
  dispatch(gotWishesFromServer(data))
}

/**
 * REDUCER
 */
export default function wishReducer(state = wishState, action) {
  switch (action.type) {
    case GOT_NEW_WISH: {
      return [...state, action.newWish]
    }
    case GOT_WISHES_FROM_SERVER: {
      return action.wishes // this is an array
    }
    default:
      return state
  }
}
