export const deCH = {
  lang: "de-CH",
  langLabel: "DE (CH)",
  langFull: "Deutsch (CH)",

  nav: {
    items: ["Home","Leistungen","Über uns","Technologie","Preise","Kontakt"],
    links: ["/","leistungen","ueber-uns","technologie","preise","kontakt"],
    cta: "Loslegen / Login",
  },

  top: { addr:"Zürich, Schweiz", phone:"+41 XX XXX XX XX", email:"info@jerumed-nexus.ch" },

  finalCta: {
    tag:"Kontakt",
    title:"Bereit für eine bessere\nPraxis-IT?",
    btn:"Beratung anfragen →",
  },

  hero: {
    pre:"Wir bieten professionelle",
    h1:"IT Services",
    post:"für Arztpraxen in der Schweiz",
    p:"Massgeschneiderte IT-Lösungen, sichere Infrastruktur und fortschrittliche Automatisierung — optimiert für medizinische Praxen und das Schweizer Gesundheitswesen.",
    btn1:"Mehr erfahren", btn2:"Kontakt aufnehmen",
    quote:"Offerte\nanfragen",
  },

  highlights: [
    { t:"IT-Sicherheit & Compliance", d:"FMH IT-Grundschutz Audits, DSG-Konformität, Firewall und Endpoint-Schutz für Arztpraxen." },
    { t:"Netzwerk & Infrastruktur", d:"VLAN-Segmentierung, OPNsense Firewall, WireGuard VPN für Multi-Standort-Praxen." },
    { t:"Praxissoftware Integration", d:"tomedo EMR, Online-Terminbuchung, Viollier V-Box und Labor-Middleware-Anbindung." },
  ],

  about: {
    tag:"ÜBER UNS",
    title:"Intelligente IT-Lösungen\nfür moderne Arztpraxen",
    p:"Jerumed Nexus schliesst eine Lücke im Schweizer Gesundheitswesen: Arztpraxen brauchen IT-Partner, die nicht nur die Technik beherrschen, sondern auch die medizinischen Prozesse und regulatorischen Anforderungen verstehen. Unser Gründer bringt jahrelange Erfahrung in der Integration medizinischer Systeme mit.",
    values:["Medizinisches Fachwissen","Technische Exzellenz","Schweizer Qualität","Proaktiver Service","Datenschutz-Fokus","Nachhaltiges Wachstum"],
    cards:[
      { t:"Swiss Hosted & DSG-konform", d:"Alle Daten bleiben in der Schweiz. Wir arbeiten nach FMH IT-Grundschutz." },
      { t:"Ein Ansprechpartner", d:"Keine Ticket-Warteschlangen. Direkter Kontakt zum Techniker." },
    ],
  },

  stats: [
    { n:"11", l:"Service-Bereiche" },
    { n:"6+", l:"Praxis-Standorte" },
    { n:"24/7", l:"Monitoring & Support" },
    { n:"100%", l:"Swiss Hosted" },
  ],

  partners: {
    title:"Technologien und Partner, denen\nArztpraxen in der Schweiz vertrauen",
    logos:["tomedo","vitomed","Axenita","AESKULAP","HIN","MediData","Viollier","Ärztekasse","BlueCare","Doctolib","OneDoc","FMH","Swisscom Health","Sysmex","Roche"],
  },

  compliance: {
    tag:"ZERTIFIZIERUNGEN & STANDARDS",
    title:"Höchste Sicherheitsstandards\nfür Ihre Praxis",
    badges:[
      { icon:"🛡", t:"FMH IT-Grundschutz", d:"Zertifiziert nach D1/D2/D3 der FMH." },
      { icon:"🔒", t:"nDSG-konform", d:"Neues Datenschutzgesetz seit Sept. 2023." },
      { icon:"🇨🇭", t:"Swiss Hosted", d:"Alle Daten auf Schweizer Servern." },
      { icon:"🏥", t:"EPD-Ready", d:"Vorbereitet auf das elektronische Patientendossier." },
      { icon:"🔐", t:"End-to-End-Verschlüsselung", d:"Für alle Patientendaten und Kanäle." },
      { icon:"📋", t:"DSGVO-konform", d:"EU-Datenschutz für grenzüberschreitende Daten." },
    ],
  },

  process: {
    tag:"WIE WIR ARBEITEN",
    title:"Unser bewährter 4-Schritte-Prozess",
    steps:[
      { n:"01", t:"Analyse", d:"Wir analysieren Ihre bestehende IT-Infrastruktur, identifizieren Schwachstellen und verstehen Ihre Praxis-Workflows." },
      { n:"02", t:"Konzept", d:"Wir erstellen einen massgeschneiderten IT-Plan mit klaren Prioritäten, Zeitplan und transparenter Kostenplanung." },
      { n:"03", t:"Umsetzung", d:"Wir implementieren die Lösung mit minimaler Betriebsunterbrechung — inklusive Migration, Schulung und Testing." },
      { n:"04", t:"Betreuung", d:"Proaktives 24/7-Monitoring, regelmässige Wartung, Updates und persönlicher Support — dauerhaft." },
    ],
  },

  techDiagram: {
    tag:"ARCHITEKTUR",
    title:"So schützen wir Ihre Praxis",
    note:"↑ Jede Schicht wird von uns konfiguriert, gesichert und überwacht ↑",
    layers:[
      { t:"Endgeräte" },{ t:"Applikationsschicht" },{ t:"Server & Datenbank" },
      { t:"Netzwerk & Sicherheit" },{ t:"Medizinische Systeme" },{ t:"Laborgeräte & Diagnostik" },
    ],
  },

  services: {
    learnMore:"MEHR ERFAHREN",
    tag:"UNSERE LEISTUNGEN",
    title:"IT-Dienstleistungen für\ndas Gesundheitswesen",
    sub:"Von der Praxissoftware bis zur IT-Sicherheit — alle Leistungen aus einer Hand.",
    allBtn:"Alle Leistungen →",
    items:[
      { slug:"it-sicherheit", t:"Cybersecurity & Compliance", d:"Umfassende Sicherheitsaudits, Penetration Testing, Schwachstellenanalysen, Firewall-Management, Endpoint Detection & Response (EDR), SIEM-Integration und Einhaltung von FMH IT-Grundschutz, DSG und DSGVO." },
      { slug:"netzwerk", t:"Netzwerk & Infrastruktur", d:"Enterprise-Netzwerkdesign mit VLAN-Segmentierung, SD-WAN, redundante Anbindungen, WLAN-Ausleuchtung, strukturierte Verkabelung nach EN 50173, OPNsense/WireGuard VPN für Multi-Standort-Praxen." },
      { slug:"server-cloud", t:"Cloud & Server Management", d:"Hybrid-Cloud-Strategien, Managed Hosting auf Swiss-Rechenzentren, Virtualisierung, Container-Orchestrierung, automatisierte Deployments, SSL/DNS-Management und proaktives 24/7-Infrastruktur-Monitoring." },
      { slug:"praxissoftware", t:"Praxissoftware & EMR", d:"Integration und Support für führende Praxisinformationssysteme wie tomedo, vitomed, Axenita und AESKULAP. Online-Terminbuchung, Viollier V-Box, swissdamed-Registrierung, E-Rezept und EPD-Vorbereitung." },
      { slug:"labor", t:"Labor & Medizintechnik", d:"Middleware-Entwicklung für die Anbindung von Analysegeräten (Sysmex, Cobas, Seamaty, LOC-200) via HL7, ASTM und FHIR. LOINC-Mapping, POCT-Integration und Validierung der Datenübertragung." },
      { slug:"kommunikation", t:"Kommunikation & Zusammenarbeit", d:"Professionelle E-Mail-Systeme mit SPF/DKIM/DMARC, VoIP-Telefonie (3CX), Unified Communications, verschlüsselter Messaging, Videokonferenz-Lösungen und sichere Kommunikation mit Patienten." },
      { slug:"backup", t:"Datensicherung & Business Continuity", d:"Mehrstufige 3-2-1-Backup-Strategien, Disaster Recovery Planning, verschlüsselte Off-Site-Backups, automatisierte Wiederherstellungstests, Ransomware-Schutz und dokumentierte Notfallpläne." },
      { slug:"website", t:"Digitale Präsenz & Marketing", d:"Professionelle Praxis-Websites mit Next.js oder WordPress, lokales SEO, Google Business Optimierung, Social Media Management, Werbevideos, Branding, Digital Signage und Patientenkommunikation." },
      { slug:"managed-it", t:"Managed IT Services", d:"Proaktive IT-Betreuung mit Remote- und Vor-Ort-Support, automatisiertem Patch-Management, Hardware-Lifecycle-Management, Lizenz-Verwaltung, monatlichen Statusberichten und dedizierten Ansprechpartnern." },
      { slug:"beratung", t:"IT-Beratung & Transformation", d:"Strategische IT-Planung für Praxisneueröffnungen und -erweiterungen, Infrastruktur-Audits, Technologie-Roadmaps, Budgetplanung, Vendor Management und Begleitung der digitalen Transformation." },
      { slug:"telemedizin", t:"Telemedizin & Digital Health", d:"Implementierung von Telemedizin-Plattformen, Videosprechstunden-Lösungen, Remote Patient Monitoring, Integration digitaler Gesundheitsanwendungen und Vorbereitung auf DigiSanté-Anforderungen." },
      { slug:"schulung", t:"Schulung & Awareness", d:"Massgeschneiderte IT-Schulungen für Praxisteams, Cybersecurity-Awareness-Programme, Phishing-Simulationen, Onboarding neuer Mitarbeitenden und Dokumentation von IT-Prozessen." },
    ],
  },

  checklist: {
    tag:"SICHERHEITS-CHECK",
    title:"Ist Ihre Praxis-IT sicher?",
    sub:"Beantworten Sie 6 Fragen — finden Sie heraus, wo Handlungsbedarf besteht.",
    items:[
      "Haben Sie eine professionelle Firewall (nicht nur den Router)?",
      "Werden Backups regelmässig getestet und extern gespeichert?",
      "Ist Ihr WLAN vom Praxis-Netzwerk getrennt (VLAN)?",
      "Haben alle Mitarbeitenden eine Phishing-Schulung erhalten?",
      "Sind Ihre E-Mails mit SPF, DKIM und DMARC geschützt?",
      "Gibt es einen dokumentierten Notfallplan bei Cyberangriffen?",
    ],
    result:{ good:"Sehr gut! Ihre IT-Sicherheit scheint solide.", warn:"Es gibt Handlungsbedarf — wir helfen gerne.", bad:"Dringender Handlungsbedarf! Kontaktieren Sie uns." },
    cta:"Kostenlosen Sicherheits-Check anfragen",
  },

  pricing: {
    tag:"UNSERE PAKETE",
    title:"Flexible Pläne für\njede Praxisgrösse",
    sub:"Unsere Preisstruktur passt sich Ihren Bedürfnissen an — von der Einzelpraxis bis zum Ärztezentrum.",
    btn:"Mehr erfahren",
    plans:[
      { tag:"STARTER", name:"Einzelpraxis", price:"500", prefix:"ab", unit:"CHF / Monat", features:["Remote IT-Support","Basis-Monitoring","E-Mail-Konfiguration","Monatlicher Statusbericht","Backup-Management"] },
      { tag:"PROFESSIONAL", name:"Gemeinschaftspraxis", price:"1'200", prefix:"ab", unit:"CHF / Monat", features:["Alles aus Starter","Vor-Ort-Support","VLAN & VPN Setup","tomedo-Integration","Cybersecurity-Audit"], featured:true },
      { tag:"ENTERPRISE", name:"Ärztezentrum", price:"2'500", prefix:"ab", unit:"CHF / Monat", features:["Alles aus Professional","Multi-Standort-VPN","Labor-Middleware","24/7 Priority-Support","Dedizierter Ansprechpartner"] },
    ],
    getStarted:"Angebot anfragen",
    vatNote:"*Alle Preise exkl. MwSt.",
  },

  sla: {
    uptimeLabel:"UPTIME-GARANTIE",
    tag:"SERVICE LEVEL AGREEMENT",
    title:"Garantierte Reaktionszeiten",
    items:[
      { t:"Kritisch", time:"1 Std.", d:"Serverausfall, Datenverlust, Cyberangriff", color:"#ef4444" },
      { t:"Hoch", time:"4 Std.", d:"E-Mail-Ausfall, Netzwerkprobleme", color:"#f59e0b" },
      { t:"Normal", time:"8 Std.", d:"Software-Updates, Konfiguration", color:"#22c55e" },
      { t:"Geplant", time:"Termin", d:"Migrationen, Hardware, Schulungen", color:"#2563EB" },
    ],
    guarantee:"99.9% Uptime-Garantie auf Managed-IT-Verträge",
  },

  team: {
    tag:"UNSER TEAM",
    title:"Die Experten hinter\nJerumed Nexus",
    members:[
      { name:"A. Abuawad", role:"Gründer & CEO", desc:"Spezialist für medizinische IT-Integration, Netzwerkarchitektur und Systemadministration.", img:"AA" },
      { name:"IT-Sicherheit", role:"Cybersecurity-Berater", desc:"Externer Spezialist für Penetration Testing, FMH-Audits und Incident Response.", img:"CS" },
      { name:"Kreativ-Team", role:"Web & Marketing", desc:"Videomaker, Social Media Manager und Designer für Ihre digitale Präsenz.", img:"WM" },
      { name:"Support", role:"Technischer Support", desc:"Ihr direkter Ansprechpartner für den täglichen IT-Betrieb Ihrer Praxis.", img:"TS" },
    ],
  },

  tools: {
    tag:"UNSERE TOOLS & SOFTWARE",
    title:"Professionelle Software für\nzuverlässigen IT-Betrieb",
    items:["TeamViewer","AnyDesk","RustDesk","IONOS","Plesk","Nginx","OPNsense","WireGuard","Ubuntu","3CX","WordPress","Figma","GitHub","Grafana","Let's Encrypt","Postfix"],
  },

  emergency: {
    label:"IT-NOTFALL?",
    title:"IT-Notfall in Ihrer Praxis?",
    sub:"Serverausfall, Cyberangriff oder Datenverlust? Unser Notfall-Team ist sofort für Sie da.",
    phone:"+41 XX XXX XX XX", btn:"Notfall melden", note:"Mo–Fr 07:00–22:00 · Sa 08:00–18:00",
  },

  ctaBanner: {
    title:"Starten Sie Ihre\nIT-Beratung jetzt",
    p:"Vereinbaren Sie ein kostenloses Erstgespräch und erfahren Sie, wie wir Ihre Praxis-IT optimieren können.",
    btn:"Beratung anfragen",
  },

  help: {
    tag:"BRAUCHEN SIE HILFE?",
    title:"Kontaktieren Sie uns für\nprofessionelle IT-Unterstützung",
    p:"Unser Team steht Ihnen für fachkundige Beratung und zuverlässigen technischen Support zur Verfügung — massgeschneidert für Ihre Praxis.",
    phone:{ label:"TELEFON-SUPPORT", value:"+41 XX XXX XX XX" },
    email:{ label:"E-MAIL-SUPPORT", value:"info@jerumed-nexus.ch" },
    exp:{ n:"10+", l:"Jahre Erfahrung" },
  },

  features: [
    { t:"Medizinische Kompetenz", d:"tomedo, HL7, TARMED und Praxis-Workflows." },
    { t:"Sicherheit & Zuverlässigkeit", d:"FMH IT-Grundschutz, DSG-konform, 24/7 Monitoring." },
    { t:"Partnerschaftlicher Ansatz", d:"Ein Ansprechpartner für alle IT-Belange." },
    { t:"Schweizer Qualität", d:"Swiss Hosted, lokale Datenhaltung, DSGVO-konform." },
  ],

  newsletter: { title:"Bleiben Sie informiert über\nIT-Trends im Gesundheitswesen", placeholder:"Ihre E-Mail-Adresse", btn:"ABONNIEREN" },

  contact: {
    tag:"KONTAKT",
    title:"Sprechen Sie mit uns",
    sub:"Wir freuen uns auf Ihre Anfrage. Füllen Sie das Formular aus oder kontaktieren Sie uns direkt.",
    form:{ name:"Name", email:"E-Mail", phone:"Telefon", company:"Praxisname", message:"Ihre Nachricht", service:"Gewünschte Leistung", send:"Nachricht senden" },
    infoTitle:"Kontakt-Infos",
    responseTitle:"Reaktionszeiten",
    priorities:[
      { label:"Kritisch", time:"≤ 1 Std" },
      { label:"Hoch",     time:"≤ 4 Std" },
      { label:"Normal",   time:"≤ 8 Std" },
    ],
    successTitle:"Nachricht gesendet!",
    successSub:"Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    errorMsg:"Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    sending:"Senden…",
  },

  servicePageCta: {
    title:"Kontaktieren Sie uns",
    sub:"Vereinbaren Sie ein kostenloses Erstgespräch.",
    btn:"Kontakt aufnehmen →",
  },

  footer: {
    desc:"Wir gestalten sichere IT-Infrastruktur, medizinische Software-Integration und Cloud-Lösungen für Arztpraxen in der Schweiz.",
    cols:["Leistungen","Support","Unternehmen"],
    l1:["IT-Sicherheit","Netzwerk","Server & Cloud","Praxissoftware","Labor-Middleware","Managed IT"],
    l2:["Hilfe-Center","Kontakt","Systemstatus","Datenschutz","SLA"],
    l3:["Über uns","Karriere","Kontakt","Blog"],
    copy:"© 2026 Jerumed Nexus. Alle Rechte vorbehalten.",
    legal:["Datenschutz","Cookie-Richtlinie","AGB","Sitemap"],
  },

  pages: {
    legalTag:"Rechtliches",
    notFound:"Seite nicht gefunden",
    about: {
      heroTitle:"Über Jerumed Nexus",
      heroSub:"Wo Gesundheitswesen auf Technologie trifft",
      story:{
        tag:"UNSERE GESCHICHTE",
        title:"Gegründet aus Erfahrung,\ngebaut auf Vertrauen",
        p1:"Jerumed Nexus entstand aus der direkten Erfahrung mit den IT-Herausforderungen von Arztpraxen in der Schweiz. Unser Gründer hat jahrelang in der Integration medizinischer Systeme gearbeitet — von der Laboranbindung über EMR-Konfiguration bis zur Netzwerkarchitektur.",
        p2:"Heute bieten wir ein vollständiges IT-Dienstleistungsportfolio an, das speziell auf die Anforderungen des Schweizer Gesundheitswesens zugeschnitten ist. Wir verstehen nicht nur die Technik, sondern auch die medizinischen Prozesse, regulatorischen Anforderungen und den Praxisalltag.",
      },
      mission:{ tag:"MISSION", title:"Unsere Mission", p:"Schweizer Arztpraxen mit zuverlässiger, sicherer und moderner IT-Infrastruktur zu stärken — damit sich Ärztinnen und Ärzte auf ihre Patienten konzentrieren können." },
      vision:{ tag:"VISION", title:"Unsere Vision", p:"Der führende spezialisierte IT-Partner für Arztpraxen in der Schweiz zu werden, anerkannt für technische Exzellenz und proaktiven Service." },
    },
    technology: {
      heroTitle:"Technologie-Stack",
      heroSub:"Enterprise-grade. Open Source. Transparent.",
      stack:[
        { cat:"Frontend", val:"Next.js · React · TypeScript · Tailwind CSS" },
        { cat:"Backend", val:"Node.js · Go · Python · PostgreSQL" },
        { cat:"Server", val:"Ubuntu · Nginx · PM2 · Plesk" },
        { cat:"Sicherheit", val:"OPNsense · WireGuard · SPF/DKIM" },
        { cat:"Monitoring", val:"Uptime Kuma · Zabbix · Grafana" },
        { cat:"Medizin", val:"HL7 · ASTM · LOINC · tomedo · 3CX" },
      ],
    },
    impressum: {
      title:"Impressum",
      company:"Jerumed Nexus",
      address:"[Adresse wird ergänzt]",
      email:"info@jerumed-nexus.ch",
      phone:"+41 XX XXX XX XX",
    },
    datenschutz: {
      title:"Datenschutzerklärung",
      intro:"Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. In dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Website.",
      note:"Diese Seite wird noch vervollständigt.",
    },
  },

  servicePages: {
    "it-sicherheit": {
      title:"Cybersecurity & Compliance",
      heroSub:"Schützen Sie Ihre Praxis vor Cyberbedrohungen — mit Sicherheitslösungen, die den Schweizer Standards entsprechen.",
      sections:[
        { t:"Was ist IT-Sicherheit im Gesundheitswesen?", p:"IT-Sicherheit im Gesundheitswesen umfasst alle technischen und organisatorischen Massnahmen zum Schutz von Patientendaten, medizinischen Systemen und der Praxis-Infrastruktur vor unbefugtem Zugriff, Datenverlust und Cyberangriffen. Im medizinischen Umfeld gelten besonders strenge Anforderungen, da sensible Gesundheitsdaten verarbeitet werden." },
        { t:"Warum ist Cybersecurity für Arztpraxen wichtig?", p:"Arztpraxen sind zunehmend Ziel von Cyberangriffen. Ransomware, Phishing und Datenlecks können den Praxisbetrieb lahmlegen und das Vertrauen der Patienten zerstören. Gleichzeitig verpflichten das neue Schweizer Datenschutzgesetz (nDSG), die FMH-Richtlinien und die DSGVO zur Einhaltung strenger Sicherheitsstandards." },
        { t:"Unsere Leistungen", items:["Sicherheitsaudits nach FMH IT-Grundschutz (D1/D2/D3)","Penetration Testing und Schwachstellenanalysen","Firewall-Konfiguration und -Management","Endpoint Detection & Response (EDR)","SIEM-Integration und Log-Management","Phishing-Simulationen und Mitarbeiterschulungen","Incident Response Planning","DSG/DSGVO-Konformitätsberatung","EPD-Readiness Assessment"] },
      ],
    },
    "netzwerk": {
      title:"Netzwerk & Infrastruktur",
      heroSub:"Professionelles Netzwerkdesign für Arztpraxen — sicher, segmentiert und zukunftssicher.",
      sections:[
        { t:"Was umfasst Netzwerk-Infrastruktur?", p:"Die Netzwerk-Infrastruktur einer Arztpraxis bildet das Fundament für alle digitalen Prozesse. Sie umfasst die physische Verkabelung, Router, Switches, Firewalls, WLAN-Access Points sowie die logische Segmentierung in verschiedene Netzwerkzonen. Ein professionell geplantes Netzwerk trennt klinische Systeme von Verwaltung und Gäste-WLAN." },
        { t:"Warum ist Netzwerksegmentierung wichtig?", p:"In einer Arztpraxis müssen verschiedene Systeme voneinander isoliert werden: Medizinische Geräte, Praxis-Software, Verwaltungs-PCs und das Patienten-WLAN. Ohne VLAN-Segmentierung kann ein kompromittiertes Gerät im Gäste-WLAN potenziell auf Patientendaten zugreifen." },
        { t:"Unsere Leistungen", items:["VLAN-Design und -Implementierung","OPNsense Firewall Setup und Management","WireGuard VPN für Multi-Standort-Praxen","Strukturierte Verkabelung nach EN 50173","WLAN-Ausleuchtung und -Optimierung","SD-WAN für redundante Anbindungen","Netzwerk-Monitoring und -Dokumentation","PoE-Switch-Konfiguration","VPN-Gateway für Homeoffice"] },
      ],
    },
    "server-cloud": {
      title:"Cloud & Server Management",
      heroSub:"Zuverlässige Server-Infrastruktur — lokal, Cloud oder hybrid — mit proaktivem Monitoring.",
      sections:[
        { t:"Was ist Server- und Cloud-Management?", p:"Server- und Cloud-Management umfasst die Planung, Bereitstellung, Wartung und Überwachung von Servern und Cloud-Diensten. Für Arztpraxen ist die Wahl zwischen lokalen Servern, Cloud-Hosting oder hybriden Lösungen eine strategische Entscheidung, die Datenschutz, Leistung und Kosten beeinflusst." },
        { t:"Unsere Leistungen", items:["Server-Installation und -Konfiguration","Managed Hosting auf Swiss-Rechenzentren","Virtualisierung (Proxmox, VMware)","Automatisierte Deployments (CI/CD)","SSL-Zertifikate und DNS-Management","Proaktives 24/7-Monitoring","Patch-Management und Updates","Speicherplatz- und Performance-Optimierung"] },
      ],
    },
    "praxissoftware": {
      title:"Praxissoftware & EMR",
      heroSub:"Integration und Support für führende Praxisinformationssysteme im Schweizer Gesundheitswesen.",
      sections:[
        { t:"Was ist Praxissoftware?", p:"Praxissoftware (PIS - Praxisinformationssystem) ist die zentrale Anwendung einer Arztpraxis für die Verwaltung von Patientendaten, Terminen, Abrechnungen und medizinischer Dokumentation. In der Schweiz sind tomedo, vitomed, Axenita und AESKULAP die führenden Systeme." },
        { t:"Unsere Leistungen", items:["tomedo EMR Installation und Konfiguration","vitomed und Axenita Support","Online-Terminbuchung (arzt-direkt, OTK, Doctolib)","Viollier V-Box Integration","swissdamed Geräte-Registrierung","E-Rezept Vorbereitung","EPD-Integration","Daten-Migration zwischen Systemen"] },
      ],
    },
    "labor": {
      title:"Labor & Medizintechnik",
      heroSub:"Middleware-Lösungen für die nahtlose Anbindung von Laboranalysegeräten an Ihre Praxissoftware.",
      sections:[
        { t:"Was ist Labor-Middleware?", p:"Labor-Middleware ist Software, die als Vermittler zwischen Analysegeräten und dem Praxisinformationssystem fungiert. Sie übersetzt die Kommunikationsprotokolle der verschiedenen Geräte (HL7, ASTM, FHIR) in ein einheitliches Format und überträgt die Laborergebnisse automatisch in die Patientenakte." },
        { t:"Unsere Leistungen", items:["Anbindung: Sysmex, Cobas, Seamaty, LOC-200, UC-1000","HL7 und ASTM Protokoll-Integration","FHIR-Kompatibilität","LOINC-Code-Mapping","POCT-Integration (Point-of-Care Testing)","Raspberry Pi Middleware-Lösungen","Datenvalidierung und Qualitätssicherung","Schnittstellen-Dokumentation"] },
      ],
    },
    "kommunikation": {
      title:"Kommunikation & Zusammenarbeit",
      heroSub:"Professionelle Kommunikationslösungen für sichere und effiziente Praxis-Abläufe.",
      sections:[
        { t:"Unsere Leistungen", items:["E-Mail mit SPF/DKIM/DMARC","E-Mail-Migration zwischen Anbietern","3CX VoIP-Telefonie","Unified Communications","Verschlüsselte Messaging-Lösungen","Videokonferenz-Setup","Sichere Patientenkommunikation","Professionelle E-Mail-Signaturen"] },
      ],
    },
    "backup": {
      title:"Datensicherung & Business Continuity",
      heroSub:"Schützen Sie Ihre Praxisdaten mit mehrstufigen Backup-Strategien und Notfallplänen.",
      sections:[
        { t:"Unsere Leistungen", items:["3-2-1 Backup-Strategie","Automatisierte verschlüsselte Backups","Off-Site Backup auf Swiss-Rechenzentren","Regelmässige Wiederherstellungstests","Disaster Recovery Planning","Ransomware-Schutz","Dokumentierte Notfallpläne","Business Impact Analyse"] },
      ],
    },
    "website": {
      title:"Digitale Präsenz & Marketing",
      heroSub:"Professionelle Websites und digitales Marketing für Arztpraxen.",
      sections:[
        { t:"Unsere Leistungen", items:["Premium-Websites mit Next.js","Standard-Websites mit WordPress","Lokales SEO für Arztpraxen","Google Business Profil-Optimierung","Online-Terminbuchung-Integration","Social Media Management","Google Ads Kampagnen","Werbevideos und Content-Erstellung","Branding und Corporate Design","Digital Signage für Wartezimmer","DSG/DSGVO-konforme Cookie-Lösungen"] },
      ],
    },
    "managed-it": {
      title:"Managed IT Services",
      heroSub:"Proaktive IT-Betreuung für einen sorgenfreien Praxisbetrieb.",
      sections:[
        { t:"Unsere Leistungen", items:["Remote- und Vor-Ort-Support","24/7 Server- und Netzwerk-Monitoring","Automatisiertes Patch-Management","Hardware-Lifecycle-Management","Lizenz-Verwaltung","Monatliche IT-Statusberichte","Dedizierter Ansprechpartner","Helpdesk und Ticket-System"] },
      ],
    },
    "beratung": {
      title:"IT-Beratung & Transformation",
      heroSub:"Strategische IT-Planung für Arztpraxen, die wachsen und sich modernisieren.",
      sections:[
        { t:"Unsere Leistungen", items:["IT-Planung für Praxisneueröffnungen","Infrastruktur-Audits","Technologie-Roadmaps","IT-Budgetplanung","Vendor Management und Beschaffung","Digitale Transformation Begleitung","Change Management","Compliance-Beratung"] },
      ],
    },
    "telemedizin": {
      title:"Telemedizin & Digital Health",
      heroSub:"Implementierung von Telemedizin-Plattformen und digitalen Gesundheitslösungen.",
      sections:[
        { t:"Unsere Leistungen", items:["Telemedizin-Plattform Setup","Videosprechstunden-Lösungen","Remote Patient Monitoring","Digitale Gesundheitsanwendungen","DigiSanté-Vorbereitung","Datenschutz-konforme Lösungen","Integration in bestehende Systeme","Schulung für Praxisteams"] },
      ],
    },
    "schulung": {
      title:"Schulung & Awareness",
      heroSub:"IT-Schulungen und Cybersecurity-Awareness für Praxisteams.",
      sections:[
        { t:"Unsere Leistungen", items:["Massgeschneiderte IT-Schulungen","Cybersecurity-Awareness-Programme","Phishing-Simulationen","Onboarding neuer Mitarbeitenden","Software-Schulungen (tomedo etc.)","IT-Prozess-Dokumentation","Best-Practice-Workshops","Regelmässige Auffrischungskurse"] },
      ],
    },
  },
};
