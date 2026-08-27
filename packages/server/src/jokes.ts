export interface Joke {
  id: number;
  setup: string;
  punchline: string;
}

export const jokes: Joke[] = [
  {
    id: 1,
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs.",
  },
  {
    id: 2,
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None, that's a hardware problem.",
  },
  {
    id: 3,
    setup: "Why did the developer go broke?",
    punchline: "Because he used up all his cache.",
  },
  {
    id: 4,
    setup: "Why do Java developers wear glasses?",
    punchline: "Because they don't C#.",
  },
  {
    id: 5,
    setup: "What's a programmer's favorite hangout spot?",
    punchline: "The Foo Bar.",
  },
  {
    id: 6,
    setup: "Why was the function sad after a party?",
    punchline: "It didn't get called back.",
  },
];

export function getRandomJoke(rng: () => number = Math.random): Joke {
  const index = Math.floor(rng() * jokes.length);
  return jokes[index];
}

export function getJokeById(id: number): Joke | undefined {
  return jokes.find((joke) => joke.id === id);
}
