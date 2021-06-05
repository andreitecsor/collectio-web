import {ChallengeActionTypes} from "./challenge.types";

const INITIAL_STATE = {
    allChallenges: [],
    activeChallenges: []
}

const challengeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ChallengeActionTypes.GET_ALL_CHALLENGES:
            return {
                ...state,
                allChallenges: action.payload
            }
        case ChallengeActionTypes.GET_ACTIVE_CHALLENGES:
            return {
                ...state,
                activeChallenges: action.payload
            }
        default:
            return state;
    }
}

export default challengeReducer;