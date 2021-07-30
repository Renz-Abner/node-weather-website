console.log("client side");
// //HTTP REQUEST using FETCH
// fetch("http://localhost:3000/weather?address=boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.forecast);
//       console.log(data.location);
//     }
//   });
// });

//SELECTS THE ITEM IN THE HTML
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

//Submits the form or searches it...

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //This prevents the refreshing of the page
  //REFRESHES the Messages everytime it submits

  messageOne.textContent = "Searching...";
  messageTwo.textContent = "";
  const location = search.value;

  if (location === undefined) {
    messageOne.textContent = "Invalid Input";
  } else {
    console.log(location);
    fetch("http://localhost:3000/weather?address=" + location).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.location;
          }
        });
      }
    );
  }

  //HTTP REQUEST using FETCH
});
