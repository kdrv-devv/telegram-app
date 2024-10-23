let apiSarvarbek = `https://67172d90b910c6a6e026d725.mockapi.io/mesage/telgram`;

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
  }
  userInput.value = "";
});

// Aziz akamga post qilsh funksiysasi
function postAziz() {
  fetch(apiSarvarbek, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: userInput.value,
      ID: 1,
      date: date(),
      del: Date.now(),
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error.massage));
}

function date() {
  let date = new Date();
  let hour = date.getHours() > 10 ? 0 + date.getHours() : date.getHours();
  let minute =
    date.getMinutes() > 10 ? 0 + date.getMinutes() : date.getMinutes();
  return `${hour}:${minute}`;
}

// Aziz akam malumotini get qilib oladigan funksiyam
fetch(apiSarvarbek)
  .then((data) => data.json())
  .then((data) => getAziz(data))
  .catch((error) => console.log(error));

function getAziz(data) {
  data.forEach((element) => {
    if (element.ID === 1) {
      messageContainer.innerHTML += `
             <div  class="shaxsiy-message">
                 <p id="${Date.now()}">${element.text}</p>
             </div>
         `;
    } else if (element.ID === 2) {
      messageContainer.innerHTML += `        
        <div class="aziz-bro-message">
            <p>${element.text}</p>
        </div>
    `;
    }
  });


  let xabarOynasi = document.querySelectorAll(".shaxsiy-message");

  xabarOynasi.forEach((element) => {
    element.addEventListener("mousedown", function (e) {

      pressTimer = setTimeout(function () {
        let deleteChek = confirm("Bu xabarni o'chirmoqchimisz ?");
        if(deleteChek){
          deleteData(e.target.id)
        }
      }, 700);
    });
    element.addEventListener("mouseup", function () {
      clearTimeout(pressTimer);
    });

    element.addEventListener("mouseleave", function () {
      clearTimeout(pressTimer);
    });
  });
}


function deleteData(id) {


}
