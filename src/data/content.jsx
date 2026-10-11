// =============================================================================
//  content.jsx  ★ THIS IS THE ONLY FILE YOU NEED TO EDIT ★
//
//  HOW TO USE:
//  ─ Profile / Stats / Skills → edit the objects below
//  ─ Blog posts → add objects to BLOG_POSTS array (full post text goes in `body`)
//  ─ Videos → add objects to VIDEOS array, paste a YouTube video ID in `youtubeId`
//  ─ Images → drop any image into src/assets/, import it at the top of this file,
//             then assign it to any `image` field  e.g.  image: myPhoto
//  ─ New pages → add an entry to NAV_PAGES or SIDEBAR_PAGES
// =============================================================================

// ── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
// Uncomment and change paths when you add images to src/assets/
// import profilePhoto from './assets/profile.jpg'
// import blogCover1   from './assets/blog-cover-1.jpg'

// =============================================================================
//  PROFILE
// =============================================================================
export const PROFILE = {
  name: "Soham Sandeep Gurav",
  userId: "smv7",
  role: "AI Engineering Sophomore & Writer",
  location: "Pune, India",
  domain: "AI / ML",
  quote: "Inquisitive man trying to keep up, create and make a change.",

  // Set to an imported image to replace the ASCII art avatar, e.g.:
  //   avatarImage: profilePhoto,
  // Leave as null to show ASCII art.
  avatarImage: "/images/profile/profile.png",

  asciiImage: "/images/profile/profile-ascii.png",
};

// =============================================================================
//  STATS  (shown on the right of the profile row)
// =============================================================================
export const STATS = [
  { label: "Projects Shipped", value: 6 },
  { label: "Hackathons", value: 4 },
  { label: "Blog Posts", value: 3 },
  { label: "Research Papers", value: 0},
];

// =============================================================================
//  ABOUT PAGE
// =============================================================================
export const ABOUT = {
  // Full paragraphs shown on the left panel — edit freely
  body: [
    {
      title: "Hi, I'm Soham.",
      text: `I'm a deeply curious individual, throughout my entire life my thoughts have centered around the 'what?, how? and why?' behind literally everything.
      This trait has made me someone who questions everything, tinkers with and breaks things just to spend my entire day rebuilding them while completely losing track of time.
      I'm of the opinion that the beauty is entirely in the process, and results are byproducts and we should do things for the love of doing them and contributing to the world, not because of some roadmap towards a result
      Because I'm particularly inquisitive and apprehensive of the idea of picking a lane, I spend my time studying and working across multiple interests, not out of indecision, but because the most interesting problems rarely fit inside one discipline.
      I'm most interested in research at the intersection of machine learning & the physical world, working with detours through computational physics, mathematics, writing, hackathons and whatever unsolved problem I stumble into next.
      
      Here are some of the things I've done (that at least I think are worth noting) :
      - As a kid, rescued and cared for injured birds, cats, and other animals in my surroundings, reflecting my deep commitment to animal welfare.
      - Wrote scripts for school assembly talks, hosted the annual sports event, and earned multiple awards for sketching in school.
      - Built physics and electronics projects, including one validating the ground tunnel effect and shared explanations of them on my YouTube channel.
      - Participated in my first college hackathon during freshman year, developing an end to end blockchain based escrow system.
      - Contributed to open source through GSSoC 2026, with 7 pull requests merged across 3 projects and a global rank of 287 in the first few weeks.
      - Lead a 4 member team to the IIT Madras CoeRS Road Safety Hackathon Finals on campus, being one of the 21 teams that were selected out of 6200 submissions.
      When I'm not trying to understand, break and build things,you'll find me watching movies and documentaries, sketching, and probably playing a sport once in a while.
      I love talking to people and learning from them so if you've built or found out about something new, I'd love to hear it out.
      I'm always open for project collaborations, research opportunities, internships and intellectual discussions. 
      Reach out if you're building something that requires more than one kind of thinking.
      `,
    },
  ],

  // Tags shown on the right panel
  skills: [
    "Python", "C++", "NumPy",
    "Agentic AI", "Technical Writing", "MathJax", "LaTeX",
    "CLI Tools", "Research", "Prompt Engineering"
  ],
};

// =============================================================================
//  PROJECTS
//  All fields except `title` are optional.
//  ─ `status`  : "Shipped" | "In Progress" | "Local" | "Archived"
//  ─ `github`  : full GitHub URL (or "" to hide button)
//  ─ `link`    : live/demo URL  (or "" to hide button)
//  ─ `whyMade`, `contribution`, `howItWorks`, `whatILearnt`: project story sections.
//  ─ `images`  : Ordered gallery entries. Use a path string or
//                { src, alt, caption }. Put files in public/images/projects/.
//                Example: images: ["/images/projects/my-project/overview.jpg"]
//  ─ `details` : Legacy extended notes, used as the fallback for `whatILearnt`.
// =============================================================================
export const PROJECTS = [
  {
    id: "prod1",
    title: "DriveLegal (AI-Assist)",
    description: "A road-safety chatbot powered by AI that answers legal and road safety questions in plain language.",
    tech: ["Python", "Qdrant", "RAG", "LangChain", "Ollama", "Mistral"],
    status: "Local",
    github: "https://github.com/sohmh/DriveLegal",
    link: "",
    whyMade: "I registered for the IIT Madras Road Safety Hackathon along with three of my friends, picked a problem statement I liked.",
    contribution: "I designed and built everything : the RAG system, chose the local model, and built the end-to-end pipeline (while my teammates provided me with traffic rule data) and then I submitted the project code, made a ppt and a youtube video demo for the first round and that got us selected for the finals. After selection, I handled the remaining core work while my teammate anurag added authentication, leaderboards, a larger database, and shambhuraje and sanskar fetched more traffic-rule data for the database.",
    howItWorks: "Official traffic-rule PDFs are extracted and split into chunks. The chunks are embedded and stored in Qdrant. A user's question is embedded too; the closest matching chunks are retrieved and passed to the language model as context. The challan calculator uses exact JSON data instead of vector search.",
    images: [
      "/images/projects/drvlgl1.png",
      "/images/projects/drvlgl2.png",
      "/images/projects/drvlgl3.png",
    ],
    details: " Here's some things I learnt : 1. How Retrieval Augmented Generation (RAG) works (surface-level understanding): The data for the rules (PDFs from official government sites) had its text extracted, split into chunks, and converted into numerical arrays called vector embeddings. The user's query is also converted into a vector, and the system finds the closest matching chunks. Those chunks are passed as context to the LLM to generate an answer. I chose RAG because I didn't want a hallucinating chatbot. I'd love to study the math behind all of this and build a system like it from scratch, without AI assistance, in the future. 2. Choosing the right database for the job: I used a vector store to search the legal documents, but a JSON dataset for the challan calculator, because fine amounts are exact, not approximate. Knowing which storage solution fits which job is important in system design. 3. Running AI models locally: When OpenAI API credits werent available, I learned how to swap to a locally run model (Mistral) using Ollama.", // ← paste your extended write-up here
  },
  {
    id: "prod2",
    title: "LockChain (AI-Assist)",
    description: "Escrow-based secure checkout system using blockchain — removes trust gaps between buyers and sellers.",
    tech: ["Blockchain", "Solidity", "Web3", "React"],
    status: "Shipped",
    github: "https://github.com/sohmh/MerkleMavericksCode",
    link: "https://merkle-mavericks-code.vercel.app/",
    whyMade: "Made as a submission in the 24 Hours of the Ignition Hackathon",
    howItWorks: "The project explores a checkout flow that protects both sides of a transaction by holding payment in escrow until the agreed conditions are met. It is a Solidity escrow contract deployed on Remix IDE which coordinates the buyer, seller, and release conditions. The React and Web3 interface connects wallets (used MetaMask) and listens for contract events; Firebase stores application state that does not belong on chain.",
    images: [
     "/images/projects/lckchain1.png",
     "/images/projects/lckchain2.png",
     "/images/projects/lckchain3.png",
     "/images/projects/lckchain4.png",
     "/images/projects/lckchain5.png",
    ],
    details: "I studied the basic conceptual architecture behind blockchain technology. 1.Smart contracts : self executing code which enforces agreements between roles without intermediary. The escrow pattern used three roles and one contract. , 2.Block hash chaining : why blockchain data is effectively immutable. Each block has the hash of the one before it and tampering with one hence breaks the entire chain as all hashes are lost successively. 3. Consensus & voting systems : how decentralized netowkrs agree on a state without an authority., 4. Web3 frontend plumbing : wallets, testnets, event listeners and why an offchain state (we used firebase) is still necessary for things the ssmart contract can't handle ", // ← paste your extended write-up here
  },
  {
    id: "prod3",
    title: "Validating the Venturi Ground Effect",
    description: "A physical model and a simulation to validate the physics behind ground effect.",
    skill: ["Fluid Mechanics", "SimScale", "Low Fidelity Prototyping"],
    status: "Built",
    github: "https://github.com/sohmh/Ground-Effect-Validation",
    link: "https://youtu.be/R6uJc3Jc2-Y?si=P8ameIWsBr50hFYW",
    whyMade: "I wanted to test the ground-effect pressure drop behind race-car aerodynamics using both a physical model and a simulation.",
    contribution: "I modeled the tunnel in TinkerCad, then built a cardboard prototype with my teammate Akhilesh. Then I set up the inlet, outlet, mesh, and CFD run in SimScale.",
    howItWorks: "The narrowed tunnel throat accelerates airflow and lowers pressure as a fan pulls air through the cardboard model and the tissue paper attached above a slit in the narrow part gets sucked in, while the SimScale CFD run visualizes the same flow and pressure change governed by the ground tunnel effecct ",
    images: [
      "/images/projects/grndef1.png",
      "/images/projects/grndef2.png",
      "/images/projects/grndef3.png",
      "/images/projects/grndef4.png",
      "/images/projects/grndef5.png",
      "/images/projects/grndef6.png",
      "/images/projects/grndef7.png",
    ],
    details: "Made this project as I went deeper into the motorsports rabbit hole. Specifically how ground effect basically turns a car's underbody into a giant Venturi that sucks it onto the track.I wanted to see that pressure drop happen in real life, not just stare at diagrams. So I modeled a tiny ground tunnel in TinkerCad, exported the STL, and then rebuilt the same shape with cardboard and masking tape along with my teammate because sometimes you've gotta go analog (I could not have built the rig without him). I then imported the STL into SimScale, slapped on inlet/outlet boundary conditions, meshed it up, and ran the CFD sim. Meanwhile, the cardboard version got a fan taped to one end and a hole cut along the throat where the tunnel tightens. Stuck a tissue over it. Turned the fan on. The tissue immediately got pulled into the tunnel, no ambiguity, just a piece of paper getting vacuumed inward by the pressure differential on either side. Same physics showed up in the simulation streamlines and in my janky cardboard setup. Kind of wild that a principle keeping F1 cars planted at 300 km/h also works with masking tape and a CPU fan. ", // ← paste your extended write-up here
  },
  {
    id: "prod4",
    title: "Stardust : TIR Image Colorization (ISRO BAH 2026, Round 1)",
    description: "A Super-Resolution and RGB Colorization Workflow for Thermal Landsat images",
    tech: ["SRCNN", "Machine Learning", "Neural Networks"],
    status: "Not Built",
    github: "https://github.com/sohmh/superresolveandcolorize",
    link: "https://sohmh.github.io/superresolveandcolorize/workflow/",
    whyMade: "This was our Round 1 response to the ISRO Bharatiya Antariksh Hackathon problem on improving and colorizing Landsat thermal imagery.",
    contribution: "I lead planning the two-stage workflow and coordinate a four-person interdisciplinary team, matching team strengths to model architecture, signal processing, and physics-informed loss design.",
    howItWorks: "The proposed pipeline first uses SRCNN to increase thermal image resolution, then uses a Pix2Pix GAN conditioned on vegetation and land-use information to create an interpretable RGB view. It remained a plan; there is no working prototype.",
    images: [
      "/images/projects/isrobah1.png",
      "/images/projects/isrobah2.png",
      "/images/projects/isrobah3.png",
      "/images/projects/isrobah4.png",
      "/images/projects/isrobah5.png",
    ],
    details: "Built this as our team's Round 1 submission for ISRO's Bharatiya Antariksh Hackathon 2026, tackling infrared image colorization for Landsat 9 thermal data (Problem Statement PS10). Just to be upfront, this stayed at the planning/architecture stage since it was for the round 1 submission that we didn't clear, so no working prototype yet. But the amount I learned designing it made it worth it. Planned a two stage pipeline: first, an SRCNN model to super-resolve blurry 200m thermal images into sharp 100m ones (with a physics informed loss to keep predicted temperatures physically realistic so that there is no model hallucinating -40°C deserts). Second, a Pix2Pix GAN to colorize that thermal data into interpretable RGB, conditioned on vegetation index and land use type so it doesn't confuse a shadowed forest with a shadowed parking lot.Getting into the weeds of this taught me a lot about how models actually learn; forward passes, backprop, why GANs need a discriminator to avoid blurry outputs, why spectral normalization keeps that discriminator from overpowering the generator, and why train/test splits need to be done by entire scenes (not random patches) to avoid the model secretly cheating on nearby, near identical patches. Equally valuable was the experience I got from managing the team : this was a 4 person interdisciplinary team and figuring out how to map each person's strengths onto a concrete piece of the pipeline like physics-informed loss design, signal processing, model architecture and keep everyone aligned on a tight deadline was its own kind of learning.",
  },
  {
    id: "prod5",
    title: "Doppler Speed Detector",
    description: "A Radar inspired speed detector using the Doppler Theory",
    tech: ["Arduino UNO", "RCWL-0516", "Fritzing"],
    status: "Built",
    github: "https://github.com/ESMVEE/Doppler-Speed-Detector",
    link: "https://youtu.be/YSIZyew5K6U",
    whyMade: "I wanted to build a hands-on radar-inspired device and understand how the Doppler effect can be used to estimate speed.",
    contribution: "I built the detector around an RCWL-0516 sensor and Arduino UNO, read and conditioned the sensor signal, implemented the speed calculation, and displayed results on an LCD.",
    howItWorks: "The microwave sensor detects the Doppler shift from a moving object. The Arduino samples the resulting signal, estimates its frequency, applies the Doppler formula, and displays speed in km/h on a 16×2 LCD.",
    images: [
      "/images/projects/dplr1.png",
      "/images/projects/dplr2.png",
      "/images/projects/dplr3.png",
      "/images/projects/dplr4.png",
    ],
    details: "Built a radar inspired speed detector from scratch using an RCWL-0516 microwave sensor and an Arduino UNO. The sensor emits a 3.18 GHz signal; when it bounces off a moving object, the Doppler shift creates a beat frequency that the Arduino samples, crunches through the Doppler formula, and displays live speed in km/h on a 16x2 LCD. This was my first real electronics project : breadboards, datasheets, soldering fumes, the whole deal. While leading the team I learned how to read analog signals, do frequency estimation , condition noisy sensor data, and actually make a physical thing respond to code I wrote. It was genuinely fun going from how does radar even work? to waving my hand in front of a sensor and watching numbers pop up on a screen. Total build cost was under ₹900, took about two days, and taught me more about signal processing and hardware-software integration than any tutorial ever could. ",
  },

  {
    id: "prod6",
    title: "Physique Log",
    description: "A standalone mobile application that allows complete workout customization and daily progress tracking",
    tech: ["Android Studio"],
    status: "Shipped",
    github: "https://github.com/sohmh/Physique-Log-Application",
    link: "https://physique-log-application.vercel.app/",
    whyMade: "I wanted a mobile app where workouts can be customized and daily fitness progress can be tracked.",
    contribution: "This is a solo project. In terms of of open source, I hope people actually download the app from the repo and find it useful",
    howItWorks: "Frontend: HTML5, CSS3, JavaScript (Vanilla), Storage: Browser localStorage API,  Data Visualization: HTML5 Canvas for charts , Mobile Packaging: Capacitor , Build Tools: Node.js, npm",
    images: [
      "/images/projects/phylog1.png",
      "/images/projects/phylog2.png",
    ],
    details: "I had developed a practical system in a notebook to list workouts and track them daily. However, I faced two issues: 1. It was tiresome to carry a notebook and pencil everywhere , 2.Existing apps on the Play Store didn't allow fully customized workouts with personal diagrams and daily tracking. So I built Physique Log - a standalone mobile application that allows complete workout customization and daily progress tracking.",
  },
  // Add more projects here — they render automatically
];

// =============================================================================
//  EXPERIENCE
//  Add roles here; images can be added under public/images/experience/.
// =============================================================================
export const EXPERIENCES = [

    {
    id: "fitez",
    period: "September 2026 - Present",
    organization: "Fit Ez",
    role: "Web Development & SEO Intern",
    description: "I work with Fit Ez, a startup offering 1 on 1 diet coaching for weight loss, weight gain, and body recomposition, where I’m building the company’s website end to end. I work on the front end in HTML, CSS, and JavaScript. I also handled deployment on Cloudflare, connected the startup’s domain, and set up redirects from their old domains so existing links and traffic carried over to the new site. On top of the build, I’m working on search engine optimization so the site can be found by people looking for coaching online. Working on the pipeline from code to live site to discoverability has taught me how a real product goes from idea to something customers can actually find and use.",
    images: [
      "/images/exp/dauss.png",
    ],
  },
  {
    id: "dauss",
    period: "April 2026 - Present",
    organization: "DAUSS",
    role: "Embedded Systems & AI Trainee",
    description: "I’m part of the embedded systems team at DAUSS (Defense Aerial Unmanned Surveillance Sentinel), our college’s club that designs and builds fixed-wing UAVs. At the moment I’m learning the hardware side of flight: getting hands-on with the sensors a UAV depends on and studying the CrossFlight microcontroller that ties them together. It’s an early, learning-focused stage.",
    images: [
      "/images/exp/dauss.png",
    ],
  },
  {
    id: "aIDEAS",
    period: "August 2026 - Present",
    organization: "aIDEAS PVG",
    role: "Sponsorship & Public Relations Member",
    description: "I am a member of the Sponsorship & Public Relations Team at the AI & Data Science Department Club in my college. I write cold outreach emails, approach companies, and pitch our event and what we offer to potential sponsors. I chose this team over a technical one on purpose: I wanted hands-on exposure to how event finances are managed, how to frame a pitch for different audiences, and how to generate and follow up on leads. It’s still early and I’m learning as I go, mostly through iterating on outreach and seeing what gets a reply, but it’s already teaching me skills that technical work alone doesn’t.",
    images: [
      "/images/exp/aIDEASsponsor.jpg",
    ],
  },

  {
    id: "coers-copilot-crew",
    period: "May 2026 - July 2026",
    organization: "IIT Madras CoERS Road Safety Hackathon",
    role: "Team Lead, Copilot Crew",
    description: "As Team Leader of Copilot Crew, I ideated and independently developed the entire DriveLegal v1, taking ownership of its core architecture, technology choices, and initial implementation. I made the key decisions to adopt a Retrieval-Augmented Generation (RAG) framework, host a local language model, design the v1 user interface, and integrate the project's core components, while coordinating with teammates who contributed traffic rule data. I led the submission process by preparing and submitting the project code, producing a YouTube demonstration video, and creating the presentation for the IIT Madras CoERS Road Safety Hackathon, resulting in our team being selected for the final rounds. Following our selection, I transitioned from hands-on development to team orchestration, assessing individual strengths and delegating responsibilities across UI development, leaderboard implementation, JWT authentication, and traffic rule data collection. This experience strengthened my ability to take a project from ideation to a functional prototype, make critical technical decisions, lead execution under hackathon deadlines, and manage a technical team competing at a national-level road safety hackathon.",
    images: [
      "/images/exp/coers1.JPG",
      "/images/exp/coers2.JPG",
      "/images/exp/coers3.JPG",
      "/images/exp/coers4.jpg",
      "/images/exp/coers5.jpg",
    ],
  },

  {
    id: "gssoc-2026",
    period: "May 2026 - June 2026",
    organization: "GirlScript Summer of Code",
    role: "Open Source Contributor",
    description: "Merged 6 PRs across 3 Different Projects, maintaining a global rank of 287 in the first few weeks. At the end of the program, finished in the top 4% with a rank of 2289 among 47926 participants . 1. Algo :  Contributed to an educational learning platform by implementing persistent quiz and leaderboard data using Node.js, Express, SQLite, and Sequelize,  optimizing static image assets with Pillow/WebP and improving navigation UX through active state styling and dark mode support. 2.FinanceFlow :  Built a scalable topic based learning architecture using Next.js dynamic routes, centralized roadmap data, and reusable components. Implemented persistent progress tracking with localStorage and integrated curated learning resources including videos and recommended books. 3. NPMChat : Strengthened a React/TypeScript chat application's type safety by defining structured interfaces for authentication context, users, and application state. Refactored backend signup handling to standardize profile image data around avatarUrl, improving consistency between API payloads, controllers, and database models.",
    images: [
      "/images/exp/gssoc1.png",
      "/images/exp/gssoc2.png",
      "/images/exp/gssoc3.png",
      "/images/exp/gssoc4.png",
      "/images/exp/gssoc5.png",
      "/images/exp/gssoc6.png",
      "/images/exp/gssoc7.png",
      "/images/exp/gssoc8.png",
    ],
  },
  {
    id: "youtube",
    period: "April 2026 - Present",
    organization: "Youtube",
    role: "Content Creator",
    description: "I run a YouTube channel where I explain my projects in a narrative style: the concepts behind them, how they work, what I built, and where things broke along the way. Rather than showing only the polished end result, I walk through the process, including the failed attempts and debugging, because that’s where most of the learning happens. The channel has grown to 100+ subscribers, and my most watched video has crossed 300 views.",
    images: [
      "/images/exp/yt.png",
    ],
  },
  {
    id: "maverick",
    period: "April 2026 - July 2026",
    organization: "Team Maverick",
    role: "Aerodynamics Trainee",
    description: "I didn't contribute anything to the car or the team and had left in the training phase due to different projected goals. I Joined the team driven by a genuine interest in motorsport physics and high performance engineering.  Developed foundational knowledge across: - Aerodynamics & Fluid Mechanics: Airfoil theory, lift & drag, downforce, boundary layer behavior. - Race Physics: Vehicle dynamics (roll, pitch, yaw, slip angle, toe, camber, caster), race lines, grip mechanics,  etc. - Materials & Car Architecture: Stress strain behavior, stiffness, toughness, component selection, subsystem  interactions and engineering tradeoffs. - An Idea about how data acquisition works : How sensor data is collected by the daq team and used by the aero team to evaluate and iterate wing elements. This experience pointed me toward studying computational physics, specifically applying numerical methods and simulation to physics problems. Genuinely goated team. The seniors here carry deep technical knowledge across domains that goes way beyond what any classroom teaches plus they put their heart & soul into teaching the trainees",
    images: [
      "/images/exp/fsae1.png",
      "/images/exp/fsae2.png",
    ],
  },
];

// =============================================================================
//  UPDATES
//  Short timeline of site/life updates shown on the About page right panel.
// =============================================================================
export const UPDATES = [
  {
    date: "10-06-26",
    title: "Aavishkar Reseacrh Competition Zonal Round",
    text: "Presented my Research Project 'LoomSet' at the Aavishkar Research Competition's Zonal Round",
  },
  {
    date: "8-24-26",
    title: "Redesigned my portfolio",
    text: "Migrated to a retro themed simple site",
  },
  {
    date: "16-07-26",
    title: "IIT Madras Road Safety Hackathon Finale",
    text: "Visited the IIT Madras campus, leading team Copilot Crew for the IIT Madras Road Safety Hackathon.",
  },
  {
    date: "1-07-26",
    title: "ISRO Bharatiya Antariksh Hackathon R1",
    text: "Made the Round 1 Submission for ISRO BAH on the Super resolution and Colorization problem.",
  },
  {
    date: "12-05-26",
    title: "GirlScript Summer of Code - GSSoC",
    text: "In 12 days, managed to get 6 PRs merged across 3 projects with highest global rank of 200 and 2230 total points.",
  },
  {
    date: "3-05-26",
    title: "HackStreet Frontend Hackathon",
    text: "A 6 hour online hackathon, built a cryptocurrency dashboard",
  },
  {
    date: "30-04-26",
    title: "Vishwanova Weboreel Hackathon",
    text: "Vibecoded games for the Weboreel Platform.",
  },
  {
    date: "3-04-26",
    title: "Ignition Hackverse PVGCOET FInale",
    text: "First Hackathon, 24HR Finale Round at PVGCOEt, built LockChain.",
  },
  {
    date: "30-03-26",
    title: "Built a Personal Website",
    text: "Launched my website, you're looking at it.",
  },
    {
    date: "7-03-26",
    title: "War of Words Finale - Spectrum 2K26 PCCOE",
    text: "Climbed my way up to the final round of the english debate at PCCOE Spectrum.",
  },
  // Add new updates here — they show newest first
];

// =============================================================================
//  BLOG POSTS
//  ─ `body`      : Full post text. Write it as plain text with \n\n for
//                  paragraph breaks. Or leave empty and set `mediumUrl` instead.
//  ─ `mediumUrl` : If set, a "Read on Medium →" button appears.
//  ─ `image`     : Set to an imported image for a cover photo, or null.
//  ─ `tags`      : Array of tag strings.
// =============================================================================
export const BLOG_POSTS = [
  {
    id: "post-1",
    date: "02-07-26",
    title: "Why I lean towards generalization across different domains.",
    excerpt: "Why I'm trying to be a polymath.",
    // Paste your full post text here between the backticks:
    body: `All of us have a purpose, to contribute in making or building something in the future. We think we might as well get paid for it as part of an occupation. 
    So we start preparing ourselves to become capable. I think there is more than one way to do this :
    A College Degree ; This is the most sought-after and popular way to become capable of being employed or building something.
    Almost everyone pursues a college degree to become an engineer (and other degrees as well but I am speaking for engineers only,
    because I’m doing the same thing). This is where a group of professionals , who have made themselves capable by building things put together a curriculum for you to study.
    Now this curriculum works on what I call ‘generalization across the same domain’, (this domain being your own degree specialization). Here, the organization has no idea what
    type of job role you might land or what type of project you want to build and that’s why they put almost every general thing related to your domain in the curriculum.
    Here, students learn a little bit of everything to pass their exams and many have to learn additional things when they get a job offer that requires them to do work needing
    different skills than what the course taught them. A lot of time is also wasted in learning things they’ll probably never use in their work.
    But even though I criticize this system , it is probably the safest system for a lot of individuals.`,
    mediumUrl: "https://medium.com/@esmvee2006/why-i-lean-towards-generalization-across-different-domains-66f95c6705e1", // e.g. "https://medium.com/@smv07/my-post-slug"
    image: null,   // e.g. blogCover1
    tags: ["polymath"],
  },
  {
    id: "post-2",
    date: "06-02-26",
    title: "Why most people remain the same throughout their life.",
    excerpt: "Changing is difficult",
    body: `We are effectively conditioned to become who we are because of the environment & people around us. One can tell a lot about a person based off of the people around them & the environment they live in. Human lives come embedded with ambition. A life without ambition is as good as no life at all in my opinion. Chasing certain ambitions requires us to change in a way that provides us a favor towards achieving it. But maximum number of individuals will spend their life trying to jump from one ambition to another because they can’t achieve one as they find it hard to change.To change a thing about oneself is difficult. To change oneself is arduous.
    Why? Because changing oneself is, even though one might find it hard to believe not completely in one’s own hands. The way one acts is because of the environment around him & he has been conditioned in a way to react to it for all the time he has lived.
    To change oneself demands acting against to your conditioning that you have followed for so long. To act differently than your usual self feels unsettling because it feels like you’re losing your identity. Let me give you an example; I’m partial to a cup of tea in the morning and the evening. I like it so much so that everyone who knows me knows that I love me some tea. So whenever I’m with my relatives or friends , they say things like, “You like tea, have some/Let’s have some”. I’m almost known for loving tea. But its not healthy for me & it leads to body heat issues. But saying ‘no’ to tea feels uncomfortable or wrong because I’ve been doing it for so long that it feels like a part of my identity & if I do say no then I will lose those conversations with people about tea. This is just an example of why going against the things you are usually inclined to do feels so uncomfortable.
    Deviating from your intuitive actions feels unsettling because you’re moving towards losing a part of your identity. But if you create a new part/analog to the element you wish to deviate from then the process of doing so will be much easier. It’s important to remember that this analog must be realistic & explicitly defined.`,
    mediumUrl: "https://medium.com/@esmvee2006/why-most-people-remain-the-same-throughout-their-life-91263e54cce9",
    image: null,
    tags: ["Writing"],
  },
  
];

// Blog categories — computed automatically, or override here
export const BLOG_CATEGORIES = [
  { name: "Engineering", count: 21 },
  { name: "Writing", count: 9 },
  { name: "Career", count: 7 },
  { name: "Tools", count: 5 },
];

// =============================================================================
//  VIDEOS
//  ─ `youtubeId` : The part after ?v= in a YouTube URL. E.g. for
//                  https://www.youtube.com/watch?v=dQw4w9WgXcQ
//                  set youtubeId: "dQw4w9WgXcQ"
//  ─ Leave youtubeId as "" to show only the list item without an embed.
// =============================================================================
export const VIDEOS = [
  {
    id: "1",
    title: "IIT Madras CoERS Road Safety Hackathon Finals",
    duration: "6:42",
    youtubeId: "https://youtu.be/BsojqbPVORk", // paste your YouTube video ID here
  },
  {
    id: "2",
    title: "DriveLegal : A Road Safety Chatbot",
    duration: "2:12",
    youtubeId: "https://youtu.be/WV1UiILqcWk", 
  },
  {
    id: "3",
    title: "Team Kranti Project Demo - SIH26122",
    duration: "4:12",
    youtubeId: "https://youtu.be/PFpV1bBZkeE", // paste your YouTube video ID here
  },
  {
    id: "4",
    title: "Validating the Ground Effect",
    duration: "2:18",
    youtubeId: "https://youtu.be/R6uJc3Jc2-Y",
  },
  {
    id: "5",
    title: "LockChain : Escrow Based Secure Checkout System",
    duration: "6:42",
    youtubeId: "https://youtu.be/Hd92UBj7EZA",
  },
  {
    id: "6",
    title: "Doppler Speed Detector",
    duration: "1:21",
    youtubeId: "https://youtu.be/YSIZyew5K6U",
  },
];

export const FEATURED_VIDEO = {
  title: "IIT Madras CoERS Road Safety Hackathon Finals",
  description: "Explaining DriveLegal, the project that got us to the IITM CoERS Road Safety Hackathon Finals.",
  youtubeId: "https://youtu.be/BsojqbPVORk", // paste the featured video's YouTube ID here
};

// =============================================================================
//  CREDENTIALS  (Education & Certifications)
// =============================================================================
export const CREDENTIALS = {
  education: [
    {
      period: "2025 — Present",
      title: "B.Tech AI & Data Science Engineering",
      institution: "PVGCOET, Pune",
      detail: "Sophomore year. Focus on machine learning, math, and technical writing.",
    },
    {
      period: "2023 — 2025",
      title: "High School",
      institution: "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
      detail: "HSC PCM+CS Bifocal, JEE 83.65, MHTCET 97.36%, IAT Rank 65K, also gave NEST",
    },
    {
      period: "2013 — 2023",
      title: "School",
      institution: "Bharatiya Vidya Bhavan's Paranjape Vidya Mandir, Kothrud, Pune",
      detail: "SSC 94%",
    },
    // Add more entries here
  ],
  certifications: [
    // Legacy entries (no file/link) — still render fine
    // { period: "2025", title: "Example Cert" },
  ],
  stack: [
    "Python", "C++", "NumPy", "MathJax", "Android Studio", "Vercel", "Supabase",
    "LaTeX", "Git", "Github", "Agentic AI",
  ],
};

// =============================================================================
//  CERTIFICATES
//  Dedicated certificate cards shown on the Credentials page right panel.
//
//  ─ `title`  : Certificate name (required)
//  ─ `issuer` : Who issued it — Coursera, NPTEL, Google, etc.
//  ─ `date`   : Month / year string
//  ─ `file`   : Filename inside public/certificates/ — e.g. "my-cert.pdf"
//               Drop the file there and reference it here. It will be
//               served at /certificates/my-cert.pdf and open in the browser.
//  ─ `link`   : External verification URL (Credly, Coursera, LinkedIn, etc.)
//               Leave "" to hide. Both `file` and `link` can be set together.
// =============================================================================
export const CERTIFICATES = [
   {
     title:  "Web Scraping with Python",
     issuer: "Duke University + Coursera",
     date:   "September 2026",
     file:   "Webscraping.pdf",    // file in public/certificates/
     link:   "https://www.coursera.org/account/accomplishments/verify/QHY8RB157T33", // external verify URL
   },
   {
     title:  "Python",
     issuer: "Kaggle",
     date:   "April 2026",
     file:   "PythonKaggle.png",    // file in public/certificates/
     link:   "https://www.kaggle.com/learn/certification/sohamguravsmv/python", // external verify URL
   },
   {
     title:  "AI Essentials",
     issuer: "Google + Coursera",
     date:   "December 2025",
     file:   "GoogleAIEss.pdf",    // file in public/certificates/
     link:   "https://www.credly.com/badges/cb2859ff-82d4-4930-a378-6b806e27a603/linked_in_profile", // external verify URL
   },
   {
     title:  "Onramp",
     issuer: "MATLAB",
     date:   "December 2025",
     file:   "MATLABonramp.pdf",    // file in public/certificates/
     link:   "https://matlabacademy.mathworks.com/progress/share/certificate.html?id=0cc77031-680a-46d3-abb7-476cb7f59dc7&", // external verify URL
   },
   {
     title:  "Solving Ordinary Differential Equations",
     issuer: "MATLAB",
     date:   "April 2025",
     file:   "MATLABOde.pdf",    // file in public/certificates/
     link:   "https://matlabacademy.mathworks.com/progress/share/certificate.html?id=4251deae-692f-4d3a-b44c-7bbfb7ae0ad8&", // external verify URL
   },
];


// =============================================================================
//  EVENTS
//  ─ `date`     : Event date string
//  ─ `location` : City / Remote / Online
//  ─ `title`    : Event name
//  ─ `detail`   : Short description (optional)
//  ─ `file`     : Certificate filename in public/certificates/ (optional)
//  ─ `link`     : External link — event page, certificate verify URL, etc.
// =============================================================================
export const EVENTS = {
  list: [

    {
      date: "16-07-26",
      location: "IIT Madras",
      title: "Road Safety Hackathon Finale",
      detail: "Lead Team Copilot Crew at the Road Safety Hackathon Finale at IIT Madras",
      file: "BIMSTEC.jpeg",
      link: "https://lnkd.in/p/dY95k7wG",
    },
    {
      date: "01-07-26",
      location: "Remote",
      title: "ISRO Bharatiya Antariksh Hackathon ",
      detail: "Completed Round 1 Submission for the ISRO BAH 2026",
      file: "ISROBAH2026.pdf",
      link: "",
    },
    {
      date: "03-05-26",
      location: "Remote",
      title: "Hackstreet 2K26 : Frontend AI Hackathon ",
      detail: "Participated in the 6 HR Online Hackathon , built a cryptocurrency analytics dashboard",
      file: "HackStreet.png",
      link: "",
    },
    {
      date: "30-04-26",
      location: "Remote",
      title: "Vishwanova Weboreel AI Hackathon",
      detail: "Participated in the month-long AI Hackathon, contributing to vibecoded games on the Weboreel Platform",
      file: "Vishwanova.png",
      link: "",
    },
    {
      date: "3-4-26",
      location: "Pune, India",
      title: "Ignition Hackverse Finals PVGCOET",
      detail: "Participated in the 24HR Finale of Ignition Hackverse by PVGCOET.",
      file: "IgnitionHackverse.jpeg",
      link: "https://lnkd.in/p/dim65wuS",
    },
    {
      date: "7-3-26",
      location: "Pimpri Chinchwad, Pune, India",
      title: "War Of Words - Spectrum 2k26",
      detail: "Finalist in the English Debate at Spectrum 2K26 by PCCOE Pimpri",
      file: "WarOfWords.pdf",
      link: "https://lnkd.in/p/dWCS67-a",
    },
    // Add more events here
  ],
  // Add filenames for photos saved in public/images/events/.
  // The gallery changes to the next image every 5 seconds.
  gallery: [
     "certcollectbimstec.JPG",
     "pitchbimstec.JPG",
     "supercomp.jpg",
     "warofwords.jpeg",
  ],
};


// =============================================================================
//  NOTES  (Short-form thoughts / quick notes)
// =============================================================================
// Add an optional external URL as `link` to show an "Open link" button.
export const NOTES = [

   {
     date: "23-9-26",
     text: "Web Scraping with Python.",
     link: "https://github.com/sohmh/notes/tree/main/Web%20Scraping%20with%20Python%20-%20Duke%20University",
     tags: ["Jupyter Notebook"],
   },
  // Add more notes here — they'll show up automatically
];

export const NOTES_TAGS = ["process", "tools", "writing", "ai", "habits"];

// =============================================================================
//  CONTACT
//  NOTE: You can include or omit the @ symbol for handles — it's stripped
//        automatically wherever URLs are built. Leave any field as "" to hide it.
// =============================================================================
export const CONTACT = {
  email: "sohamsgurav2006@gmail.com",
  location: "Pune, India",
  github: "sohmh",              // GitHub username (@ is stripped for API/links)
  linkedin: "/in/sohamgurav25", // LinkedIn slug e.g. /in/your-name
  twitter: "7smv25",            // Twitter/X handle — leave "" to hide
  medium: "https://medium.com/@esmvee2006",
  leetcode: "sohmh",              // ← add your LeetCode username here (used for heatmap)
  researchgate : "https://www.researchgate.net/profile/Soham-Gurav",
  letterboxd : "https://letterboxd.com/sohmh/",
  spotify : "https://open.spotify.com/user/31msgtkwdrv4ci62z6otf67kuaoe?si=2569090095054303"
};

// =============================================================================
//  SYSTEM MESSAGE  (shown at the bottom of the main area)
// =============================================================================
export const SYSTEM_MESSAGE =
  "I'm always open to discussing new projects, opportunities, collaborations, " +
  "and intellectual discussions. Feel free to reach out through any of the platforms in the contacts section.";

// =============================================================================
//  STATUS BAR
// =============================================================================
export const STATUS_BAR = {
  left: "Connected, Session is Active",
  visitorsToday: 372, // update or hook into an analytics API
};
