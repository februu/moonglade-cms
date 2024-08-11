// handle modal display
document.addEventListener('DOMContentLoaded', (event) => {
	const urlParams = new URLSearchParams(window.location.search);
	const error = urlParams.get('error');
	const message = urlParams.get('message');
	if (error) {
		const modal = document.getElementById('modal');
		modal.textContent = decodeURIComponent(error);
		modal.style.display = 'inline-block';
		modal.classList.add('modal-red');
	} else if (message) {
		const modal = document.getElementById('modal');
		modal.textContent = decodeURIComponent(message);
		modal.style.display = 'inline-block';
		modal.classList.add('modal-green');
	}
});
