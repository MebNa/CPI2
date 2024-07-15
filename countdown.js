import Countdown from './countdownModule.js';

const countdownElement = document.getElementById('countdown');
const targetDate = new Date('2024-11-05T00:00:00').getTime(); // Ngày giờ mục tiêu

const countdown = new Countdown(targetDate);

function updateCountdown() {
    const timeRemaining = countdown.getTimeRemaining();

    countdownElement.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-label">DAYS</span>
            <span class="countdown-value">${timeRemaining.days}</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-label">HOURS</span>
            <span class="countdown-value">${timeRemaining.hours}</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-label">MINS</span>
            <span class="countdown-value">${timeRemaining.minutes}</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-label">SECS</span>
            <span class="countdown-value">${timeRemaining.seconds}</span>
        </div>
    `;
}

updateCountdown(); // Cập nhật lần đầu
setInterval(updateCountdown, 1000); // Cập nhật mỗi giây
