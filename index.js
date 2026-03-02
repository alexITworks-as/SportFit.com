const modal = document.getElementById('cardModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close');

openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
const orderBtn = document.getElementById('orderBtn');

orderBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});
const callBtn = document.getElementById("callBtn");
const phoneInput = document.getElementById("phoneInput");

callBtn.addEventListener("click", function () {
  const phone = phoneInput.value.trim();

  if (phone === "") {
    alert("❌ Впишіть номер телефону!");
    return;
  }

  alert("✅ Ви зареєстрували дзвінок! Ми скоро вам зателефонуємо.");
  phoneInput.value = ""; // очищає поле
});
// ========== REGISTRATION MODAL ==========
const regModal = document.getElementById('regModal');
const openRegBtn = document.getElementById('openRegModal');
const closeRegBtn = document.getElementById('closeRegModal');

function openRegModal(e) {
  e && e.preventDefault();
  regModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRegModalFn() {
  regModal.classList.remove('active');
  document.body.style.overflow = '';
  // Close calendar if open
  customCalendar.classList.remove('open');
}

openRegBtn.addEventListener('click', openRegModal);
closeRegBtn.addEventListener('click', closeRegModalFn);

regModal.addEventListener('click', (e) => {
  if (e.target === regModal) closeRegModalFn();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && regModal.classList.contains('active')) closeRegModalFn();
});

// ========== CUSTOM CALENDAR ==========
const calendarToggleBtn = document.getElementById('calendarToggleBtn');
const customCalendar = document.getElementById('customCalendar');
const calMonthYear = document.getElementById('calMonthYear');
const calDays = document.getElementById('calDays');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const regDateInput = document.getElementById('regDate');

const monthsUA = [
  'Січень','Лютий','Березень','Квітень','Травень','Червень',
  'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'
];

let currentCalDate = new Date();
let selectedDate = null;
const today = new Date();
today.setHours(0,0,0,0);

function renderCalendar() {
  const year = currentCalDate.getFullYear();
  const month = currentCalDate.getMonth();

  calMonthYear.textContent = `${monthsUA[month]} ${year}`;
  calDays.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  // Monday-based week: 0=Mon...6=Sun
  let startOffset = (firstDay.getDay() + 6) % 7;

  // Empty cells
  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    calDays.appendChild(empty);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'cal-day';
    dayEl.textContent = d;

    const thisDate = new Date(year, month, d);
    thisDate.setHours(0,0,0,0);

    if (thisDate < today) {
      dayEl.classList.add('disabled');
    } else {
      if (thisDate.getTime() === today.getTime()) {
        dayEl.classList.add('today');
      }
      if (selectedDate && thisDate.getTime() === selectedDate.getTime()) {
        dayEl.classList.add('selected');
      }
      dayEl.addEventListener('click', () => {
        selectedDate = thisDate;
        const day = String(d).padStart(2,'0');
        const mon = String(month+1).padStart(2,'0');
        regDateInput.value = `${day}.${mon}.${year}`;
        customCalendar.classList.remove('open');
        renderCalendar();
      });
    }

    calDays.appendChild(dayEl);
  }
}

calendarToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  customCalendar.classList.toggle('open');
  renderCalendar();
});

regDateInput.addEventListener('click', (e) => {
  e.stopPropagation();
  customCalendar.classList.toggle('open');
  renderCalendar();
});

prevMonthBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentCalDate.setMonth(currentCalDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentCalDate.setMonth(currentCalDate.getMonth() + 1);
  renderCalendar();
});

document.addEventListener('click', (e) => {
  if (!customCalendar.contains(e.target) && e.target !== calendarToggleBtn && e.target !== regDateInput) {
    customCalendar.classList.remove('open');
  }
});

// ========== REGISTRATION FORM SUBMIT ==========
const regSubmitBtn = document.getElementById('regSubmitBtn');

regSubmitBtn.addEventListener('click', () => {
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName = document.getElementById('regLastName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const date = regDateInput.value.trim();

  if (!firstName) { alert("❌ Введіть ваше ім'я!"); return; }
  if (!lastName) { alert("❌ Введіть ваше прізвище!"); return; }
  if (!phone) { alert("❌ Введіть номер телефону!"); return; }
  if (!email) { alert("❌ Введіть email!"); return; }
  if (!date) { alert("❌ Оберіть дату початку тренувань!"); return; }

  // Show success
  const formEl = document.querySelector('.reg-form');
  const headerEl = document.querySelector('.reg-modal-header');
  formEl.style.display = 'none';
  headerEl.style.display = 'none';

  const successDiv = document.createElement('div');
  successDiv.className = 'reg-success';
  successDiv.innerHTML = `
    <span class="success-icon">🎉</span>
    <h3>Вітаємо, ${firstName}!</h3>
    <p>Вашу заявку прийнято.<br>Ми зателефонуємо на номер <strong>${phone}</strong><br>та підтвердимо запис на <strong>${date}</strong>.</p>
  `;
  document.querySelector('.reg-modal-content').appendChild(successDiv);

  setTimeout(() => {
    closeRegModalFn();
    // Reset form
    formEl.style.display = '';
    headerEl.style.display = '';
    successDiv.remove();
    document.getElementById('regFirstName').value = '';
    document.getElementById('regLastName').value = '';
    document.getElementById('regPhone').value = '';
    document.getElementById('regEmail').value = '';
    regDateInput.value = '';
    selectedDate = null;
  }, 3500);
});