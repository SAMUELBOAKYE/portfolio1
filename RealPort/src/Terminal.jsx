import { useEffect, useState, useRef } from "react";
import "./Terminal.css";
import "./skills.css";

const Terminal = ({ onProjectHover, isMobile }) => {
  const [lines, setLines] = useState([
    { type: "output", text: "Welcome to Samuel's Interactive Terminal" },
    { type: "output", text: "Type 'help' to see available commands" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState(
    localStorage.getItem("terminalTheme") || "hacker"
  );

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const prompt = "sammyPort ~ $ ";
  const availableThemes = ["light", "dark", "hacker"];

  // Skills data
  const skillsData = {
    frontend: [
      { name: "React", percentage: 99 },
      { name: "JavaScript", percentage: 98 },
      { name: "HTML5", percentage: 100 },
      { name: "CSS3", percentage: 99 },
    ],
    tools: [
      { name: "Git", percentage: 95 },
      { name: "Vite", percentage: 90 },
      { name: "npm/yarn", percentage: 97 },
    ],
    backend: [
      { name: "Node.js", percentage: 60 },
      { name: "Express", percentage: 50 },
    ],
  };

  // ==== COMMANDS ====
  const commands = {
    help: { description: "Show available commands", execute: () => showHelp() },
    bio: { description: "View biography", execute: () => showBio() },
    CV: { description: "Download my CV", execute: () => showResume() },
    clear: {
      description: "Clear terminal",
      execute: () => {
        setLines([]);
        return "";
      },
    },
    projects: {
      description: "Show featured projects",
      execute: () => showProjects(),
    },
    contact: {
      description: "Show contact information",
      execute: () => showContact(),
    },
    skills: {
      description: "List technical skills",
      execute: () => showSkills(),
    },
    theme: {
      description: "Change terminal theme",
      execute: (args) => changeTheme(args),
    },
    echo: {
      description: "Repeat back what you type",
      execute: (args) => args.join(" "),
    },
    date: {
      description: "Show current date and time",
      execute: () => new Date().toString(),
    },
    whoami: {
      description: "Show your identity",
      execute: () => "Boakye Samuel – Frontend Engineer ",
    },
    light: {
      description: "Switch to light mode",
      execute: () => changeTheme(["light"]),
    },
    dark: {
      description: "Switch to dark mode",
      execute: () => changeTheme(["dark"]),
    },
    hacker: {
      description: "Switch to hacker mode",
      execute: () => changeTheme(["hacker"]),
    },
  };

  const showHelp = () => {
    let helpText = "Available commands:\n\n";
    Object.entries(commands).forEach(([cmd, { description }]) => {
      helpText += `  ${cmd.padEnd(12)}${description}\n`;
    });
    return helpText;
  };

  const showBio =
    () => `Boakye Samuel is a passionate Frontend Engineer based in Ghana.
He specializes in building clean, responsive UIs using React, JavaScript, and CSS.

He enjoys turning ideas into reality with world-class frontend development.`;

  const showResume = () => `
  You can download my resume here:<br/><br/>
  <a href="/YAW BOAKYE TESLA.pdf" download="YAW_BOAKYE_Resume.pdf" class="contact-link">📄 Click to Download Resume</a>
`;

  const showProjects = () => `
    Featured Projects:
    
1. QuestHouse Website (React, CSS3)
   - Live: <a href="https://lodyaf.netlify.app" data-project="portfolio" class="project-link">https://lodyaf.netlify.app</a>
   - GitHub: <a href="https://github.com/SAMUELBOAKYE/lodyaf" data-project="portfolio" class="project-link">https://github.com/SAMUELBOAKYE/lodyaf</a>

2. E-commerce (React, CSS3)
   - Live: <a href="https://yawpet.netlify.app" data-project="ecommerce" class="project-link">https://yawpet.netlify.app</a>
   - GitHub: <a href="https://github.com/SAMUELBOAKYE/yawpet" data-project="ecommerce" class="project-link">https://github.com/SAMUELBOAKYE/yawpet</a>

3. Landing Page App (HTML5, JavaScript, CSS3)
   - Live: <a href="https://sam-ten-brown.vercel.app/features.html" data-project="landing" class="project-link">https://sam-ten-brown.vercel.app/features.html</a>
   - GitHub: <a href="https://github.com/SAMUELBOAKYE/vercel" data-project="landing" class="project-link">https://github.com/SAMUELBOAKYE/vercel</a>
  `;

  const showContact = () => `
    Contact Information:<br/><br/>
    Email: boakyesamuel189@gmail.com<br/>
    WhatsApp: <a href="https://wa.me/233541451661" class="contact-link">Chat on WhatsApp</a><br>
    call : 0541451661
  `;

  const showSkills = () => {
    return `
    <div class="terminal-skills">
      <div class="skills-category">
        <h3 class="category-title">Frontend</h3>
        ${skillsData.frontend
          .map(
            (skill) => `
          <div class="skill" style="--percent: ${skill.percentage}%">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar-container">
              <div class="skill-bar"></div>
              <div class="skill-percent">${skill.percentage}%</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      
      <div class="skills-category">
        <h3 class="category-title">Tools</h3>
        ${skillsData.tools
          .map(
            (skill) => `
          <div class="skill" style="--percent: ${skill.percentage}%">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar-container">
              <div class="skill-bar"></div>
              <div class="skill-percent">${skill.percentage}%</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      
      <div class="skills-category">
        <h3 class="category-title">Backend</h3>
        ${skillsData.backend
          .map(
            (skill) => `
          <div class="skill" style="--percent: ${skill.percentage}%">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar-container">
              <div class="skill-bar"></div>
              <div class="skill-percent">${skill.percentage}%</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `;
  };

  const changeTheme = (args) => {
    const selected = args[0]?.toLowerCase();
    if (availableThemes.includes(selected)) {
      setTheme(selected);
      localStorage.setItem("terminalTheme", selected);
      return `Theme changed to: ${selected}`;
    }
    return `Available themes: ${availableThemes.join(", ")}`;
  };

  // ==== Project link hover effect ====
  useEffect(() => {
    const links = terminalRef.current?.querySelectorAll(".project-link");

    const handleEnter = (e) => {
      const projectName = e.target.getAttribute("data-project");
      if (onProjectHover) onProjectHover(projectName, true);
    };

    const handleLeave = () => {
      if (onProjectHover) onProjectHover(null, false);
    };

    links?.forEach((link) => {
      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);

      // Add touch events for mobile
      link.addEventListener("touchstart", handleEnter);
      link.addEventListener("touchend", handleLeave);
    });

    return () => {
      links?.forEach((link) => {
        link.removeEventListener("mouseenter", handleEnter);
        link.removeEventListener("mouseleave", handleLeave);
        link.removeEventListener("touchstart", handleEnter);
        link.removeEventListener("touchend", handleLeave);
      });
    };
  }, [lines, onProjectHover]);

  // ==== INPUT HANDLER ====
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const input = currentInput.trim();
      if (!input) return;

      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setLines((prev) => [
        ...prev,
        { type: "input", text: `${prompt}${input}` },
      ]);

      const [command, ...args] = input.split(" ");
      const cmd = command.toLowerCase();
      const output = commands[cmd]
        ? commands[cmd].execute(args)
        : `'${cmd}' is not recognized as a command.\nType 'help' to see available commands.`;

      if (output)
        setLines((prev) => [...prev, { type: "output", text: output }]);
      setCurrentInput("");

      // Scroll to bottom after command execution
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 50);
    }
  };

  const renderTextWithLinks = (text) => ({ __html: text });

  return (
    <div className={`terminal-container theme-${theme}`}>
      <div className={`terminal-wrapper ${theme}`} ref={terminalRef}>
        {theme === "hacker" && <div className="terminal-glitch"></div>}
        {lines.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type}`}>
            {line.type === "input" ? (
              <>
                <span className="prompt">{prompt}</span>
                <pre>{line.text.replace(prompt, "")}</pre>
              </>
            ) : (
              <pre dangerouslySetInnerHTML={renderTextWithLinks(line.text)} />
            )}
          </div>
        ))}
        <div className="terminal-line input">
          <span className="prompt">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
