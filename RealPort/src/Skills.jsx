import { useEffect, useState } from "react";
import "./skills.css";

const skillsData = [
  { name: "React", percentage: 90 },
  { name: "JavaScript", percentage: 85 },
  { name: "CSS", percentage: 80 },
  { name: "Node.js", percentage: 75 },
  { name: "Html5", percentage: 100 },
];

const Skills = () => {
  const [animatedSkills, setAnimatedSkills] = useState(
    skillsData.map((skill) => ({ ...skill, current: 0 }))
  );

  useEffect(() => {
    skillsData.forEach((skill, i) => {
      let start = 0;
      const end = skill.percentage;
      const duration = 2000; // 2s animation
      const stepTime = Math.floor(duration / end);

      const timer = setInterval(() => {
        start += 1;
        setAnimatedSkills((prev) => {
          const updated = [...prev];
          updated[i].current = start;
          return updated;
        });
        if (start >= end) clearInterval(timer);
      }, stepTime);
    });
  }, []);

  return (
    <div className="skills-container">
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-list">
        {animatedSkills.map((skill, i) => (
          <div key={i} className="skill-item">
            <div className="skill-header">
              <span>{skill.name}</span>
              <span>{skill.current}%</span>
            </div>
            <div className="skill-bar">
              <div
                className="skill-progress"
                style={{ width: `${skill.current}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
