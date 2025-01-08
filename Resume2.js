document.addEventListener("DOMContentLoaded", () => {
    const profilesArray = JSON.parse(localStorage.getItem('profilesArray')) || [];
    if (profilesArray.length > 0) {
        const latestProfile = profilesArray[profilesArray.length - 1];
        updateHTML(latestProfile);
    }
});

function updateHTML(data) {
    // Update the header with the full name
    document.querySelector('.resume-container .header h1').textContent = data.fullName;

    // Update contact information
    document.querySelector('.resume-container .contact-info .email').textContent = `Email: ${data.email}`;
    document.querySelector('.resume-container .contact-info .phone').textContent = `Phone: ${data.phone}`;

    // Update bio
    document.querySelector('.resume-container .bio').textContent = `Bio: ${data.bio}`;

    // Update skills
    document.querySelector('.resume-container .skills').textContent = `Skills: ${data.skills}`;

    // Update experience
    document.querySelector('.resume-container .experience').textContent = `Experience: ${data.experience}`;

    // Update hobbies
    document.querySelector('.resume-container .hobbies').textContent = `Hobbies: ${data.hobbies}`;

    // Update education
    document.querySelector('.resume-container .education').textContent = `Education: ${data.education}`;

    // Update marital status
    document.querySelector('.resume-container .marital-status').textContent = `Marital Status: ${data.maritalStatus}`;
}