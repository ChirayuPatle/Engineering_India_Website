export default function SkillsSection() {
  const skills = [
    "Product Design",
    "UX Design",
    "Google Analytics",
    "SEO Content",
    "Customer Service",
    "UI Design",
    "Design Strategy",
    "Web-Development",
    "Integrated Design",
    "Front End",
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
