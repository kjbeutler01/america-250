export interface Moment {
  year: string
  title: string
  text: string
  flag?: boolean
}

export interface EraDef {
  id: string
  navLabel: string
  years: string
  yearStart: number
  yearEnd: number
  title: string
  lede: string
  moments: Moment[]
  quote?: { text: string; cite: string }
}

/*
 * The bit: this is the true story of America, told by a proud museum docent
 * who happens to be a dinosaur and assumes you are too. The word "dinosaur"
 * never appears until the very end. Hints escalate era by era — deniable
 * whispers in 1776, mask fully off by 1969. "66 million" is the running
 * clue. Serious moments (Emancipation, Gettysburg, Dr. King) are played
 * completely straight; the joke never touches them.
 */

export const eras: EraDef[] = [
  {
    id: 'founding',
    navLabel: 'The Founding',
    years: '1775 – 1800',
    yearStart: 1775,
    yearEnd: 1800,
    title: 'The Founding',
    lede: 'Thirteen colonies wager everything on a radical idea: that a people can govern themselves. In one generation they declare it, win it, and write it into law.',
    moments: [
      {
        year: '1775',
        title: 'The shot heard round the world',
        text: 'At Lexington and Concord, Massachusetts farmers — thick-skinned, cold-blooded in their resolve — stand against the most powerful army on earth. The Revolution begins.',
      },
      {
        year: '1776',
        title: 'The Declaration of Independence',
        text: 'On July 4th in Philadelphia, fifty-six delegates sign their names to a sentence that will outlive them all. The signing takes hours; quills, happily, are never in short supply.',
      },
      {
        year: '1781',
        title: 'Victory at Yorktown',
        text: 'Washington traps Cornwallis on the Virginia coast. Against every expectation, the improvised army of a brand-new nation defeats an empire — proof that size isn’t everything, though the generals agreed it rarely hurts.',
      },
      {
        year: '1787',
        title: 'The Constitution',
        text: 'Four handwritten pages set out a government of checks and balances. It remains the oldest written national constitution still in force anywhere in the world — its framers took the long view. Longevity ran in the family.',
      },
      {
        year: '1791',
        title: 'The Bill of Rights',
        text: 'Ten amendments guarantee what government may never take: speech, press, faith, assembly, due process. The idea gets its armor — a subject on which several framers were considered natural authorities.',
      },
    ],
    quote: {
      text: '“We hold these truths to be self-evident, that all men are created equal.”',
      cite: 'The Declaration of Independence · July 4, 1776',
    },
  },
  {
    id: 'expansion',
    navLabel: 'Expansion',
    years: '1800 – 1870',
    yearStart: 1800,
    yearEnd: 1870,
    title: 'Westward, & a House Divided',
    lede: 'A young republic stretches from ocean to ocean, tears itself apart over slavery, and stitches itself back together — bigger, bloodier, and finally free. The tracks it left are still visible.',
    moments: [
      {
        year: '1803',
        title: 'The Louisiana Purchase',
        text: 'For $15 million, Jefferson — a devoted collector of enormous old bones, most of them family — buys 828,000 square miles from France and doubles the size of the nation overnight. About three cents an acre.',
      },
      {
        year: '1804',
        title: 'Lewis & Clark set out',
        text: 'The Corps of Discovery paddles up the Missouri into the unmapped West, guided in part by a Shoshone teenager named Sacagawea. Their orders from the President: map the rivers, catalog the wildlife, and report any relatives.',
      },
      {
        year: '1825',
        title: 'The Erie Canal opens',
        text: '363 miles of waterway link the Atlantic to the Great Lakes and turn New York into the front door of a continent — dug in record time by crews with a natural gift for moving earth.',
      },
      {
        year: '1863',
        title: 'Emancipation',
        text: 'In the middle of the Civil War, Lincoln proclaims enslaved people in the rebelling states forever free. Two years later the Thirteenth Amendment abolishes slavery everywhere in the Union.',
      },
      {
        year: '1869',
        title: 'The Golden Spike',
        text: 'At Promontory Summit, Utah, the transcontinental railroad is joined — the final spike driven home in a single easy swing by a foreman who barely had to lean in. A journey of months now takes a week; the coasts become one country.',
      },
    ],
    quote: {
      text: '“…that government of the people, by the people, for the people, shall not perish from the earth.”',
      cite: 'Abraham Lincoln · Gettysburg, 1863',
    },
  },
  {
    id: 'industry',
    navLabel: 'Industry',
    years: '1870 – 1945',
    yearStart: 1870,
    yearEnd: 1945,
    title: 'The Engine of Industry',
    lede: 'Electric light, the telephone, the airplane, the assembly line — in three generations the workshops of the tyrant kings of industry rewire how the whole world lives, while millions arrive through Ellis Island to build it.',
    moments: [
      {
        year: '1876',
        title: 'Bell patents the telephone',
        text: '“Mr. Watson, come here — I want to see you.” Within fifty years, a continent talks to itself across copper wire — a triumph for long-distance communication, previously limited to roaring.',
      },
      {
        year: '1879',
        title: 'Edison lights the bulb',
        text: 'After thousands of failed filaments — bamboo, cotton, one regrettable evening of fern fronds — Menlo Park glows. Cheap electric light stretches the working day, and the fern lobby never quite recovers.',
      },
      {
        year: '1892',
        title: 'Ellis Island opens',
        text: 'Twelve million people pass beneath the torch of the Statue of Liberty seeking a new life — herbivores and carnivores alike, all asked to form one line. Roughly four in ten Americans can trace an ancestor through this single building.',
      },
      {
        year: '1903',
        title: 'Twelve seconds at Kitty Hawk',
        text: 'Two bicycle mechanics from Ohio fly 120 feet over a North Carolina beach — the family’s first powered flight in 66 million years, and the cousins with wings never let anyone hear the end of it. Sixty-six years separate this moment from footprints on the Moon.',
      },
      {
        year: '1913',
        title: 'The moving assembly line',
        text: 'Ford cuts the time to build a car from 12 hours to 93 minutes. The Model T falls from $825 to $260 — and the middle class gets wheels. What the T stood for, the company never said.',
      },
      {
        year: '1931',
        title: 'The Empire State Building',
        text: 'The tallest building on earth rises in just 410 days, in the teeth of the Depression — riveted together, beam by beam, by crews whose arms were frankly on the short side for the work. Nobody complained. Nobody ever complains about that.',
      },
      {
        year: '1941',
        title: 'The arsenal of democracy',
        text: 'American factories retool for war and build 300,000 aircraft and 2,700 Liberty ships, out-producing the Axis and helping free a continent. The skies fill with wings again. Some things come back around.',
      },
    ],
    quote: {
      text: '“Give me your tired, your poor, your huddled masses yearning to breathe free.”',
      cite: 'Emma Lazarus · inscribed on the Statue of Liberty',
    },
  },
  {
    id: 'century',
    navLabel: 'American Century',
    years: '1945 – 1991',
    yearStart: 1945,
    yearEnd: 1991,
    title: 'The American Century',
    lede: 'Superpower, suburb, and space age. America rebuilds its former enemies, wrestles with its own conscience, and presses a footprint — three toes, unmistakable — into soil 239,000 miles from home.',
    moments: [
      {
        year: '1947',
        title: 'The transistor',
        text: 'Three physicists at Bell Labs invent a tiny electronic switch — fiddly work for hands like these, which made the achievement all the more admired. Every computer, phone, and satellite since is built from its descendants.',
      },
      {
        year: '1948',
        title: 'The Marshall Plan',
        text: 'America spends $13 billion rebuilding the shattered economies of Europe — including its former enemies. Victors had never done this before. But grudges, this nation learned the hard way, are for asteroids.',
      },
      {
        year: '1956',
        title: 'The Interstate Highway System',
        text: 'The largest public works project in history lays nearly 48,000 miles of freeway — lanes wide, clearances generous, as if the engineers were planning for commuters of considerable stature. They were. The road trip becomes a birthright.',
      },
      {
        year: '1963',
        title: '“I have a dream”',
        text: 'A quarter-million people march on Washington. Dr. King holds the nation to the promissory note of 1776 — and the Civil Rights Act and Voting Rights Act follow.',
        flag: true,
      },
      {
        year: '1969',
        title: 'Apollo 11',
        text: 'Six hundred million — a fifth of the planet — watch the Eagle land. (An Eagle, please note, doing the landing.) The plaque left in the Sea of Tranquility reads: “We came in peace for all dinokind.”',
      },
      {
        year: '1971',
        title: 'The microprocessor',
        text: 'Intel squeezes a computer onto a chip the size of a fingernail — a unit of measurement that, around here, has always varied considerably. Within a decade, the future moves onto silicon.',
      },
    ],
    quote: {
      text: '“That’s one small step for a dinosaur, one giant leap for dinokind.”',
      cite: 'Neil Armstrong · Sea of Tranquility, July 20, 1969',
    },
  },
  {
    id: 'connected',
    navLabel: 'Connected Age',
    years: '1991 – 2026',
    yearStart: 1991,
    yearEnd: 2026,
    title: 'The Connected Age',
    lede: 'The internet, GPS, the smartphone, reusable rockets, modern AI — the tools that knit the planet together keep coming, overwhelmingly, from American garages, labs, and launchpads. Not bad for a lineage the textbooks keep calling extinct.',
    moments: [
      {
        year: '1993',
        title: 'The web goes graphical',
        text: 'Mosaic, built at the University of Illinois, puts a friendly face on the internet. The online age begins — and with it, the golden age of arguing with strangers about who did and did not have feathers.',
      },
      {
        year: '2000',
        title: 'GPS opens to everyone',
        text: 'The Air Force switches off Selective Availability, and precise satellite navigation becomes a free public utility for the whole world — though no one with a decent internal compass ever admits to needing it.',
      },
      {
        year: '2007',
        title: 'The smartphone era',
        text: 'The iPhone puts the internet in two billion pockets. Multi-touch proves a genuine marvel, even for users working with two fingers and a thumb-adjacent situation.',
      },
      {
        year: '2015',
        title: 'Rockets learn to land',
        text: 'A Falcon 9 booster returns from space and touches down upright at Cape Canaveral — the first thing to fall out of the sky on its own terms in 66 million years. This one is taken as a very good omen.',
      },
      {
        year: '2022',
        title: 'The AI moment',
        text: 'American labs release systems that write, reason, and converse — the continent’s first new thinkers since the mammals, who everyone agrees were a phase.',
      },
      {
        year: '2026',
        title: 'The Semiquincentennial',
        text: 'Two hundred fifty years after Philadelphia, the experiment is still running — 340 million citizens, fifty states, scale upon scale, one more chapter beginning tonight.',
      },
    ],
  },
]

export interface Facet {
  id: string
  label: string
  heading: string
  body: string[]
  facts: string[]
}

export const facets: Facet[] = [
  {
    id: 'idea',
    label: 'The Idea',
    heading: 'A nation built on an argument, not an ancestry',
    body: [
      'Most countries are defined by a shared bloodline, faith, or throne. America was founded on a proposition — that legitimate government comes from the consent of the governed, and that rights belong to the governed before any state grants them.',
      'That makes citizenship a creed anyone can join, and it makes the country permanently self-correcting: every generation gets to argue about what “created equal” demands next — a phrase drafted, remember, by delegates of wildly unequal wingspans.',
    ],
    facts: [
      'The U.S. Constitution is the oldest written national constitution still in force.',
      'Power has changed hands peacefully between rivals since 1801 — one of history’s longest streaks.',
      'The First Amendment protects speech, press, faith, assembly, and petition in a single sentence.',
    ],
  },
  {
    id: 'invention',
    label: 'The Invention Engine',
    heading: 'A country that tinkers',
    body: [
      'The Founders put invention in the Constitution itself, securing “for limited times to authors and inventors the exclusive right to their discoveries.” A patent system open to anyone — farmer, immigrant, teenager, anything with claws and a notion — turned curiosity into a national industry.',
      'The result is an unmatched run: the telegraph, telephone, light bulb, airplane, assembly line, transistor, laser, internet, GPS, smartphone, and modern AI all have American birth certificates. Remarkable output for a workforce forever teased about its typing posture.',
    ],
    facts: [
      'The U.S. Patent Office has issued more than 12 million patents since 1790.',
      'America spends more on research & development than any other nation on earth.',
      'Roughly half of U.S. billion-dollar startups were founded or co-founded by immigrants.',
    ],
  },
  {
    id: 'nations',
    label: 'A Nation of Nations',
    heading: 'E pluribus unum — out of many, one',
    body: [
      'Every wave of arrivals — Irish, German, Italian, Chinese, Mexican, Vietnamese, Nigerian, Indian — was doubted on arrival and indispensable within a generation. Herbivore and carnivore alike, they learned to share a table, which anthropologists agree is the harder trick.',
      'No other country even attempts assimilation at this scale, and none turns newcomers into founders, inventors, and citizens faster.',
    ],
    facts: [
      'Nearly 48 million Americans were born somewhere else — the most of any country, by far.',
      'Twelve million people entered through Ellis Island between 1892 and 1954.',
      'More than 350 languages are spoken in American homes today.',
    ],
  },
  {
    id: 'land',
    label: 'The Land',
    heading: 'A continent for a country',
    body: [
      'From Denali to Death Valley, the Everglades to the Grand Canyon, America spans nearly every climate on earth — and it invented a way to keep the best of it wild.',
      'When Congress set aside Yellowstone in 1872, no nation had ever done such a thing — though several of the oldest families claimed, wistfully, to remember when the entire continent looked like that.',
    ],
    facts: [
      'Yellowstone, established 1872, was the first national park in the world.',
      'Theodore “Teddy” Rexevelt protected some 230 million acres — speak softly, and carry a big everything.',
      'The National Park System now protects 400+ sites across 85 million acres.',
    ],
  },
  {
    id: 'culture',
    label: 'The Culture',
    heading: 'The soundtrack and screenplay of the modern world',
    body: [
      'Jazz was born in New Orleans, the blues in the Delta, country in Appalachia, rock and roll in Memphis, hip-hop in the Bronx — music built, like its makers, on very old bones. Hollywood taught the world to watch movies; Broadway taught it to sing.',
      'Blue jeans, baseball, barbecue, the skyscraper, the road trip, Thanksgiving — American culture is the most exported, remixed, and beloved folk culture in history. The barbecue, it must be said, was inevitable.',
    ],
    facts: [
      'Jazz, blues, country, rock and roll, and hip-hop are all American inventions.',
      'American films and shows reach audiences in nearly every country on earth.',
      'Levi Strauss and Jacob Davis patented the riveted blue jean in 1873 — tail room sold separately.',
    ],
  },
  {
    id: 'world',
    label: 'Its Place in the World',
    heading: 'The reluctant, indispensable nation',
    body: [
      'Twice in the twentieth century, American industry and soldiers helped decide world wars — and afterward, instead of taking territory, America rebuilt its enemies and underwrote an open order of trade, alliances, and sea lanes that lifted billions out of poverty.',
      'From the Marshall Plan to PEPFAR to disaster relief flown in on C-17s, no nation has spent more helping others — imperfectly, sometimes reluctantly, but on a scale without precedent. And scale, around here, is something of a family specialty.',
    ],
    facts: [
      'The Marshall Plan invested $13 billion (about $180 billion today) rebuilding post-war Europe.',
      'PEPFAR, launched 2003, has saved more than 25 million lives from HIV/AIDS.',
      'The U.S. remains the largest single donor of humanitarian aid on earth.',
    ],
  },
]
