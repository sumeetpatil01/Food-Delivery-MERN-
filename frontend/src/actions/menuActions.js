import axios from "axios";
import { GET_MENU_FAIL, GET_MENU_REQUEST, GET_MENU_SUCCESS } from "../constants/menuConstants";

export const getMenus = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_MENU_REQUEST });
        let link = `/api/v1/eats/stores/${id}/menus`;
        const {data} = await axios.get(link);
        // console.table(data.data[0].menu); // DEBUG
        dispatch({
            type: GET_MENU_SUCCESS,
            payload: data.data[0].menu,
        });
    } catch (error) {
        dispatch({
            type: GET_MENU_FAIL,
            payload: error.message,
        });
    }
};
