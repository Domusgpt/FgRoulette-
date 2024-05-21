
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.start-adventure');

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.2s';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', () => {
        alert('Adventure Started!');
    });
});
