import { supabase, ContentItem, Category } from './supabase';

// Mock data for development (used when Supabase is not configured)
const MOCK_CONTENT: ContentItem[] = [
  // 15th century poetry
  {
    id: '1',
    category: '15th century poetry',
    title: 'The Ballad of Lost Gardens',
    preview: 'In chambers old where shadows play, a voice speaks soft of yesterday. The ink runs thin, the parchment worn...',
    fullContent: `In chambers old where shadows play, a voice speaks soft of yesterday. The ink runs thin, the parchment worn, yet verses live from ages born.

The gardens lost to time and tide, where lovers walked side by side, now sleep beneath the winter snow, their stories only poets know.

The words that danced on candlelight, now whisper through the endless night, a reminder that beauty fades, but art endures through all decades.`,
  },
  {
    id: '2',
    category: '15th century poetry',
    title: 'Ode to the Wandering Moon',
    preview: 'Silver coin upon the velvet night, guiding travelers with gentle light. The moon has seen empires rise and fall...',
    fullContent: `Silver coin upon the velvet night, guiding travelers with gentle light. The moon has seen empires rise and fall, witnessed kings and peasants, one and all.

She watches from her throne of stars, healing earth's invisible scars, constant in her changing face, teaching mortals time and grace.

O wandering moon, eternal guide, who keeps the secrets oceans hide, your silent wisdom lights the way for those who dare to go astray.`,
  },

  // 1600s history
  {
    id: '3',
    category: '1600s history',
    title: 'The Tulip Mania of 1637',
    preview: "In the Dutch Golden Age, tulip bulbs became more valuable than houses. At its peak, a single bulb could cost ten times a craftsman's annual wage...",
    fullContent: `In the Dutch Golden Age, tulip bulbs became more valuable than houses. At its peak, a single bulb could cost ten times a craftsman's annual wage. This speculative bubble, known as Tulip Mania, represents one of history's first recorded economic bubbles.

The craze began when tulips were introduced to the Netherlands from Turkey. Their vibrant colors and unique patterns made them status symbols among the wealthy. Soon, a futures market developed where bulbs were traded before they even bloomed.

When the bubble burst in February 1637, fortunes evaporated overnight. The crash sent shockwaves through Dutch society and serves as an early lesson in the dangers of speculative excess and market psychology.`,
  },
  {
    id: '4',
    category: '1600s history',
    title: 'The Great Fire of London',
    preview: 'On September 2nd, 1666, a small fire in a bakery on Pudding Lane would grow to consume four-fifths of London. The inferno burned for four days...',
    fullContent: `On September 2nd, 1666, a small fire in a bakery on Pudding Lane would grow to consume four-fifths of London. The inferno burned for four days, destroying over 13,000 houses and 87 churches, including the original St. Paul's Cathedral.

The medieval city, with its closely-packed timber buildings and narrow streets, was a tinderbox waiting to ignite. Strong winds spread the flames rapidly, and firefighting efforts were hampered by outdated equipment and bureaucratic delays.

Ironically, the disaster led to London's rebirth. Sir Christopher Wren redesigned much of the city, implementing wider streets, better building codes, and architectural innovations. The modern London we know today rose from these ashes, transforming from a medieval warren into a planned metropolis.`,
  },

  // Tech news
  {
    id: '5',
    category: 'tech news',
    title: 'The Rise of Rust in System Programming',
    preview: 'Rust has quietly become the darling of system programmers, offering memory safety without garbage collection. Major tech companies are adopting it...',
    fullContent: `Rust has quietly become the darling of system programmers, offering memory safety without garbage collection. Major tech companies including Microsoft, Amazon, and Google are adopting it for critical infrastructure.

What makes Rust special is its ownership system—a compile-time guarantee that prevents common bugs like null pointers and data races. This means you get C-like performance with Python-like safety.

The Linux kernel recently accepted its first Rust code, marking a historic shift for a project written exclusively in C for three decades. As software security becomes paramount, Rust's "if it compiles, it probably works" philosophy is winning converts across the industry.`,
  },
  {
    id: '6',
    category: 'tech news',
    title: 'Quantum Computing Reaches Practical Milestone',
    preview: "IBM and Google have demonstrated quantum computers solving problems beyond classical capabilities. We're entering the \"quantum advantage\" era...",
    fullContent: `IBM and Google have demonstrated quantum computers solving problems beyond classical capabilities. We're entering the "quantum advantage" era, where certain calculations become practically impossible for traditional computers.

Quantum computers exploit superposition and entanglement to process information in fundamentally new ways. A quantum bit can be both 0 and 1 simultaneously, allowing parallel computation at unprecedented scales.

The implications span cryptography, drug discovery, and climate modeling. While we're years from desktop quantum computers, cloud-based quantum services are already available. The race is on to develop quantum-resistant encryption before these machines can break today's security standards.`,
  },

  // Short stories
  {
    id: '7',
    category: 'short stories',
    title: 'The Last Librarian',
    preview: 'In the year 2087, books were memories. Elena was the last person on Earth who remembered the smell of paper, the weight of a hardcover in her hands...',
    fullContent: `In the year 2087, books were memories. Elena was the last person on Earth who remembered the smell of paper, the weight of a hardcover in her hands.

The Great Digitization had swept through like wildfire, promising infinite access and zero waste. Libraries became data centers. Reading became scrolling. And somehow, in the translation, something essential was lost.

Elena descended into her basement every evening, where she kept her collection—three hundred physical books, contraband in an age of infinite streams. She would run her fingers along their spines, select one at random, and lose herself in pages that crinkled with age.

One day, a child knocked on her door. "My grandmother told me you have... books?" The word sounded foreign in the girl's mouth. Elena smiled. Perhaps she wasn't the last after all.`,
  },
  {
    id: '8',
    category: 'short stories',
    title: 'Coffee at Midnight',
    preview: 'The diner existed in a fold between moments, appearing only to those who needed it most. Marcus found it on the worst night of his life...',
    fullContent: `The diner existed in a fold between moments, appearing only to those who needed it most. Marcus found it on the worst night of his life, walking aimlessly through rain-soaked streets at midnight.

Inside, warmth enveloped him. A waitress with kind eyes poured coffee without asking. Around him sat others—each at their own table, each lost in their own despair.

He stayed until dawn, watching the other patrons slowly stand, straighten their shoulders, and walk back into the world with something restored in their eyes. When he finally left, Marcus glanced back. The diner was gone, leaving only an empty lot.

But the coffee's warmth remained, and with it, the knowledge that even in our darkest moments, the universe conspires to remind us we're not alone.`,
  },

  // Philosophy
  {
    id: '9',
    category: 'philosophy',
    title: 'The Paradox of Choice',
    preview: 'More options should mean more freedom, yet studies show that abundance of choice often paralyzes us. Barry Schwartz calls this the "tyranny of choice"...',
    fullContent: `More options should mean more freedom, yet studies show that abundance of choice often paralyzes us. Barry Schwartz calls this the "tyranny of choice"—when limitless options breed anxiety rather than liberation.

Consider streaming services: thousands of films available, yet we spend 20 minutes scrolling before watching nothing. Or online dating: unlimited potential matches, yet we're less committed because someone "better" might be one swipe away.

The paradox reveals a deeper truth: freedom isn't just about having options—it's about having the wisdom to choose. Constraints can be liberating. A painter with three colors may create more meaningful art than one with three hundred, because limitations force intention.

Perhaps the path to satisfaction isn't maximizing choice, but learning to be satisfied with "good enough."`,
  },
  {
    id: '10',
    category: 'philosophy',
    title: 'The Ship of Theseus in Modern Life',
    preview: 'If you replace every plank of a ship, is it still the same ship? This ancient paradox has new relevance in our age of continuous self-optimization...',
    fullContent: `If you replace every plank of a ship, is it still the same ship? This ancient paradox has new relevance in our age of continuous self-optimization.

Every cell in your body replaces itself over time. Your thoughts evolve. Your values shift. The "you" of today shares little physical matter with the "you" of ten years ago. So what makes you, you?

We're constantly rebuilding ourselves—new habits, new beliefs, new bodies through diet and exercise. Social media shows us curated versions of others who seem to have upgraded successfully. The pressure to optimize is relentless.

But perhaps continuity isn't about unchanging substances, but about the pattern that persists through change. You are not a static object but a dynamic process, a story being written. The question isn't whether you're the same ship, but whether you're steering toward your chosen destination.`,
  },

  // Science
  {
    id: '11',
    category: 'science',
    title: 'Octopuses: Alien Intelligence on Earth',
    preview: 'With nine brains and three hearts, octopuses represent an intelligence completely unlike our own. Their neurons are distributed throughout their arms...',
    fullContent: `With nine brains and three hearts, octopuses represent an intelligence completely unlike our own. Their neurons are distributed throughout their arms, which can taste what they touch and solve problems independently.

Unlike humans, whose intelligence evolved from social cooperation, octopuses are solitary. They don't learn from parents or pass down culture. Each octopus reinvents the wheel, yet they've been observed using tools, solving complex puzzles, and even displaying what appears to be playfulness.

Their cognitive architecture is so different from ours that studying them offers insights into what intelligence itself really means. If we ever encounter alien life, it might think more like an octopus than like us—distributed, decentralized, fundamentally strange.

These creatures remind us that consciousness isn't a single phenomenon but a spectrum of solutions to the problem of existing in a complex world.`,
  },
  {
    id: '12',
    category: 'science',
    title: 'The Mysterious Microbiome Within',
    preview: 'You are not alone in your own body. Trillions of microorganisms live in your gut, outnumbering your human cells. They\'re not just passengers—they\'re active participants...',
    fullContent: `You are not alone in your own body. Trillions of microorganisms live in your gut, outnumbering your human cells. They're not just passengers—they're active participants in your health, mood, and even decision-making.

Research shows that gut bacteria produce neurotransmitters like serotonin and dopamine. They communicate with your brain via the vagus nerve, influencing everything from anxiety levels to food cravings. Some scientists argue you don't have a microbiome—you are a microbiome.

This ecosystem can be disrupted by antibiotics, diet, and stress, potentially contributing to depression, obesity, and autoimmune diseases. But it can also be cultivated: fermented foods, fiber, and even specific bacterial supplements can shift the balance.

We're learning that health isn't about the individual human body, but about the complex ecological community that we host. Taking care of yourself means taking care of your trillion invisible partners.`,
  },
];

export async function getContentByInterests(interests: Category[]): Promise<ContentItem[]> {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      // Use mock data if Supabase is not configured
      console.log('Using mock data (Supabase not configured)');
      return MOCK_CONTENT.filter((item) => interests.includes(item.category));
    }

    // Fetch from Supabase
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .in('category', interests);

    if (error) {
      console.error('Error fetching from Supabase:', error);
      // Fall back to mock data on error
      return MOCK_CONTENT.filter((item) => interests.includes(item.category));
    }

    // If no data from Supabase, fall back to mock data
    if (!data || data.length === 0) {
      console.log('No data in Supabase, using mock data');
      return MOCK_CONTENT.filter((item) => interests.includes(item.category));
    }

    return data as ContentItem[];
  } catch (error) {
    console.error('Error in getContentByInterests:', error);
    // Fall back to mock data on any error
    return MOCK_CONTENT.filter((item) => interests.includes(item.category));
  }
}
