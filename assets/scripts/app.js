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
    userInput.value = "";
  }
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
      location.reload();
    })
    .catch((error) => console.log(error.message));
}

function date() {
  let date = new Date();
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
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
                 <div class="shaxsiy-message">
                <p id="${element.id}">${element.text}</p>
                <div class="edit-modal">
                    <button data-id="${element.id}" id="edit-btn">Edit</button>
                    <button data-id="${element.id}" id="delete-btn">Delete</button>
                </div>
            </div>
         `;
    } else if (element.ID === 2) {
      messageContainer.innerHTML += `        
      <div class="aziz-bro-message">
                <p id="${element.id}">${element.text}</p>
                <div class="edit-modal">
                    <button data-id="${element.id}" id="edit-btn">Edit</button>
                    <button data-id="${element.id}" id="delete-btn">Delete</button>
                </div>
            </div>
    `;
    }
  });

  let xabarOynasi = document.querySelectorAll(".shaxsiy-message");

  xabarOynasi.forEach((element) => {
    element.addEventListener("mousedown", function (e) {
      let pressTimer = setTimeout(function () {
        let modal = element.querySelector(".edit-modal");
        modal.style.display = "flex";
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

let xabarOynasiAziz = document.querySelectorAll(".aziz-bro-message");

xabarOynasiAziz.forEach((element) => {
  element.addEventListener("mousedown", function (e) {
    let pressTimer = setTimeout(function () {
      let modal = element.querySelector(".edit-modal");
      modal.style.display = "flex";
    }, 500);
  });
  element.addEventListener("mouseup", function () {
    clearTimeout(pressTimer);
  });

  element.addEventListener("mouseleave", function () {
    clearTimeout(pressTimer);
  });
});

// umumiy containerga event listener qo'yamiz
messageContainer.addEventListener("click", function (e) {
  if (e.target && e.target.id === "delete-btn") {
    let dataId = e.target.getAttribute("data-id");
    deleteData(dataId);
  }
});


function deleteData(delData) {
  fetch(`${apiSarvarbek}/${delData}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Deleted:", data);
      document.getElementById(delData).parentElement.remove();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

messageContainer.addEventListener("click", function (e) {
  if (e.target && e.target.id === "edit-btn") {
    let dataId = e.target.getAttribute("data-id");
    let newMessage = prompt("Matinni taxrirlang !");
    if (newMessage) {
      editData(dataId, newMessage);
    }
  }
});

function editData(id, newmesage) {
  fetch(`${apiSarvarbek}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: newmesage }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload()
    })
    .catch((error) => {
      console.log("xato");
    });
}
