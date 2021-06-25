import { csrfFetch } from "./csrf";


// ACTION TYPE DEFINITIONS
const SET_BOOKING = "bookings/SET_BOOKING";

// ACTION CREATORS
export const setBooking = (payload) => {
  return { type: SET_BOOKING, payload };
};

// THUNK CREATORS
export const getBooking = (userId) => async (dispatch) => {
  // console.log("###############################", userId);
  const results = await fetch(`http://localhost:3000/api/users/bookings/${userId}`);
  const data = await results.json();

  dispatch(setBooking(data));
};

// DEFINE AN INITIAL STATE
const initState = {};

// REDUCER
const bookingReducer = (state = initState, action) => {
  let newBooking;
  switch (action.type) {
    case SET_BOOKING:
      newBooking = Object.assign({}, action.payload);
      return newBooking;
    default:
      return state;
  }
};

export default bookingReducer;
