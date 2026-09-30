export const projects = [
  {
    id: 'itsuite',
    name: 'IT SUITE',
    category: 'system',
    featured: true,
    platform: 'Web platform + Windows agent + desktop app',
    client: 'Malaysian logistics & trucking group',
    tagline: 'One platform to monitor, support and manage a company’s entire IT estate.',
    summary:
      'An internal IT operations platform that replaced a patchwork of separate tools. The IT team monitors every device and network link, handles tickets, supports staff remotely and manages credentials — all from one place.',
    problem:
      'Monitoring, ticketing, asset records, remote support and shared passwords lived in different tools and spreadsheets. Nothing was connected, so an outage, the ticket about it and the affected device were three separate lookups.',
    highlights: [
      'Device & network monitoring (RMM/NMS) with alert rules',
      'IT service desk and configuration database (ITSM & CMDB)',
      'Live remote assistance through a self-hosted relay',
      'Encrypted password vault with access history',
    ],
    features: [
      'Device and network monitoring with configurable alert rules and scheduled health checks',
      'Ticketing, SLAs and a configuration management database linking assets to incidents',
      'Remote assistance sessions brokered through a self-hosted relay server',
      'Encrypted password vault with per-user access and password history',
      'Windows agent: background service, tray app and signed installer reporting live telemetry',
      'Desktop monitoring dashboard (WPF) for the IT team’s wall screen',
      'HR scheduling, billing and day-to-day company operations modules',
    ],
    engineering: [
      'Mandatory TOTP two-factor authentication for every account',
      'Role-based access across six roles, with developers blocked from business data',
      'Tamper-evident audit log using a hash chain',
      'Signed agent commands and per-device enrollment with key rotation',
    ],
    stats: [
      { value: '65+', label: 'Schema migrations' },
      { value: '6', label: 'Access roles' },
      { value: '5', label: 'Background engines' },
    ],
    stack: ['PHP 8', 'MySQL', 'Bootstrap 5', 'C# / .NET', 'WPF', 'PowerShell'],
    hue: 240,
  },
  {
    id: 'fmd',
    name: 'Fleet Management Dashboard',
    category: 'system',
    platform: 'Web dashboard',
    client: 'Road-transport fleet operator',
    tagline: 'Every vehicle’s legal and operational status, on one screen.',
    summary:
      'A compliance dashboard for a trucking fleet. Operations staff see at a glance which vehicles are road-legal, which permits are about to expire and which trucks failed their pre-journey check.',
    problem:
      'Road tax, operating permits, inspections and insurance each expire on their own schedule. Tracking them per vehicle by hand meant expiries were caught late — and a lapsed permit takes a truck off the road.',
    highlights: [
      'Road tax, permit, inspection & insurance tracking',
      'Permit assignment with expiry alerts',
      'Pre-journey inspection checklists',
    ],
    features: [
      'Compliance status per vehicle across road tax, operating permit, inspection, insurance and customs bonding',
      'Operating-permit assignment with expiry tracking and a document viewer',
      'Pre-journey inspection checklists recorded by drivers',
      'GPS, fuel-sensor and e-lock device health monitoring',
      'Organisation chart for the operations team',
    ],
    engineering: [
      'Deployed to production for the operations team',
      'Reads across multiple databases from two operational systems',
      'Device telemetry reported by a lightweight background agent',
    ],
    stats: [
      { value: '6', label: 'Compliance checks' },
      { value: 'Live', label: 'In production' },
    ],
    stack: ['PHP 8', 'MySQL', 'Bootstrap 5', 'JavaScript'],
    hue: 40,
  },
  {
    id: 'ams',
    name: 'Asset Management System',
    category: 'system',
    platform: 'Web application',
    client: 'Malaysian logistics & trucking group',
    tagline: 'Every IT asset tracked, from purchase to its next service date.',
    summary:
      'An IT asset and preventive-maintenance register. Each asset gets a QR label anyone can scan to see its record, while the credentials tied to it stay encrypted.',
    problem:
      'Asset details, service dates and device logins were kept in spreadsheets. Finding out who owned a laptop or when a printer was last serviced meant asking around.',
    highlights: [
      'Asset & preventive-maintenance register',
      'QR labels with public lookup',
      'Encrypted per-asset credentials',
    ],
    features: [
      'Asset register with preventive-maintenance scheduling and history',
      'QR code label per asset, scannable for a public read-only lookup',
      'Encrypted password manager scoped to each asset',
      'PDF export for audits and handovers',
      'Staff directory with user management',
      'Activity and audit log',
    ],
    engineering: [
      'Credentials encrypted at rest with a per-deployment key',
      'Password history to block reuse',
    ],
    stats: [{ value: 'QR', label: 'Scan-to-lookup' }],
    stack: ['PHP 8', 'MySQL', 'Bootstrap 5'],
    hue: 90,
  },
  {
    id: 'constituency',
    name: 'Constituency Service Platform',
    category: 'system',
    platform: 'Web application + public forms',
    client: 'State assembly service centre',
    tagline: 'Casework, public requests and voter records for a constituency office.',
    summary:
      'A management system for an elected representative’s service centre. Residents submit complaints and applications through public forms, and staff track each one in a single system.',
    problem:
      'Without a central system, there was no single record of what residents had asked for, who was handling it or what happened next.',
    highlights: [
      'Public complaint & application forms',
      'Complaint tracking for staff',
      'Per-staff module permissions',
    ],
    features: [
      'Public complaint and application forms — no login needed for residents',
      'Complaint tracking for service-centre staff',
      'Out-of-area voter registry',
      'Per-staff module permissions',
    ],
    engineering: [
      'Three separate databases to isolate public submissions from internal records',
      'Session-based auth with module-level access control',
    ],
    stats: [{ value: '3', label: 'Isolated databases' }],
    stack: ['PHP 8', 'MySQL', 'Bootstrap 5'],
    hue: 280,
  },
  {
    id: 'warehouse',
    name: 'Warehouse App',
    category: 'app',
    platform: 'Android app for rugged scanners',
    client: 'Warehouse operations',
    tagline: 'Warehouse receiving, stock location and issuing on a handheld scanner.',
    summary:
      'A second-generation warehouse management app for rugged Android handhelds. Staff scan to receive goods, find where stock is binned and issue it out — against a live backend.',
    problem:
      'Warehouse moves were recorded on paper and keyed in later, so stock counts lagged behind the shelf and items were hard to locate.',
    highlights: [
      'Goods receiving by barcode scan',
      'Bin & stock locator',
      'Stock issuing against live inventory',
    ],
    features: [
      'Goods receiving by barcode scan',
      'Stock locator to find which bin holds an item',
      'Stock issuing against live inventory',
      'Operations dashboard',
      'Photo capture attached to receiving records',
      'Online/offline awareness with instant connection feedback',
      'Light and dark themes for different warehouse lighting',
    ],
    engineering: [
      'Built for Zebra TC22 rugged scanners',
      'Offline outbox — work queued while the session expired is sent after sign-in',
      'Layered architecture — API, controller, service and widget layers',
      'Backed by a PHP REST API with retries and timeouts',
    ],
    stats: [{ value: '4', label: 'Core modules' }],
    stack: ['Flutter', 'Dart', 'Provider', 'Material 3', 'PHP API'],
    hue: 190,
  },
  {
    id: 'itsuite-mobile',
    name: 'IT SUITE Mobile',
    category: 'app',
    platform: 'Android & iOS app',
    client: 'Malaysian logistics & trucking group',
    tagline: 'The IT team’s console in their pocket — tickets, assets, vault and team chat.',
    summary:
      'The mobile companion to IT SUITE. Staff raise and follow tickets, scan asset QR codes, check who is on duty and message the team — from the same backend and permissions as the web platform.',
    problem:
      'Support requests and asset checks happen on warehouse floors, in branches and on the road — away from a desk and the web console.',
    highlights: [
      'Tickets with live status',
      'Asset lookup by QR scan',
      'Face ID / fingerprint sign-in',
    ],
    features: [
      'Create and track support tickets with colour-coded status',
      'Asset list and QR scanner for on-the-spot lookups',
      'Password vault with a 2FA-gated reveal',
      'Team chat with voice and video calls',
      'Duty roster with shift swaps, and leave applications',
      'Company announcements and push notifications',
      'Developer console for sessions, devices and logs',
    ],
    engineering: [
      'Same role-based access and 2FA rules as the web platform',
      'Biometric sign-in backed by secure on-device credential storage',
      'Push notifications through Firebase Cloud Messaging',
      'Offline outbox that sends queued actions when the connection returns',
    ],
    stats: [{ value: '20+', label: 'Modules' }],
    stack: ['Flutter', 'Dart', 'Firebase', 'PHP API'],
    hue: 145,
  },
  {
    id: 'fivesfl',
    name: 'FiveSFL',
    category: 'app',
    platform: 'Android app for Zebra scanners',
    client: '3PL warehouse operation',
    tagline: 'Incoming, store, pick and ship — every warehouse movement scanned, not typed.',
    summary:
      'The first-generation warehouse app. Operators move cartons through the full flow — receiving, put-away, picking, verification and dispatch — using the handheld’s hardware scan trigger.',
    problem:
      'Paper-based movement records made stock positions unreliable and picking mistakes hard to trace back.',
    highlights: [
      'Scan-to-store and scan-to-pick',
      'Hardware scanner integration',
      'Pick verification before dispatch',
    ],
    features: [
      'Incoming receipts with a step-by-step flow',
      'Scan-to-store put-away to warehouse positions',
      'Scan-to-pick by item and by carton',
      'Pick verification before goods leave the warehouse',
      'Outgoing dispatch and stock transfer between positions',
      'Movement logs for every stage',
      'Live dashboard of pending and completed work',
    ],
    engineering: [
      'Zebra DataWedge integration — the scan trigger feeds barcodes straight into the app',
      'Session timeout and connectivity monitoring for shared devices',
      'Client-side error logging back to the server',
      'Developer health mode with API and system diagnostics',
    ],
    stats: [{ value: '7', label: 'Workflow stages' }],
    stack: ['Flutter', 'Dart', 'Zebra DataWedge', 'PHP API', 'MySQL'],
    hue: 320,
  },
  {
    id: 'jemputan',
    name: 'Jemputan Digital',
    category: 'app',
    platform: 'Mobile-first web app',
    client: 'Wedding hosts',
    tagline: 'A digital wedding invitation with RSVP, guestbook and a live countdown.',
    summary:
      'A Malaysian digital wedding invitation designed for phones. Every guest gets a personalised link, replies in a tap, and leaves wishes in a guestbook the hosts can review.',
    problem:
      'Printed cards can’t collect RSVPs, so hosts chase replies over messaging apps to get a headcount.',
    highlights: [
      'Personalised link per guest',
      'One-tap RSVP & guestbook',
      'Live event countdown',
    ],
    features: [
      'Personalised invitation link for each guest',
      'RSVP form and guestbook',
      'Live countdown to the event',
      'Admin view of RSVPs and wishes for the hosts',
      'Scroll-reveal animation and Jawi calligraphy',
    ],
    engineering: [
      'Built twice — a Next.js version and a no-build PHP version',
      'All content editable from a single config file',
    ],
    stats: [{ value: '2', label: 'Implementations' }],
    stack: ['Next.js', 'React', 'PHP'],
    hue: 350,
  },
]

export const capabilities = [
  { label: 'Backend', items: ['PHP 8', 'REST APIs', 'MySQL / MariaDB', 'Node.js'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Bootstrap 5'] },
  { label: 'Mobile', items: ['Flutter', 'Dart', 'Provider', 'Material 3'] },
  { label: 'Desktop', items: ['C# / .NET', 'WPF', 'Windows services'] },
  { label: 'Infrastructure', items: ['Linux', 'Caddy / Apache', 'systemd', 'Docker', 'Cloudflare', 'CI/CD'] },
  { label: 'Security', items: ['TOTP 2FA', 'Role-based access', 'Encryption at rest', 'Audit trails'] },
]

export const approach = [
  {
    title: 'Learn the operation',
    body: 'I start with how the team works today — the spreadsheets, the workarounds — before deciding what to build.',
  },
  {
    title: 'Build the whole thing',
    body: 'Database, backend, interface and any agents or apps around it. One person owning every layer means fewer gaps between them.',
  },
  {
    title: 'Secure by default',
    body: '2FA, role-based access, encrypted secrets and audit trails are part of the first version, not added later.',
  },
  {
    title: 'Ship and run it',
    body: 'I set up the server, deploy it and keep it running — Linux, reverse proxies, backups and monitoring included.',
  },
]

export const security = [
  {
    icon: 'key',
    title: 'Identity & access',
    points: [
      'TOTP two-factor — mandatory for privileged accounts, self-service for staff',
      'Role-based access that keeps developer tools and business data apart',
      'Password policy with history, so old passwords can’t be reused',
    ],
  },
  {
    icon: 'clock',
    title: 'Sessions & login',
    points: [
      'HttpOnly, SameSite session cookies',
      'Idle timeout plus an absolute session lifetime',
      'Rate limiting and lockouts against brute-force attempts',
    ],
  },
  {
    icon: 'lock',
    title: 'Data protection',
    points: [
      'AES-256-GCM encryption for stored credentials',
      'Secrets revealed only after a fresh 2FA code, then auto-locked',
      'Secrets kept out of source control, logs and process arguments',
    ],
  },
  {
    icon: 'code',
    title: 'Application security',
    points: [
      'CSRF tokens on every state-changing request',
      'Prepared statements for all SQL — no string-built queries',
      'Safe upload checks, no shell execution, generic error messages',
    ],
  },
  {
    icon: 'file',
    title: 'Audit & detection',
    points: [
      'Tamper-evident audit log using a SHA-256 hash chain',
      'Security score and SOC dashboard for failed logins and risky activity',
      'Alerts when a device’s firewall, antivirus or disk encryption turns off',
    ],
  },
  {
    icon: 'chip',
    title: 'Device & agent trust',
    points: [
      'Per-device ECDSA key pairs, with rotation and revocation',
      'HMAC-signed commands with nonce-based replay protection',
      'Clone detection when a copied device identity reports in',
    ],
  },
  {
    icon: 'server',
    title: 'Infrastructure',
    points: [
      'Key-only SSH, host firewall and fail2ban',
      'Least-privilege, SFTP-only deploy users — no root deploys',
      'HTTPS everywhere and automatic security updates',
    ],
  },
  {
    icon: 'bug',
    title: 'Testing',
    points: [
      'Automated checks for CSRF, auth guards and unsafe SQL across every endpoint',
      'Adversarial testing of my own features before they ship',
      'Built-in pentest tooling to probe the app’s own endpoints',
    ],
  },
]
