export type TestimonialPlatform = "Top.gg" | "DISBOARD";

export interface TestimonialEntry {
  id: string;
  username: string;
  platform: TestimonialPlatform;
  review: string;
  dateLabel: string;
  avatarSource: string;
  avatarNote: string;
  ratingLabel?: string | null;
  sourceUrl: string;
}

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function createPlaceholderAvatar(username: string, platform: TestimonialPlatform) {
  const seed = `${platform}:${username}`;
  const hash = hashString(seed);
  const hue = hash % 360;
  const hue2 = (hue + 28) % 360;
  const initials = username
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="hsl(${hue} 60% 52%)" />
          <stop offset="100%" stop-color="hsl(${hue2} 55% 34%)" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="24" fill="url(#g)" />
      <circle cx="28" cy="26" r="10" fill="rgba(255,255,255,0.15)" />
      <circle cx="70" cy="68" r="18" fill="rgba(255,255,255,0.08)" />
      <text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Space Grotesk, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="-1">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const topggSource = "https://top.gg/discord/servers/726701893311922176";
const disboardSource = "https://disboard.org/server/1263067254153805905";

export const testimonials: TestimonialEntry[] = [
  {
    id: "topgg-joseph",
    username: "Joseph",
    platform: "Top.gg",
    review:
      "As an Passionate Self-Taught Java developer there, I need to say that The CodeVerse Hub is not just another Programming community where people dismiss, its a community where you can meet people who actually understand what they are doing and why. they are Passionate and care about quality over noise. If you are looking for a space where you are respected and accepted, The CodeVerse Hub is exactly ...",
    dateLabel: "3 months ago",
    avatarSource: createPlaceholderAvatar("Joseph", "Top.gg"),
    avatarNote:
      "Generated placeholder avatar because Top.gg did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: topggSource,
  },
  {
    id: "topgg-davinia",
    username: "davinia_92",
    platform: "Top.gg",
    review:
      "I recently join this server. So far am very happy for joinning this community. I love the activeness of the members coz it makes it easier and faster to get answers that you need from someone with experince. you dont need to wait long to get help. is a good place to get good resources for learning. there is all type of memeber from beginners to advance and they all help. there is always room to im...",
    dateLabel: "9 months ago",
    avatarSource: createPlaceholderAvatar("davinia_92", "Top.gg"),
    avatarNote:
      "Generated placeholder avatar because Top.gg did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: topggSource,
  },
  {
    id: "topgg-hyscript7",
    username: "hyscript7",
    platform: "Top.gg",
    review:
      "I've been on this server since July, and it's one of the best programming communities I've been part of. It is very active and friendly, and it also focuses on other things besides IT. Even if you're a complete beginner, this server is sure to welcome you and assist you if you are stuck or need help.",
    dateLabel: "10 months ago",
    avatarSource: createPlaceholderAvatar("hyscript7", "Top.gg"),
    avatarNote:
      "Generated placeholder avatar because Top.gg did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: topggSource,
  },
  {
    id: "disboard-active-community",
    username: ".frodox",
    platform: "DISBOARD",
    review:
      "Really active server with lots of helpful people. Great place to ask coding questions, share ideas, and just hang out with others who like programming.",
    dateLabel: "195 days ago",
    avatarSource: createPlaceholderAvatar(".frodox", "DISBOARD"),
    avatarNote:
      "Generated placeholder avatar because DISBOARD did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: disboardSource,
  },
  {
    id: "disboard-functional",
    username: "miko089238",
    platform: "DISBOARD",
    review:
      "Moderation exists sure. The guild structure seems solid, coming from someone who talks at #lobby the most lol. Well, It's active, I'm active, but there's an active hour so if you see low saturation of messages, just check again the other time of the day. We need more members to make the server active all the time. Also it's lowkey the only server I'm active on, it does not require a phone number to send a message, so if u want my help u gotta join.",
    dateLabel: "195 days ago",
    avatarSource: createPlaceholderAvatar("miko089238", "DISBOARD"),
    avatarNote:
      "Generated placeholder avatar because DISBOARD did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: disboardSource,
  },
  {
    id: "topgg-mnp",
    username: "MNP",
    platform: "Top.gg",
    review:
      "A really good server! have been really active, and almost no bad activity as well! A really positive server! Kudos to you guys running the server this great!",
    dateLabel: "4 months ago",
    avatarSource: createPlaceholderAvatar("MNP", "Top.gg"),
    avatarNote:
      "Generated placeholder avatar because Top.gg did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: topggSource,
  },
  {
    id: "topgg-your-local-femboy",
    username: "Your Local Femboy",
    platform: "Top.gg",
    review:
      "Everyone is so nice and they help me all the time. I got more information out of this server than about makeup hehe. I wuv everyone in it >:3c",
    dateLabel: "5 months ago",
    avatarSource: createPlaceholderAvatar("Your Local Femboy", "Top.gg"),
    avatarNote:
      "Generated placeholder avatar because Top.gg did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: topggSource,
  },
  {
    id: "disboard-best-place-for-coders",
    username: "rexie.the.kat",
    platform: "DISBOARD",
    review:
      "Best server to find like minded and genuine ppl who will help in coding and a really friendly and inviting community ☺️",
    dateLabel: "2 hours ago",
    avatarSource: createPlaceholderAvatar("rexie.the.kat", "DISBOARD"),
    avatarNote:
      "Generated placeholder avatar because DISBOARD did not expose a usable direct avatar URL in the public listing snapshot.",
    ratingLabel: null,
    sourceUrl: disboardSource,
  },
];

export const testimonialSourceLinks = {
  topgg: topggSource,
  disboard: disboardSource,
} as const;
