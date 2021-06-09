import {createSelector} from "reselect";

const selectChallenges = (state) => state.challenge;

export const selectAllChallenges = createSelector(
    [selectChallenges],
    (challenge) => challenge.allChallenges
);

export const selectAllActiveChallenges = createSelector(
    [selectChallenges],
    (challenge) => challenge.activeChallenges
);
