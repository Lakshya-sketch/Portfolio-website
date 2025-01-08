document.addEventListener("DOMContentLoaded", () => {
    const profilesArray = JSON.parse(localStorage.getItem('profilesArray')) || [];
    if (profilesArray.length > 0) {
        const latestProfile = profilesArray[profilesArray.length - 1];
        updateHTML(latestProfile);
    }
});

function updateHTML(data) {
  
    document.querySelector('.resume-container header h1').textContent = data.fullName;

    
    document.querySelector('.resume-container .contact-info p:nth-child(1)').textContent = data.phone;
    document.querySelector('.resume-container .contact-info a').textContent = data.email;
    document.querySelector('.resume-container .contact-info a').href = `mailto:${data.email}`;

    document.querySelector('.resume-container section.overview p').textContent = data.bio;

    
    const experienceSection = document.querySelector('.resume-container section.experience');
    experienceSection.innerHTML = ''; 
    experienceSection.innerHTML += `
        <div class="job">
            <h4>Experience</h4>
            <p>${data.experience}</p>
        </div>
    `;

    
    const educationSection = document.querySelector('.resume-container section.education');
    educationSection.innerHTML = '';
    educationSection.innerHTML += `
        <div class="education">
            <h4>Education</h4>
            <p>${data.education}</p>
        </div>
    `;
    const maritalStatusSection = document.querySelector('.resume-container section.marital-status');
    maritalStatusSection.innerHTML = ''; // Clear existing content
    maritalStatusSection.innerHTML += `
        <div class="marital-status">
            <h4>Marital Status</h4>
            <p>${data.maritalStatus}</p>
        </div>
    `;

    // Update the skills section
    document.querySelector('.resume-container section.skills p').textContent = `Skills: ${data.skills}`;
    
    // Update the hobbies section
    const hobbiesSection = document.querySelector('.resume-container section.hobbies');
    hobbiesSection.innerHTML = ''; // Clear existing content
    hobbiesSection.innerHTML += `
        <div class="hobby">
            <h4>Hobbies</h4>
            <p>${data.hobbies}</p>
        </div>
    `;
}

document.getElementById('GeneratePDF').addEventListener('click', generatePDF);

function generatePDF() {
    const { jsPDF } = window.jspdf; // Import jsPDF
    const doc = new jsPDF(); // Create a new jsPDF instance
    const resumeContent = document.querySelector('.resume-container'); // Select the resume container

    // Use html2canvas to capture the content of the resume
    html2canvas(resumeContent, {
        useCORS: true, // Enable Cross-Origin Resource Sharing
        allowTaint: true // Allow cross-origin images
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png'); // Convert the canvas to an image
        const imgWidth = 190; // Set the width of the image in the PDF
        const pageHeight = doc.internal.pageSize.height; // Get the height of the PDF page
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the height of the image
        let heightLeft = imgHeight; // Initialize remaining height
        let position = 0; // Initialize position

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight; // Subtract the page height from remaining height

        // If the image height is greater than the page height, add new pages
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight; // Update the position
            doc.addPage(); // Add a new page
            doc.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight); // Add the image to the new page
            heightLeft -= pageHeight; // Update remaining height
        }

        // Save the generated PDF
        doc.save('resume.pdf');
    }).catch(error => {
        console.error("Error generating PDF:", error); // Log any errors
    });
}