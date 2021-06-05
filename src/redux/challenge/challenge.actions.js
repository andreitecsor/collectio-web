import {ChallengeActionTypes} from "./challenge.types";

export const setAllChallenges = (challenges) => ({
    type: ChallengeActionTypes.GET_ALL_CHALLENGES,
    payload: challenges
})

export const setAllActiveChallenges = (challenges) => ({
    type: ChallengeActionTypes.GET_ACTIVE_CHALLENGES,
    payload: challenges
})
