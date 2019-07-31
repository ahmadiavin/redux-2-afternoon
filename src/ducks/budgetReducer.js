import axios from "axios";
//intial state
const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
};
//constants
const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA";
const ADD_PURCHASE = "ADD_PURCHASE";
const REMOVE_PURCHASE = "REMOVE_PURCHASE";

//action creators
export function requestBudgetData() {
  return {
    type: REQUEST_BUDGET_DATA,
    payload: axios.get("/api/budget-data").then(results => results.data)
  };
}
export function addPurchase(price, description, category) {
  return {
    type: ADD_PURCHASE,
    payload: axios
      .post("/api/budget-data/purchase", { price, description, category })
      .then(res => res.data)
  };
}

export function removePurchase(id) {
  return {
    type: REMOVE_PURCHASE,
    payload: axios
      .delete(`/api/budget-data/purchase/${id}`)
      .then(res => res.data)
  };
}

//reducer
export default function budgetReducer(state = initialState, action) {
  switch (action.type) {
    case `${REQUEST_BUDGET_DATA}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REQUEST_BUDGET_DATA}_FULFILLED`:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case `${ADD_PURCHASE}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${ADD_PURCHASE}_FULFILLED`:
      return {
        ...state,
        purchases: action.payload,
        loading: false
      };
    case `${REMOVE_PURCHASE}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REMOVE_PURCHASE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        purchases: action.payload
      };

    default:
      return state;
  }
}
