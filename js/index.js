// sign-up
var signupName=document.querySelector('#signupName');
var signupEmail=document.querySelector('#signupEmail');
var signupPassword=document.querySelector('#signupPassword');
var signupBtn=document.querySelector('#signupBtn');
var logoutBtn=document.querySelector('#logoutBtn');

// login
var signinEmail=document.querySelector('#signinEmail');
var signinPassword=document.querySelector('#signinPassword');
var loginBtn=document.querySelector('#loginBtn');
var Signin=document.querySelector('#Signin');

var welcomeMsgElement = document.getElementById('WelcomeMsg');

var allUsers=[];

var currentUser =JSON.parse(localStorage.getItem('currentUser')) 
if (currentUser && welcomeMsgElement) {
    welcomeMsgElement.innerHTML = "Welcome " + currentUser.userName
}

if (JSON.parse(localStorage.getItem('user')) == null) {
  allUsers= []
} else {
  allUsers = JSON.parse(localStorage.getItem('user'))
}



function addUser(){
 var newUser={
    userName:signupName.value,
    userEmail:signupEmail.value,
    userPassword:signupPassword.value,

  }
allUsers.push(newUser);
localStorage.setItem('user',JSON.stringify(allUsers));
clear()

}

function clear(){
signupName.value=null;
signupEmail.value=null;
signupPassword.value=null;

}



function isEmailExist() {
  for (var i= 0; i<allUsers.length; i++) {
      if (allUsers[i].userEmail.toLowerCase() == signupEmail.value.toLowerCase()) {
       return false
      }
  }
}


 if(signupBtn){
  signupBtn.addEventListener('click', function(){
    if(signupName.value==='' || signupEmail.value==='' ||signupPassword.value===''){
      document.getElementById('incorrect').innerText="All inputs is required";
    }
  
     else if (isEmailExist() == false) {
        document.getElementById('incorrect').innerText="Email already exists.";
      }
      else{
        addUser();
        document.getElementById('incorrect').innerText="success";
        document.getElementById('incorrect').classList.replace('text-danger','text-success')
      }
  })
 }



function validation(element){
  var regex={
    signupName:/^[a-z]{2,}$/,
    signupEmail:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    signupPassword:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    signinEmail:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    signinPassword:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  }
  if(regex[element.id].test(element.value)==true){
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    element.nextElementSibling.classList.replace('d-block', 'd-none');
  }
  else{
    element.classList.remove('is-valid')
    element.classList.add('is-invalid')
    element.nextElementSibling.classList.replace('d-none','d-block');
  }
}


//login



if(loginBtn){
  loginBtn.addEventListener('click',function(){
    if( signinEmail.value==='' || signinPassword.value===''){
      document.getElementById('errorMsg').innerText="All inputs is required";
    }else{
      login()
    }
  })
}


function login(){
  for (var i= 0; i<allUsers.length; i++) {
  
    if (allUsers[i].userEmail.toLowerCase() == signinEmail.value.toLowerCase()) {
     if(allUsers[i].userPassword.toLowerCase() == signinPassword.value.toLowerCase()){
       let userInfo = allUsers.find((user) => user.userEmail === signinEmail.value.toLowerCase());
       localStorage.setItem('currentUser',JSON.stringify(userInfo));
       location.replace('http://' + location.hostname +':'+ location.port + '/home.html');
     }
    }
    else{
       document.getElementById('errorMsg').innerText="incorrect email or password"
    }
}
}

logoutBtn.addEventListener('click',function(){
  localStorage.removeItem('currentUser')
})









