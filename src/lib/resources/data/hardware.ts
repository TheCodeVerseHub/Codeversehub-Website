import { category, subcategory } from "../helpers";

export const hardware = category(
  "hardware",
  "Hardware & Robotics",
  "Robotics, embedded systems, IoT, and electronics — from chips to full robots.",
  [
    subcategory("robotics", "Robotics", [
      {
        title: "ROS — Robot Operating System",
        description:
          "The official home of ROS, the standard framework for robot software.",
        url: "https://www.ros.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["ros", "framework", "official"],
      },
      {
        title: "ROS Documentation",
        description:
          "Official documentation for ROS 1, ROS 2, and the tools around them.",
        url: "https://docs.ros.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["ros", "docs", "official"],
      },
      {
        title: "Robotics Toolbox (Peter Corke)",
        description:
          "The reference toolbox for teaching and researching robotics, with a Python version.",
        url: "https://github.com/petercorke/robotics-toolbox-python",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["peter corke", "toolbox", "python"],
      },
      {
        title: "Awesome Robotics",
        description:
          "A curated list of robotics libraries, simulators, and resources.",
        url: "https://github.com/kiloreux/awesome-robotics",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "libraries", "simulators"],
      },
      {
        title: "AI for Robotics — Stanford (Udacity)",
        description:
          "Sebastian Thrun's classic free course on robotics algorithms.",
        url: "https://www.udacity.com/course/artificial-intelligence-for-robotics--cs373",
        difficulty: "Advanced",
        access: "Free",
        badge: "Video Course",
        tags: ["stanford", "thrun", "course"],
      },
    ]),
    subcategory("embedded", "Embedded Systems", [
      {
        title: "Embedded FM",
        description:
          "A long-running podcast and community for embedded software engineers.",
        url: "https://embedded.fm/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["podcast", "community", "embedded"],
      },
      {
        title: "Embedded Artistry",
        description:
          "Articles and engineering guidance for building quality embedded software.",
        url: "https://embeddedartistry.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["articles", "best practices", "embedded"],
      },
      {
        title: "ESP-IDF Documentation",
        description:
          "Official docs for the ESP32/ESP8266 framework — the most popular hobbyist SoC.",
        url: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["esp32", "espressif", "official"],
      },
      {
        title: "The Art of Electronics",
        description:
          "The legendary, comprehensive reference for electronics and circuit design.",
        url: "https://en.wikipedia.org/wiki/The_Art_of_Electronics",
        difficulty: "Advanced",
        access: "Paid",
        badge: "Book",
        tags: ["book", "reference", "classic"],
      },
      {
        title: "eevblog",
        description:
          "A hugely popular electronics engineering forum and video series.",
        url: "https://www.eevblog.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["forum", "videos", "electronics"],
      },
    ]),
    subcategory("iot", "IoT", [
      {
        title: "Arduino Documentation",
        description:
          "The official docs for Arduino hardware and the Arduino language.",
        url: "https://docs.arduino.cc/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["arduino", "docs", "official"],
      },
      {
        title: "Raspberry Pi Documentation",
        description:
          "Official documentation for Raspberry Pi computers and accessories.",
        url: "https://www.raspberrypi.com/documentation/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["raspberry pi", "docs", "official"],
      },
      {
        title: "IoT for Beginners (Microsoft)",
        description:
          "Microsoft's free, project-based curriculum for learning IoT development.",
        url: "https://github.com/microsoft/IoT-For-Beginners",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["microsoft", "curriculum", "free"],
      },
      {
        title: "AWS IoT Core Documentation",
        description:
          "Official docs for AWS's managed IoT platform and device gateway.",
        url: "https://docs.aws.amazon.com/iot/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["aws", "iot", "official"],
      },
      {
        title: "Home Assistant Documentation",
        description:
          "Official docs for the popular open-source home automation platform.",
        url: "https://www.home-assistant.io/docs/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["home assistant", "smarthome", "docs"],
      },
    ]),
    subcategory("electronics", "Electronics", [
      {
        title: "All About Circuits",
        description:
          "A comprehensive, free resource for electronics theory and practice.",
        url: "https://www.allaboutcircuits.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["circuits", "tutorials", "free"],
      },
      {
        title: "SparkFun Tutorials",
        description:
          "Friendly tutorials and guides for electronics and maker projects.",
        url: "https://learn.sparkfun.com/tutorials",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["sparkfun", "tutorials", "maker"],
      },
      {
        title: "Adafruit Learning System",
        description:
          "Hundreds of project guides for electronics, wearables, and robotics.",
        url: "https://learn.adafruit.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["adafruit", "projects", "guides"],
      },
      {
        title: "Khan Academy — Electrical Engineering",
        description:
          "A free, foundational course on circuits and electronics.",
        url: "https://www.khanacademy.org/science/electrical-engineering",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["khan academy", "circuits", "foundations"],
      },
      {
        title: "Electronics Tutorials",
        description:
          "A classic reference site covering basic electronics components and theory.",
        url: "https://www.electronics-tutorials.ws/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["tutorials", "components", "reference"],
      },
    ]),
  ],
);
