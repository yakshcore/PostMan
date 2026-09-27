import { EventConfig, CommunityPost } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1Xh1FwY4q6qUg3fUYpiOz-1PIO0Vei6xijmYtBblM_UA6nXRgVbnVfya7QPXBAUMhayf3-o8R7zVZ7Qnk9zawr7480vLapdr3c2rx_N_SrtDDsG_iTw3kheMgDeKx27CCJaJpbu5xBgXAijt7y3f8PTYy7LzK34SdsJA3sqUbtuc-UWnQV8Oa-vHwNrfT-iouPnmtBimiSo_S3pJ_l5QFtB4XHw9CWdFXAAXXhXkbqG1Us7hJ5IV170pVs',
  sarahAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClx4JL2MRoiJzrM43mfa_7nILDiYQsse96DTz-Zp2iEfk4lsEdIKahf1qS4hJdM-1c2BZvnr1Y5LnZ-zEF4ul2b0BRdaUfCtCX1xNSvrrEKJqKQcmj9QZVi2YM64Udj1GJih37GN6oJg1t57loEskyGVy27BllAljHyFR01--1uVyY2JIRSXltfy3wuvxkIP5HPcvR3dFU24quKuN0wKCSexjhBDMvjxwl5gM2RP4y1oCmJFfzhC_1',
  hackathonTeam: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcUEipWwtp4bH7TPey8ea9x_dnIphJ9RRopiaCh1H6vuGUKebUTta1BXmIrP4W8P1eAT-cManzBWAM6y-tOmZnf4BSM_-aF9CDG6tNNdXOLlkFzsrUTbpz1vejzDUjxZN4dsWutafNEB3Uco3uIPX_MZ8nhWjnatburzIvBgCcEN5VPJ7vNI3DQhvrdU4_VgIuIZjMwDDK9UI5h4bjsMeSLdhAYIMhC7SiAkZn5jpdNPgr3TowGIX9',
  bootcampCert: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwNoEkTfWGnhzX7LA6KGvomJQNHYwra7TgGvm4344O8nKRkeAE-ocAOkDeo38fG-buxogfdV8ZFnMhUDzXf8W_Z6RHh2zoFUTI0Skt6iwbiErpkI9P-NKhhMd3sIOq4hjFRhe7xpVUaJ5y3yGxmK-p3zxm3WCIqL7WLU35Wk46z1cCBaRWcxszxkajRTa2GfqPc33TY5UO88tTFt5zSWc06vkbpaK_uDewQ9XLvJldN5boQJwQpg5O'
};

export const INITIAL_EVENTS: EventConfig[] = [
  {
    id: 'google-h2s-2025',
    name: 'Google H2S Bootcamp 2025',
    organizer: 'Google for Developers',
    location: 'Mountain View Campus & Global Hybrid',
    date: 'March 2025',
    hashtags: ['#GoogleH2S', '#GoogleDevelopers', '#TechBootcamp2025', '#CloudSkills'],
    linkedinUrl: 'https://linkedin.com/company/google',
    twitterUrl: 'https://x.com/GoogleDevs',
    websiteUrl: 'https://developers.google.com/events/h2s-bootcamp',
    guidancePrompt: 'Learned scalable cloud architecture, built with Gemini API, and collaborated with 200+ top engineering fellows.',
    bannerImage: ASSETS.hackathonTeam,
    postsCount: 842,
    photosCount: 142,
    qualityScore: 4.9,
    shareSlug: 'google-h2s-2025'
  },
  {
    id: 'cloud-ai-summit-sf',
    name: 'Cloud AI Summit SF 2025',
    organizer: 'Google Cloud Platform',
    location: 'San Francisco, CA (Moscone Center)',
    date: 'April 2025',
    hashtags: ['#GoogleCloudSummit', '#VertexAI', '#EnterpriseGenAI', '#DevPulse'],
    linkedinUrl: 'https://linkedin.com/company/google-cloud',
    twitterUrl: 'https://x.com/googlecloud',
    websiteUrl: 'https://cloud.withgoogle.com/events/summit-sf',
    guidancePrompt: 'Explored frontier model reasoning, zero-latency vector pipelines, and connected with 1,500+ AI practitioners.',
    bannerImage: ASSETS.hackathonTeam,
    postsCount: 520,
    photosCount: 98,
    qualityScore: 4.8,
    shareSlug: 'cloud-ai-summit-sf'
  },
  {
    id: 'devfest-global-2025',
    name: 'DevFest Global hackathon',
    organizer: 'Google Developer Groups',
    location: 'Hybrid & 40+ Regional Hubs',
    date: 'May 2025',
    hashtags: ['#DevFest2025', '#GDG', '#BuiltWithGemini', '#CodeCollaborate'],
    linkedinUrl: 'https://linkedin.com/company/google',
    twitterUrl: 'https://x.com/GoogleDevs',
    websiteUrl: 'https://devfest.google.com',
    guidancePrompt: 'Shipped high-impact open source tools alongside passionate local community developers.',
    bannerImage: ASSETS.bootcampCert,
    postsCount: 310,
    photosCount: 64,
    qualityScore: 4.9,
    shareSlug: 'devfest-global-2025'
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Marcus Vance',
    authorRole: 'Cloud Fellow · 3 mins ago',
    authorInitials: 'MV',
    tone: 'Key Takeaways',
    snippet: 'Thrilled to finish day 3 of #GoogleH2S Bootcamp! Built our first Gemini-powered agent architecture with scalable Kubernetes pods...',
    fullContent: `Thrilled to finish day 3 of #GoogleH2S Bootcamp! Built our first Gemini-powered agent architecture with scalable Kubernetes pods.

Key reflections:
1. Context caching reduces cold start latencies by 60%
2. Distributed tracing across microservices saved us hours of triage
3. Pair programming with fellow engineers accelerated our MVP delivery

Huge thank you to @Google for Developers for setting the bar so high!

#GoogleH2S #GoogleDevelopers #CloudSkills #TechBootcamp2025`,
    status: 'Published to LinkedIn',
    timeAgo: '3 mins ago',
    likes: 48,
    comments: 14,
    reposts: 5,
    photos: [ASSETS.hackathonTeam]
  },
  {
    id: 'post-2',
    authorName: 'Priya Sharma',
    authorRole: 'ML Engineer · 8 mins ago',
    authorInitials: 'PS',
    tone: 'Thought Leader',
    snippet: "3 lessons on multi-modal latency from today's workshop at #GoogleDevelopers bootcamp. Big shoutout to our mentor squad!",
    fullContent: `3 lessons on multi-modal latency from today's workshop at #GoogleDevelopers bootcamp:

- Token streaming needs client-side backpressure handling
- Quantized embeddings provide 4x faster lookup speeds with negligible accuracy drop
- Human-in-the-loop validation builds trust into production workflows

Grateful to our mentors and organizers at @Google for Developers for this masterclass.

#GoogleH2S #GoogleDevelopers #CloudSkills #AIArchitecture`,
    status: 'Published to LinkedIn',
    timeAgo: '8 mins ago',
    likes: 92,
    comments: 26,
    reposts: 11,
    photos: [ASSETS.hackathonTeam, ASSETS.bootcampCert]
  },
  {
    id: 'post-3',
    authorName: 'David Chen',
    authorRole: 'Full Stack Dev · 14 mins ago',
    authorInitials: 'DC',
    tone: 'Attendee Hype',
    snippet: "Honored to be here in Mountain View for #GoogleH2S! Demoing our real-time translation app in under 1 hour. Let's build! 🚀",
    fullContent: `Honored to be here in Mountain View for #GoogleH2S! Demoing our real-time translation app in under 1 hour. Let's build! 🚀

The energy on campus is electric. Getting to work directly with senior staff engineers from Google and collaborate with brilliant minds from across the globe is an unforgettable milestone.

#GoogleH2S #GoogleDevelopers #TechBootcamp2025 #HackathonVibes`,
    status: 'Published to LinkedIn',
    timeAgo: '14 mins ago',
    likes: 67,
    comments: 18,
    reposts: 8,
    photos: [ASSETS.hackathonTeam]
  },
  {
    id: 'post-4',
    authorName: 'Aisha Larsson',
    authorRole: 'Data Scientist · 21 mins ago',
    authorInitials: 'AL',
    tone: 'Key Takeaways',
    snippet: "The future of enterprise analytics isn't just about faster queries, it's contextual memory. Key takeaway from the keynote at #CloudSkills...",
    fullContent: `The future of enterprise analytics isn't just about faster queries, it's contextual memory. Key takeaway from the keynote at #CloudSkills.

We spent the afternoon implementing vector memory stores that allow LLMs to retain multi-turn organizational knowledge without hallucinations.

Proud to be part of the Google H2S 2025 cohort!

#GoogleH2S #CloudSkills #GoogleDevelopers #DataScience`,
    status: 'Draft Copied',
    timeAgo: '21 mins ago',
    likes: 34,
    comments: 7,
    reposts: 2,
    photos: [ASSETS.bootcampCert]
  },
  {
    id: 'post-5',
    authorName: 'Elena Rostova',
    authorRole: 'Backend Engineer · 35 mins ago',
    authorInitials: 'ER',
    tone: 'Grateful Attendee',
    snippet: 'Beyond grateful for the mentorship from the Google Cloud engineering leaders. Deployed our first zero-latency pipeline today!',
    fullContent: `Beyond grateful for the mentorship from the Google Cloud engineering leaders. Deployed our first zero-latency pipeline today!

A massive thank you to everyone at @Google for Developers who made this bootcamp possible. The lessons in system design and resilience will stay with me throughout my career.

#GoogleH2S #GoogleDevelopers #CloudSkills`,
    status: 'Published to LinkedIn',
    timeAgo: '35 mins ago',
    likes: 112,
    comments: 29,
    reposts: 14,
    photos: [ASSETS.hackathonTeam, ASSETS.bootcampCert]
  }
];
