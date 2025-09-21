// Demo job dataset with meta info
const jobData = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full Time",
    salary: "$120k - $180k",
    tags: ["React", "TypeScript", "Next.js"],
    experience: "Senior Level",
    description: `We're looking for a skilled Senior Frontend Developer to join our dynamic team. You'll be responsible for building cutting-edge web applications using modern technologies and best practices.`,
    requirements: [
      "5+ years of experience with React and modern JavaScript",
      "Strong knowledge of TypeScript and Next.js",
      "Experience with state management (Redux, Zustand)",
      "Familiarity with testing frameworks (Jest, Cypress)",
      "Understanding of web performance optimisation"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO policy"
    ]
  },
  {
    title: "Product Manager",
    company: "InnovateLab",
    location: "New York, NY",
    type: "Full Time",
    salary: "$130k - $200k",
    tags: ["Strategy", "Analytics", "Leadership"],
    experience: "Senior Level",
    description: "Lead teams building data-driven products for the next generation of enterprise solutions.",
    requirements: [
      "4+ years experience as a product manager in SaaS",
      "Strong skills in analytics and data insight",
      "Excellent leadership and strategic planning"
    ],
    benefits: [
      "Stock options",
      "Remote-friendly culture",
      "Learning stipend"
    ]
  },
  {
    title: "UX Designer",
    company: "DesignStudio Pro",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $120k",
    tags: ["Figma", "User Research", "Prototyping"],
    experience: "Mid Level",
    description: "Shape digital experiences that delight users globally in our design-driven team.",
    requirements: [
      "Proficiency in Figma",
      "Strong UX portfolio",
      "Experience with user research and prototyping"
    ],
    benefits: [
      "Contract with extension potential",
      "Work from anywhere"
    ]
  },
  {
    title: "Data Scientist",
    company: "DataFlow Analytics",
    location: "London, UK",
    type: "Full Time",
    salary: "£70k - £100k",
    tags: ["Python", "Machine Learning", "SQL"],
    experience: "Mid Level",
    description: "Work on cutting-edge ML models powering enterprise analytics solutions.",
    requirements: [
      "3+ years in data science/engineering",
      "Expertise in Python and ML frameworks",
      "Strong SQL knowledge"
    ],
    benefits: [
      "Hybrid work model",
      "Research publication support"
    ]
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Berlin, Germany",
    type: "Full Time",
    salary: "€85k - €120k",
    tags: ["AWS", "Docker", "Kubernetes"],
    experience: "Mid Level",
    description: "Implement scalable infrastructure for global clients using Kubernetes and cloud services.",
    requirements: [
      "Solid experience with AWS and Docker",
      "Prior work with Kubernetes in production",
      "CI/CD design & troubleshooting"
    ],
    benefits: [
      "Flexible hours",
      "Remote Fridays"
    ]
  }
];

let filtered = [...jobData];

function filterJobs() {
  // filter by Job Type
  const types = [];
  if(document.getElementById('ft').checked) types.push('Full Time');
  if(document.getElementById('pt').checked) types.push('Part Time');
  if(document.getElementById('ct').checked) types.push('Contract');
  if(document.getElementById('rt').checked) types.push('Remote');
  // filter by Location
  const locations = [];
  if(document.getElementById('sf').checked) locations.push('San Francisco, CA');
  if(document.getElementById('ny').checked) locations.push('New York, NY');
  if(document.getElementById('ldn').checked) locations.push('London, UK');
  if(document.getElementById('ber').checked) locations.push('Berlin, Germany');
  // filter by Experience
  const levels = [];
  if(document.getElementById('el').checked) levels.push('Entry Level');
  if(document.getElementById('ml').checked) levels.push('Mid Level');
  if(document.getElementById('sl').checked) levels.push('Senior Level');
  filtered = jobData.filter(j =>
    (types.length === 0 || types.includes(j.type) || (types.includes("Remote") && j.location === "Remote")) &&
    (locations.length === 0 || locations.includes(j.location) || (locations.includes("Remote") && j.location === "Remote")) &&
    (levels.length === 0 || levels.includes(j.experience))
  );
  renderJobs();
  // clear detail panel if filter hides active job
  document.getElementById('job-detail').innerHTML = '';
}

function renderJobs() {
  const list = document.getElementById('jobs-list');
  list.innerHTML = filtered.map((j, i) => `
    <div class="job-card" onclick="showDetail(${i})">
      <div class="job-row">
        <span class="job-title">${j.title}</span>
        <span class="job-company">@ ${j.company}</span>
      </div>
      <div class="job-meta">
        <span>${j.location}</span> · 
        <span>${j.type}</span> ·  
        <span>${j.salary}</span>
      </div>
      <div class="job-tags">
        ${j.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
      </div>
      <button class="apply-btn" onclick="event.stopPropagation(); applyJob('${j.title}')">Apply Now</button>
    </div>
  `).join('');
}

function showDetail(idx) {
  const j = filtered[idx];
  if(!j) return;
  document.getElementById('job-detail').innerHTML = `
    <div>
      <span style="color: #3773d3; font-weight:bold;">${j.company}</span>
      <h2 style="margin-top:6px; margin-bottom:6px;">${j.title}</h2>
      <div class="job-salary">${j.salary} <span style="font-size:14px;font-weight:normal;">per year</span></div>
      <b>Job Description</b>
      <div style="margin-bottom:10px;">${j.description}</div>
      <b>Requirements</b>
      <ul>${j.requirements.map(r=>`<li>${r}</li>`).join('')}</ul>
      <b>Benefits</b>
      <ul>${j.benefits.map(r=>`<li>${r}</li>`).join('')}</ul>
      <button class="apply-btn" onclick="applyJob('${j.title}')">Apply for this Position</button>
    </div>
  `;
}

function applyJob(title) {
  alert("Application submitted for " + title + "!");
}

// Initial render
renderJobs();
