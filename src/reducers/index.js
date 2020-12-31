import { MENUCOLLAPSE } from '../actions'

const initState = {
  collapseVal: false
}

const AppReducer = (state = initState, action) => {
  switch (action.type) {
    case MENUCOLLAPSE: {
      return {
        collapseVal: action.value
      }
    }
    default: {
      return state
    }
  }
}

export default AppReducer