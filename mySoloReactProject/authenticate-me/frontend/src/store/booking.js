import { csrfFetch } from './csrf';

// ACTION TYPE DEFINITIONS
const SET_BOOKING = "bookings/SET_BOOKING";
const SET_NEW_BOOKING = "bookings/SET_NEW_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

// ACTION CREATORS
export const setBooking = (payload) => {
  return { type: SET_BOOKING, payload };
};

export const setNewBooking = (payload) => {
  return { type: SET_NEW_BOOKING, payload };
}

export const removeExistingBooking = (payload) => {
  return { type: DELETE_BOOKING, payload };
}

// THUNK CREATORS
export const getBooking = (userId) => async (dispatch) => {
  const results = await fetch(`http://localhost:3000/api/users/bookings/${userId}`);
  const data = await results.json();
  // console.log(data);
  dispatch(setBooking(data));
};

export const getNewBooking = (bookingInfo) => async (dispatch) => {
  const { spotId, userId, startDate, endDate } = bookingInfo;

  const response = await csrfFetch("http://localhost:3000/api/users/bookings/new", {
    method: "POST",
    body: JSON.stringify({
      spotId,
      userId,
      startDate,
      endDate
    }),
  });
  const data = await response.json();
  dispatch(setNewBooking(data));
  return response;
};

export const removeBooking = (bookingInformation) => async (dispatch) => {

  const { id, userId } = bookingInformation;
  console.log(id);

  const response = await csrfFetch("http://localhost:3000/api/users/bookings/delete", {
    method: "DELETE",
    body: JSON.stringify({
      id
    })
  });
  const data = await response.json();
  // dispatch(removeExistingBooking(data));
  // console.log(data);
  const results = await fetch(`http://localhost:3000/api/users/bookings/${userId}`);
  const data2 = await results.json();
  // console.log(data);
  dispatch(setBooking(data2));
  return response;
}

// let bookingInformation;////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateBooking = (bookingInformation) => async (dispatch) => {
  console.log("ENTERED FRONTEND UPDATE BOOKING THUNK");

  const { id, userId, newSpotId } = bookingInformation;
  // console.log("step 2");
  // console.log(id);
  // console.log(userId);
  // console.log(newSpotId);
  const response = await csrfFetch("http://localhost:3000/api/users/bookings/updateBooking", {
    method: "PUT",
    body: JSON.stringify({
      id,
      newSpotId
    })
  }).catch((error) => console.log("############################", error));
  console.log("step 3");
  // const data = await response.json();
  // console.log(data);
  const results = await fetch(`http://localhost:3000/api/users/bookings/${userId}`);
  const data2 = await results.json();
  dispatch(setBooking(data2));
  return response;
}


// DEFINE AN INITIAL STATE
const initState = {};

// REDUCER
const bookingReducer = (state = initState, action) => {
  let newBooking;
  switch (action.type) {
    case SET_BOOKING:
      newBooking = Object.assign({}, action.payload);
      return newBooking;
    case SET_NEW_BOOKING:
      newBooking = {...state, Bookings: [...state.Bookings, action.payload]};
      return newBooking;
    default:
      return state;
  }
};
//...action.payload
export default bookingReducer;
