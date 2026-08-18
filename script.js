// ============================================
// Mobile menu toggle (DevAdeh's section)
// Select the button, select the nav list, listen for a click,
// flip the "open" class on/off. CSS decides what "open" looks like.
// ============================================
const menuBtn = document.getElementById("menubtn");
const navLinks = document.querySelector(".navlinks");

// Guarded: login.html and dashboard.html use a simpler header with
// no hamburger menu, so these elements won't exist on those pages —
// script.js is shared across all pages, so this must not error out
// when they're missing.
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });
}

// ============================================
// Teammates: add your section's JS below this line
// (e.g. FAQ accordion, modals) — keep this file shared
// so everything loads from one script.js.
// ============================================

// ---- FAQ accordion (index.html) ----
// Each .faq-item has a <button class="faq-question"> and a .faq-answer.
// Clicking a question toggles its own item open/closed. Only one
// open at a time keeps the list from getting tall.
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (!question) return;
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

// ---- Scroll reveal (index.html) ----
// Any element with [data-reveal] fades + rises into view the first
// time it enters the viewport. Skipped entirely for people who've
// asked their OS for reduced motion.
const revealEls = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealEls.length && !prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // No IntersectionObserver support, or motion is reduced: just show everything.
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ---- Toast helper (shared by the dashboard and the auth page) ----
const toast = document.getElementById("toast");
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ============================================
// Auth (login.html) — Create account / Log in
// UI demonstration only: no real account is created and no
// password is checked. Submitting either form just simulates
// success and sends the visitor on to the dashboard.
// ============================================
const authTabs = document.querySelectorAll(".authtab");
const authForms = {
  create: document.getElementById("form-create"),
  login: document.getElementById("form-login"),
};

function switchAuthTab(target) {
  authTabs.forEach((tab) => {
    const isTarget = tab.dataset.tab === target;
    tab.classList.toggle("active", isTarget);
    tab.setAttribute("aria-selected", String(isTarget));
  });
  Object.entries(authForms).forEach(([key, form]) => {
    form.hidden = key !== target;
  });
}

if (authTabs.length) {
  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.tab));
  });

  // "Already have an account? Log in" / "New here? Create an account" links
  document.querySelectorAll("[data-switch]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      switchAuthTab(link.dataset.switch);
    });
  });
}

function handleAuthSubmit(form, message) {
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast(message);
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 900);
  });
}

handleAuthSubmit(authForms.create, "Account created — taking you to your dashboard...");
handleAuthSubmit(authForms.login, "Logged in — taking you to your dashboard...");

// ============================================
// Dashboard (Person 3 / BuildX Scholar section)
// Everything here runs on mock data. No network calls,
// no real money movement — it's a UI demonstration only,
// per the tutor's brief revisions.
// ============================================

// ---- Today's date, shown under the greeting ----
const dashboardDateEl = document.getElementById("dashboardDate");
if (dashboardDateEl) {
  dashboardDateEl.textContent = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// ---- Mock transaction data ----
const transactions = [
  { name: "Adaeze Okonkwo", type: "received", amount: 45000, note: "Freelance payment", date: "Today, 9:14 AM" },
  { name: "MTN Airtime", type: "bills", amount: 2000, note: "Bill payment", date: "Today, 8:02 AM" },
  { name: "Chidi Nwosu", type: "sent", amount: 12500, note: "Rent contribution", date: "Yesterday, 6:47 PM" },
  { name: "Ibrahim Adewale", type: "received", amount: 30000, note: "Agency stipend", date: "Yesterday, 1:20 PM" },
  { name: "DSTV Subscription", type: "bills", amount: 8500, note: "Bill payment", date: "2 days ago" },
  { name: "Tina Brown", type: "sent", amount: 5000, note: "Lunch split", date: "2 days ago" },
  { name: "Priceless Gem", type: "received", amount: 18000, note: "Design gig", date: "3 days ago" },
  { name: "Ikeja Electric", type: "bills", amount: 6200, note: "Bill payment", date: "4 days ago" },
  { name: "Jhae Okafor", type: "sent", amount: 9000, note: "Data plan gift", date: "5 days ago" },
  { name: "ProAce Studio", type: "received", amount: 60000, note: "Logo commission", date: "1 week ago" },
];

const naira = (n) =>
  "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const typeIcon = { received: "↙", sent: "↗", bills: "🧾" };

const transactionList = document.getElementById("transactionList");
const transactionEmpty = document.getElementById("transactionEmpty");
const txSearch = document.getElementById("txSearch");
const filterChips = document.querySelectorAll(".filterchip");
let activeFilter = "all";

function renderTransactions() {
  const query = txSearch.value.trim().toLowerCase();
  const filtered = transactions.filter((tx) => {
    const matchesFilter = activeFilter === "all" || tx.type === activeFilter;
    const matchesSearch = tx.name.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  transactionList.innerHTML = "";
  transactionEmpty.hidden = filtered.length !== 0;

  filtered.forEach((tx) => {
    const li = document.createElement("li");
    li.className = "transactionitem";
    const sign = tx.type === "received" ? "+" : "-";
    li.innerHTML = `
      <span class="transactionicon ${tx.type}" aria-hidden="true">${typeIcon[tx.type]}</span>
      <div class="transactiondetails">
        <div class="transactionname">${tx.name}</div>
        <div class="transactionmeta">${tx.note} · ${tx.date}</div>
      </div>
      <span class="transactionamount ${tx.type === "received" ? "received" : "sent"}">${sign}${naira(tx.amount)}</span>
    `;
    transactionList.appendChild(li);
  });
}

if (transactionList) {
  renderTransactions();

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter;
      renderTransactions();
    });
  });

  txSearch.addEventListener("input", renderTransactions);
}

// ---- Hide / reveal balance ----
const balanceValue = document.getElementById("balanceValue");
const toggleBalance = document.getElementById("toggleBalance");
const realBalance = "₦482,650.00";
if (toggleBalance) {
  toggleBalance.addEventListener("click", () => {
    const isHidden = balanceValue.textContent === "••••••••";
    balanceValue.textContent = isHidden ? realBalance : "••••••••";
    toggleBalance.textContent = isHidden ? "🙈" : "👁️";
    toggleBalance.setAttribute("aria-pressed", String(!isHidden));
  });
}

// ---- Quick actions: swap which demo form is visible ----
const quickActionBtns = document.querySelectorAll(".quickactionbtn");
const actionEmpty = document.getElementById("actionEmpty");
const dashboardActionForms = {
  send: document.getElementById("form-send"),
  request: document.getElementById("form-request"),
  split: document.getElementById("form-split"),
  link: document.getElementById("form-link"),
};

quickActionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const alreadyActive = btn.classList.contains("active");

    quickActionBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    Object.values(dashboardActionForms).forEach((form) => (form.hidden = true));

    if (alreadyActive) {
      actionEmpty.hidden = false;
      return;
    }

    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    actionEmpty.hidden = true;
    dashboardActionForms[action].hidden = false;
  });
});

// ---- Demo forms: prevent submission, show a confirmation toast ----
const sendForm = document.getElementById("form-send");
if (sendForm) {
  sendForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("This is a demo — no money was actually sent.");
    sendForm.reset();
  });
}

const requestForm = document.getElementById("form-request");
if (requestForm) {
  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("This is a demo — no request was actually sent.");
    requestForm.reset();
  });
}

// ---- Split bill: live-calculate each person's share ----
const splitForm = document.getElementById("form-split");
const splitTotal = document.getElementById("splitTotal");
const splitPeople = document.getElementById("splitPeople");
const splitResult = document.getElementById("splitResult");

function updateSplitResult() {
  const total = parseFloat(splitTotal.value) || 0;
  const people = parseInt(splitPeople.value, 10) || 1;
  splitResult.textContent = `Each person pays ${naira(total / people)}`;
}

if (splitForm) {
  splitTotal.addEventListener("input", updateSplitResult);
  splitPeople.addEventListener("change", updateSplitResult);
  splitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("This is a demo — no split requests were actually sent.");
    splitForm.reset();
    updateSplitResult();
  });
}

// ---- Payment link generator: builds a fake link, copies to clipboard ----
const generateLinkBtn = document.getElementById("generateLinkBtn");
const linkOutput = document.getElementById("linkOutput");
const linkText = document.getElementById("linkText");
const copyLinkBtn = document.getElementById("copyLinkBtn");

if (generateLinkBtn) {
  generateLinkBtn.addEventListener("click", () => {
    const code = Math.random().toString(36).slice(2, 9);
    linkText.textContent = `smartflow.app/pay/${code}`;
    linkOutput.hidden = false;
  });

  copyLinkBtn.addEventListener("click", () => {
    navigator.clipboard?.writeText(linkText.textContent).catch(() => {});
    showToast("Link copied to clipboard.");
  });
    }
      
