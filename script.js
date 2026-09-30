const form = document.getElementById('birthday-form');
const birthdayDay = document.getElementById('birthday-day');
const birthdayMonth = document.getElementById('birthday-month');
const birthdayYear = document.getElementById('birthday-year');
const birthdayInputs = [birthdayDay, birthdayMonth, birthdayYear];
const error = document.getElementById('error');
const result = document.getElementById('result');
const days = document.getElementById('days');
const dateRange = document.getElementById('date-range');
const milestones = result.querySelectorAll('.milestones dd');
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

function clearFeedback() {
  error.textContent = '';
  birthdayInputs.forEach((input) => input.removeAttribute('aria-invalid'));
  result.hidden = true;
}

function showError(message, input) {
  error.textContent = message;
  input.setAttribute('aria-invalid', 'true');
  result.hidden = true;
  input.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFeedback();

  const dayText = birthdayDay.value.trim();
  const monthText = birthdayMonth.value.trim();
  const yearText = birthdayYear.value.trim();
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  if (!/^\d{1,2}$/.test(dayText) || day < 1 || day > 31) {
    showError('Please enter a day from 1 to 31.', birthdayDay);
    return;
  }
  if (!/^\d{1,2}$/.test(monthText) || month < 1 || month > 12) {
    showError('Please enter a month from 1 to 12.', birthdayMonth);
    return;
  }
  if (!/^\d{4}$/.test(yearText) || year < 1 || year > 9999) {
    showError('Please enter a four-digit year from 0001 to 9999.', birthdayYear);
    return;
  }

  const birthDate = calendarDate(year, month, day);
  if (birthDate.getUTCFullYear() !== year || birthDate.getUTCMonth() + 1 !== month || birthDate.getUTCDate() !== day) {
    showError('Please enter a valid day for this month and year.', birthdayDay);
    return;
  }

  const today = todayDate();
  if (birthDate > today) {
    const input = year > today.getUTCFullYear() ? birthdayYear
      : month > today.getUTCMonth() + 1 ? birthdayMonth : birthdayDay;
    showError('Your date of birth cannot be in the future.', input);
    return;
  }

  days.textContent = new Intl.NumberFormat().format((today - birthDate) / millisecondsPerDay);
  const format = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });
  dateRange.textContent = `${format.format(birthDate)} – ${format.format(today)}`;
  milestones.forEach((milestone) => {
    const date = new Date(birthDate.getTime() + Number(milestone.dataset.days) * millisecondsPerDay);
    milestone.textContent = format.format(date);
  });
  result.hidden = false;
});

birthdayInputs.forEach((input) => input.addEventListener('input', clearFeedback));
