document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    let localData = JSON.parse(localStorage.getItem("database"));
    let username = document.getElementById("username");
    let usernameValue = username.value;

    let password = document.getElementById("password");
    let passValue = password.value;

    let boolValue = localData.some(
      (item) => item.username == usernameValue && item.password == passValue
    );
    if (boolValue) {
      localStorage.setItem(
        "user",
        JSON.stringify(localData.find((item) => item.username == usernameValue))
      );
      window.location.href = "index.html";
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (err) {
    if (err) {
      alert(err.message);
    }
  }
});
