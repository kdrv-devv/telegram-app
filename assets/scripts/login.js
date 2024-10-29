let loginAPI = `https://6715fa1733bc2bfe40bbca78.mockapi.io/Azizakam`;

let form = document.getElementById("form");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if(userEmail.value != "" && userPassword.value != ""){
      newRegistor(userEmail.value, userPassword.value);
  }
  userEmail.value = "";
  userPassword.value = "";
});



function newRegistor(userEmail, userPassword) {
  fetch(loginAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_email: userEmail,
      password: userPassword,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Xato bor brat");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);  
      window.location.href = "./registration.html"
      
    })
    .catch((error) => {
      console.log(error);
    });
}


