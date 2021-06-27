import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBooking } from '../../store/booking';
import './ConfirmedBookingsDiv.css';

function ConfirmedBookingsDiv(){
  const dispatch = useDispatch();


  const sessionUser = useSelector(state => state.session.user);
  const booking = useSelector(({ booking }) => booking);
  // const booking = useSelector(state => state.booking.Bookings);
  // dispatch(getBooking(sessionUser.id)).catch((error) => console.log(error));

  // console.log(sessionUser);

  // EBEN CONDITIONAL CHECK
  // if (booking.Bookings) {//
  //   // console.log((booking.Bookings)["0"]["Spot"]["Images"][0]["url"]);
  //   // console.log(booking.Bookings);
  //   let count = 0;
  //   booking.Bookings.forEach((item) => {
  //     console.log((booking.Bookings)[count]["Spot"]["Images"]);
  //     ++count;
  //   })
  // }

  useEffect(() => {
    console.log("useEffect() called here");
    dispatch(getBooking(sessionUser.id)).catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <div id="confirmed-bookings-div">
      {booking.Bookings && booking.Bookings.map((item, index) => {//
        return <div className="individual-confirmed-booking-div"><img src={(booking.Bookings)[index]["Spot"]["Images"][0]["url"]} /></div>;//
      })}
    </div>
  );
}

export default ConfirmedBookingsDiv;
