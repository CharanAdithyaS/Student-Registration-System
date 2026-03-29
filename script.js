// get data from local storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// track edit
let editIndex = -1;

// display data on page load
showData();

// form submit
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("contact").value;

    // simple validation
    if (name === "" || id === "" || email === "" || contact === "") {
        alert("Please fill all fields");
        return;
    }

    if (isNaN(id)) {
        alert("ID should be numbers only");
        return;
    }

    if (isNaN(contact) || contact.length < 10) {
        alert("Contact should be at least 10 digits");
        return;
    }

    // store data
    let student = {
        name: name,
        id: id,
        email: email,
        contact: contact
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("form").reset();

    showData();
});

// show data
function showData() {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {

        table.innerHTML += `
            <tr>
                <td>${students[i].name}</td>
                <td>${students[i].id}</td>
                <td>${students[i].email}</td>
                <td>${students[i].contact}</td>
                <td>
                    <button onclick="editData(${i})">Edit</button>
                    <button onclick="deleteData(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
}

// edit
function editData(index) {
    let s = students[index];

    document.getElementById("name").value = s.name;
    document.getElementById("id").value = s.id;
    document.getElementById("email").value = s.email;
    document.getElementById("contact").value = s.contact;

    editIndex = index;
}

// delete
function deleteData(index) {
    if (confirm("Delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        showData();
    }
}