import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBooking } from '../../store/booking';
import './ConfirmedBookingsDiv.css';

function ConfirmedBookingsDiv(){
  const dispatch = useDispatch();


  const sessionUser = useSelector(state => state.session.user);
  const booking = useSelector(({ booking }) => booking);

  // console.log(sessionUser);

  // EBEN CONDITIONAL CHECK
  if (booking.Bookings) {
    console.log((booking.Bookings));
  }

  useEffect(() => {
    dispatch(getBooking(sessionUser.id)).catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <div id="confirmed-bookings-div">
      {booking.Bookings && booking.Bookings.map((item) => {
        return <div>100</div>;
      })}
    </div>
  );
}

export default ConfirmedBookingsDiv;
