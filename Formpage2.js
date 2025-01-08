const form = document.getElementById("portfolioForm");

function handleFormSubmit(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const bio = document.getElementById("bio").value;
    const skills = document.getElementById("skills").value;
    const experience = document.getElementById("experience").value;
    const hobbies = document.getElementById("hobbies").value;
    const education = document.getElementById("education").value;
    const maritalStatus = document.getElementById("maritalStatus").value;

    const dataSet2 = {
        fullName,
        email,
        phone,
        bio,
        skills,
        experience,
        hobbies,
        education,
        maritalStatus,
    };

    const profilesArray = JSON.parse(localStorage.getItem('profilesArray')) || [];
    profilesArray.push(dataSet2);
    localStorage.setItem('profilesArray', JSON.stringify(profilesArray));

    // Redirect to Resume page
    window.location.href = 'resume2.html';
}

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", handleFormSubmit);
});