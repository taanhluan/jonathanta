import {
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  Gem,
  GraduationCap,
  Handshake,
  Landmark,
  Layers3,
  LineChart,
  MessagesSquare,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "strengths", label: "Strengths" },
  { id: "experience", label: "Experience" },
  { id: "case-studies", label: "Case Studies" },
  { id: "expertise", label: "Domain" },
  { id: "learning", label: "Learning" },
  { id: "highlights", label: "Highlights" },
  { id: "contact", label: "Contact" },
] as const;

export const heroData = {
  name: "Ta Anh Luan",
  nativeName: "Tạ Anh Luân",
  title: "Principal Business Analyst | Product Owner",
  openingLabel: "Principal BA Leadership | Banking & Digital Transformation",
  statement:
    "I help transform complex banking requirements, operational realities, and stakeholder priorities into digital product outcomes that are clear, credible, and delivery-ready.",
  sceneTitle: "Business clarity, product direction, and delivery confidence in high-trust environments.",
  tags: [
    "Banking & BFSI",
    "Digital Product Delivery",
    "Stakeholder Alignment",
    "Requirement Strategy",
  ],
  contextRibbon:
    "Vietnam-based profile with banking and product delivery experience spanning Cambodia contexts and Swiss digital banking collaboration.",
  portrait: {
    src: "ta-anh-luan-avatar.jpg",
    alt: "Ta Anh Luan portrait",
    caption: "Principal BA / Product Owner with BFSI delivery and digital banking experience.",
  },
  ctas: [
    { label: "View Experience", href: "#experience", primary: true },
    { label: "Contact Me", href: "#contact", primary: false },
    { label: "Download CV", href: "Ta-Anh-Luan-CV.pdf", primary: false, download: true },
  ],
  operatingLens: [
    "Translates complex business requirements into structured product direction.",
    "Builds alignment across stakeholders, delivery teams, and business priorities.",
    "Brings calm execution discipline to BFSI and digital banking initiatives.",
  ],
  deliveryArc: [
    {
      step: "01",
      title: "Discover & Align",
      detail: "Clarify goals, constraints, and stakeholder intent before delivery accelerates.",
    },
    {
      step: "02",
      title: "Frame & Prioritize",
      detail: "Shape requirements, refine scope, and create a delivery-ready product narrative.",
    },
    {
      step: "03",
      title: "Enable & Deliver",
      detail: "Support implementation with ongoing clarity, collaboration, and outcome focus.",
    },
  ],
  metrics: [
    { value: "8+", label: "Years across BA, PO, and banking transformation contexts" },
    { value: "BFSI", label: "Domain focus spanning digital banking, process flows, and product enablement" },
    { value: "Cross-Functional", label: "Collaboration across business, delivery, and leadership stakeholders" },
  ],
};

export const aboutData = {
  eyebrow: "Executive Profile",
  title: "A principal-level business and product partner for banking transformation.",
  paragraphs: [
    "Ta Anh Luan is positioned as a senior business and product professional focused on turning ambiguity into actionable delivery direction for banking and financial services teams.",
    "His profile emphasizes calm stakeholder facilitation, requirement discovery, backlog refinement, workflow understanding, and close collaboration with delivery teams to move from business need to product outcome with clarity.",
    "Across digital banking and BFSI environments, he brings a strategic, execution-oriented mindset that balances business value, operational practicality, and implementation readiness.",
  ],
  pillars: [
    "Bridging business stakeholders and product delivery teams",
    "Translating complex requirements into structured initiatives",
    "Supporting product decisions with process and domain insight",
  ],
};

export const strengths = [
  { title: "Business Analysis", description: "Structured elicitation, process discovery, requirement framing, and decision support for complex initiatives.", icon: ClipboardList },
  { title: "Product Ownership", description: "Backlog direction, story clarity, stakeholder alignment, and delivery prioritization with business context.", icon: BriefcaseBusiness },
  { title: "Digital Banking", description: "Experience around banking journeys, workflow orchestration, and transformation of customer-facing capabilities.", icon: Landmark },
  { title: "Requirement Elicitation", description: "Turning stakeholder input into coherent documentation, actionable scope, and delivery-friendly detail.", icon: MessagesSquare },
  { title: "Stakeholder Management", description: "Confident facilitation across business, leadership, SMEs, and engineering counterparts.", icon: Handshake },
  { title: "Agile Delivery", description: "Refinement, prioritization, collaboration rituals, and continuous clarification across iterative delivery cycles.", icon: Layers3 },
  { title: "BFSI Domain", description: "Grounding product and analysis decisions in banking process logic, control awareness, and operational realities.", icon: ShieldCheck },
  { title: "Process Optimization", description: "Identifying friction, simplifying handoffs, and improving business and product workflows.", icon: Route },
  { title: "User Journey Thinking", description: "Balancing operational requirements with clearer customer and user experiences.", icon: Radar },
  { title: "Team Collaboration", description: "Working effectively across disciplines to maintain momentum and shared understanding.", icon: UsersRound },
];

export const experiences = [
  {
    company: "Axon Active Vietnam",
    role: "Product Owner",
    period: "October 2024 - Now",
    location: "Vietnam | Migros Bank (Switzerland)",
    summary:
      "Contributed to digital banking product initiatives for Migros Bank in Switzerland, helping connect business intent with delivery execution in a regulated, high-trust environment.",
    responsibilities: [
      "Directed cross-functional Agile teams to deliver digital banking features and enhancements.",
      "Owned and prioritized the product backlog to align business value, customer needs, and compliance requirements.",
      "Facilitated sprint planning, refinement, reviews, and retrospectives for iterative delivery.",
      "Acted as the primary liaison between bank stakeholders and development teams to maintain alignment and delivery clarity.",
    ],
  },
  {
    company: "BIC Bank Cambodia",
    role: "Senior Business Analyst / Product Owner",
    period: "October 2023 - October 2024",
    location: "Cambodia",
    summary:
      "Supported banking workflow analysis, business requirement discovery, and product/process improvement initiatives with close coordination between business and solution teams.",
    responsibilities: [
      "Led backlog prioritization and sprint planning across digital and corporate banking initiatives.",
      "Defined KPIs, supported stakeholder engagement, and aligned business goals with delivery execution.",
      "Contributed to AML integration, centralized payment hub rollout, and banking platform coordination.",
      "Bridged business requirements, process analysis, and product support in a regulated banking context.",
    ],
  },
  {
    company: "FPT Software",
    role: "Project Manager - Scrum Master",
    period: "April 2022 - November 2022",
    location: "US, UK, India | B2C E-Commerce, Manufacturing",
    summary:
      "Managed Agile and hybrid delivery across B2C e-commerce and manufacturing projects, coordinating scopes, schedules, budgets, teams, and customer communication across US, UK, and India working environments.",
    responsibilities: [
      "Communicated project scope, schedules, and budgets with customers and contractors.",
      "Prepared Jira and Excel financial reports including billing, overhead, and rate calculations.",
      "Defined schedules, allocated resources, monitored progress, and supported a 40+ member team.",
      "Resolved cross-functional issues across BA, QA, and development teams to keep deliverables on time.",
    ],
  },
  {
    company: "Xebia Group - ABBank Project",
    role: "Senior Business Analyst",
    period: "November 2022 - October 2023",
    location: "Vietnam | ABBank Digital Corporate Banking",
    summary:
      "Led analysis for ABBank digital corporate banking using Backbase and T24 platforms, supporting digital transformation, platform integration, organizational agility, and customer experience improvement.",
    responsibilities: [
      "Analyzed industry dynamics, business models, and emerging technologies for digital transformation planning.",
      "Oversaw Backbase and T24 integration to support functionality and data flow.",
      "Conducted workshops for value-stream improvement, technology adoption, and leadership effectiveness.",
      "Delivered key functionality including lending solutions, eKYC, and transaction banking services.",
    ],
  },
  {
    company: "Amaris Consulting - Mantu Group",
    role: "Senior Business Analyst - Scrum Master",
    period: "January 2021 - April 2022",
    location: "US, UK, Hong Kong, Singapore, India, France, Australia",
    summary:
      "Supported insurance digital transformation as a Senior Business Analyst and Scrum Master, combining requirement analysis, functional documentation, testing, UAT, team coordination, and data migration support.",
    responsibilities: [
      "Collected business requirements and produced functional specifications for development teams.",
      "Supported testing, UAT, analysis, development, implementation, and project monitoring.",
      "Coordinated multidisciplinary teams while defining methods, standards, and delivery procedures.",
      "Managed communication across project levels and supported data migration continuity.",
    ],
  },
  {
    company: "JACCS Financial Group",
    role: "Senior Business Analyst",
    period: "August 2020 - January 2021",
    location: "Japan, US | Financial Digital Transformation",
    summary:
      "Supported financial digital transformation for JACCS International Vietnam Finance, working across change requests, requirement assessment, vendor clarification, solution implementation, testing, and data migration.",
    responsibilities: [
      "Analyzed project assignments, change requests, and business division requirements.",
      "Clarified requirement specifications with vendors and relevant divisions.",
      "Built test scenarios, project plans, and solution assessments for card-business change requests.",
      "Coordinated with business divisions to keep implementation timelines on track.",
    ],
  },
  {
    company: "Innotech",
    role: "Senior Business Analyst",
    period: "May 2020 - August 2020",
    location: "Vietnam | Financial Digital Transformation",
    summary:
      "Supported a short-term startup digital transformation project by defining business needs, managing stakeholder alignment, shaping feasible solution scope, and maintaining product backlog clarity.",
    responsibilities: [
      "Gathered, organized, and synthesized stakeholder requirements from multiple sources.",
      "Defined business needs, problems, risks, and feasible solution scope.",
      "Converted business needs into functional designs and business requirement documents.",
      "Ensured the team understood product requirements, backlog priorities, and quality expectations.",
    ],
  },
  {
    company: "Home Credit",
    role: "Project Coordinator / Business Analyst",
    period: "June 2018 - May 2020",
    location: "EU | Financial Digital Transformation",
    summary:
      "Coordinated and analyzed financial digital transformation work around EPIC application configuration, software requirements, workflow analysis, configuration testing, implementation, and technology transfer.",
    responsibilities: [
      "Translated business requirements into EPIC application configuration and software specifications.",
      "Executed configuration test plans and resolved configuration issues.",
      "Analyzed workflows, data collections, reports, and technical issues tied to application use.",
      "Supported release evaluation, system updates, data migration, and technology transfer in Prague.",
    ],
  },
  {
    company: "Maersk Line",
    role: "Technical Support",
    period: "April 2017 - June 2018",
    location: "Technology Product Portfolios",
    summary:
      "Supported Maersk technology risk operations by helping integrate IT operational risk management across product portfolios, risk registers, reporting, quality checks, and stakeholder coordination.",
    responsibilities: [
      "Triaged incoming risk requests and translated them into Maersk's central risk register.",
      "Supported risk capture, assessment, remediation tracking, and escalation activities.",
      "Prepared reports, meeting content, action tracking, and quality checks for risk assessments.",
      "Built relationships with product and platform stakeholders while improving risk-management awareness.",
    ],
  },
  {
    company: "Freelancer",
    role: "Freelancer",
    period: "2014 - 2016",
    location: "Vietnam",
    summary:
      "Built an early independent working foundation while studying Network Engineering and Information Technology, developing self-management, client communication, and practical delivery habits.",
    responsibilities: [
      "Managed independent work directly with clients from request clarification to delivery.",
      "Built early habits around communication, ownership, and expectation management.",
      "Learned to translate loosely defined needs into practical work outputs.",
      "Established the first layer of delivery confidence used in later corporate roles.",
    ],
  },
];

export const experienceSceneEntries = [
  {
    company: "Axon Active Viet Nam",
    role: "Product Owner",
    period: "October 2024 - Now",
  },
  {
    company: "BIC Bank Cambodia",
    role: "Senior Business Analyst / Product Owner",
    period: "October 2023 - October 2024",
  },
  {
    company: "Xebia Group - ABBank Project",
    role: "Senior Business Analyst",
    period: "November 2022 - October 2023",
  },
  {
    company: "FPT Software",
    role: "Project Manager - Scrum Master",
    period: "April 2022 - November 2022",
  },
  {
    company: "Amaris Consulting - Mantu Group",
    role: "Senior Business Analyst - Scrum Master",
    period: "January 2021 - April 2022",
  },
  {
    company: "JACCS Financial Group",
    role: "Senior Business Analyst",
    period: "August 2020 - January 2021",
  },
  {
    company: "Innotech",
    role: "Senior Business Analyst",
    period: "May 2020 - August 2020",
  },
  {
    company: "Home Credit",
    role: "Project Coordinator / Business Analyst",
    period: "June 2018 - May 2020",
  },
  {
    company: "Maersk Line",
    role: "Technical Support",
    period: "April 2017 - June 2018",
  },
  {
    company: "Freelancer",
    role: "Freelancer",
    period: "2014 - 2016",
  },
] as const;

export const caseStudies = [
  {
    title: "Digital Banking Experience Transformation",
    context: "A banking product environment needed stronger alignment between customer-facing priorities and delivery planning.",
    challenge: "Requirements were evolving quickly across multiple stakeholders, creating risk around scope clarity and shared decision-making.",
    actions:
      "Facilitated requirement clarification, structured backlog conversations, and translated business priorities into delivery-ready product direction.",
    outcome: "Improved planning confidence, clearer refinement flow, and stronger collaboration between business and implementation teams.",
    skills: ["Backlog management", "Requirement analysis", "Stakeholder alignment", "Agile collaboration"],
  },
  {
    title: "Banking Workflow Optimization",
    context: "Operational processes within a banking context required better visibility and more efficient handoffs.",
    challenge: "Existing workflows contained friction points, fragmented understanding, and avoidable complexity across teams.",
    actions:
      "Mapped process flows, surfaced bottlenecks, and supported structured requirement definition for workflow improvements.",
    outcome: "More coherent business flow understanding, reduced ambiguity, and a clearer path from analysis to solution design.",
    skills: ["Process analysis", "Business workshops", "Documentation", "Cross-team collaboration"],
  },
  {
    title: "Customer Journey Improvement Initiative",
    context: "A digital product stream needed better continuity between user expectations and banking service delivery logic.",
    challenge: "Customer journey decisions needed to respect banking constraints while still improving usability and clarity.",
    actions:
      "Connected user journey thinking with domain requirements, business rules, and implementation discussions.",
    outcome: "Sharper prioritization of experience improvements grounded in feasible delivery and business value.",
    skills: ["Journey mapping", "Product thinking", "Domain translation", "Prioritization"],
  },
  {
    title: "Requirement-to-Delivery Product Enablement",
    context: "Product delivery teams needed more actionable requirement inputs to maintain momentum across iterations.",
    challenge: "Stakeholder expectations, delivery realities, and requirement quality were not always aligned at the right level of detail.",
    actions:
      "Created clearer requirement structures, refined acceptance expectations, and strengthened ongoing delivery collaboration.",
    outcome: "Better story readiness, smoother team communication, and improved delivery confidence.",
    skills: ["User stories", "Refinement", "Acceptance clarity", "Delivery support"],
  },
  {
    title: "Cross-Functional Product Alignment for BFSI",
    context: "A BFSI initiative required business, product, and technical teams to stay synchronized under changing priorities.",
    challenge: "Without a strong translation layer, strategic intent risked being diluted during execution.",
    actions:
      "Served as a strategic bridge across stakeholders, clarifying objectives, assumptions, and practical delivery implications.",
    outcome: "Stronger alignment around outcomes, clearer communication, and healthier cross-functional execution rhythm.",
    skills: ["Facilitation", "Decision support", "BFSI context", "Cross-functional leadership"],
  },
];

export const expertiseAreas = [
  { title: "Digital Banking", detail: "Customer journeys, service enablement, and digital channel thinking in banking environments.", icon: Building2 },
  { title: "BFSI Processes", detail: "Operational flow awareness, regulated context, and process sensitivity for financial services delivery.", icon: ShieldCheck },
  { title: "Product Discovery", detail: "Finding the right problem framing before delivery starts moving at speed.", icon: Target },
  { title: "Requirement Analysis", detail: "Breaking complexity into structured, communicable, and implementable requirements.", icon: Gem },
  { title: "Prioritization", detail: "Balancing business value, delivery capacity, and stakeholder urgency with discipline.", icon: LineChart },
  { title: "Delivery Collaboration", detail: "Working closely with teams to keep scope, context, and execution aligned.", icon: Sparkles },
];

export const learningData = {
  certifications: [
    { title: "TOEIC Certificate", meta: "Score 800 | 2014" },
    { title: "PMP Exam Prep Seminar", meta: "2022" },
    {
      title: "Beginning Project Management: Project Management Level One",
      meta: "2022",
    },
    { title: "Scrum Certification", meta: "2022" },
    { title: "Fundamentals of Agile", meta: "2022" },
  ],
  learning: [
    "Continuous upskilling across Agile delivery, Scrum practice, and project leadership foundations.",
    "Ongoing development in digital banking, requirement quality, stakeholder communication, and product thinking.",
    "Focused learning around structured delivery, business alignment, and outcome-oriented product execution.",
  ],
  mentoring: [
    "Open to sharing practical BA knowledge, banking domain context, and requirement thinking with peers.",
    "Experienced in collaborative working environments that value coaching, alignment, and cross-functional enablement.",
  ],
  credentialsLink: "https://www.linkedin.com/in/taanhluan/",
};

export const highlights = [
  { value: "Banking-first", label: "Strong positioning in BFSI and digital banking transformation conversations" },
  { value: "Strategic translator", label: "Connects business needs, process logic, and product delivery decisions" },
  { value: "Execution calm", label: "Brings clarity, structure, and disciplined communication under complexity" },
  { value: "Leadership by alignment", label: "Builds momentum through collaboration, shared context, and prioritization" },
];

export const achievementCards = [
  "Trusted to navigate complex stakeholder conversations in banking and product environments.",
  "Able to convert ambiguity into structured direction that delivery teams can execute confidently.",
  "Brings executive-friendly communication without losing operational detail.",
  "Balances business impact, user experience, and implementation practicality.",
];

export const contactData = {
  email: "taanhluan@gmail.com",
  linkedin: "https://www.linkedin.com/in/taanhluan/",
  portfolio: "https://taanhluan.github.io/JonathanTa",
};
