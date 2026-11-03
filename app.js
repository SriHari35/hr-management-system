const content = document.querySelector(".content");
const pageTitle = document.querySelector("#page-title");
const navLinks = document.querySelectorAll(".nav-link");
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

const payrollRows = [
  ["R. Karthik", "Computer Science", "₹48,500", "₹12,500", "₹36,000"],
  ["S. Priya", "Administration", "₹42,200", "₹10,000", "₹32,200"],
  ["A. Manikandan", "Mechanical", "₹39,400", "₹8,800", "₹30,600"],
  ["N. Vidhya", "Electrical", "₹51,300", "₹13,600", "₹37,700"],
  ["M. Arjun", "Civil", "₹35,100", "₹7,200", "₹27,900"],
];

const leaveRequests = [
  { id: 1, name: "R. Karthik", department: "Computer Science", type: "Casual leave", dates: "04–05 Nov", status: "Pending" },
  { id: 2, name: "S. Priya", department: "Administration", type: "Medical leave", dates: "06 Nov", status: "Pending" },
  { id: 3, name: "A. Manikandan", department: "Mechanical", type: "Casual leave", dates: "09–10 Nov", status: "Approved" },
  { id: 4, name: "N. Vidhya", department: "Electrical", type: "Earned leave", dates: "12 Nov", status: "Rejected" },
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

function payrollPage() {
  return `
    <div class="welcome-row">
      <div>
        <h2>Payroll overview</h2>
        <p>Fictional salary sheet for demonstration.</p>
      </div>
      <span class="date-pill">Monthly salary cycle · Nov 2026</span>
    </div>

    <section class="payroll-summary">
      <div class="pay-summary-card">
        <span>Total payroll</span>
        <strong>₹2,23,500</strong>
        <small>Across 5 employees</small>
      </div>

      <div class="pay-summary-card">
        <span>Net payout</span>
        <strong>₹1,64,400</strong>
        <small>After deductions</small>
      </div>

      <div class="pay-summary-card">
        <span>Pending</span>
        <strong>₹18,700</strong>
        <small>Needs approval</small>
      </div>
    </section>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <h2>Salary details</h2>
          <p>Sample monthly payroll list</p>
        </div>
        <label class="search">
          <span class="visually-hidden">Search payroll</span>
          <input data-filter type="search" placeholder="Search payroll..." />
        </label>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Gross salary</th>
              <th>Deductions</th>
              <th>Net salary</th>
            </tr>
          </thead>
          <tbody data-table-body>
            ${payrollRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
        <p class="no-results" data-empty hidden>No matching payroll records found.</p>
      </div>
    </section>

    <p class="demo-warning">
      Demo only: payroll mock data is shown for UI demonstration only.
      Do not enter or expose actual staff salary information.
    </p>
  `;
}

function leavePage() {
  const rows = leaveRequests.map((request) => {
    const statusClass = request.status.toLowerCase();
    const actions = request.status === "Pending"
      ? `<button class="action-button approve-button" data-action="approve" data-id="${request.id}">Approve</button>
         <button class="action-button reject-button" data-action="reject" data-id="${request.id}">Reject</button>`
      : "—";

    return `
      <tr>
        <td>${request.name}</td>
        <td>${request.department}</td>
        <td>${request.type}</td>
        <td>${request.dates}</td>
        <td><span class="status ${statusClass}">${request.status}</span></td>
        <td>${actions}</td>
      </tr>
    `;
  }).join("");

  return `
    <div class="welcome-row">
      <div>
        <h2>Leave requests</h2>
        <p>Review fictional requests for this interactive demo.</p>
      </div>
      <span class="date-pill">Sample data · 3 Nov 2026</span>
    </div>

    <section class="panel">
      <div class="panel-heading">
        <div>
          <h2>Request list</h2>
          <p>Approvals only change this page until it is refreshed.</p>
        </div>
        <label class="search">
          <span class="visually-hidden">Search leave requests</span>
          <input data-filter type="search" placeholder="Search requests..." />
        </label>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Leave type</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Demo actions</th>
            </tr>
          </thead>
          <tbody data-table-body>${rows}</tbody>
        </table>
        <p class="no-results" data-empty hidden>No matching requests found.</p>
      </div>
    </section>

    <p class="demo-warning">
      Demo only: actions are not saved and do not notify employees.
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
  } else if (page === "Leave") {
    content.innerHTML = leavePage();
  } else if (page === "Payroll") {
    content.innerHTML = payrollPage();
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

content.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const request = leaveRequests.find(
    (item) => item.id === Number(button.dataset.id)
  );

  if (!request || request.status !== "Pending") return;

  request.status = button.dataset.action === "approve" ? "Approved" : "Rejected";
  content.innerHTML = leavePage();
  setupSearch();
});

setupSearch();