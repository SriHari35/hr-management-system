const content = document.querySelector(".content");
const pageTitle = document.querySelector("#page-title");
const navLinks = document.querySelectorAll(".nav-link");

// Save the dashboard markup from index.html so the Dashboard link can restore it.
const dashboardMarkup = content.innerHTML;

const employees = [
  ["ACET-001", "R. Karthik", "Computer Science", "Assistant Professor", "Full-time"],
  ["ACET-002", "S. Priya", "Administration", "Office Coordinator", "Full-time"],
  ["ACET-003", "A. Manikandan", "Mechanical", "Lab Assistant", "Full-time"],
  ["ACET-004", "N. Vidhya", "Electrical", "Assistant Professor", "Full-time"],
  ["ACET-005", "M. Arjun", "Civil", "Technician", "Part-time"],
];

const attendance = [
  ["R. Karthik", "Computer Science", "09:02 AM", "05:10 PM", "Present"],
  ["S. Priya", "Administration", "08:54 AM", "05:03 PM", "Present"],
  ["A. Manikandan", "Mechanical", "—", "—", "On leave"],
  ["N. Vidhya", "Electrical", "09:24 AM", "—", "Late"],
  ["M. Arjun", "Civil", "08:58 AM", "05:01 PM", "Present"],
];

function tablePage(title, description, headers, rows, placeholder) {
  const headingCells = headers.map((header) => `<th>${header}</th>`).join("");
  const bodyRows = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `
    <div class="welcome-row">
      <div>
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
      <span class="date-pill">Sample data · 3 Nov 2026</span>
    </div>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <h2>${title} list</h2>
          <p>Fictional information for demonstration</p>
        </div>
        <label class="search">
          <span class="visually-hidden">Search ${title.toLowerCase()}</span>
          <input data-filter type="search" placeholder="${placeholder}" />
        </label>
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr>${headingCells}</tr></thead>
          <tbody data-table-body>${bodyRows}</tbody>
        </table>
        <p class="no-results" data-empty hidden>No matching records found.</p>
      </div>
    </section>

    <p class="demo-warning">
      Demo only: sample data, no backend, and no real HR workflow.
      Do not enter or publish personal or employee information.
    </p>
  `;
}

function placeholderPage(title) {
  return `
    <div class="welcome-row">
      <div>
        <h2>${title}</h2>
        <p>This section is planned for a future demo update.</p>
      </div>
    </div>
    <section class="panel placeholder-panel">
      <h2>${title} demo</h2>
      <p>This page is a visual placeholder. It does not store or process HR data.</p>
    </section>
    <p class="demo-warning">Demo only · Do not enter personal or employee information.</p>
  `;
}

function setupSearch() {
  const input = content.querySelector("#request-search, [data-filter]");
  const tableBody = content.querySelector("#requests-table, [data-table-body]");
  const emptyMessage = content.querySelector("#no-results, [data-empty]");

  if (!input || !tableBody || !emptyMessage) return;

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    const rows = [...tableBody.querySelectorAll("tr")];
    let visibleCount = 0;

    rows.forEach((row) => {
      const matches = row.textContent.toLowerCase().includes(term);
      row.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    emptyMessage.hidden = visibleCount > 0;
  });
}

function showPage(page) {
  pageTitle.textContent = page;

  if (page === "Dashboard") {
    content.innerHTML = dashboardMarkup;
  } else if (page === "Employees") {
    content.innerHTML = tablePage(
      "Employees",
      "Browse the fictional staff directory.",
      ["Employee ID", "Name", "Department", "Role", "Employment"],
      employees,
      "Search employees..."
    );
  } else if (page === "Attendance") {
    content.innerHTML = tablePage(
      "Attendance",
      "Review fictional attendance records.",
      ["Employee", "Department", "Check-in", "Check-out", "Status"],
      attendance,
      "Search attendance..."
    );
  } else {
    content.innerHTML = placeholderPage(page);
  }

  setupSearch();
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    showPage(link.dataset.page);
  });
});

// Enable search on the Dashboard when the page first loads.
setupSearch();