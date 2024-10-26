fetch(`https://671b161cacf9aa94f6ac880d.mockapi.io/telegram/users`)
  .then((data) => data.json())
  .then((data) => showUserdata(data))
  .catch((error) => console.log(error));

let userName = document.getElementById("user-name");
let userNumber = document.getElementById("user-number");
let connect = document.querySelector(".online");
let exitBtn = document.querySelector("#exit-btn");
let qrCodeBtn = document.querySelector("#qr-code");
let qr = document.querySelector(".qr");
let editName = document.querySelector(".name");

let qrcodefinish = document.querySelector("#qrcode");
function showUserdata(data) {
  data.forEach((element) => {
    userName.textContent = element.name;
    userNumber.textContent = element.phone_number;

    qrCodeBtn.addEventListener("click", function () {
      if (!qr.contains(qrcodefinish)) {
        let div = document.createElement("div");
        qr.appendChild(div);
        div.classList.add("qr-code");
        div.innerHTML = `<div id="qrcode"></div>`;
        generateQRCode(`https://t.me/${element.name}`);
      }
    });
  });
}

editName.addEventListener("click", function () {
  editNamee();
});

if (navigator.onLine) {
  connect.textContent = "online";
} else {
  connect.textContent = "last seen 1 minutes ago  ";
}

exitBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

// Qr code chiqarish

function generateQRCode(text) {
  // QR kod yaratish uchun `qrcode` obyektini yaratamiz
  const qr = qrcode(0, "L"); // 0 - versiya, 'L' - aniqlik darajasi (L, M, Q, H)
  qr.addData(text); // Kiritilgan matnni qo'shamiz
  qr.make(); // QR kodni hosil qilamiz

  // QR kodni `div` yoki boshqa elementga joylashtirish
  document.getElementById("qrcode").innerHTML = qr.createImgTag(8); // 4 - o'lcham ko'rsatkichi
}
// ismni edit qilis uchuh funksiya
function editNamee() {
  let newName = prompt("Enter new name:");
  fetch(`https://671b161cacf9aa94f6ac880d.mockapi.io/telegram/users/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  });
}

