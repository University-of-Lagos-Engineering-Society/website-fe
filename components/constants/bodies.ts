/**
 * Departmental bodies and ULES sub-bodies, rendered by `/associations`.
 *
 * `body` is newline-delimited prose — `BodyCard` renders it with
 * `whitespace-pre-line`, so a blank line between paragraphs survives to the
 * page. `imageWidth`/`imageHeight` are the logo's natural size at 1x; null
 * falls back to 200×200 in the card.
 */
export const DEPARTMENTAL_BODIES = [
  {
    id: 0,
    imageSrc: '/associations/ases.png',
    imageWidth: null,
    imageHeight: null,
    name: 'ASES Unilag',
    tagline: 'Association of Systems Engineering Students',
    body:
      'Originally founded as the Engineering Analysis unit in 1973 and chartered as a full department in 2000, Systems Engineering is an inherently interdisciplinary field synthesizing AI, robotics, control systems, and operations research. The department houses the renowned Artificial Intelligence and Robotics Laboratory (AIRLAB), where students routinely build autonomous systems that win national design awards.\n\n' +
      'The Association of Systems Engineering Students (ASES) is a hyper-organized student body currently led (2025/2026) by President Eva Chiku Isani. ASES runs a massive portfolio of events: the "Acada Talks" series for mentorship, the Impact Youth Outreach, the inter-departmental ASES/SEES Games, and its flagship "Synergy" conference. Systems Engineering demands extreme academic rigor, famously producing legends like Omotuyi Oyindamola, who graduated with a flawless 5.00 CGPA in 2016. By mastering both cybernetics and industrial management, ASES members are uniquely poised to optimize national logistics and lead the AI revolution.',
    type: 'departmental',
  },
  {
    id: 1,
    imageSrc: '/associations/bmesa.png',
    imageWidth: null,
    imageHeight: null,
    name: 'BMESA Unilag',
    tagline: "Biomedical Engineering Students' Association",
    body:
      'Launched as a B.Eng. program in 2013, the Department of Biomedical Engineering is a decisive intervention into Nigeria\'s healthcare technology sector. Fusing engineering with medical science, students master anatomy, biomechanics, medical imaging, and biomaterials, leveraging proximity to the Lagos University Teaching Hospital (LUTH) for clinical real-world testing.\n\n' +
      'The Biomedical Engineering Students\' Association (BMESA) operates with a powerful vision: to be "Globally Minded, Impactful, and Future Ready." BMESA drives student development through its annual flagship biomedical innovation forum, "Bio-Drive," heavily supported by industry sponsors like JNC International and the Healthcare Federation of Nigeria. At Bio-Drive, students demo prototypes of low-cost ventilators, smart masks, and portable ECGs. Through peer tutorials and STEM outreach, BMESA is actively seeding a homegrown medical device manufacturing industry in Nigeria.',
    type: 'departmental',
  },
  {
    id: 2,
    imageSrc: '/associations/cess.png',
    imageWidth: null,
    imageHeight: null,
    name: 'CESS Unilag',
    tagline: 'Civil Engineering Students Society (NICE-SA Unilag)',
    body:
      'Forming the third pillar of the original 1964 establishment, the Department of Civil and Environmental Engineering trains students in the planning, design, and construction of vital infrastructure. Given the rapid urbanization of Lagos, the curriculum places a heavy premium on environmental sustainability, coastal protection, and geotechnical resilience, tackling local needs like flood management and novel concrete composites.\n\n' +
      'The Nigerian Institution of Civil Engineers Student Affiliate (NICE-SA UNILAG), also known as the Civil Engineering Student Society, bridges classroom theory with field execution. NICE-SA organizes robust technical visits to large-scale piling and bridge construction sites in Lagos. Its flagship event is the annual Civil Engineering Student Society (CESS) Conference. CESS 5.0, themed "Sustainable Infrastructure for Lagos," brought industry experts to campus to discuss green building and transport planning. The department consistently produces exceptional talent, such as David Akanmu, the 2022 valedictorian for Civil Engineering (with a CGPA near 4.9), who famously led student tech teams to build a footbridge prototype and co-founded an environmental NGO.',
    type: 'departmental',
  },
  {
    id: 3,
    imageSrc: '/associations/nammes.png',
    imageWidth: null,
    imageHeight: null,
    name: 'NAMMES Unilag',
    tagline: 'National Association of Metallurgical and Materials Engineering Students',
    body:
      'Created in 1973 to catalyze Nigeria\'s industrialization, the Department of Metallurgical and Materials Engineering forms the critical link between raw mineral extraction, refinement, and advanced materials design. The curriculum encompasses physical metallurgy, extractive processes, thermodynamics, and advanced composite characterization.\n\n' +
      'The National Association of Metallurgical and Materials Engineering Students (NAMMES) UNILAG Chapter organizes zonal technical workshops, leadership training, and plant visits to steelworks. NAMMES promotes highly multi-disciplinary skills, with its members frequently excelling across the entire engineering faculty.\n\n' +
      'Excellence Highlight: The department\'s absolute dominance was cemented recently when Clinton Mekwunye emerged not only as the Best Graduating Student of the Department of Metallurgical and Materials Engineering but as the overall Best Graduating Student in the entire Faculty of Engineering.',
    type: 'departmental',
  },
  {
    id: 4,
    imageSrc: '/associations/nimeche.png',
    imageWidth: null,
    imageHeight: null,
    name: 'NIMECHE Unilag',
    tagline: 'Nigerian Institution of Mechanical Engineers, UNILAG Student Forum',
    body:
      'When it moves... It\'s Mechanical\n\n' +
      'Founded in 1964 alongside the faculty\'s inception, the Department of Mechanical Engineering emphasizes solid mechanics, thermodynamics, machine design, and manufacturing. The department\'s historical trajectory is inextricably linked to the legacy of the late Professor Ayodele Awojobi, a mechanical engineering savant who joined the university in 1966. Professor Awojobi\'s groundbreaking invention of the "Autonov 1" in 1973, a bi-directional vehicle capable of moving forward and backward using dual steering wheels, established a lasting culture of audacious indigenous innovation.\n\n' +
      'The modern curriculum balances classical theory with contemporary demands, utilizing specialized modules in CNC and 3D printing. The Nigerian Institution of Mechanical Engineers (NIMechE) UNILAG Student Forum serves as the critical nexus between the academic environment and the professional industry. NIMechE executes a multifaceted mandate centered on professional development, organizing technical competitions and an annual flagship symposium. For example, the 2025 "Built to Evolve" symposium featured industry panels and a highly competitive "Innovate Local 3D Printing Challenge," where undergraduates showcased functional prototypes. By forcing students to secure sponsorships and present to industry leaders, NIMechE ensures graduates are primed to dominate Nigeria\'s manufacturing, automotive, and energy sectors.',
    type: 'departmental',
  },
  {
    id: 5,
    imageSrc: '/associations/nisgs.png',
    imageWidth: null,
    imageHeight: null,
    name: 'NISGS Unilag',
    tagline: 'Nigerian Institution of Surveying and Geoinformatics Students',
    body:
      'Formed in 1973, this department manages the critical science of spatial data, rapidly evolving from conventional surveying into advanced Geomatics Engineering. The curriculum is highly digitized, covering GIS, drone mapping, remote sensing, and hydrography. In a massive historical milestone, 2025 saw the first-ever graduates of UNILAG\'s Surveying department inducted as Graduate Members of the Nigerian Society of Engineers (NSE).\n\n' +
      'The Nigerian Institution of Surveying and Geoinformatics Students (NISGS) UNILAG Chapter is a fiercely competitive and career-focused organization. Its absolute flagship event is Survey Sphere, a multi-day knowledge marathon. Survey Sphere 4.0 (2026) provided hands-on training with DGPS, Total Stations, and ArcGIS, culminating in the maiden Geospatial Innovation Competition (GIC 1.0), which awarded N500,000 to the top student innovators. NISGS is academically lethal; in 2025, a UNILAG team won the World Hydrography Day research competition. Recent stars like Adewuyi Sheriff graduated with a 4.74 CGPA, winning Most Innovative Final Year Student and securing his place at the forefront of global spatial technology.',
    type: 'departmental',
  },
  {
    id: 6,
    imageSrc: '/associations/nsche.png',
    imageWidth: null,
    imageHeight: null,
    name: 'NSCHE Unilag',
    tagline: 'Nigerian Society of Chemical Engineers Unilag',
    body:
      'Established in 1973 by Professor Ayo Francis Ogunye (Nigeria\'s first Chemical Engineering professor at age 36), the Department of Chemical Engineering underpins the nation\'s petrochemical, pharmaceutical, and agro-allied sectors. The department is uniquely supported by the Professor Ayo Ogunye Trust Fund (PAFOTFUL), which has grown to hundreds of millions of Naira, funding massive research grants in green technology, bioplastics, and hybrid photocatalysis for pollution control.\n\n' +
      'The Nigerian Society of Chemical Engineers (NSChE) UNILAG Chapter, maintaining close ties with the national secretariat (located right at UNILAG), is a highly structured organization. Its flagship event is The ART (Academic & Resource Team) Grand Finale, an intense intellectual competition drawing universities across the state. The 2026 edition, themed "Chemical Engineering at the Intersection of Energy and Innovation," featured heavyweight corporate backing from Amazon Energy and NNEC. NSChE UNILAG also fosters remarkable ecological innovation, with student teams winning awards for "Project FLOAT" (a floating biogas latrine). Demonstrating elite leadership, recent graduates like Idrees Idrees served as NSChE President while graduating as the Best Graduating Student of Chemical Engineering in 2026.',
    type: 'departmental',
  },
  {
    id: 7,
    imageSrc: '/associations/sees.png',
    imageWidth: null,
    imageHeight: null,
    name: 'SEES Unilag',
    tagline: 'Society of Electrical and Electronics Engineering Students',
    body:
      'Also established in the foundational 1964/1965 academic session, the Department of Electrical and Electronics Engineering (encompassing Computer Engineering) is the engine driving Nigeria\'s digital and power infrastructure. The curriculum covers circuit theory, power systems, control theory, telecommunications, and increasingly, artificial intelligence and software engineering.\n\n' +
      'A monumental milestone in the department\'s history was the 2022 commissioning of a N70 million Digital Engineering Laboratory, donated by Siemens Energy. This end-to-end facility allows students to model complex power grids and automation processes in an industrial-grade simulation environment.\n\n' +
      'The student body operates through the Society of Electrical and Electronics Engineering Students (SEES) and a highly active IEEE Student Branch. SEES-UNILAG acts as an incubator for tech talent, hosting the SEES Innovation Hub, hackathons, and hardware workshops. The IEEE chapter frequently hosts high-level events, such as the IEEE Innovation Event on "Smart Grid Technologies." This environment breeds unparalleled excellence; a prime example is Arthur Enwelum, who graduated as the best student in EEE with a near-perfect 4.80/5.00 CGPA while serving as the IEEE Student Branch Robotics Team assistant lead.',
    type: 'departmental',
  },
  {
    id: 8,
    imageSrc: '/associations/spe.png',
    imageWidth: null,
    imageHeight: null,
    name: 'SPE Unilag',
    tagline: 'Society of Petroleum Engineers Unilag',
    body:
      'Growing out of the Chemical Engineering program in the 1970s to serve Nigeria\'s oil boom, the Department of Petroleum and Gas Engineering covers reservoir engineering, drilling, natural gas processing, and energy economics. Though UNILAG reportedly halted fresh admissions into the program in late 2025 to reflect the shifting global energy landscape, the department remains a titan of industry research.\n\n' +
      'The Society of Petroleum Engineers (SPE) UNILAG Chapter is arguably one of the most decorated student organizations on the continent. SPE UNILAG adapts brilliantly to the energy transition, welcoming students from geosciences, law, and other engineering fields to build a multidisciplinary powerhouse. Led by dynamic executives like President Samuel Akpu Uko, the chapter\'s flagship event is the Student Technical Conference (STC), featuring Petroquiz competitions and paper contests.\n\n' +
      'The chapter\'s dominance was on full display at the SPE Nigeria Annual International Conference and Exhibition (NAICE 2026), where they won Best Student Chapter for Membership Retention & Growth, secured 2nd place in the SPENC Chapter Contest, and won the SPENC Energy Challenge. Furthermore, demonstrating a pivot towards IoT and safety, students Samuel Uko and Ogboro Olaoluwa showcased an innovative "Smart Safety Helmet" at the SPE Africa Student Symposium (SAASC 2026) in Nairobi, proving that UNILAG students remain at the cutting edge of energy and industrial safety innovation.',
    type: 'departmental',
  },
];

export const SUB_BODIES = [
  {
    id: 0,
    imageSrc: '/associations/arb.png',
    imageWidth: 300,
    imageHeight: 107,
    name: 'ULES ARB',
    tagline: 'ULES Academic and Research Board',
    body: 'The Academic & Research Board of the University of Lagos Engineering Society (ULES ARB) is a student-led board at the University of Lagos Faculty of Engineering. It manages academic support, research competitions, tutorials, and capacity-building programs for undergraduate engineering students.',
    type: 'sub-bodies',
  },
  {
    id: 1,
    imageSrc: '/associations/ecx.png',
    imageWidth: 216,
    imageHeight: 135,
    name: 'ECX',
    tagline: 'Engineering Career Expo',
    body: 'The Engineering Career Expo (ECX) at the University of Lagos is a prominent, student-led initiative under the University of Lagos Engineering Society (ULES). It bridges the gap between academics and the tech/engineering industry by offering technical training, soft skills workshops, hackathons like HackX, and innovation pitch challenges.',
    type: 'sub-bodies',
  },
  {
    id: 2,
    imageSrc: '/associations/eli.png',
    imageWidth: 207,
    imageHeight: 200,
    name: 'ELI',
    tagline: 'Engineering Ladies Initiative',
    body: 'Engineering Ladies Initiative (ELI) is a specialized arm focused on supporting, empowering, and mentoring female engineering students through events like ELI Week, networking lunches, and career webinars.',
    type: 'sub-bodies',
  },
  {
    id: 3,
    imageSrc: '/associations/paadc.png',
    imageWidth: 300,
    imageHeight: 70,
    name: 'PAADC',
    tagline: 'Professor Ayodele Adejobi Design Competition',
    body: "PAADC stands for the Professor Ayodele Awojobi Design Competition. It is Nigeria's largest student-led, undergraduate STEM innovation competition, hosted annually through an initiative by the University of Lagos Engineering Society to reward students solving local societal challenges.",
    type: 'sub-bodies',
  },
  {
    id: 4,
    imageSrc: '/associations/pidec.png',
    imageWidth: 207,
    imageHeight: 200,
    name: 'PIDEC',
    tagline: 'Prototype Inter-Departmental Design Challenge',
    body: 'PIDEC is a faculty wide engineering competition created for students in the University of Lagos.\nThe competition is organised by ULES, the University of Lagos Engineering Society, to showcase engineering talent, encourage practical problem solving, and give departments a strong platform to build solutions with real world relevance.',
    type: 'sub-bodies',
  },
  {
    id: 5,
    imageSrc: '/associations/owls.png',
    imageWidth: 300,
    imageHeight: 168,
    name: 'ULES OWLS',
    tagline: 'ULES Oratory, Writers and Literacy Society',
    body: 'OWLS is a student-run sub-group in the University of Lagos Engineering Society focused on improving public speaking, creative writing, and literary skills among engineering students.',
    type: 'sub-bodies',
  },
];
