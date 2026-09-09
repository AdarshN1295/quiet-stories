// Picks up any image dropped into src/assets/Stories/<story-no>/ — no code
// changes needed to add covers or chapter art for a story.
// Expected file names inside each story's folder:
//   hp-cover.*  -> homeImage (shown on the homepage / story cards)
//   st-cover.*  -> storyImage (story page banner background)
//   cp1.* .. cpN.* -> chapter[N - 1].image
const storyImageModules = import.meta.glob("/src/assets/Stories/*/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const storyAssets = Object.entries(storyImageModules).reduce((map, [path, url]) => {
  const match = path.match(/\/Stories\/([^/]+)\/([^/.]+)\.[^./]+$/);
  if (!match) return map;
  const [, no, name] = match;
  map[no] = map[no] || {};
  map[no][name] = url;
  return map;
}, {});

function withStoryImages(story) {
  const assets = storyAssets[story.no] || {};
  return {
    ...story,
    homeImage: assets["hp-cover"] || story.image,
    storyImage: assets["st-cover"] || story.image,
    chapters: story.chapters.map((chapter, index) => ({
      ...chapter,
      image: assets[`cp${index + 1}`] || chapter.image,
    })),
  };
}

const rawStories = [
  {
    no: "01",
    title: "The Girl Beneath the Sea",
    tagline: "He jumped into the sea to save a stranger. He came back with a secret.",
    tags: ["Drama", "Rescue", "Hope"],
    readTime: "12 min read",
    image:
      " ",
    heroQuote: ["A dive. A girl. A secret."],
    chapters: [
      {
        title: "The Visa Trip",
        paragraphs: [
          "Adarsh had one goal: to leave his comfort zone and build a tougher life abroad. After a painful breakup, he decided that studying overseas would give him exactly what he wanted—pressure, competition, part-time work, self-study, and a completely new life. With his documents and finances finally ready, only the visa appointment remained.",
          "He and his consultant travelled to Mumbai a day early and, instead of staying in their room, Adarsh convinced him to explore the city. After Marine Drive, Juhu Beach and some street food, they ended up near the seaport, watching massive ships and buses being transported across the water. They were taking pictures, completely unaware that one of those buses was about to turn their ordinary evening into a nightmare."
        ],
        reflection: "Sometimes, an ordinary day quietly carries the beginning of something extraordinary.",
        image:
          "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Fall",
        paragraphs: [
          "A sudden mechanical failure sent a bus rushing toward the edge of the cliff. The driver jumped out, but the bus crashed into the barrier and plunged into the sea.",
          "Forty passengers were inside. Without thinking about his own safety, Adarsh handed his phone to his consultant and jumped after them. He helped several passengers escape while other swimmers joined the rescue. Eventually, almost everyone reached the surface. But when they counted the survivors, one girl was missing.",
          "Her mother desperately told Adarsh that her daughter had been sleeping near the driver. The bus had sunk almost vertically, meaning she was likely trapped at the bottom. Everyone begged Adarsh not to go back. He looked at the water, took one breath and dived again."
        ],
        reflection: "Courage begins when fear becomes smaller than someone's desperate need for help.",
        image:
          "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Girl",
        paragraphs: [
          "Adarsh reached the sunken bus and found the girl unconscious inside. With his lungs burning and his strength fading, he managed to pull her free and began the difficult ascent. She briefly regained consciousness but quickly started struggling. Adarsh kept her calm and guided her toward the surface.",
          "When they finally reached the top, she collapsed again. Her mother was crying as Adarsh immediately began CPR. After several desperate attempts, the girl suddenly coughed and seawater spilled from her mouth.",
          "She was alive. As the ambulance arrived, she looked at Adarsh and silently mouthed, \"Thank you.\" He smiled and waved goodbye, believing they would never meet again. He was wrong."
        ],
        reflection: "He saved a stranger that day, unaware she would soon become unforgettable.",
        image:
          "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Message",
        paragraphs: [
          "The rescue became viral overnight. Videos of Adarsh's dives spread across social media, turning an ordinary student into a national sensation. His family called, strangers followed him, and news channels began covering his story. But Adarsh had another problem—his passport had fallen into the sea during the rescue.",
          "Just when he thought his visa plans were ruined, authorities began arranging emergency assistance. Then, among thousands of notifications, one message caught his attention: \"I know you kissed her in the deep sea.\" Adarsh froze. Nobody should have known about that moment. He replied, asking who the person was. The answer was simple: a location, a time, and one instruction—\"Meet me tomorrow.\""
        ],
        reflection: "The strangest messages sometimes arrive carrying secrets nobody else should know.",
        image:
          "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Secret",
        paragraphs: [
          "Adarsh arrived at the restaurant expecting a stranger. Instead, he found the girl he had rescued sitting across the room. She was the one who had sent the message. She remembered everything from beneath the water, including the moment Adarsh had tried to share his remaining breath with her.",
          "Their conversation soon moved beyond the accident. She asked about his life, his breakup and his dream of studying abroad. He told her everything. She smiled and softly said, \"Awww.\" That evening became the beginning of something neither had expected. They exchanged numbers, started talking every day and slowly became close.",
          "Their friendship eventually turned romantic, but the more they discovered about each other, the more Adarsh realized that the girl he had saved wasn't as simple as she seemed. Saving her from the sea had been the easy part."
        ],
        reflection: "He thought saving her was the story; meeting her was where everything truly began.",
        image:
          "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=80",
      }
    ],
    closingQuote: "Sometimes the bravest thing anyone does is simply not look away.",
  },
  {
    no: "02",
    title: "The Tiger Between Us",
    tagline: "A family trip turns into an unexpected love story.",
    tags: ["Adventure", "Courage", "Love", "Wildlife"],
    readTime: "14 min read",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=80",
    heroQuote: ["Sometimes courage", "finds you first."],
    chapters: [
      {
        title: "The Unexpected Stranger",
        paragraphs: [
          "Anvi plans a perfect family holiday from Munnar to Madhya Pradesh, visiting Mahakal, Omkareshwar and Pachmarhi before settling into a beautiful jungle resort. While enjoying the resort, she notices a mysterious, fit young man named Adarsh staying alone in a luxury cabin nearby. His calm personality, old melodies and love for solitude immediately catch her attention.",
          "Later, she sees him swimming effortlessly under the pool lights. When she tries introducing herself, Adarsh unknowingly ignores her while diving underwater, leaving Anvi annoyed and embarrassed. Neither realizes that the next morning, they will be forced to share the same jungle safari."
        ],
        reflection: "Sometimes the person who annoys you first becomes the person you remember forever.",
        image:
          "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Into the Jungle",
        paragraphs: [
          "The next morning, Anvi's family and Adarsh join the same Satpura jungle safari. The guide mentions a newly transferred Bengal tiger from Kanha, unfamiliar with tourists and therefore unpredictable.",
          "Adarsh immediately senses the danger and discusses precautions with the guide and driver. Everything seems calm until Anvi's younger brother urgently needs to stop. Despite Adarsh's warning, Anvi angrily insists on stopping the jeep.",
          "The moment they step out, Adarsh notices something strange—the jungle has suddenly become completely silent, and birds are flying unusually high. Then, from the trees, a tiger appears."
        ],
        reflection: "The jungle had gone silent, but none of them understood what that silence meant.",
        image:
          "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Tiger",
        paragraphs: [
          "The tiger charges toward Anvi's younger brother. Without thinking about herself, Anvi jumps between them to protect him. The tiger turns toward her, attacking with terrifying speed. Her family tries to pull her back, while Adarsh watches her sacrifice everything for her brother. He immediately decides to intervene. After handing his phone to Anvi's mother, Adarsh runs toward the tiger and pushes it away from her. The animal claws his forearm and chest, but Adarsh continues fighting desperately until the guide and Anvi's father manage to get her back into the vehicle.",
          "The tranquilizer finally takes effect, but not before Adarsh suffers serious injuries and collapses."
        ],
        reflection: "He didn't save her because he knew her; he saved her because he understood her heart.",
        image:
          "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "After the Roar",
        paragraphs: [
          "Adarsh wakes up in a hospital with his arm heavily bandaged and deep scratches across his chest. Anvi is sitting beside him, holding his hand, with injuries of her own. When he opens his eyes, she immediately calls her family and apologizes for everything, including their argument at the pool. Adarsh laughs and explains that he had never ignored her—he had simply wanted to experience the silence beneath the water. Their misunderstanding finally disappears. Anvi introduces herself properly, and her family invites Adarsh to dinner as a gesture of gratitude. During the meal, Anvi shyly feeds him while their eyes meet across the table, creating a quiet moment neither of them forgets."
        ],
        reflection: "Some misunderstandings disappear in seconds when two people finally choose to understand each other.",
        image:
          "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Abhi Na Jaao",
        paragraphs: [
          "After dinner, Adarsh and Anvi walk through the garden and talk about relationships, travel and the kind of future they want. Before leaving, Anvi demands that Adarsh sing an old song.",
          "He refuses at first, but eventually begins singing a familiar melody. When she doesn't recognize it and starts walking away disappointed, Adarsh catches her hand and continues, \"Abhi na jaao chhod kar, ke dil abhi bhara nahi...\" Anvi turns around, overwhelmed by the unexpected moment, and hugs him tightly. Their emotions finally become impossible to hide. They share a gentle kiss and quietly begin a relationship. The next morning, they say goodbye with one final secret hug and promise to stay connected. Neither knows where their new journey will lead."
        ],
        reflection: "They came to the jungle as strangers and left knowing they had found something rare.",
        image:
          "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
      }
    ],
    closingQuote: "The bravest moments rarely feel brave while they're happening.",
  },
  {
    no: "03",
    title: "The Girl in the Coupe",
    tagline: "One overnight journey. One mysterious girl. No trace of her.",
    tags: ["Thriller", "Horror"],
    readTime: "15 min read",
    image:
      "https://images.unsplash.com/photo-1755624361318-fb4575756ca5?auto=format&fit=crop&w=1400&q=80",
    heroQuote: [
      "A stranger, a journey,",
      "a ghost."
    ],
    chapters: [
      {
        title: "The Empty Coupe",
        paragraphs: [
          "Adarsh boards a train from Ahmedabad to Indore, finally experiencing something he had always wanted—a private two-person coupe all to himself. As the train leaves the station, he switches off the lights, puts on his earphones and watches the city lights disappear into the darkness. Just when he begins enjoying the peaceful journey, someone knocks on his coupe door.",
          "Standing outside is a beautiful girl dressed in red traditional clothes. She introduces herself as Nitika, or Niti, and calmly tells him that she is his coupe mate. Adarsh is surprised but welcomes her inside. Their simple introduction soon turns into laughter, teasing and a surprisingly comfortable friendship.",
        ],
        reflection: "Sometimes solitude ends with a knock from someone you were never expecting.",
        image:
          "https://images.unsplash.com/photo-1755624361318-fb4575756ca5?auto=format&fit=crop&w=1000&q=80",
        caption: "Some people just feel like a different kind of story...",
      },
      {
        title: "The Girl in Red",
        paragraphs: [
          "Niti and Adarsh spend the journey sharing food, jokes and embarrassing stories. Over pizza, their conversation turns strangely personal when Niti starts talking about ghosts and a mysterious girl supposedly seen wandering through trains at night. Adarsh laughs at her stories, convinced she is only trying to scare him. Their teasing takes a serious turn when Niti tells him that perhaps his habit of travelling alone is why people get hurt by him. Adarsh suddenly becomes quiet.",
          "After apologizing, Niti asks about his past, and he finally tells her about his breakup, betrayal and the pain he has been carrying. For the first time that night, their conversation becomes completely honest.",
        ],
        reflection: "Two strangers can sometimes understand wounds that familiar people never noticed.",
        image:
          "https://images.unsplash.com/photo-1694010785153-d41819fcfe55?auto=format&fit=crop&w=1000&q=80",
        caption: "Some conversations feel like home...",
      },
      {
        title: "The Urban Legend",
        paragraphs: [
          "As the night deepens, Niti reveals more about the train's ghost story. According to the legend, a girl once disappeared from the same route and is believed to wander through the train at night, talking to lonely passengers. Niti jokes that perhaps the ghost has already found Adarsh.",
          "He plays along, but secretly studies her behavior. She feels warm, breathes normally and leaves a familiar fragrance behind, convincing him that her ghost act is simply an elaborate prank. They continue talking through the entire night, discussing relationships, fear, loneliness and life. Niti never reveals where she came from or where she is going.",
          "Strangely, Adarsh doesn't feel suspicious anymore. He simply enjoys having someone beside him."
        ],
        reflection: "The more mysterious she became, the less Adarsh wanted to know the truth.",
        image:
          "https://images.unsplash.com/photo-1712115254751-f9dd7711ce1b?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Missing Girl",
        paragraphs: [
          "Morning arrives, and the train finally reaches its destination. Adarsh steps outside the coupe and waits while Niti puts on her sandals. He casually tells her to hurry because the train could move again. A railway service worker suddenly enters the compartment, forcing Adarsh to stop him. \"There's a girl inside. Give her some privacy.\" The worker stares at him strangely. \"Girl? Sir, there's nobody here.\" Adarsh turns around. The coupe is empty. Niti is gone. Her belongings are gone.",
          "There isn't even a trace that another passenger had been there. Adarsh stands frozen, unable to understand what he is seeing. The worker insists that Adarsh was the only passenger assigned to that coupe.",
        ],
        reflection: "The journey had ended, but the person beside him had somehow vanished.",
        image:
          "https://images.unsplash.com/photo-1646607796792-779ffefdd1b5?auto=format&fit=crop&w=1000&q=80",
        caption: "Some people are meant to be a beautiful chapter, not the whole book.",
      },
      {
        title: "The Passenger Who Never Existed",
        paragraphs: [
          "Adarsh refuses to believe what happened and checks the compartment repeatedly. He asks railway staff about Nitika, but nobody recognizes the name. Even the passenger records show only one occupant in his coupe. Then he notices something that makes his blood run cold—a faint red thread caught near the seat where Niti had been sitting. He remembers her stories, her strange answers and the way she knew things about him that he had never told her.",
          "Finally, he searches the train's old ghost legend online and finds a photograph attached to an article about a girl who disappeared years ago. The girl in the photograph is wearing the same red traditional clothes. It is Niti. Adarsh stares at the screen, remembering her final words from the previous night: \"You shouldn't be afraid of ghosts. Sometimes they're just people who don't want to be forgotten.\"",
        ],
        reflection: "He boarded the train alone, but something followed him home.",
        image:
          "https://images.unsplash.com/photo-1721832281424-9ab52e8a6be7?auto=format&fit=crop&w=1000&q=80",
        caption: "Not all endings are sad. Some are just... quiet.",
      },
    ],
    closingQuote:
      "Not every meeting is meant to last forever. Some are just meant to make you feel a little more alive.",
  },
  {
    no: "04",
    title: "The Life I Left Behind",
    tagline: "He went to Venice to escape his past, only to find it waiting.",
    tags: ["Friendship", "Destiny", "Drama", "Emotional"],
    readTime: "16 min read",
    image:
      "https://images.unsplash.com/photo-1756639292737-f2c89a3ab5bb?auto=format&fit=crop&w=1400&q=80",
    heroQuote: ["Sometimes,", "home is someone."],
    chapters: [
      {
        title: "Marina",
        paragraphs: [
          "Adarsh sits inside his counsellor's cabin, repeatedly mentioning only one name—Marina. The counsellor asks why he doesn't simply meet her again, but Adarsh's mind drifts into a painful memory: Marina crying as he promises that he will return after a few months. When the counsellor reminds him that some people rebuild their lives even after losing everything, Adarsh finally loses his composure. \"It's been a month! How do you think she's waiting for me?\" he shouts before revealing the message that changed everything—Marina is pregnant.",
          "The counsellor urges him to return, not only for her, but to finally confront the guilt he has been carrying.",
        ],
        reflection: "Sometimes running from the past only gives it more time to catch up.",
        image:
          "https://images.unsplash.com/photo-1756639292737-f2c89a3ab5bb?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Girl in Venice",
        paragraphs: [
          "Adarsh takes a month's leave and flies to Venice, hoping distance will clear his mind. The moment he arrives, however, his memories begin overwhelming him. While exploring the city, he notices a beautiful woman crying alone on the street. Her name is Marina. She initially asks him to leave her alone, but Adarsh stays beside her and gently asks what happened.",
          "Eventually, she tells him that after her parents died, her uncle took control of their property, forced her out and left her with almost nothing. Adarsh takes her to an affordable clothing store, helps her buy essentials and offers her his room for the night. He sleeps on the couch while she takes the bed, unaware that this simple act of kindness will change both their lives."
        ],
        reflection: "He arrived in Venice searching for peace and found someone searching for a home.",
        image:
          "https://images.unsplash.com/photo-1756639292737-f2c89a3ab5bb?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "A Home in Venice",
        paragraphs: [
          "During the freezing night, Marina notices Adarsh shivering on the couch and quietly invites him to share the warmth of the bed. The next morning, she prepares tea for him, becoming his unofficial guide through Venice. Days turn into weeks as they explore canals, narrow streets and quiet corners of the city.",
          "Adarsh instinctively protects Marina in crowded places, making her feel safe in a way she hasn't felt since losing her parents. Eventually, he tells her about his breakup and the pain he has been hiding.",
          "A single tear escapes his eye while he talks about the memories that still hurt. Marina gently embraces him and whispers, \"Don't be sad.\" Their comfort slowly becomes affection, and their affection becomes something neither of them expected."
        ],
        reflection: "Two broken people found warmth in each other before either understood what love meant.",
        image:
          "https://images.unsplash.com/photo-1756639292737-f2c89a3ab5bb?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "The Message",
        paragraphs: [
          "As Adarsh's departure approaches, Marina becomes increasingly afraid of losing him. The night before his flight, they share an emotional and deeply intimate evening, believing it may be their last. The following morning, Marina hides Adarsh's travel bag, desperately trying to keep him from leaving. Adarsh, already worried about his responsibilities back home, becomes frustrated and angry. Their argument escalates, and he finally walks out without looking back.",
          "Hours later, his phone vibrates. One message from Marina stops him completely: \"I'm pregnant.\" Before he can process it, the memory disappears as an air hostess wakes him from his thoughts. \"Sir, please fasten your seat belt. We're about to land.\" Adarsh looks out of the window, realizing he has finally returned to Venice—not as a tourist, but as someone searching for his family.",
        ],
        reflection: "The message he feared most became the reason he could never truly leave her.",
        image:
          "https://images.unsplash.com/photo-1756639292737-f2c89a3ab5bb?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Coming Home",
        paragraphs: [
          "After landing, Adarsh returns to the places he remembers from Venice. Suddenly, he sees a group of men harassing a woman and trying to snatch her bag. He rushes toward them, ready to intervene, only to freeze when he recognizes the woman—Marina. Beside her stands a little girl. His daughter. Marina is furious and pushes him away, still carrying the pain of his departure, but Adarsh refuses to walk away again. He meets little Tia and kisses her forehead for the first time. Later, at Marina's home, the landlord arrives demanding overdue rent. Adarsh quietly pays everything and announces, \"We're leaving tomorrow. She's my wife, and Tia is my daughter. We're going to India.\" Marina is stunned, especially because she has no proper documents. Adarsh uses every connection he can to bring them to India. Months later, surrounded by family, he marries Marina in a beautiful celebration. This time, when he promises to stay, he means it."
        ],
        reflection: "He once promised to return after a few months; this time, he returned to stay forever.",
        image:
          "https://images.unsplash.com/photo-1756639292737-f2c89a3ab5bb?auto=format&fit=crop&w=1000&q=80",
      },
    ],
    closingQuote: "Some bonds are decided long before either side realizes it.",
  },
];

export const stories = rawStories.map(withStoryImages);

export function getStoryByNo(no) {
  return stories.find((story) => story.no === no);
}

export function getAdjacentStories(no) {
  const index = stories.findIndex((story) => story.no === no);
  const prev = stories[(index - 1 + stories.length) % stories.length];
  const next = stories[(index + 1) % stories.length];
  return { prev, next };
}
