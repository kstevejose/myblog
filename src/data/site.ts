// ---------------------------------------------------------------------------
// Site content that is not blog posts.
// Seeded from the projects your existing posts describe — edit freely.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Steev Kundukulangara',
  role: 'Senior Technical Writer',
  location: 'Bengaluru, IN',
  email: 'sk@stevekundukulangara.com',
  blurb:
    'I build documentation systems, not documents. API references that generate themselves, style rules that run in CI, and content architecture that survives the fifth product release.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/kstevejose' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/steev-kundukulangara' },
    { label: 'X', href: 'https://twitter.com/steevkundukulangara' },
  ],
};

export type WorkItem = {
  id: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  stack: string[];
  outcome: string;
  href?: string;
  cover?: string;
};

export const work: WorkItem[] = [
  {
    id: '001',
    title: 'API Sculptor',
    summary:
      'A documentation system that treats an OpenAPI spec as the single source of truth, then sculpts client-specific reference sites out of it without ever forking the master file.',
    role: 'Design & build',
    year: '2025',
    stack: ['OpenAPI 3.1', 'Redocly CLI', 'Node', 'CI'],
    outcome: 'One spec, many audiences — no divergent copies to reconcile.',
    href: '/posts/sculptor/',
    cover: '/img/sculptor.png',
  },
  {
    id: '002',
    title: 'OpenAPI Architecture Explorer',
    summary:
      'A navigable map of a large, multi-file OpenAPI surface — paths, schemas, components and their dependencies — so writers can see what a change actually touches before making it.',
    role: 'Architecture & docs',
    year: '2025',
    stack: ['OpenAPI', 'Bundling', 'Static analysis'],
    outcome: 'Impact of a schema edit visible in seconds instead of guesswork.',
    href: '/posts/architecture/',
    cover: '/img/Architecture.png',
  },
  {
    id: '003',
    title: 'Redocly decorators pipeline',
    summary:
      'Non-destructive decorators that generate customised OpenAPI views per client at bundle time, leaving the master specification untouched.',
    role: 'Tooling',
    year: '2025',
    stack: ['Redocly', 'Decorators', 'YAML'],
    outcome: 'Client-specific docs with zero manual spec surgery.',
    href: '/posts/decorators/',
    cover: '/img/OpenAPI.PNG',
  },
  {
    id: '004',
    title: 'Vale in the writing loop',
    summary:
      'Style and terminology enforcement wired directly into the editor through VS Code tasks, so the linter runs against the file you are writing rather than in a separate tool.',
    role: 'Process design',
    year: '2025',
    stack: ['Vale CLI', 'VS Code tasks', 'Python'],
    outcome: 'Style feedback at authoring time, not review time.',
    href: '/posts/vale-cli/',
    cover: '/img/vale.PNG',
  },
  {
    id: '005',
    title: 'Docs-as-code pipeline',
    summary:
      'A full CI pipeline for product documentation — linting, link checking, build and deploy — giving docs the same release discipline as the code they describe.',
    role: 'Pipeline design',
    year: '2025',
    stack: ['Git', 'CI', 'Markdown', 'AsciiDoc'],
    outcome: 'Broken links and style drift caught before merge.',
    href: '/posts/doc-as-code/',
    cover: '/img/docascode.gif',
  },
  {
    id: '006',
    title: 'Stripe-grade API reference',
    summary:
      'A three-column, example-forward API reference built on open-source Docusaurus and Redoc — the Stripe reading experience without the Stripe budget.',
    role: 'Build',
    year: '2025',
    stack: ['Docusaurus', 'Redocusaurus', 'Redoc'],
    outcome: 'Reference docs developers actually finish reading.',
    href: '/posts/stripe/',
    cover: '/img/stripe.jpg',
  },
];

export type GalleryItem = {
  src: string;
  title: string;
  note: string;
  wide?: boolean;
};

// Built from the images already in your repo. Drop new files into
// public/img and add a row here — GIF and MP4 both work.
export const gallery: GalleryItem[] = [
  { src: '/img/docascode.gif', title: 'Docs as code', note: 'Animated explainer', wide: true },
  { src: '/img/sculptor.png', title: 'API Sculptor', note: 'System diagram' },
  { src: '/img/Architecture.png', title: 'OpenAPI architecture', note: 'Structure map' },
  { src: '/img/Components.PNG', title: 'Components', note: 'Reusable schema set' },
  { src: '/img/paths.PNG', title: 'Paths', note: 'Endpoint breakdown' },
  { src: '/img/Schemas.PNG', title: 'Schemas', note: 'Model reference' },
  { src: '/img/Parameters.PNG', title: 'Parameters', note: 'Request anatomy' },
  { src: '/img/tech.png', title: 'Why technical writers', note: 'Explainer', wide: true },
  { src: '/img/evolve.png', title: 'Evolve or dissolve', note: 'Opinion piece art' },
  { src: '/img/pola.png', title: 'Least astonishment', note: 'Concept illustration' },
  { src: '/img/vale.PNG', title: 'Vale CLI', note: 'Linting in practice' },
  { src: '/img/Storemain.PNG', title: 'Store API', note: 'Worked example' },
];

export type UsesGroup = { head: string; items: { name: string; note: string }[] };

export const uses: UsesGroup[] = [
  {
    head: 'Authoring',
    items: [
      { name: 'Oxygen XML', note: 'DITA source, shortdesc and searchtitle discipline' },
      { name: 'VS Code', note: 'Markdown, AsciiDoc, YAML — plus custom tasks' },
      { name: 'AsciiDoc', note: 'When Markdown runs out of road' },
      { name: 'Markdown', note: 'Everything else, including this site' },
    ],
  },
  {
    head: 'API documentation',
    items: [
      { name: 'OpenAPI 3.1', note: 'The contract everything else derives from' },
      { name: 'Redocly CLI', note: 'Split, lint, bundle, decorate' },
      { name: 'Redoc / Redocusaurus', note: 'Reference rendering' },
      { name: 'Swagger', note: 'Bundling and multi-file reuse' },
    ],
  },
  {
    head: 'Quality gates',
    items: [
      { name: 'Vale CLI', note: 'Style and terminology, run from the editor' },
      { name: 'Custom Python checks', note: 'Wired in through VS Code tasks' },
      { name: 'Link checking', note: 'In CI, before merge' },
      { name: 'Git', note: 'Docs reviewed like code' },
    ],
  },
  {
    head: 'Visual',
    items: [
      { name: 'Animated infographics', note: 'Rendered locally, published as GIF and MP4' },
      { name: 'Diagrams', note: 'SVG, hand-tuned rather than auto-laid-out' },
      { name: 'ffmpeg', note: 'Encoding and colour work' },
    ],
  },
];
