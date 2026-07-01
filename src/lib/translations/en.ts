export const en = {
  lang: "en",
  langLabel: "EN",
  langFull: "English",

  nav: {
    items: ["Home","Services","About","Technology","Pricing","Contact"],
    links: ["/","leistungen","ueber-uns","technologie","preise","kontakt"],
    cta: "Get Started / Login",
  },

  top: { addr:"Zurich, Switzerland", phone:"+41 XX XXX XX XX", email:"support@jerumed-nexus.ch" },

  finalCta: {
    tag:"Contact",
    title:"Ready for better\npractice IT?",
    btn:"Request a consultation →",
  },

  hero: {
    pre:"We provide professional",
    h1:"IT Services",
    post:"for Medical Practices in Switzerland",
    p:"Custom IT solutions, secure infrastructure, and advanced automation designed to optimize performance for medical practices and the Swiss healthcare sector.",
    btn1:"Learn More", btn2:"Get in Touch",
    quote:"Get a\nQuote",
  },

  highlights: [
    { t:"IT Security & Compliance", d:"FMH IT-Grundschutz audits, DSG compliance, firewalls and endpoint protection for medical practices." },
    { t:"Network & Infrastructure", d:"VLAN segmentation, OPNsense firewall, WireGuard VPN for multi-site practices." },
    { t:"Practice Software Integration", d:"tomedo EMR, online booking, nexus-connect and laboratory middleware connectivity." },
  ],

  about: {
    tag:"ABOUT US",
    title:"Intelligent IT Solutions\nfor Modern Medical Practices",
    p:"Jerumed Nexus bridges a gap in Swiss healthcare: medical practices need IT partners who understand not just the technology, but also the medical processes and regulatory requirements. Our founder brings years of experience integrating medical systems.",
    values:["Medical Expertise","Technical Excellence","Swiss Quality","Proactive Service","Privacy-First","Sustainable Growth"],
    cards:[
      { t:"Swiss Hosted & DSG-Compliant", d:"All data stays in Switzerland. We follow FMH IT-Grundschutz standards." },
      { t:"Single Point of Contact", d:"No ticket queues. Direct access to the technician who knows your setup." },
    ],
  },

  stats: [
    { n:"11", l:"Service Areas" }, { n:"6+", l:"Practice Locations" },
    { n:"24/7", l:"Monitoring & Support" }, { n:"100%", l:"Swiss Hosted" },
  ],

  partners: {
    title:"Technologies and partners trusted\nby medical practices across Switzerland",
    logos:["tomedo","vitomed","Axenita","AESKULAP","HIN","MediData","Viollier","Ärztekasse","BlueCare","Doctolib","OneDoc","FMH","Swisscom Health","Sysmex","Roche"],
  },

  compliance: {
    tag:"CERTIFICATIONS & STANDARDS",
    title:"Highest security standards\nfor your practice",
    badges:[
      { icon:"🛡", t:"FMH IT-Grundschutz", d:"Certified per FMH D1/D2/D3 requirements." },
      { icon:"🔒", t:"nDSG-Compliant", d:"New Swiss Data Protection Act since Sept. 2023." },
      { icon:"🇨🇭", t:"Swiss Hosted", d:"All data on Swiss servers only." },
      { icon:"🏥", t:"EPD-Ready", d:"Prepared for the electronic patient record." },
      { icon:"🔐", t:"End-to-End Encryption", d:"For all patient data and channels." },
      { icon:"📋", t:"GDPR-Compliant", d:"EU data protection for cross-border data." },
    ],
  },

  process: {
    tag:"HOW WE WORK",
    title:"Our proven 4-step process",
    steps:[
      { n:"01", t:"Analysis", d:"We analyze your existing IT infrastructure, identify vulnerabilities and understand your practice workflows." },
      { n:"02", t:"Concept", d:"We create a tailored IT plan with clear priorities, timeline and transparent cost planning." },
      { n:"03", t:"Implementation", d:"We implement the solution with minimal disruption — including migration, training and testing." },
      { n:"04", t:"Support", d:"Proactive 24/7 monitoring, regular maintenance, updates and personal support — ongoing." },
    ],
  },

  techDiagram: {
    tag:"ARCHITECTURE",
    title:"How we protect your practice",
    note:"↑ Every layer is configured, secured and monitored by us ↑",
    layers:[
      { t:"Endpoints & Devices" },{ t:"Application Layer" },{ t:"Server & Database" },
      { t:"Network & Security" },{ t:"Medical Systems" },{ t:"Lab Devices & Diagnostics" },
    ],
  },

  services: {
    learnMore:"LEARN MORE",
    tag:"WHAT WE OFFER",
    title:"IT Services for\nthe Healthcare Sector",
    sub:"From practice software to IT security — every service from a single partner.",
    allBtn:"All services →",
    items:[
      { slug:"it-sicherheit", t:"Cybersecurity & Compliance", d:"Comprehensive security audits, penetration testing, vulnerability assessments, firewall management, EDR, SIEM integration, and FMH IT-Grundschutz, DSG and GDPR compliance." },
      { slug:"netzwerk", t:"Network & Infrastructure", d:"Enterprise network design with VLAN segmentation, SD-WAN, redundant connections, Wi-Fi planning, structured cabling, OPNsense/WireGuard VPN for multi-site practices." },
      { slug:"server-cloud", t:"Cloud & Server Management", d:"Hybrid cloud strategies, managed hosting on Swiss data centers, virtualization, container orchestration, automated deployments, SSL/DNS management and proactive 24/7 monitoring." },
      { slug:"praxissoftware", t:"Practice Software & EMR", d:"Integration and support for leading practice information systems including tomedo, vitomed, Axenita and AESKULAP. Online booking, Viollier V-Box, swissdamed, e-prescription and EPD readiness." },
      { slug:"labor", t:"Laboratory & Medtech", d:"Middleware development for analyzer connectivity (Sysmex, Cobas, Seamaty, LOC-200) via HL7, ASTM and FHIR. LOINC mapping, POCT integration and data transfer validation." },
      { slug:"kommunikation", t:"Communication & Collaboration", d:"Professional email with SPF/DKIM/DMARC, VoIP telephony (3CX), unified communications, encrypted messaging, video conferencing and secure patient communication." },
      { slug:"backup", t:"Data Protection & Business Continuity", d:"Multi-tier 3-2-1 backup strategies, disaster recovery planning, encrypted off-site backups, automated restore testing, ransomware protection and documented emergency plans." },
      { slug:"website", t:"Digital Presence & Marketing", d:"Professional practice websites with Next.js or WordPress, local SEO, Google Business optimization, social media, promotional videos, branding, digital signage." },
      { slug:"managed-it", t:"Managed IT Services", d:"Proactive IT management with remote and on-site support, automated patch management, hardware lifecycle management, license administration, monthly reports." },
      { slug:"beratung", t:"IT Consulting & Transformation", d:"Strategic IT planning for new practice openings, infrastructure audits, technology roadmaps, budget planning, vendor management and digital transformation guidance." },
      { slug:"telemedizin", t:"Telemedicine & Digital Health", d:"Telemedicine platforms, video consultation solutions, remote patient monitoring, digital health application integration and DigiSanté readiness." },
      { slug:"schulung", t:"Training & Awareness", d:"Tailored IT training for practice teams, cybersecurity awareness programs, phishing simulations, new staff onboarding and IT process documentation." },
    ],
  },

  checklist: {
    tag:"SECURITY CHECK",
    title:"Is your practice IT secure?",
    sub:"Answer 6 questions — find out where action is needed.",
    items:[
      "Do you have a professional firewall (not just the router)?",
      "Are backups regularly tested and stored off-site?",
      "Is your Wi-Fi separated from the practice network (VLAN)?",
      "Have all staff received phishing awareness training?",
      "Are your emails protected with SPF, DKIM and DMARC?",
      "Is there a documented emergency plan for cyber attacks?",
    ],
    result:{ good:"Excellent! Your IT security looks solid.", warn:"There's room for improvement — we can help.", bad:"Urgent action needed! Contact us now." },
    cta:"Request free security check",
  },

  pricing: {
    tag:"OUR PACKAGES",
    title:"Tailored Solutions\nfor Your Practice",
    sub:"Choose from our professional packages or contact us for a custom solution.",
    btn:"Learn More",
    plans:[
      { tag:"CREATION", name:"Digital Presence", price:"On Request", prefix:"", unit:"", features:["Website creation from scratch","Branding & logo design","Social media setup","Content creation","SEO optimization","Responsive design"] },
      { tag:"INTEGRATION", name:"Lab Integration", price:"On Request", prefix:"", unit:"", features:["Lab box installation","Tomedo integration & configuration","Twilio automation setup","Firewall installation & configuration","Output normalization","Network optimization"], featured:true },
      { tag:"BUSINESS", name:"Enterprise Bundle", price:"Custom", prefix:"", unit:"", features:["Everything in Digital Presence","Everything in Lab Integration","Dedicated project manager","Premium support","Custom infrastructure","Full-stack consulting"] },
    ],
    getStarted:"Request a quote",
    vatNote:"*Individual terms available upon request",
  },

  sla: {
    uptimeLabel:"UPTIME GUARANTEE",
    tag:"SERVICE LEVEL AGREEMENT",
    title:"Guaranteed response times",
    items:[
      { t:"Critical", time:"1 Hour", d:"Server down, data loss, cyber attack", color:"#ef4444" },
      { t:"High", time:"4 Hours", d:"Email outage, network issues", color:"#f59e0b" },
      { t:"Normal", time:"8 Hours", d:"Software updates, configuration", color:"#22c55e" },
      { t:"Planned", time:"Scheduled", d:"Migrations, hardware, training", color:"#2563EB" },
    ],
    guarantee:"99.9% uptime guarantee on all managed IT contracts",
  },

  team: {
    tag:"OUR TEAM",
    title:"The experts behind\nJerumed Nexus",
    members:[
      { name:"A. Abuawad", role:"Founder & CEO", desc:"Specialist in medical IT integration, network architecture and system administration.", img:"AA", photo:"/team/doc2.jpeg" },
      { name:"IT Security", role:"Cybersecurity Consultant", desc:"External specialist for penetration testing, FMH audits and incident response.", img:"CS", photo:"" },
      { name:"Abdelilah Ismaili Alaoui", role:"DevOps & Web Developer", desc:"Responsible for DevOps, cloud infrastructure, automation and building your web platforms.", img:"AI", photo:"/team/1757854645138.jpeg" },
      { name:"Support", role:"Technical Support", desc:"Your direct contact for daily IT operations at your practice.", img:"TS", photo:"" },
    ],
  },

  tools: {
    tag:"OUR TOOLS & SOFTWARE",
    title:"Professional software for\nreliable IT operations",
    items:["TeamViewer","AnyDesk","RustDesk","Docker","Kubernetes","Caddy","IONOS","Plesk","OPNsense","WireGuard","Ubuntu","3CX","WordPress","Figma","GitHub","Grafana","Let's Encrypt","Postfix"],
    groups:[
      { cat:"Remote Support", val:"TeamViewer · AnyDesk · RustDesk" },
      { cat:"Containers & Hosting", val:"Docker · Kubernetes · IONOS · Plesk" },
      { cat:"Server & Web", val:"Ubuntu · Caddy · WordPress" },
      { cat:"Security & Network", val:"OPNsense · WireGuard · Let's Encrypt" },
      { cat:"Communication & Email", val:"3CX · Postfix" },
      { cat:"Monitoring & Tools", val:"Grafana · GitHub · Figma" },
    ],
  },

  emergency: {
    label:"IT EMERGENCY?",
    title:"IT emergency at your practice?",
    sub:"Server down, cyber attack or data loss? Our emergency team is ready.",
    phone:"+41 XX XXX XX XX", btn:"Report emergency", note:"Mon–Fri 07:00–22:00 · Sat 08:00–18:00",
  },

  ctaBanner: {
    title:"Begin Your IT\nConsultation Today",
    p:"Book a free initial consultation and discover how we can optimize your practice IT infrastructure.",
    btn:"Get Started",
  },

  help: {
    tag:"NEED MORE HELP?",
    title:"Reach Out For Professional\nTechnical Assistance",
    p:"Contact our team for expert guidance and reliable technical support tailored to your practice needs.",
    phone:{ label:"SALES SUPPORT", value:"+41 XX XXX XX XX" },
    email:{ label:"EMAIL SUPPORT", value:"support@jerumed-nexus.ch" },
    exp:{ n:"10+", l:"Years of Experience" },
  },

  features: [
    { t:"Medical Expertise", d:"tomedo, HL7, TARMED and practice workflows." },
    { t:"Security & Reliability", d:"FMH IT-Grundschutz, DSG-compliant, 24/7 monitoring." },
    { t:"Partnership Approach", d:"One point of contact for all your IT needs." },
    { t:"Swiss Quality", d:"Swiss hosted, local data storage, GDPR-compliant." },
  ],

  newsletter: { title:"Stay Informed About\nHealthcare IT Trends", placeholder:"Enter your email", btn:"SUBSCRIBE NOW" },

  contact: {
    tag:"CONTACT",
    title:"Talk to us",
    sub:"We look forward to hearing from you. Fill out the form or contact us directly.",
    form:{ name:"Name", email:"Email", phone:"Phone", company:"Practice name", message:"Your message", service:"Desired service", send:"Send message" },
    infoTitle:"Contact info",
    responseTitle:"Response times",
    priorities:[
      { label:"Critical", time:"≤ 1 h" },
      { label:"High",     time:"≤ 4 h" },
      { label:"Normal",   time:"≤ 8 h" },
    ],
    successTitle:"Message sent!",
    successSub:"We'll get back to you within 24 hours.",
    errorMsg:"Something went wrong. Please try again.",
    sending:"Sending…",
  },

  liveChat: {
    title:"Live Support Chat",
    subtitle:"Talk directly with our support team",
    description:"Get instant answers to your questions. Our team is available Mon–Fri 07:00–22:00.",
    onlineStatus:"Our team is online",
    offlineStatus:"We're offline right now",
    hours:"Mon–Fri: 07:00–22:00 · Sat: 08:00–18:00",
    startChat:"Start chat",
    registerChat:"Create account & chat",
    or:"or",
    noAccount:"No account? Sign up quickly.",
    liveNow:"Live now available",
  },

  servicePageCta: {
    title:"Get in touch",
    sub:"Schedule a free initial consultation.",
    btn:"Get in touch →",
  },

  footer: {
    desc:"We build secure IT infrastructure, medical software integration, and cloud solutions for medical practices in Switzerland.",
    cols:["Solutions","Support","Company"],
    l1:["IT Security","Network","Server & Cloud","Practice Software","Lab Middleware","Managed IT"],
    l2:["Help Center","Contact Support","System Status","Privacy","SLA"],
    l3:["About Us","Careers","Contact","Blog"],
    copy:"© 2026 Jerumed Nexus. All rights reserved.",
    legal:["Privacy Policy","Cookie Policy","Terms of Service","Sitemap"],
  },

  pages: {
    legalTag:"Legal",
    notFound:"Page not found",
    about: {
      heroTitle:"About Jerumed Nexus",
      heroSub:"Where healthcare meets technology",
      story:{ tag:"OUR STORY", title:"Founded on experience,\nbuilt on trust",
        p1:"Jerumed Nexus was born from direct experience with the IT challenges of medical practices in Switzerland. Our founder has worked for years integrating medical systems — from laboratory connectivity to EMR configuration to network architecture.",
        p2:"Today we offer a complete IT services portfolio specifically tailored to the requirements of the Swiss healthcare sector. We understand not just the technology, but also the medical processes, regulatory requirements and daily practice operations.",
      },
      mission:{ tag:"MISSION", title:"Our Mission", p:"To empower Swiss medical practices with reliable, secure and modern IT infrastructure — so that doctors can focus on their patients." },
      vision:{ tag:"VISION", title:"Our Vision", p:"To become the leading specialized IT partner for medical practices in Switzerland, recognized for technical excellence and proactive service." },
      stats:[
        { n:"5+", l:"clinics under management" },
        { n:"60+", l:"medical staff supported" },
        { n:"99.9%", l:"uptime target" },
        { n:"100%", l:"Swiss-hosted data" },
        { n:"24/7", l:"monitoring" },
      ],
      pillars:{
        tag:"WHAT WE DO",
        title:"Four pillars of practice IT",
        items:[
          { title:"Secure IT Infrastructure", desc:"Firewalls, network segmentation, VPN and endpoint protection engineered for medical practices. We build resilient, monitored infrastructure that keeps your practice running." },
          { title:"Medical Software Integration", desc:"tomedo, lab middleware, HIN and EPD connectivity, integrated end to end. We speak both HL7 and the daily reality of your practice." },
          { title:"Automation & AI for Practices", desc:"Workflow automation and multilingual AI voice agents that take routine work off your team. From appointment booking to lab-result routing." },
          { title:"Compliance & Security", desc:"nDSG, revDSG and FMH-aligned processes with encryption and audit logging by default. Security is built in, not bolted on." },
        ],
      },
      journey:{
        tag:"OUR JOURNEY",
        title:"How we got here",
        items:[
          { title:"Years of practice IT experience", text:"Hands-on work integrating medical systems across Swiss practices — labs, EMRs, networks and everything in between." },
          { title:"Jerumed clinic network launch", text:"Supporting a growing group of clinics gave us deep insight into how medical practices actually run day to day." },
          { title:"Infrastructure standardization", text:"We standardized hosting, backups, monitoring and security into a repeatable, Swiss-hosted stack." },
          { title:"AI voice agents in production", text:"Multilingual voice agents went live, handling reception workflows and freeing staff for patient care." },
          { title:"Jerumed Nexus launched", text:"We packaged years of experience into a dedicated IT partner for medical practices across Switzerland." },
        ],
      },
      why:{
        tag:"WHY JERUMED NEXUS",
        title:"What sets us apart",
        items:[
          { title:"Swiss-hosted by default", text:"Your data stays in Switzerland, on Swiss infrastructure. Data residency isn't an add-on — it's the default." },
          { title:"Medical-first, not IT-first", text:"We start from clinical workflows and regulation, then apply the technology. You get IT that fits medicine, not the other way around." },
          { title:"Open source where it matters", text:"We favour transparent, auditable open-source tools over black boxes. No lock-in, no hidden dependencies." },
          { title:"Modern DevOps discipline", text:"CI/CD, infrastructure as code, monitoring and tested backups on every project. The reliability of a modern software team." },
          { title:"AI & automation as standard", text:"Voice agents and workflow automation are part of the toolkit, not a costly extra. We automate the routine so your team doesn't have to." },
          { title:"One partner, full stack", text:"From firewall to website to AI agent — one accountable partner. No finger-pointing between vendors." },
        ],
      },
      compliance:{
        tag:"COMPLIANCE & STANDARDS",
        title:"Built to Swiss standards",
        badges:["nDSG / revDSG","EQUAM-ready","FMH audit-aligned","HIN-compatible","Swiss data residency","ISO 27001-aligned practices"],
        disclaimer:"Jerumed Nexus operates in alignment with these frameworks. Individual certifications may apply to specific engagements.",
      },
      team:{
        tag:"OUR TEAM",
        title:"The people behind Jerumed Nexus",
        members:[
          { role:"Founder & CEO", bio:"Founder of Jerumed Nexus with years of experience integrating medical systems for Swiss practices. Specialises in network architecture, system administration and medical IT. Bridges the gap between clinical needs and technical solutions." },
          { role:"Cybersecurity Consultant", bio:"External specialist for penetration testing, FMH audits and incident response. Keeps practice infrastructure hardened against modern threats. Ensures compliance stays audit-ready." },
          { role:"DevOps & Web Developer", bio:"Responsible for DevOps, cloud infrastructure and automation across the platform. Builds and ships the bilingual web platforms and CI/CD pipelines. Focused on reliability, security and modern developer practices." },
          { role:"Technical Support", bio:"Your direct contact for daily IT operations. Handles remote and on-site support so your practice never skips a beat. Fast, friendly and practice-aware." },
        ],
      },
      partners:{
        tag:"PARTNERS & ECOSYSTEM",
        title:"Who we work with",
        groups:{ hosting:"Hosting Partners", software:"Medical Software Partners", network:"Network" },
      },
      testimonials:{
        tag:"CASE NOTES",
        title:"In their words",
        items:[
          { quote:"Deployed a bilingual clinic website with Schema.org medical markup and full SEO — organic traffic up significantly within 6 months.", attribution:"Jerumed clinic network, Switzerland" },
          { quote:"Migrated AI voice agent infrastructure from US Google Cloud to Swiss Infomaniak VPS for nDSG compliance — zero patient data leaves Switzerland.", attribution:"JeruHealth GmbH" },
        ],
      },
      cta:{
        tag:"GET STARTED",
        title:"Let's build your practice IT",
        primary:"Book a discovery call",
        secondary:"See our packages",
      },
    },
    technology: {
      heroTitle:"Technology Stack",
      heroSub:"Enterprise-grade. Open Source. Transparent.",
      stack:[
        { cat:"Frontend", val:"Next.js · React · TypeScript · Tailwind CSS" },
        { cat:"Backend", val:"Node.js · Go · Python" },
        { cat:"Database", val:"PostgreSQL · Prisma ORM · Automated Backups" },
        { cat:"Server & Cloud", val:"Ubuntu · Caddy · Cloud Hosting · systemd" },
        { cat:"Containers & Orchestration", val:"Docker · Kubernetes · Docker Compose" },
        { cat:"Security", val:"OPNsense · WireGuard · TLS · SPF/DKIM" },
        { cat:"Monitoring", val:"Uptime Kuma · Zabbix · Grafana" },
        { cat:"Medical & Integration", val:"HL7 · ASTM · LOINC · tomedo · 3CX" },
      ],
      capabilities:{
        tag:"CAPABILITIES & MODULES",
        title:"What we can build\nfor your practice",
        sub:"A modular portfolio of specialised solutions for Swiss healthcare — from patient engagement through clinical systems to compliance and operations.",
        groups:[
          { label:"Patient Experience", items:[
            { title:"Online Appointment Booking & Patient Portal", desc:"Branded self-service booking integrated with your PMS (tomedo and others) — waiting-room displays, automated SMS/email reminders, and patient-managed rescheduling and cancellation." },
            { title:"E-Prescription & Medication Refills", desc:"Secure online medication-ordering with HIN-compatible signing, fully integrated into your practice management system." },
            { title:"Telemedicine & Video Consultation", desc:"Swiss-hosted video consultations for follow-ups, coaching, and pre-travel checks — a data-resident alternative to international platforms." },
            { title:"AI Voice Agent for Reception", desc:"Multilingual (DE/FR/IT/EN) phone agent that books appointments, routes triage, handles refill requests, and manages emergency callback queues." },
            { title:"Practice Website, SEO & Multilingual Content", desc:"Professionally built, multilingual practice websites with search optimisation and ongoing content — your complete digital presence." },
          ]},
          { label:"Clinical Systems & Integration", items:[
            { title:"PACS & Ultrasound Imaging Storage", desc:"DICOM-compatible medical imaging storage hosted in Switzerland, built for high-volume ultrasound and radiology." },
            { title:"OR / Minor-Surgery Compliance Pack", desc:"Digital sterilisation logs, instrument tracking, and device-register integration — EQUAM-aligned for surgical practices." },
            { title:"HIN & mediX Network Integration", desc:"Connectors for the mediX Gesundheitsdossier, e-Mediplan, HIN mail, and hospital referral-letter workflows." },
          ]},
          { label:"Security, Identity & Compliance", items:[
            { title:"Group-Practice Identity & Access", desc:"Single sign-on, role-based access (physician / MPA / specialist / external consultant), 2FA, and audit logs aligned with nDSG and FMH requirements." },
            { title:"Compliance Pack: nDSG · revDSG · EQUAM", desc:"Documented processes, DPIA templates, ISMS-lite, backup/restore drills, and an incident-response runbook to keep your certifications current." },
            { title:"Cybersecurity Bundle for Practices", desc:"Phishing simulations, staff security training, endpoint protection, and FMH-aligned annual penetration testing." },
          ]},
          { label:"Operations & Resilience", items:[
            { title:"24/7 Managed Monitoring & On-Call SLA", desc:"Round-the-clock infrastructure monitoring with contractual response times — 1h during business hours, 4h after-hours." },
            { title:"Backup & Disaster Recovery (Swiss-hosted)", desc:"Daily encrypted backups, geo-redundant copies within Switzerland, quarterly tested restores, and contractual RPO/RTO commitments." },
            { title:"Workflow Automation for Practices", desc:"Automated patient onboarding, lab-result routing, no-show follow-up, recall campaigns (vaccination, screening), and insurance pre-authorisation." },
            { title:"Inventory & Cold-Chain Monitoring", desc:"IoT temperature sensors with real-time alerts for vaccine and medication storage — built for travel medicine and pediatrics." },
          ]},
        ],
      },
    },
    impressum: { title:"Imprint", company:"Jerumed Nexus", address:"[Address to be added]", email:"support@jerumed-nexus.ch", phone:"+41 XX XXX XX XX" },
    datenschutz: { title:"Privacy Policy", intro:"Protecting your personal data is important to us. This privacy policy informs you about how we process personal data when you use our website.", note:"This page is being finalized." },
  },

  servicePages: {
    "it-sicherheit": { title:"Cybersecurity & Compliance", heroSub:"Protect your practice from cyber threats — with security solutions that meet Swiss standards.",
      sections:[
        { t:"What is IT Security in Healthcare?", p:"IT security in healthcare encompasses all technical and organizational measures to protect patient data, medical systems and practice infrastructure from unauthorized access, data loss and cyber attacks." },
        { t:"Why is Cybersecurity Important for Practices?", p:"Medical practices are increasingly targeted by cyber attacks. Ransomware, phishing and data breaches can paralyze practice operations and destroy patient trust." },
        { t:"Our Services", items:["FMH IT-Grundschutz security audits","Penetration testing","Firewall management","Endpoint Detection & Response","SIEM integration","Phishing simulations","Incident response planning","DSG/GDPR compliance consulting","EPD readiness assessment"] },
      ],
    },
    "netzwerk": { title:"Network & Infrastructure", heroSub:"Professional network design — secure, segmented and future-proof.",
      sections:[
        { t:"Our Services", items:["VLAN design and implementation","OPNsense firewall setup","WireGuard VPN","Structured cabling","Wi-Fi optimization","SD-WAN","Network monitoring","PoE switch configuration"] },
      ],
    },
    "server-cloud": { title:"Cloud & Server Management", heroSub:"Reliable server infrastructure with proactive monitoring.",
      sections:[
        { t:"Our Services", items:["Server installation and configuration","Managed hosting on Swiss data centers","Virtualization","Automated deployments","SSL/DNS management","24/7 monitoring","Patch management"] },
      ],
    },
    "praxissoftware": { title:"Practice Software & EMR", heroSub:"Integration and support for leading Swiss practice management systems.",
      sections:[
        { t:"Our Services", items:["tomedo installation","vitomed and Axenita support","Online booking integration","Viollier V-Box","swissdamed registration","E-prescription readiness","EPD integration","Data migration"] },
      ],
    },
    "labor": { title:"Laboratory & Medtech", heroSub:"Middleware solutions for seamless analyzer connectivity.",
      sections:[
        { t:"Our Services", items:["Sysmex, Cobas, Seamaty, LOC-200 connectivity","HL7 and ASTM integration","FHIR compatibility","LOINC mapping","POCT integration","Raspberry Pi middleware","Data validation"] },
      ],
    },
    "kommunikation": { title:"Communication & Collaboration", heroSub:"Professional communication solutions for secure practice operations.",
      sections:[{ t:"Our Services", items:["Email with SPF/DKIM/DMARC","Email migration","3CX VoIP telephony","Unified communications","Encrypted messaging","Video conferencing","Secure patient communication"] }],
    },
    "backup": { title:"Data Protection & Business Continuity", heroSub:"Protect your practice data with multi-tier backup strategies.",
      sections:[{ t:"Our Services", items:["3-2-1 backup strategy","Automated encrypted backups","Off-site backup","Restore testing","Disaster recovery planning","Ransomware protection","Emergency plans"] }],
    },
    "website": { title:"Digital Presence & Marketing", heroSub:"Professional websites and digital marketing for medical practices.",
      sections:[{ t:"Our Services", items:["Next.js premium websites","WordPress websites","Local SEO","Google Business optimization","Online booking","Social media","Google Ads","Video production","Branding","Digital signage"] }],
    },
    "managed-it": { title:"Managed IT Services", heroSub:"Proactive IT management for worry-free practice operations.",
      sections:[{ t:"Our Services", items:["Remote and on-site support","24/7 monitoring","Patch management","Hardware lifecycle management","License administration","Monthly reports","Dedicated contact","Helpdesk"] }],
    },
    "beratung": { title:"IT Consulting & Transformation", heroSub:"Strategic IT planning for growing practices.",
      sections:[{ t:"Our Services", items:["IT planning for new practices","Infrastructure audits","Technology roadmaps","Budget planning","Vendor management","Digital transformation","Change management","Compliance consulting"] }],
    },
    "telemedizin": { title:"Telemedicine & Digital Health", heroSub:"Telemedicine platforms and digital health solutions.",
      sections:[{ t:"Our Services", items:["Telemedicine platform setup","Video consultations","Remote patient monitoring","Digital health applications","DigiSanté readiness","Privacy-compliant solutions","System integration","Team training"] }],
    },
    "schulung": { title:"Training & Awareness", heroSub:"IT training and cybersecurity awareness for practice teams.",
      sections:[{ t:"Our Services", items:["Tailored IT training","Cybersecurity awareness","Phishing simulations","Staff onboarding","Software training","IT process documentation","Best practice workshops","Regular refresher courses"] }],
    },
  },
};
