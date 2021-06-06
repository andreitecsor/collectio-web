import {ChallengeActionTypes} from "./challenge.types";

export const setAllChallenges = (challenges) => ({
    type: ChallengeActionTypes.SET_ALL_CHALLENGES,
    payload: challenges
})
