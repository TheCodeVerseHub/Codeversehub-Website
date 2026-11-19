export interface FaqQuestion {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  questions: FaqQuestion[];
}

/**
 * The full FAQ content, kept in one place so the homepage two-column
 * interface and the /pages/faq document stay in sync.
 * Every category contains exactly seven questions.
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "joining",
    label: "Joining & Getting Started",
    questions: [
      {
        q: "How do I join The CodeVerse Hub?",
        a: `1. Join the Discord server.
2. Introduce yourself in the welcome channel.
3. Pick your language roles and skill roles — this unlocks the matching help channels.

That's it. No application, no fees, no minimum skill requirement.`,
      },
      {
        q: "I'm a complete beginner. Can I really contribute?",
        a: `Yes. Most of our repositories carry issues tagged 'good first issue' or 'help wanted' specifically for first-time contributors. Maintainers and mentors will walk you through Git, the pull request lifecycle, and your first merge. Many of our active maintainers started with zero open-source experience.`,
      },
      {
        q: "What should I learn first?",
        a: `Pick one language and one project you find interesting, then start small. Reading our contributing guide and the README of any repository will get you further than a month of tutorials. If you are not sure where to start, ask in the community — someone will point you at a good first issue.`,
      },
      {
        q: "Do I need to apply or pay to join?",
        a: `No. There is no application, no membership fee, and no minimum skill requirement. Join the Discord, introduce yourself, pick your roles, and you are in.`,
      },
      {
        q: "What should I include in my introduction?",
        a: `A short hello, the languages or tools you use or want to learn, and what you are hoping to work on. You do not need a polished bio — just enough for people to point you toward the right channel or issue.`,
      },
      {
        q: "How much time do I need to commit each week?",
        a: `There is no fixed schedule and no minimum. Some members drop in for an hour, others join every event. Progress is measured by the work you ship, not by hours spent online.`,
      },
      {
        q: "Can I join from any timezone?",
        a: `Yes. The community is distributed across timezones, and almost all discussion happens asynchronously in Discord channels and on GitHub. Announcements and recorded events are posted so you can catch up whenever you are online.`,
      },
    ],
  },
  {
    id: "contributing",
    label: "Contributing to Open Source",
    questions: [
      {
        q: "How do I contribute to a project?",
        a: `1. Browse our GitHub organization and pick a repository.
2. Look for issues tagged 'good first issue' or 'help wanted'.
3. Fork the repository, clone it locally, and create a branch.
4. Follow the setup steps in the README to run the project.
5. Make your change, commit with a clear message, push, and open a pull request.

Full details live in the contributing guide.`,
      },
      {
        q: "What is the difference between forking and cloning?",
        a: `Forking copies a repository to your own GitHub account — that is where your changes will live and where your pull request comes from. Cloning copies a repository to your local machine so you can edit it. The typical flow is: fork on GitHub, then clone your fork locally.`,
      },
      {
        q: "What makes a good pull request?",
        a: `• A clear, descriptive title and a short description of what and why.
• Small, focused changes — one logical fix per PR.
• Commit messages that explain the change, not just "update".
• Tests or at least a manual test note when the change is non-trivial.`,
      },
      {
        q: "How do GitHub code reviews work here?",
        a: `When you open a PR, maintainers and community members review it inline on GitHub. You get line-by-line feedback on logic, style, performance, and best practices. Reviews are constructive and focused on helping you improve — not on showing off. Respond to feedback, push updates, and once approved, a maintainer merges your PR.`,
      },
      {
        q: "What happens after my PR is merged?",
        a: `Your code ships to real users, your name appears in the repository's contributor graph, and the merge counts toward your track record in the community. Merged PRs are the currency of becoming a maintainer.`,
      },
      {
        q: "What technologies does the community work with?",
        a: `Python, TypeScript, JavaScript, Rust, Go, Lua, and more. We build with React, Next.js, Node.js, Django, FastAPI on the web side; maintain Linux distributions on the systems side; and use Docker, PostgreSQL, Redis, and modern CI across projects.`,
      },
      {
        q: "How do I find a good first issue?",
        a: `Browse our GitHub organization and filter issues by the 'good first issue' or 'help wanted' labels. Read the repository's contributing guide and README first, then comment on the issue to let maintainers know you are working on it. If you are unsure where to begin, ask in the community and someone will point you at a suitable issue.`,
      },
    ],
  },
  {
    id: "maintainership",
    label: "Maintainership & Ownership",
    questions: [
      {
        q: "How do I become a maintainer?",
        a: `Consistently submit quality PRs, participate in code reviews, help other contributors, and demonstrate a real understanding of the project. When you are ready, the community nominates and votes on new maintainers. Influence here is earned through the work you ship.`,
      },
      {
        q: "Who owns the projects?",
        a: `The community does. Repositories live under the TheCodeVerseHub GitHub organization, are licensed openly (MIT or GPL), and their roadmaps are discussed in public. Maintainers steward the projects, but the direction is shaped by everyone who contributes.`,
      },
      {
        q: "Can I start a project in the organization?",
        a: `Yes! Members who prove themselves can propose new repositories. Discuss the idea in the community first, and if there is interest and a maintainer willing to steward it, it can become an official org project.`,
      },
      {
        q: "What does a maintainer actually do?",
        a: `Maintainers review pull requests, guide contributors, keep dependencies and documentation healthy, triage issues, and steer the project roadmap. They steward the project rather than own it — direction is shaped by everyone who contributes.`,
      },
      {
        q: "Can I maintain a project I didn't create?",
        a: `Yes. Maintainership is based on trust and sustained contribution, not on who wrote the first line of code. Contribute regularly, review others' work, and become familiar with the codebase; the community can then nominate and vote you in.`,
      },
      {
        q: "What happens if a maintainer becomes inactive?",
        a: `Projects are designed to outlive any single maintainer. Other maintainers and active contributors keep reviews and decisions moving, and responsibilities can be handed to contributors who have earned the community's trust.`,
      },
      {
        q: "How are decisions about project direction made?",
        a: `Roadmaps are discussed in public in GitHub issues and in the community. Maintainers steward the direction, but feedback and proposals from any contributor help shape what the project builds next.`,
      },
    ],
  },
  {
    id: "discord",
    label: "The Discord",
    questions: [
      {
        q: "What actually happens inside the Discord?",
        a: `The server is organized around how people actually learn to build software:

• Learning & Help — language help channels where you post the error, the code, and what you tried.
• Programming Channels — deep dives on Linux, web development, AI/ML, systems, databases, and DevOps.
• Project Showcase — share what you are building and get feedback and collaborators.
• Code Reviews — constructive, line-by-line feedback on your code.
• Open Source — guidance and support for your first PR.
• Voice Events — pair programming, Code Review Fridays, and open-source sprints.
• Community Activities — coding challenges, live coding sessions, movie nights, and voice hangouts.
• Resources — curated docs and roadmaps, no blog spam.`,
      },
      {
        q: "What roles exist and how do I get them?",
        a: `CodeVerse Hub uses roles to customize your experience and unlock the right channels:

• Language Roles — the languages you use or want to learn (Python, Java, C/C++, TypeScript, Rust, Go, etc.). Many help channels are only visible once you pick the matching role.
• Skill / Field Roles — Web Development, Game Development, Machine Learning, Cybersecurity, Blockchain, and more.
• Activity Roles — automatically assigned by our leveling bot as you participate.
• Ping / Notification Roles — optional roles for announcements, contests, and events.
• Staff & Team Roles — given to members who help run and moderate the community. Applications open periodically.
• Booster Role — for members who Nitro-boost the server.

All self-assignable roles are managed through the server's Channels & Roles interface or the self-roles channel.`,
      },
      {
        q: "Why can't I see some channels?",
        a: `Some categories and language-specific channels are role-gated to keep the server organized. If a category shows "No Access":

• Make sure you have selected the relevant language roles and skill roles.
• Refresh your Discord client after changing roles.

If you still believe you are missing access, open a support ticket so staff can review your roles.`,
      },
      {
        q: "Can I showcase my own projects?",
        a: `Absolutely. There's a dedicated project-showcase area where members share what they're building, get feedback, find collaborators, and promote your work to a community of developers who care about quality software.`,
      },
      {
        q: "How do I use the code review channels?",
        a: `Share a link to your pull request or a code snippet, explain what you want feedback on, and mention any constraints you are working with. Keep the discussion constructive and specific — the same line-by-line mindset used on GitHub applies here.`,
      },
      {
        q: "Are there voice channels and can anyone join?",
        a: `Yes. Voice channels host pair programming sessions, Code Review Fridays, open-source sprints, and casual hangouts. Anyone can join in; you do not need a special role or an invitation.`,
      },
      {
        q: "How do I format code in Discord messages?",
        a: `Wrap code in a fenced block using three backticks on either side, and add the language name after the opening fence for syntax highlighting. For longer examples, use a GitHub gist or repository link so the channel stays readable.`,
      },
    ],
  },
  {
    id: "bots",
    label: "Bots & Commands",
    questions: [
      {
        q: "How do I use bot commands correctly?",
        a: `• Most bots use slash commands. Type / in the appropriate bot channel to see options.
• Some bots have dedicated channels (economy, counting, bumping, quiz bots). Commands only work where the bot is allowed.
• A few bots still use prefixes (!, $, ?) — check the bot name or pinned messages.
• Many bots provide a /help menu — check that first if you are unsure.`,
      },
      {
        q: "Which bots can I use on the server?",
        a: `The server runs a leveling bot for activity roles, a ModMail bot for contacting staff, and a set of community bots for things like counting, bumping, quizzes, and economy commands. Each bot has its own channel or slash-command menu.`,
      },
      {
        q: "What is the leveling bot and how does it work?",
        a: `The leveling bot tracks participation and automatically assigns activity roles as you contribute in chat. Just take part in conversations — there is nothing to install or configure.`,
      },
      {
        q: "How do I contact staff privately?",
        a: `Send a direct message to the @ModMail bot to open a ModMail ticket. Staff can review it privately, which is useful for sensitive issues or anything you do not want to post in a public channel.`,
      },
      {
        q: "Where can I find a bot's command list?",
        a: `Type / in the appropriate channel to see the available slash commands, or run the bot's /help command. Pinned messages in each bot channel also document what it can do.`,
      },
      {
        q: "Why isn't a bot responding to my command?",
        a: `Check that you are using the bot's dedicated channel, that you have the required role, and that you are using the right prefix or slash command. Some bots are limited to specific channels and ignore commands elsewhere.`,
      },
      {
        q: "Can I add my own bot to the server?",
        a: `Bot additions are reviewed by staff to keep the server safe and uncluttered. Bring your idea to the community first, then ask staff in a support ticket about the review process.`,
      },
    ],
  },
  {
    id: "events",
    label: "Events, Contests & Projects",
    questions: [
      {
        q: "How do I participate in coding events?",
        a: `1. Watch the announcements and events channels for new event posts.
2. Read the event message — it explains how to register, where to submit, and the deadline.
3. Follow the required submission format (GitHub link, code snippet, or project description).
4. Keep event pings enabled if you want early notifications.`,
      },
      {
        q: "What are the guidelines for submitting projects or challenge answers?",
        a: `• Share actual code (code blocks, repository links, or source files — not executables).
• Include a short explanation of what the project does and how to run it.
• Make sure the work is your own. If you used external or AI-generated code, clearly credit and explain it.
• Respect event-specific rules on format, libraries, and deadlines.`,
      },
      {
        q: "How do hackathons and events work?",
        a: `The community runs coding challenges, Code Review Fridays, open-source sprints, and themed build events. Watch the announcements channel for the next one, and keep event pings enabled if you want early notifications.`,
      },
      {
        q: "What kinds of events does the community run?",
        a: `Coding challenges, Code Review Fridays, open-source sprints, themed build events, live coding sessions, and casual community activities such as movie nights and voice hangouts.`,
      },
      {
        q: "Do I need a team to take part in a hackathon?",
        a: `No. Many events welcome solo participants, and the community channels are a good place to find collaborators if you would rather work with a team.`,
      },
      {
        q: "How do I stay updated about upcoming events?",
        a: `Watch the announcements and events channels, and keep event pings enabled so you get an early notification when a new event is posted.`,
      },
      {
        q: "Are beginners welcome in coding contests?",
        a: `Absolutely. Events are designed for learning as much as for winning, and beginners are encouraged to join, ask questions, and submit their work even if it is not perfect.`,
      },
    ],
  },
  {
    id: "help",
    label: "Asking for Help",
    questions: [
      {
        q: "How should I post in help channels?",
        a: `To get useful answers faster:

1. Specify the language, framework, or tool you are using.
2. Share the exact error message or relevant code using code blocks (triple backticks).
3. Describe what you expected to happen vs. what is actually happening.
4. Mention any steps you have already tried.

Avoid "it doesn't work" with no context. The more detail you provide, the better the help you receive.`,
      },
      {
        q: "What counts as off-topic?",
        a: `Each channel has a specific purpose. Use general chat, lobby, gaming, and media channels for casual conversation, and keep help and discussion channels focused on their stated topic.`,
      },
      {
        q: "What should I do if nobody answers my question?",
        a: `Give people a little time — the community spans timezones. If you still have no answer, refine your question with more detail, add what you have tried since, and repost it in the most relevant channel. Avoid posting the same question in many channels at once.`,
      },
      {
        q: "Can I message a maintainer directly for help?",
        a: `Public help channels are usually fastest because more people can see your question and anyone with the answer can respond. Direct messages are fine for sensitive matters, but keep technical questions in the open so others can learn from them.`,
      },
      {
        q: "How do I share error output properly?",
        a: `Copy the full error message and the relevant code into a fenced code block using three backticks, and include the language or framework you are using. Screenshots alone are hard to read and search, so paste the text whenever you can.`,
      },
      {
        q: "Where should I ask beginner questions?",
        a: `Any of the language help channels — pick the one matching the language or tool you are using, then select that language role so you can see it. There is no question too basic, and mentors are there to help you get unstuck.`,
      },
      {
        q: "Is it okay to ask the same question twice?",
        a: `Only if you are adding new information, such as what you tried after the first round of answers. Otherwise, follow up in the original thread so the discussion stays in one place.`,
      },
    ],
  },
  {
    id: "safety",
    label: "Safety, Rules & Moderation",
    questions: [
      {
        q: "What happens if I break the rules?",
        a: `Moderation is based on severity and history:

• Minor issues (light spam, wrong channel, small misunderstandings) usually receive reminders or formal warnings.
• Repeated or serious issues can lead to temporary mutes, kicks, or short-term bans.
• Severe violations (harassment, hate speech, scams, malicious code, illegal content) may result in an immediate permanent ban.`,
      },
      {
        q: "How do I report spam or harmful behaviour?",
        a: `1. Do not engage with the person.
2. Copy the message link and open a report or support ticket.
3. Optionally ping an online moderator if the situation is urgent.`,
      },
      {
        q: "How do I appeal a ban?",
        a: `Use the ban appeal form (recommended), and include evidence links if possible. If you cannot access the website, open a ModMail ticket by DMing the @ModMail bot.`,
      },
      {
        q: "Where can I read the community rules?",
        a: `The full rules are available on the website under Rules, and a summary is pinned in the server. If anything is unclear, ask staff in a support ticket before posting.`,
      },
      {
        q: "Can I appeal a warning or a mute?",
        a: `Yes. If you believe a warning or mute was issued in error, open a support ticket or a ModMail ticket with the relevant context. Staff will review it, taking the severity and your history into account.`,
      },
      {
        q: "Are self-promotion and external links allowed?",
        a: `Sharing your own projects is welcome in the project showcase and relevant channels. Avoid spam, unsolicited advertising, and dropping links into unrelated discussions — keep promotion relevant to the channel.`,
      },
      {
        q: "What is the policy on harassment and hate speech?",
        a: `Harassment, hate speech, scams, malicious code, and illegal content are not tolerated and can result in an immediate permanent ban. Treat other members with respect, and report harmful behaviour to staff rather than engaging with it.`,
      },
    ],
  },
  {
    id: "more",
    label: "Still Have Questions?",
    questions: [
      {
        q: "What if my question isn't answered here?",
        a: `If your question is not covered here:

• Submit a suggestion or question in the server's suggestions channel, or
• Open a support ticket so staff can assist you directly.

We regularly review new questions and may promote the most common ones into this FAQ over time.`,
      },
      {
        q: "How can I suggest a new FAQ question?",
        a: `Post your suggestion in the server's suggestions channel, or open a support ticket. We regularly review new questions and may promote the most common ones into this FAQ over time.`,
      },
      {
        q: "How do I open a support ticket?",
        a: `Use the server's ticket interface and describe your issue with as much context as you can, including links or screenshots where relevant. A staff member will pick it up and follow up with you there.`,
      },
      {
        q: "Where can I report a problem with the website?",
        a: `Open a support ticket or post in the suggestions channel with the page URL and a short description of what went wrong. Details like your browser and the steps to reproduce it help us fix it faster.`,
      },
      {
        q: "Can I request a new channel or role?",
        a: `Yes. Explain what the channel or role would be for and how it would help the community in the suggestions channel or a support ticket. Staff review requests with the current server structure in mind.`,
      },
      {
        q: "How do I give feedback about the community?",
        a: `The suggestions channel is the place for ideas and constructive feedback. If your feedback is sensitive, send a ModMail ticket instead so it can be handled privately.`,
      },
      {
        q: "Where can I find the contributing guide and other docs?",
        a: `The contributing guide and other documentation live on the website under the Resources and Pages sections, and each repository's README covers its own setup. If you cannot find what you need, ask in the community.`,
      },
    ],
  },
];
