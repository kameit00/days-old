const form = document.getElementById('birthday-form');
const birthday = document.getElementById('birthday');
const error = document.getElementById('error');
const result = document.getElementById('result');
const days = document.getElementById('days');
const dateRange = document.getElementById('date-range');
const millisecondsPerDay = 24 * 60 * 60 * 1000;

// Map calendar dates to UTC midnight so daylight-saving changes don't affect the count.
function calendarDate(year, month, day) {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
}

function todayDate() {
  const now = new Date();
  return calendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function updateMaximum() {
  birthday.max = todayDate().toISOString().slice(0, 10);
}

function showError(message) {
  error.textContent = message;
  birthday.setAttribute('aria-invalid', 'true');
  result.hidden = true;
  birthday.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateMaximum();

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthday.value);
  if (!match) {
    showError('Please enter your date of birth.');
    return;
  }

  const [, year, month, day] = match.map(Number);
  const birthDate = calendarDate(year, month, day);
  if (year < 1 || birthDate.toISOString().slice(0, 10) !== birthday.value) {
    showError('Please enter a valid date of birth.');
    return;
  }

  const today = todayDate();
  if (birthDate > today) {
    showError('Your date of birth cannot be in the future.');
    return;
  }

  error.textContent = '';
  birthday.removeAttribute('aria-invalid');
  days.textContent = new Intl.NumberFormat().format((today - birthDate) / millisecondsPerDay);
  const format = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });
  dateRange.textContent = `${format.format(birthDate)} – ${format.format(today)}`;
  result.hidden = false;
});

birthday.addEventListener('input', () => {
  error.textContent = '';
  birthday.removeAttribute('aria-invalid');
  result.hidden = true;
});

window.addEventListener('focus', updateMaximum);
updateMaximum();
