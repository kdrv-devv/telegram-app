let apiSarvarbek = `https://6715fa1733bc2bfe40bbca78.mockapi.io/Sarvarbek`;
let apiAzizbro = `https://6715fa1733bc2bfe40bbca78.mockapi.io/Azizakam`;

//  input malumotlar
let userInput = document.querySelector("#userInput");
let sendBtn = document.getElementById("sendBtn");

// malumot chiqdigan joy
let messageContainer = document.querySelector(".messages");

// bosilganda post boladigan button
sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userInput.value !== "") {
    postAziz();
    console.log(userInput.value);
  }
  userInput.value = "";
});

// Aziz akamga post qilsh funksiysasi
function postAziz() {
  fetch(apiAzizbro, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: userInput.value,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error.massage));
}

// Aziz akam malumotiniget qilib oladigan funksiyam
fetch(apiSarvarbek)
  .then((data) => data.json())
  .then((data) => getAziz(data))
  .catch((error) => console.log(error));

function getAziz(data) {
  data.forEach((element) => {
    messageContainer.innerHTML += `
        
            <div class="aziz-bro-message">
                <p>${element.text}</p>
            </div>

        `;
  });
}

// o'zim malumotimchi chiqaradigan joy

fetch(apiAzizbro)
  .then((data) => data.json())
  .then((data) => getSarvar(data))
  .catch((error) => console.log(error));

function getSarvar(data) {
  if (data.length === data.length + 1) {
    location.reload();
  }

  data.forEach((element) => {
    messageContainer.innerHTML += `
        
         
            <div class="shaxsiy-message">
                <p>${element.text}</p>
            </div>

        `;
  });
}



// login uchun

let login = document.querySelector("#login")

let loginBtn = document.querySelector("#loginBtn")
let loginPage = document.querySelector(".Login-page")
let tgConten = document.querySelector(".telegram-content")


loginBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(login.value);
    
    if(login.value == "kdrv"){
        loginPage.style.display = "none"
        tgConten.style.display = "block"
    }


})

