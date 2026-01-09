export const MOCK_RESUME_RESPONSE = {
    success: true,
    data: {
        header: {
            fullName: "John Doe",
            contactInfo: "Owerri, Imo | (123) 456-7890 | email@example.com",
            links: "linkedin.com/in/yourprofile | github.com/yourusername"
        },
        professionalSummary: "Highly accomplished Senior Software Engineer...",
        technicalSkills: ["Java", "Spring Boot", "Azure DevOps"],
        professionalExperience: [
            {
                role: "Senior Backend Developer",
                company: "Palmpay Limited",
                years: "Nov 2020 – Present",
                bulletPoints: ["Spearheaded the design...", "Architected cloud-native solutions..."]
            },
            {
                role: "Freelance Software Engineer",
                company: "FlarezPort Limited",
                years: "Mar 2019 – Oct 2020",
                bulletPoints: ["Developed custom backend...", "Designed database schemas..."]
            }
        ],
        education: [
            {
                degree: "Masters of Science in Computer Science",
                institution: "Federal University of Technology, Owerri",
                yearOfCompletion: "2020"
            }
        ]
    }
};
