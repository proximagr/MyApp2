document.addEventListener("DOMContentLoaded", function () {
    const listUsersButton = document.querySelector("#list-users-btn");
  
    listUsersButton.addEventListener("click", function () {
      fetch("http://localhost:3000/list-users")
        .then((response) => response.json())
        .then((data) => {
          const table = document.querySelector("#users-table");
          table.innerHTML = "";
          data.forEach((user) => {
            const row = table.insertRow();
            const nameCell = row.insertCell(0);
            const emailCell = row.insertCell(1);
            nameCell.innerHTML = user.name;
            emailCell.innerHTML = user.email;
          });
        })
        .catch((error) => console.error(error));
    });
  });
  