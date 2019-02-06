import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_PLANETS_FROM_SERVER = 'GOT_PLANETS_FROM_SERVER'
const GOT_SINGLE_PLANET_FROM_SERVER = 'GOT_SINGLE_PLANET_FROM_SERVER'
const CLEAR_STATE = 'CLEAR_STATE'

/**
 * INITIAL STATE
 */
const planetState = {
  allPlanets: [],
  visitedPlanets: []
}

/**
 * ACTION CREATORS
 */
const gotPlanetsFromServer = planets => ({
  type: GOT_PLANETS_FROM_SERVER,
  planets
})

const gotSinglePlanetFromServer = planet => ({
  type: GOT_SINGLE_PLANET_FROM_SERVER,
  planet
})

export const clearState = () => ({
  type: CLEAR_STATE
})

/**
 * THUNK CREATORS
 */

export const getAllPlanets = () => async dispatch => {
  const {data} = await axios.get('/api/planets')
  dispatch(gotPlanetsFromServer(data))
}

export const getSinglePlanet = planetId => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/planets/${planetId}`)
  dispatch(gotSinglePlanetFromServer(data))
}

/**
 * REDUCER
 */
export default function planetReducer(state = planetState, action) {
  switch (action.type) {
    case GOT_PLANETS_FROM_SERVER: {
      return {...state, allPlanets: action.planets}
    }
    case GOT_SINGLE_PLANET_FROM_SERVER: {
      let newState = {...state}
      //if planet isn't already in visited planets, push it in
      if (
        !newState.visitedPlanets.some(planet => planet.id === action.planet.id)
      ) {
        newState.visitedPlanets = [...state.visitedPlanets, action.planet]
      }

      return newState
    }
    case CLEAR_STATE: {
      return {
        allPlanets: [],
        visitedPlanets: [],
        allPlanetsHaveBeenVisited: false
      }
    }

    default:
      return state
  }
}
