
document.querySelector("input#password-verify").addEventListener("keyup", () => {
  let firstEmail = document.querySelector("input#password").value;
  let secondEmail = document.querySelector("input#password-verify").value;
  if(firstEmail != secondEmail) {
    document.querySelector("label#alert-pass").style.display = "block";
    document.querySelector("input#password-verify").style.borderColor = "#e84853";
  } else {
    document.querySelector("label#alert-pass").style.display = "none";
    document.querySelector("input#password-verify").style.borderColor = "#e6e6e6";
    document.querySelector("input#password").style.borderColor = "#e6e6e6";
  }
});

document.querySelector("input#submit").addEventListener("click", () => {
  let email = document.querySelector("input#email").value;
  let username = document.querySelector("input#username").value;
  let password = document.querySelector("input#password").value;
  let password_verify = document.querySelector("input#password-verify").value;
  if(email == "") {
    document.querySelector("input#email").style.borderColor = "#e84853";
  } else {
    document.querySelector("input#email").style.borderColor = "#e6e6e6";
  }

  if(username == "") {
    document.querySelector("input#username").style.borderColor = "#e84853";
  } else {
    document.querySelector("input#username").style.borderColor = "#e6e6e6";
  }

  if(password == "" || password_verify == "") {
    document.querySelector("input#password").style.borderColor = "#e84853";
    document.querySelector("input#password-verify").style.borderColor = "#e84853";
  } else {
    document.querySelector("input#password").style.borderColor = "#e6e6e6";
    document.querySelector("input#password-verify").style.borderColor = "#e6e6e6";
  }
});
