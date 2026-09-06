export const seo = {
  home: {
    title: "QuietStories — The Stories That Never Happened",
    description:
      "A quiet corner of the internet for imagined stories, unexpected moments, and feelings that exist somewhere between imagination and reality.",
    keywords: [
      "QuietStories",
      "The Stories That Never Happened",
      "imaginary stories",
      "fictional stories",
      "short stories",
      "storytelling",
      "emotional stories",
      "creative stories",
    ],
  },

  stories: {
    title: "Stories Worth Finding — QuietStories",
    description:
      "Explore imagined stories about strangers, quiet moments, unexpected connections, and possibilities that may never have happened.",
    keywords: [
      "QuietStories stories",
      "short stories",
      "imaginary stories",
      "fictional stories",
      "creative storytelling",
      "emotional short stories",
      "romantic stories",
      "slice of life stories",
    ],
  },

  about: {
    title: "Why QuietStories? — About",
    description:
      "Discover the idea behind QuietStories, a collection of imagined moments, people, places, and feelings somewhere between imagination and reality.",
    keywords: [
      "about QuietStories",
      "The Stories That Never Happened",
      "storytelling",
      "creative writing",
      "imaginary stories",
      "fictional storytelling",
      "short story collection",
    ],
  },

  notes: {
    title: "A Little Note — QuietStories",
    description:
      "A little note from QuietStories about imagination, stories, feelings, and the beautiful moments we create in our minds.",
    keywords: [
      "QuietStories note",
      "storytelling",
      "imagination",
      "creative writing",
      "fictional stories",
      "thoughts about stories",
      "The Stories That Never Happened",
    ],
  },

  sayHello: {
    title: "Say Hello — QuietStories",
    description:
      "Enjoyed a QuietStory? Send a little hello, share your thoughts, or simply leave a note. Every message is welcome.",
    keywords: [
      "contact QuietStories",
      "QuietStories",
      "say hello",
      "story feedback",
      "storytelling",
      "creative writing",
      "send a message",
    ],
  },
};

export function getStorySEO(story) {
  if (!story) return {};

  return {
    title: `${story.title} — QuietStories`,
    description: `${story.tagline} Read ${story.title}, an imagined story from QuietStories about moments, people, and possibilities that exist somewhere between reality and imagination.`,
    keywords: [
      story.title,
      "QuietStories",
      "short story",
      "imaginary story",
      "fictional story",
      "creative storytelling",
      "emotional story",
      "The Stories That Never Happened",
    ],
  };
}
