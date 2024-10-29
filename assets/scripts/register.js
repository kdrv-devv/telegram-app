let loginAPI = `https://6715fa1733bc2bfe40bbca78.mockapi.io/Azizakam`;


let form = document.getElementById("form");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");

let sendBtn = document.getElementById("send")

form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    if(userEmail.value != "" && userPassword.value != ""){
        login(userEmail.value, userPassword.value);
    }
    userEmail.value = "";
    userPassword.value = "";
  });
  




  function login(userEmail,userPassword){
    fetch(loginAPI).then(response=> {
        if(!response.ok){
            throw new Error("Xato bor brat")
        }
        return response.json()
    }).then(data=>{
        const userr = data.find(user => user.user_email === userEmail && user.password === userPassword)
        if(userr){
            window.location.href = "./index.html"
        }else{
           sendBtn.textContent = "Not found !"
        }
        
    }).catch(error => console.log(error));

  }