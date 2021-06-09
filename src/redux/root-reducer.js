import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import challengeReducer from "./challenge/challenge.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
}

const rootReducer = combineReducers({
    user: userReducer,
    challenge: challengeReducer
});

export default persistReducer(persistConfig, rootReducer);