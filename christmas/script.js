document.addEventListener("DOMContentLoaded", function () {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const defaultCountdownType = urlParams.get('countdown');
  
    // Set the default countdown type based on the query parameter
    setCountdown(defaultCountdownType || 'christmas');
  
    // Music toggle button
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isMusicPlaying = true;
  
    toggleMusicButton.addEventListener('click', function() {
      if (isMusicPlaying) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }
      // Toggle the state
      isMusicPlaying = !isMusicPlaying;
    });
  });
  
  let countdownInterval;
  
  function setCountdown(holiday, customDate) {
    clearInterval(countdownInterval);
  
    let holidayDate;
    let countdownTypeText;
  
    // Function to convert UTC date to local time
    const convertUTCtoLocal = (utcDate) => {
      return new Date(utcDate);
    };
  
  
    switch (holiday) {
      case 'spring':
          holidayDate = convertUTCtoLocal(new Date("Mar 20, 2024 00:00:00 UTC"));
          countdownTypeText = 'Spring';
          break;
      case 'easter':
          holidayDate = convertUTCtoLocal(new Date("Mar 31, 2024 00:00:00 UTC"));
          countdownTypeText = 'Easter';
          break;
      case 'mothersday':
          holidayDate = convertUTCtoLocal(new Date("Mar 10, 2025 00:00:00 UTC"));
          countdownTypeText = "Mother's Day";
          break;
      case 'summer':
          holidayDate = convertUTCtoLocal(new Date("Jun 21, 2024 00:00:00 UTC"));
          countdownTypeText = 'Summer';
          break;
      case 'fathersday':
          holidayDate = convertUTCtoLocal(new Date("Jun 18, 2024 00:00:00 UTC"));
          countdownTypeText = "Father's Day";
          break;
      case 'independence':
          holidayDate = convertUTCtoLocal(new Date("Jul 4, 2024 00:00:00 UTC"));
          countdownTypeText = 'Independence Day';
          break;
          case 'autumn':
          holidayDate = convertUTCtoLocal(new Date("Sep 22, 2024 00:00:00 UTC"));
          countdownTypeText = 'Autumn';
          break;
      case 'halloween':
          holidayDate = convertUTCtoLocal(new Date("Oct 31, 2024 00:00:00 UTC"));
          countdownTypeText = 'Halloween';
          break;
      case 'thanksgiving':
          holidayDate = convertUTCtoLocal(new Date("Nov 28, 2024 00:00:00 UTC"));
          countdownTypeText = 'Thanksgiving';
          break;
      case 'christmas':
          holidayDate = convertUTCtoLocal(new Date("Dec 25, 2024 00:00:00 GMT"));
          countdownTypeText = 'Christmas';
          break;
      case 'santatracker':
          holidayDate = convertUTCtoLocal(new Date("Dec 24, 2024 00:00:00 UTC"));
          countdownTypeText = 'Christmas Eve';
          break;
      case 'newyear':
          holidayDate = convertUTCtoLocal(new Date("Jan 1, 2025 00:00:00 UTC"));
          countdownTypeText = 'New Year';
          break;
      case 'valentines':
          holidayDate = convertUTCtoLocal(new Date("Feb 14, 2025 00:00:00 UTC"));
          countdownTypeText = "Valentine's Day";
          break;
     case 'jailbreak':
        holidayDate = convertUTCtoLocal(new Date("Apr 20, 2024 18:00:00 GMT"));
        countdownTypeText = "Jailbreak Live Event";
        break;
      case 'custom':
          if (customDate) {
              holidayDate = convertUTCtoLocal(new Date(customDate + 'T00:00:00Z'));
          } else {
              // If no custom date provided, default to today
              holidayDate = convertUTCtoLocal(new Date());
          }
          countdownTypeText = 'Custom';
          break;
      default:
          return;
    }
  
    // Update the countdown type text in the HTML
    document.getElementById("countdownTypeText").innerHTML = `Current Countdown To: ${countdownTypeText}`;
  
    // Start the countdown with the selected holiday date
    startCountdown(holidayDate);
  }
  
  function startCountdown(countDownDate) {
    countdownInterval = setInterval(function () {
      const now = new Date().getTime(); // Get the current local time
      const distance = countDownDate - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById("days").innerHTML = days;
      document.getElementById("hours").innerHTML = hours;
      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;
  
      if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerHTML = 0;
        document.getElementById("hours").innerHTML = 0;
        document.getElementById("minutes").innerHTML = 0;
        document.getElementById("seconds").innerHTML = 0;
        document.getElementById("countdownTypeText").innerHTML = "Merry Christmas!";
      }
    }, 1000);
  }
  
  // Get references to the play and pause buttons
  const playButton = document.getElementById('playMusic');
  const pauseButton = document.getElementById('pauseMusic');
  
  // Function to play the music
  function playMusic() {
      const backgroundMusic = document.getElementById('backgroundMusic');
      backgroundMusic.play();
  }
  
  // Function to pause the music
  function pauseMusic() {
      const backgroundMusic = document.getElementById('backgroundMusic');
      backgroundMusic.pause();
  }
  
  // Attach click event listeners to the play and pause buttons
  playButton.addEventListener('click', playMusic);
  pauseButton.addEventListener('click', pauseMusic);
  
  // Check if a cookie called 'user_cookie_consent' is set
  const isCookieAccepted = getCookie("user_cookie_consent");
  if (isCookieAccepted) {
    // If the cookie is set, hide the cookie consent banner
    document.getElementById("cookie-consent").classList.add("hidden");
  } else {
    // If the cookie is not set, show the cookie consent banner
    document.getElementById("cookie-consent").classList.remove("hidden");
  }
  
  // Function to get a cookie value
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // Function to set a cookie value
  function setCookie(name, value, days) {
    const expires = `expires=${new Date(Date.now() + days * 86400000).toUTCString()};`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
  
  // Function to display an error message
  function displayError(errorMessage) {
    alert(errorMessage); // You can customize this based on your UI design
  }
  