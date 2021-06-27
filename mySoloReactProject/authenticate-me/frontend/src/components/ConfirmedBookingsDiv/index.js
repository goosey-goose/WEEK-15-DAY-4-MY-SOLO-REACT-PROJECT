import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBooking } from '../../store/booking';
import './ConfirmedBookingsDiv.css';

function ConfirmedBookingsDiv(){
  const dispatch = useDispatch();


  const sessionUser = useSelector(state => state.session.user);
  const booking = useSelector(({ booking }) => booking);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  let one;
  const openBookingMenu = () => {
    console.log("SATURDAY");
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      one = (<div id="outer-booking-modification-menu">I pooped</div>);
    } else {
      setIsMenuOpen(false);
    }
    console.log(isMenuOpen);
    // let outerBookingModificationMenu = document.getElementById("outer-booking-modification-menu");
    // outerBookingModificationMenu.innerHTML = "<div><p>I tired</p></div>";
  }

  // let bookingModificationMenu = (
  //   <div id="booking-modification-menu">
  //       <p>EBEN</p>
  //   </div>
  // );

  useEffect(() => {
    dispatch(getBooking(sessionUser.id)).catch((error) => console.log(error));
    console.log("useEffect() called here");
  }, [dispatch]);

  return (
    <>
    {isMenuOpen && (<div id="outer-booking-modification-menu">I pooped</div>)}
    <div id="confirmed-bookings-div">
      {booking.Bookings && booking.Bookings.map((item, index) => {//
        return <div className="individual-confirmed-booking-div" onClick={openBookingMenu}><img src={(booking.Bookings)[index]["Spot"]["Images"][0]["url"]} /></div>;//
      })}
    </div>
    </>
  );
}

export default ConfirmedBookingsDiv;
