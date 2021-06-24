import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import './Navigation.css';
// const { Spot } = require('../../../../backend/db/models');


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);//////////////
  const [isLoginFormPage, setIsLoginFormPage] = useState(false);
  const [isSignupFormPage, setIsSignupFormPage] = useState(false);
  console.log("eben 1");


  //for carousel
  // const sliders = useRef();
  let sliders = document.querySelector(".carouselBox");
  let scrollPerClick;
  let scrollAmount = 0;

  function sliderScrollLeft() {
    console.log("hello");
    sliders.scrollTo({
      top: 0,
      left: (scrollAmount -= scrollPerClick),
      behavior: "smooth"
    });

    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
  }

  function sliderScrollRight() {
    console.log("goodbye");
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
      sliders.scrollTo({
        top: 0,
        left: (scrollAmount += scrollPerClick),
        behavior: "smooth"
      });
    }
  }

  scrollPerClick = 400;

  // TESTING FETCHING DB DATA//
  async function getAllSpots() {
    const sliders = document.querySelector(".carouselBox");
    const fetchingData = await fetch("http://localhost:3000/api/users/eben");
    const data = await fetchingData.json();

    data.map((spot, index) => {
      sliders.insertAdjacentHTML(
        "beforeend",
        `<img class="img-${index} slider-img" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFhYZGBgYGBgaGBoYHBwYHBkYGhgaGhgaHBodIS4lHB4rIRgYJjgmKy8xNjU1HCQ7QDs0Py40NTEBDAwMEA8QHhISHzYrJSw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBFAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwAEBQEGB//EADsQAAIBAgUCBAQEBQMDBQAAAAECEQAhAwQSMUFRYQUicZETMoGhQlKx8AYUI8HRcuHxM2KCFSSSsuL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQACAgICAwEBAQEAAAAAAAAAAQIRAyESMRNBUQRhInH/2gAMAwEAAhEDEQA/APMBqjAUxMOaNcsa99tI8SmytFdirAy56VDgkcUckLiyvFd004JRrlzT5C4srRU01a/k3/KfallItQpJg4tditNTTTNNTTTsVC4puG0VyKkUAhyY8cUx8YkVViuipcUWpMJsM0soRTFajYUWw0xSG49a9HllEWArzhFaGUzpWAdqzyxbWjTHJJ7NHNoSpgTVHEUgTtWj8QETNDKNY1gm0bNJmZhlpmjdWO/JrQxVWKOBE8U+QuJljKMa0MhldO4o1xL2FqtKtTKTqioxRcwXinDEqmgpyVgzVD5pDGi+JSnNCBsq5hBvWRmXAPpVzxHGhT1rz2JjE11Y4t7MJySEZp9TTSCKc96AiuldHM3bFkUJFNiuEUxCoqUcV2gD0qZRZqyuWWs7DfrNamWnpIrlkmu2dMWn0D/L0LZcVqYaA7imfy4rLnRpxMUZVTxTsrk1UnmtUYIoXwRQ5voOHsSqiq2Z8ORzqIq4VrkmpUmtobin2ZWZ8MWPKINZeLliOIr1OmkYuVBrWGZrsyliT6PMfCPSgit/GypHy1nPk23it45E+zCWNrooxUinMkUMVqQLiug0WmppoCwCK7RAV00h2GuOYibUWC15mk6aZhqZiocVRSk7NNDNOQWpGXcDc3p/xh1rmktnTFiwwU01c0KQ+FrtzWhkvDojVelLilsatvQWFiVYVqa+AKL4dqybRqkJ10jFJNWCBQO4oQmedzWBiEmNulZuPglTcV6nGcVk5wzxXVCb6OecEYxSgIq24txSCK6EzBoWRQkUwrXCKYhcVKOKlAj12XwxG1WUSNqqoxFqcrmuCVndGi6hpgNVExKaMSsmUWAahE0kNRA0FAulC4pjRQb7UwB1AUDYwp38rO+9LfIr0prj7JaZWbHFC7A0T+Fk7MaZheHRuxNX/n6RUr6MvM5cHaqD4JFejxfDrWoMHw20t7VrHMkuzKWJt9HnNNEMM9K9SfCkN49qYuQQCNIpv9EfQL879nlUyrnZTTEyLkwEYnaAJJ9BzXrUwR0puHh6WDDj9NiPaazf6X6RpH86vbPIZjw50Khl8xXUR08zCDHNvvQJl2JtNe1zuGrlTH4eY6noAPYVUGAo4pL9Da2hywJS09Hmjkn35pAdltXqXwu1KfKA8U1m+oHh+My8liXmtNcaqOLkypkUC5hhaKUkpbQ4tx7NUYhqNjVlnON0NKxc63Q1Kxsbmi++Z3ikfErNw8Q1aTUelW4cSFKzuOTVXMMYosySvNUmc1pCN7M5yrQpxSiKa1CRW6MWxWmuRTNNTTTEK01KbpqUAeyCA0YwxUiaLSa8yz0KIMIVw4dS4qB6BkCV1QKYgU0zSOKLChISagwCOafFcM0WFABCOaYppLg1xQ1AFtaPEwwIiqoDUYY1JRYTDHNE4TpVf4lGrCkMMHpXTFAXiuO4IigDzeV8QZ2Uu7AotxIQO2oSQCRaJF61BjO+pkZpMeQFG097T9p3rzvgnhCI5sHlb6gG+hmZuJnvXoV8Kw2AnDQXmQNJFjsRzIX71yuTvs34mpJKpME6Rcbbmh0dag8iokk6UQSxkmw3J3pLZ1BbUK6E6WzFrZYKChOFFCuJIkbVVxvEUR/hknXoD6QCfKSVn3Bp2FD3wAaQ+TWgPiabSfY1zFz6CJcCdqamvoOP8OvlgNqrYuBRDMhrK00nEcjetI76ZlLXaFYuWG9qoviFLUzGxzVbEaa6oRfs5pyXoTiOTvSyKaVoStbrRg3YuKErTStcimIVFSKZprhWgYuKlHFSgD14xBXdQqvNEorzKPQscDR2pINMVqBhRXa4H7V3UKQBDEpgag1d6gxKQxwxK4Wmg+OBXGx+1AwtFCymiTMivM+PeIxmVRmITSrRq0rP9Qcdbb9BUylxVjirdG6Zmuyaw8LxLDbSGdPKCFOvtzaxp+YzGsMVcHUdkfWsFQhkWtsTAnvWfmXwrxs1tRovjVRymaU6R8N0LSLi0i94mN7VaZd5PFXGSkrE04ujzeSzL6hpsZ8waCY34YgHffrWk/iLEFJiY2sQB6H0rzWL4phKukSzT+C47ybConjL6CUwYUD5mbTb0Aj6A81zUzotHolckcnfeTA+v7tR5dlSRpJmLiFE/VhPHvXmnzuZZAyBEBAsQWYz6cR1ossuYdjqxdIhYKr1mReYiKVAesTxFwLQAP8ASeeTeKq5hNbpmCp1KNNtmQhtxFo1Eg/sY4wcxp1HHfchgAm2oAbrvBq1h5VxM5h42HyW4v5abb+gki/mMEsAYAMmODHpFNxctHXYG4BiD6d6zTlHMhcfELDshvxYjb6VWyGUzJQB8Vw87eUwJi5MyTSGb2WhRGkAxJNh1gHvS8xlGcq0kBTcQTMiNx0nel4eTxwZXHLWPzIPrtFTBfMgb4TWEgqyG/E6j+lNTlVJicFds6uVBMNv35HWd/8AkUjM5BkvuvWrD5zGUnXg6wPyOGvt+MLeiTxbBcFHJwyYEYg0XPEmxPoa1xZ5wa3oyy4ISXWzN+EKBsKr2NgKpImeh6jg0lo616sZXtHmSjWmVGSgK1Yc0BWtE2ZuvQnTQlacVoStUTYqKlM01KAs3viUQeuRU0iuDR37DU0QFLC0wA1IwxNdoRNdBPSkUdjtVTP4jKBpYKSfxDVbmBqX3q0znpWP43m0QoGBvMeUkTKiJHNxb/FRkdRbKirkkWMvnAIL4iC1wQFnrHnJ5oP53z/9WFJMeQFY482o/pWZh5258mIZECVP9/7U/A8RAJU4eJqgbILd4JkT1rl5yqrN+CuzYzOYRyCuIRx5Au//AJc1nYmWDurBw7raWC6oMgAERG5tB343ocfxQgD+himTpBKjf0VixMAmw4quM3oP9TDfDEkgsk9rlSSN/wAVKUmylFIu5DFDWKAbi9+T70efymCQjMiiCCGEKRe1xECq3hjq5lTqESI5HG3FWc/hMV1j8JEiJkkgi88aT71FlUFk8wuuzE2uJJAIG8RAMCCew7V3xLxnCRH16rDSQFuSbW2B9+KpI7EwGKWNxpN57j1rD/ivEYIilplmOwBOkRJj/VW0ZUqRnKNuzKyeECQNgP3Fa4VSvmNlIkbAxsDtA5+lZeQJn2rZyeSV2dGsChER2W89pqWUjoziP5Q6kxcAgxx7VpZEqDa+4t2Pp61418v8LMqhmQ7rJtAA3IjkGvX5PCGohYtfgEzvUtUNFlHOogi0A/Xc9tqLMANCre95kEQDeqzYWgA7mfWRzWrgYZI3EcDkAjaYvSKKua8QXDAdzAkC5MG3AAJJiaXkf4gwXYIrjU1gG1ICdhdlA52q14l4amLgsu5AYrvIcAlYvfY2FeG8P8OJUYmIjIdTAIQwMgKdRBE/ippaE2fScI2M7jYfsUlmMMIA/wC4byDbm9HlX16pIMEETF9iDPYninNgkldSwQWIIk9BxO/9qmmPRxAGJIMiBFogjff6UH8uHBMKQRsYIN7GrDD5rWiLbe8V5fwDGzLY7l7YWtwi6QIAJCkQJiw33pgWMXJjDYqs6ZlVmQggeVegkEx3oCtXs6PMf3yarFa9rC/8L/h42dLyPfsSVoStPKUJWtrMBBWhK1YK1wrRYFfTUp/w6lFhRpRXQTRhO1diuGzvoENRA1AtGMOkMEHvXZpi4PcUxMJRuf70FFfVWV4rgKWRzJI2EmBf5gPzX36Vq5Ry+M6ELpTZhMnbvHJ9qxG8YTGLFRoCOU8zAFiIJI6jasckk4s0hFqSLmBhCCQYJsOvHE3rN8Q/h8pjriYawupHeCJQl4MebUBsdua0FzSGJxVJnYOIgf5qLmEDGGQyRPmG1cl0dPYXiOVR1Aa6riYZiwmGAO3UEi3WuYUHQCd0FuDItEdI+9Hm8yhWA6k6gd4Frm/S1VvjoWVVdZ0rCzcDzcG5o9B7O5ZPO2kG9hHFXsyk+UgXgcwd+AwM/XpVHw6AzEG/E2B68z0q+r6mEnrMGQCJjcdAKm9jZlN4dg6j8yiJjW8Dt8015f8AiTLIrLAsVY3JPPf6V6/HW5gE3O3Tr6Xryn8XYY04RsT57dJ0G/Tmri9kvopZTHAIv0iJO3cVs5DPEONKM0iDAWIt1PaszKJLbSBFvpW5l7R39apiR3Ppr8/wlDi8yga0R8gPQirOXw8efkwzIifiMD9sM1HcsOI1W4I6i7bb1o5SFU+p6EST61MmUkZzYOOCsqhVTeXaCTz/ANOtXAfFI+TDAt+N/r+CukEyePt/eruDsPQTyBz95qUxsqJiYx/Ag6+dgDfnydvvR44cwrLhkkQAXJOx64fBmrDoIm3bYcc0lmJC6QLCZAubdZ2vTsBGQwsRANWGrQZkP+gKjoParvxCLnDe03BRtvRpqJmCdxYja4vN7z605Fm+3B359RU2FAYHiKIIOu1pKP630rFKy7qTKuD6Rv0INwY4q7hADofbp9KTiYCuSrKGEW1DUJ+s1aEylnF830pHwz0qyoVOSQbgMS2kdATxvaTE10PO1enim1BL+Hm5MSc22VPhN0qHBNXINDBqvIyXiiVPgmoUO39quBaEqaPIxrFFFT4JqVa0GpRzf0PGvhmeHeOjEbSy6CdiWBBPTitZnjcV8702i3NRzA3O/U/p9a4Vma7R2SxJ9Hpsb+I2GIUGFIDldUm8GPyxwatYXjDEN/7dyyRKq6mx6FtM+ledy2dJCoQPIRsI1C4A27zV/LZj4QZlUDWSSCZuNURFJZXe3obxqtLZs5TxzCxAsEqzAHS4IYSYjpV05hRXlcQqzBoYHTp8rAAgbcW3+1WMvh2vrY8azrg9jwO3ems2tol4t6NTKZ1QztNiW/8Atb1nivOfwozacQDUpbGM2INwLbW3PetLHyqOjKdMmxYqZI9Vg7VkeG55MI4gcgf1WIADbDppHbms3JyVFqNM9WpaY7/NcbfhIn1uBxxVpMFMSA4DFcRJLEAgH5tzcRFec8Yx1X4eK3xVGoBQjETI1jUvlB2AvO9IPjxZviDCUXAkETa6g6lPLRbaTUJFm8yBcEptM2B1RIYmCJBFVPGSC+GhUMXdUGonSFCM5JHMQd+tIfxx5ICopM2LiF4JkoJN7Ab1qZLMa1UlxqYA2sZI9KGMX4f4ahDnSCf+0BRbYCBvVlfDgt0BCkAFQXmSCetuRtNZOJncRNSoQPzaw4IYiQBpI38setUG8dx1Juo8xF1fjr/UiY/Wihtmxi+D40sBiRBYWXEmAmoTD87fp0rC/iHwtyiBcPEZpOoqHYWHAvG5rSw87iHD1hlDCZ2QCAeDJue9Vx4xiFhDLPEhSCLzyI2FuQfpQtCMnCyOYQr/AEMSC0E6HtsOm1azZR1XVocCRcqbQesVYPjGLAhkJMKFAuZJAH6bn3vGvjrqTSPmYAARHIk9OD/vTbCjHwR5QADvYQTuQRxWvl1YiACPpxyYivM5/Gx0kNgsq6lIxBBAOoFZHF57XFaeczWPhuACAjEDWQ3QEkgPJHFgeKTGiv4l4jmkxYTB1ooH4XbULT5lNj6bd63siSyo8MNUEh5V0IHym3BEcTWVgZ3EKyXXuQrkDv8AOLcmrWH8Rjo+ImqRsjxERuXEyf0paDZtY/mG0iY/3mKQhNlWQBImx2/8awM54nj4LlfJpMkeZx5ZIBID/MYpWU8UxNVwpJm51AjqJ1Raee3WmkB6dIUCASQOgg2HMVkeNeODAdUCF2aCQPKAJsJve0x+lDkM5iYhiygQbEkgGdzuBbmtFMphF9bQznSCTBEKCLWkfNO97UmgstZLMa0DqDfaTBnoR1pyG48pBjeZvHbbavJZHNYnxGRHkS5EttpkwPK0iwtHStUYmKo0mCYldLy25n8AtcCLfSmlQN2PxFMnnp/v9ZpQ+tL+PjRqMTuQSsfS1/tUbNYmmSh4PlCm0wbFwZ/xXVDMoxSOaWJt2WUc/mNWFk1lYPjCXDoZE9iI4sxBpmW8URoA1SeNL2i5uVi3rVeWLF4pI0ZNcLVnYnjB1smiQum438wnaifxNJjUL8Myqb9iafOKdMXCVWi1pP5j9qlI/mx1HuP812n5I/RcJfDxmZwgFEHdbmOZvVzwvwMYys2oDSehPE9egNIxEsQODHaOu5n1o1zz4KOFcqpkuFvYKQTHox5ris6gThNhu+GzatDsCYAELsF22qlnfFcPBOkocRoEAwqgaiQSYJJ4t0irmTOplZrAhjzMxuQTYwKx/G8tqTWN1Y//ABO/3v70r2rD0Oynj6M4X+WQcSGvAn8ykH2r1fhboMOYMSbmAfreOP8AivnXgyziDsGP2r6H4WP6QBuDq9yTHNNgui2jgG8cXm23r+5rxLLqLudtbmeANRj3r1fiWYCYTsLGIHdjZeesV5JMYhSFIiYAhSbEk7g8HehCZbzmfbFABUKEPrJiN4FQYRKqgEkl4AFjIAMn6D71Uxcw8iDeeB1EBrDa5rSkhFJcnykfNFvMf70MEG2SeNRiSCRfpY9aYuax0AVXU/KFIWPm7te8f5qqsgnUzCzEd9iL3idqFydMq8MIABMGZgg/WftSKLA+Ix87KWJBYgBZaAokgXgR9qjZUgHUdQDH8XMdCObXocXGYGPjML7S0iZ6Hv0pQ8SYOPM8KVAh3AJsNyZFyZ6XoA28tiaF8waTpUBQp8x8q7+oqswLlTHnZuVRpjgFb9O1OwMMuLk6iYLFydY5M9ZG/wDin4eCwtqY7+WJMWgiwB4pWMo5nAxGKBgbNoXYQfy/feK2P5Nwp85YgQoVcI2MC5KA0rDxCLebUQbApqB6EcdaQcw921nSnVgNWk+cbRO44pO2CF5TAxHN3coQQV0YTEi24YEDfjtar+CnnsjlWggsgJJI50iAtLTNAXBba8aCqyTubHb6VFDN5lxDCmBGkrvEqQNrH2NL0P2WcUujD+lq2XzYZOkmfKGFouPerKlyR5FUKQGAABDSDe95DC9YWPm8VCoOK5JKkgBY2J37WqymafT58R5kSCinVqhRcDqaAOZ9kZ9MKWJUfIdRIJJGqQPt9a6uICURcNSCTBK6Lgmb6thP2oUyqlyZhpDCJBI5n3ijxgwgBoKmUBkEyfp1qkwaG5fLuHcI2gmRBViAvX5usxfenMj4ZguPNeWDgEAbfP8ATf8A3qs+OuxEz/3de5IO/Peu4+ZdhpZxrIB0kBT8wgzJHX12oAb4flvMuMCkAsIlgfMLiSYaI3PSth8YA38sntwes7/5rCwMd0CorhR5gQQDY7e16uJjYirCuDBEysC5nieDtFDBIvaUFlA4559CaF5CnQAG44vzMAif9qqJjYnBUdo/29ftQ5l2OCVLaZQ2sCIGwnm1FiZk4GVDMwAxBEkqdJhbctEm/AqzlwqsdKO5Kk+YEkXIJABEi96XgYzwVCAhyqnUQfMDxHEnvQ4nirQqthCEMbBubTe3ykXqrEPx4ckph6H0y92YEAQG0mSsR1i9LbzKAdPyAeYkbEXUEAi8+tE2a0sXbCK3uslCVjYQ9xsT3pTZ5CqnRwdhJNhMkGRafehu+wSoHAwYBBdRc2lf81KIYqCzI4PA6DgXE1KLFRm62vb7m8CluszYCd+Z96sx61J7fpWHOQqkV8qhRtVtiPtHvQNly3zQZJLCeoiri+n6UWkVLnJjqR5vwvwrFw3kgRBEhhaSL/b716QYzRABHof/ANVyB0/fvRQvT9abySYtoz/FUfE0KoOkGW817bbnoT9qz/5LEVRIiBczESAP8+9b0dqzvGMviuuhFMbkjneB6SF96cckroWygmVf8s2OzA+g34rUdW0KsTAvP5oGw6T7/SqvguVdGcuhW3lMzuxJAg2Hy+1a89qcsjTpAmUcLGK3ZS1huDP0IjvvQJjEASCSbmZ/c81phu1S3T9anyv4OzIzGJLAgsYYEzEztYC2xpuPkudaNpgnSRAAA9tq0yRWJ43qOlURiv4tCgztaYkCx96qOS3QWXPBfHdTFCoXysTiFtpsCFAOqWKi3c8V6LFLASrKSFOqR06Wsv3rwuHlcRBrAMD5QFOu52IMxyNq9FhQVGoCYEjeDG1VOUV0UmXc0zoxmAHgabt5QNJMxPNU8LUrgLYeYRBgFoMkzBsR7U1UXoP3/wAfauNgITJAkbG9R5V8KH5HHYIQiqVEkG4MG1trSDfiDRSRuqh2W99UCIMHuSdz71Xwsuq2WVn8pI/Q00oZB1Na0yNul6PJEKLy4gdFhNcGG3EHtG9wB7UWYwg2jy6CH83qAd++1Ujin87c3B6+nrNCMRgSdTN/qk3te57Uc0BotilZKgskXIkXsP8AP7FxXF1OWKbwBMWsIMncGax2QltWqDBEgXg0KYMajrJJi/SNovTU4gaWLmCSBp0A6gHUC4tvYdjuarpjefzprEAauNyb97CwvfvSsq7oNLPqEEAEbTHUnoPagfBk7/2v3IF/7U1OIF98RWZcSLQR8wYWvN7df2KmUzg1QZlpMrfUoMACO1pqgUMaZ8urVYmZ9YrmHhaH1pa5IBMxJ22o5R+hs2v5mDCK9rXG89Cdx6V1s0HXygllkbR5htY96z8XGZtRYySuke83+9FhZshCjywuFO5APUmjlH6AGKB+PUGRlKAIpmSCJPPl47fSlZrF1A6GJ1Hz+WLXAIMWNxcUDItlAOmLmdrzAEk/WfoK6WOoWGmI4BHmk25n99KfKP0Av5zEcQNMoCxLRwtxxtS0zJIMIpYsSPLIEaJDXteear4SON9IiIiG5nnbjaiBdWDAAETyDvJNvqaOcRbLJxtJ/DeDdD0A69qlMOOpuw1HgxxxzUq+UfojP1DajVh1rKyHigaz79a1AwN6xnCUXTIUv6NDd6kUtWqBe9ZlWM01yDQH93rkUCtDCT9KJXP7igE9DXQ3akFh6/3auFz0rkxsK6cQ9PtSHaIR2olilBjXQ3rRYuURwjt+/rUBFKJrhPeKB8viHHEHAqDF7UmoWoDkx3xqEt1NL0+tAU70A5D1f9xXQ46/aq+nuaKD3p2CmPOYND8ZqUK6f3E0rDmM+Iea4cQngUoz+71yT1oFzYfxT29hQHENSoZ7Ux8myDENGGPQUoz0oS56UUHNrsfrI6VGxO9IBqCnRSk2GcUnmoGrmn6UYUUBTAJPf6UMnvTyoNU81kVcQzSJFri/HrTQmpBPigGDM1Kpf+lHh3j/AFn/ADUq6iRs88rRWr4Znz8pNdqV25EnF2Zo2lBi8UYWK5UrzjT0HqrgIqVKQgtdT4lSpUshha+tcZqlSkgBL0QxOLe1SpQxNk+IOn61DFcqUyjgWi08c1KlAiBe9cC1KlIaIVroqVKBnDidq5qrtSmI5qiuF6lSmM4GognepUoKQDLFLJqVKoGkdnvTFNcqUFRC11CRUqUFg26mhJFSpTRLbOTUqVKY7P/Z" />`
      )
    });

    scrollPerClick = 400;
  }

  // getAllSpots();




  const openMenu = () => { ////////////////////
    if (showMenu) return;
    setShowMenu(true);
  };







  useEffect(() => { /////////////////////
    // console.log("eben 2");
    getAllSpots();
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  function showLoginPage() {
    if (isSignupFormPage) {
      setIsSignupFormPage(false)
    }
    setIsLoginFormPage(true);
  }

  function showSignupPage() {
    if (isLoginFormPage) {
      setIsLoginFormPage(false)
    }
    setIsSignupFormPage(true)
  }

  function showHomePage() {
    if (isLoginFormPage || isSignupFormPage) {
      setIsLoginFormPage(false);
      setIsSignupFormPage(false);
    }
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <div id="eben">
        <button id="homePageButton" onClick={openMenu}>
        <i class="fas fa-globe"></i>
        </button>
        </div> */}
        {showMenu && (
        <ul className="profile-dropdown">
          <Link className="link" exact to="/" style={{ textDecoration: 'none' }} onClick={showHomePage}>Home</Link>
          <Link className="link" to="/login" style={{ textDecoration: 'none' }} onClick={showLoginPage}>Login</Link>
          <Link className="link" to="/signup" style={{ textDecoration: 'none' }} onClick={showSignupPage}>Sign Up</Link>
        </ul>
        )}
      </>
    );
  }



  let loginComponent = <LoginFormPage />;
  let signupComponent = <SignupFormPage />;



  return (
    <>
    <div className="homeDivContainer">
      <img className="homeBackground__romeImage" src="../../images/rome-6207755_1920.jpg"></img>
      <div className="outerGridDiv">
      <div id="eben">
        <button id="homePageButton" onClick={openMenu}>
        <i class="fas fa-globe fa-2x"></i>
        </button>
      </div>
      {isLoginFormPage && loginComponent}
      {isSignupFormPage && signupComponent}
      <div className="carousel">
        <div className="carouselBox">

        </div>
        <a className="switchLeft sliderButton" onClick={sliderScrollLeft}>{'<'}</a>
        <a className="switchRight sliderButton" onClick={sliderScrollRight}>{'>'}</a>
      </div>
      <div id="ulNavLinkWrapperDiv">

        <ul id="loggedOutNavLinks">
          <li>
            {/* <NavLink exact to="/">Home </NavLink> */}
            {isLoaded && sessionLinks}
          </li>
        </ul>
        </div>
      </div>
    </div>
    <div className="test"></div>
    </>
  );
}

export default Navigation;
