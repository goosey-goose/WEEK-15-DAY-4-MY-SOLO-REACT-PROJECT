import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getBooking, removeBooking } from '../../store/booking';
import './ConfirmedBookingsDiv.css';

function ConfirmedBookingsDiv(){
  const dispatch = useDispatch();


  const sessionUser = useSelector(state => state.session.user);
  const booking = useSelector(({ booking }) => booking);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const myBookingId = useRef(900);
  // const [altImageValueAgain, setAltImageValueAgain] = useState(null);
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
  const openBookingMenu = () => {
    // console.log("SATURDAY");
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
    // let outerBookingModificationMenu = document.getElementById("outer-booking-modification-menu");
    // outerBookingModificationMenu.innerHTML = "<div><p>I tired</p></div>";
    // let button2 = document.getElementById("button-2-delete");
    // button2.addEventListener("click", (event) => {
    //   deleteMyBooking();
    // })
  }

  // let myValue;
  // const setEben = (value) => {
  //   myValue = value;
  //   console.log(myValue);
  // }

  const deleteMyBooking = () => {
    // console.log(altImageValueAgain);
    // let bookingNumber = altImageValueAgain;
    dispatch(removeBooking({id: myBookingId.current, userId: sessionUser.id})).catch((error) => console.log(error));
  }

  let eben;

  useEffect(() => {
    dispatch(getBooking(sessionUser.id)).catch((error) => console.log(error));
    console.log("useEffect() called here");



    setTimeout(() => {
      let confirmedBookings = document.getElementById("confirmed-bookings-div").childNodes;
      let confirmedBookingsArray = Array.from(confirmedBookings);
      confirmedBookingsArray.forEach((item) => {
        item.addEventListener("click", (event) => {
          // setAltImageValueAgain(event.target.alt);
          // console.log(altImageValueAgain);
          eben = event.target.alt;
          // console.log(eben);
          // setEben(eben);
          // console.log(myBookingId.current);
          myBookingId.current = eben;
          console.log(myBookingId.current);
        })
      })
    }, 1000);
  }, [dispatch]);

  return (
    <>
    {isMenuOpen && (<div id="outer-booking-modification-menu"><div><button>Button 1</button><button id="button-2-delete" onClick={deleteMyBooking}>Delete</button></div></div>)}
    <div id="confirmed-bookings-div">
      {booking.Bookings && booking.Bookings.map((item, index) => {
        return <div key={item.id} className="individual-confirmed-booking-div" onClick={openBookingMenu}><img src={(booking.Bookings)[index]["Spot"]["Images"][0]["url"]} alt={item.id} /></div>;
      })}
    </div>
    </>
  );
}

export default ConfirmedBookingsDiv;
