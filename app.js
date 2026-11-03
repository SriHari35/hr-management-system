const navLinks = document.querySelectorAll(".nav-link");
const pageTitle = document.querySelector("#page-title");
const searchInput = document.querySelector("#request-search");
const tableRows = [...document.querySelectorAll("#requests-table tr")];
const noResults = document.querySelector("#no-results");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    // Navigation is illustrative; this static demo has one dashboard page.
    pageTitle.textContent = link.dataset.page;
  });
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleRows = 0;

  tableRows.forEach((row) => {
    const matches = row.textContent.toLowerCase().includes(searchTerm);
    row.hidden = !matches;

    if (matches) {
      visibleRows += 1;
    }
  });

  noResults.hidden = visibleRows !== 0;
});