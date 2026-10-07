const form = document.getElementById("form");
const table = document.getElementById("table");

async function load() {
  const response = await fetch("/students");
  const data = await response.json();

  table.innerHTML = data.map(
    (s) => `
      <tr>
        <td>${s.name}</td>
        <td>${s.rollNo}</td>
        <td>${s.course}</td>
        <td>${s.marks}</td>
        <td>
          <button onclick="edit('${s._id}')">Edit</button>
          <button onclick="del('${s._id}')">Delete</button>
        </td>
      </tr>
    `
  ).join("");
}

form.onsubmit = async (e) => {
  e.preventDefault();

  const d = {
    name: name.value,
    rollNo: rollNo.value,
    course: course.value,
    marks: +marks.value,
  };

  if (d.marks < 0 || d.marks > 100) {
    return alert("Marks 0-100");
  }

  await fetch("/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(d),
  });

  form.reset();
  load();
};

async function del(id) {
  await fetch("/students/" + id, {
    method: "DELETE",
  });

  load();
}

async function edit(id) {
  const s = await (await fetch("/students/" + id)).json();

  const d = {
    name: prompt("Name", s.name),
    rollNo: prompt("Roll", s.rollNo),
    course: prompt("Course", s.course),
    marks: +prompt("Marks", s.marks),
  };

  await fetch("/students/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(d),
  });

  load();
}

load();
