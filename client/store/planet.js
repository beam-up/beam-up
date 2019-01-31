import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_PLANETS_FROM_SERVER = 'GOT_PLANETS_FROM_SERVER'
const GOT_SINGLE_PLANET_FROM_SERVER = 'GOT_SINGLE_PLANET_FROM_SERVER'
const ALL_PLANET_HAVE_BEEN_VISITED = 'ALL_PLANET_HAVE_BEEN_VISITED'

/**
 * INITIAL STATE
 */
const planetState = {
  allPlanets: [],
  visitedPlanets: [],
  allSeen: false
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

const allPlanetsHaveBeenVisited = () => ({
  type: ALL_PLANET_HAVE_BEEN_VISITED
})

/**
 * THUNK CREATORS
 */

export const getAllPlanets = () => async dispatch => {
  const {data} = await axios.get('/api/planets')
  dispatch(gotPlanetsFromServer(data))
}

export const getSinglePlanet = planetId => async dispatch => {
  const {data} = await axios.get(`api/planets/${planetId}`)
  dispatch(gotSinglePlanetFromServer(data))
}

export const areAllPlanetsVisited = () => (dispatch, getState) => {
  const {visitedPlanets} = getState().planetReducer
  if (visitedPlanets.length === allPlanets.length) {
    dispatch(allPlanetsHaveBeenVisited())
  }
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
      return {...state, vistedPlanets: [...visitedPlanets, action.planet]}
    }
    case ALL_PLANET_HAVE_BEEN_VISITED: {
      return {...state, allPlanetsHaveBeenVisited: true}
    }
    default:
      return state
  }
}
