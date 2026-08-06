import { category, subcategory } from "../helpers";

export const science = category(
  "science",
  "Mathematics & Physics",
  "The quantitative foundations — math for computing and physics for curiosity.",
  [
    subcategory("mathematics", "Mathematics", [
      {
        title: "Khan Academy — Mathematics",
        description:
          "A free, world-class curriculum from arithmetic through calculus and beyond.",
        url: "https://www.khanacademy.org/math",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["khan academy", "curriculum", "free"],
      },
      {
        title: "3Blue1Brown",
        description:
          "Animated, intuitive explanations of the math behind ML and computer science.",
        url: "https://www.3blue1brown.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["3blue1brown", "animations", "intuition"],
      },
      {
        title: "MIT 18.06 — Linear Algebra",
        description:
          "Gilbert Strang's legendary MIT linear algebra course, free on OCW.",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["mit", "strang", "linear algebra"],
      },
      {
        title: "BetterExplained",
        description:
          "Intuitive, analogy-driven explanations of math concepts — minus the jargon.",
        url: "https://betterexplained.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["intuition", "explanations", "free"],
      },
      {
        title: "Paul's Online Math Notes",
        description:
          "A beloved free reference for algebra, calculus, and differential equations.",
        url: "https://tutorial.math.lamar.edu/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["calculus", "notes", "reference"],
      },
      {
        title: "Mathematics for Machine Learning (Imperial)",
        description:
          "A Coursera specialization covering the math every ML engineer needs.",
        url: "https://www.coursera.org/specializations/mathematics-machine-learning",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["imperial", "ml math", "coursera"],
      },
    ]),
    subcategory("physics", "Physics", [
      {
        title: "The Feynman Lectures on Physics",
        description:
          "Richard Feynman's legendary Caltech lectures, free online.",
        url: "https://www.feynmanlectures.caltech.edu/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Book",
        tags: ["feynman", "lectures", "free"],
      },
      {
        title: "Khan Academy — Physics",
        description:
          "A free, complete physics curriculum from mechanics to modern physics.",
        url: "https://www.khanacademy.org/science/physics",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["khan academy", "curriculum", "free"],
      },
      {
        title: "MIT 8.01 — Classical Mechanics",
        description:
          "MIT's foundational mechanics course with full video lectures on OCW.",
        url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["mit", "mechanics", "ocw"],
      },
      {
        title: "The Physics Hypertextbook",
        description:
          "A free, rigorous physics textbook written for the internet.",
        url: "https://physics.info/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Book",
        tags: ["textbook", "free", "reference"],
      },
      {
        title: "The Physics Classroom",
        description:
          "A friendly, tutorial-based resource for high school and college physics.",
        url: "https://www.physicsclassroom.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["tutorials", "classroom", "beginner"],
      },
    ]),
  ],
);
