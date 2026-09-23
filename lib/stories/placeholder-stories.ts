/**
 * PLACEHOLDER CONTENT — replace before launch.
 *
 * Every name, quote, and story below is fictional and exists only to
 * demonstrate the layout. Images are temporary stand-ins and do not depict
 * the people named here. Real stories should be published through Sanity
 * (/studio); once Sanity returns approved stories, this file is no longer used.
 */
import type { Story } from './types.ts'

export const placeholderStories: Story[] = [
  {
    slug: 'a-quiet-kind-of-joy',
    name: 'Kwame Asante',
    sport: 'Football',
    location: 'London, England',
    title: 'A quiet kind of joy',
    excerpt:
      'Growing up, joy was something you earned on the pitch. It took an injury and a long winter to learn it could be received.',
    quote: 'I spent years chasing the feeling of scoring. The peace I have now doesn’t need a goal.',
    image: {
      src: '/images/stories/story-04.jpg',
      alt: 'A young man in a grey T-shirt smiles with his hands clasped in front of a concrete wall.',
      position: '50% 30%',
    },
    categories: ['faith', 'recovery'],
    date: '2026-08-14',
    featured: true,
    placeholder: true,
    body: [
      { type: 'paragraph', text: 'My mum used to say I only smiled on Saturdays. She wasn’t wrong. If I played well, I was a joy to be around. If I didn’t, the house went quiet.' },
      { type: 'paragraph', text: 'Then my knee went. Seven months. No Saturdays.' },
      { type: 'pullquote', text: 'I spent years chasing the feeling of scoring. The peace I have now doesn’t need a goal.' },
      { type: 'paragraph', text: 'Rehab is boring. Nobody tells you that. Same exercises, same room, same ceiling. Somewhere in the middle of it I started reading again — the Psalms, mostly, because they were short and honest and a lot of them were written by someone in a hole.' },
      { type: 'paragraph', text: 'I came back different. Not better, not holier. Just less dependent on the scoreboard to tell me who I am.' },
    ],
  },
  {
    slug: 'what-the-armband-weighs',
    name: 'Tomás Villar',
    sport: 'Football',
    location: 'Porto, Portugal',
    title: 'What the armband weighs',
    excerpt:
      'He was handed the captaincy at twenty-three. For a year he tried to carry the whole dressing room on his own.',
    quote: 'Leading isn’t standing in front. It’s being the first one to say you’re not okay.',
    image: {
      src: '/images/stories/story-03.jpg',
      alt: 'A player in a white shirt looks down as he adjusts a red captain’s armband.',
      position: '70% 30%',
    },
    categories: ['leadership', 'identity'],
    date: '2026-07-02',
    featured: true,
    placeholder: true,
    body: [
      { type: 'paragraph', text: 'The first time I put the armband on, it felt like nothing. A strip of elastic. By the end of the season I could feel it on my arm when I was asleep.' },
      { type: 'paragraph', text: 'I thought a captain had to have the answer. So I pretended. I shouted more. I smiled in interviews. At home I didn’t speak to anyone for days after a loss.' },
      { type: 'pullquote', text: 'Leading isn’t standing in front. It’s being the first one to say you’re not okay.' },
      { type: 'paragraph', text: 'It was an older teammate who broke it open. He asked me, in the physio room, who was captaining me. I didn’t have an answer.' },
      { type: 'heading', text: 'Learning to be carried' },
      { type: 'paragraph', text: 'I started going to a small church near the training ground. Nobody there knew who I was, or cared. I sat at the back and let someone else lead for once.' },
      { type: 'paragraph', text: 'The armband still weighs something. I just don’t carry it alone anymore.' },
    ],
  },
  {
    slug: 'the-face-you-wear',
    name: 'Luca Ferrand',
    sport: 'Football',
    location: 'Barcelona, Spain',
    title: 'The face you wear',
    excerpt:
      'Press conferences taught him to look certain. It took years to admit how much doubt was behind the glasses.',
    quote: 'I was very good at looking sure. I was very bad at telling the truth.',
    image: {
      src: '/images/stories/story-01.jpg',
      alt: 'A bearded man in dark-rimmed glasses listens with a serious expression.',
      position: '45% 35%',
    },
    categories: ['identity', 'failure', 'faith'],
    date: '2026-06-18',
    placeholder: true,
    body: [
      { type: 'paragraph', text: 'There is a face you learn to wear in front of microphones. Chin up, eyes steady, short answers. I wore it so long I started wearing it at home.' },
      { type: 'pullquote', text: 'I was very good at looking sure. I was very bad at telling the truth.' },
      { type: 'paragraph', text: 'I made mistakes that were public, and some that were private and worse. For a long time I thought the answer was to look even more certain.' },
      { type: 'paragraph', text: 'The first honest conversation I had was with a pastor who had never watched a match in his life. He didn’t care about the face. He asked about the man behind it.' },
      { type: 'paragraph', text: 'I don’t have a neat ending. I have a practice: say one true thing a day, out loud, to someone who loves me.' },
    ],
  },
  {
    slug: 'new-city-same-prayer',
    name: 'Jonah Mbeki',
    sport: 'Football',
    location: 'Manchester, England',
    title: 'New city, same prayer',
    excerpt:
      'A transfer looks like a celebration from the outside. From the inside, it’s a hotel room, a new language, and a lot of silence.',
    quote: 'The move made the headlines. The loneliness didn’t.',
    image: {
      src: '/images/stories/story-02.jpg',
      alt: 'A smiling player in a sky-blue shirt stands in front of a dark blue curtain.',
      position: '45% 25%',
    },
    categories: ['identity', 'purpose'],
    date: '2026-05-09',
    placeholder: true,
    body: [
      { type: 'paragraph', text: 'The photo from signing day is everywhere. Big smile, new shirt. What you don’t see is that I went back to the hotel that night and ate dinner alone in the room.' },
      { type: 'pullquote', text: 'The move made the headlines. The loneliness didn’t.' },
      { type: 'paragraph', text: 'For the first three months I didn’t know anyone well enough to tell them I was struggling. I called home every night. My dad would pray with me on speaker, the same short prayer he said over us as kids.' },
      { type: 'heading', text: 'Finding a table' },
      { type: 'paragraph', text: 'Eventually a teammate invited me for dinner with his family. Nothing special — rice, chicken, his kids running around. It was the first time the city felt like somewhere I could live.' },
      { type: 'paragraph', text: 'I think about that now when new players arrive. The shirt is the easy part. Find them a table.' },
    ],
  },
  {
    slug: 'after-the-last-game',
    name: 'Rafael Duarte',
    sport: 'Football',
    location: 'São Paulo, Brazil',
    title: 'After the last game',
    excerpt:
      'Fifteen years as a professional. Then one afternoon, it was over. This is what came after the farewell video.',
    quote: 'Retirement asks a question football never did: who are you when nobody is watching?',
    image: {
      src: '/images/stories/story-05.jpg',
      alt: 'A former player in a white sweater sits in a dressing room, shirts hanging on the wall behind him.',
      position: '50% 35%',
    },
    categories: ['purpose', 'identity', 'failure'],
    date: '2026-03-27',
    placeholder: true,
    body: [
      { type: 'paragraph', text: 'They made a lovely video for my last game. Music, slow motion, the saves I’m proud of. I watched it once, and then I didn’t know what to do with the Monday after.' },
      { type: 'pullquote', text: 'Retirement asks a question football never did: who are you when nobody is watching?' },
      { type: 'paragraph', text: 'For fifteen years my week had a shape. Training, travel, match, recovery. Without it I felt like I was falling slowly.' },
      { type: 'paragraph', text: 'I’d always said my identity was in Christ and not in football. Retirement was the first time that sentence was actually tested.' },
      { type: 'paragraph', text: 'I’m still learning the answer. Some days I coach kids. Some days I just walk. It turns out the quiet was always there. I’d just never had to sit in it.' },
    ],
  },
  {
    slug: 'the-hour-before-the-lights',
    name: 'Elias Moreau',
    sport: 'Football',
    location: 'Lyon, France',
    title: 'The hour before the lights',
    excerpt:
      'Everyone sees the kneel after the final whistle. Nobody sees the forty minutes alone in the car park before anyone else arrives.',
    quote: 'I used to pray for a win. Now I pray to be the same man whether we win or not.',
    image: {
      src: '/images/stories/story-06.jpg',
      alt: 'A goalkeeper in green kneels on the pitch with his gloved hands open in prayer.',
      position: '45% 40%',
    },
    categories: ['faith', 'discipline'],
    date: '2026-02-11',
    placeholder: true,
    body: [
      { type: 'paragraph', text: 'I get to the ground before the kit man. Most days it’s still dark. I sit in the car with the engine off and I don’t check my phone. That hour is the only part of match day that belongs to me.' },
      { type: 'paragraph', text: 'When I was nineteen I thought faith was a kind of insurance. Pray enough, train enough, and the ball stays out of the net. Then I conceded four on my debut and sat in the shower for an hour wondering what I’d done wrong.' },
      { type: 'pullquote', text: 'I used to pray for a win. Now I pray to be the same man whether we win or not.' },
      { type: 'heading', text: 'The part the cameras miss' },
      { type: 'paragraph', text: 'People film the moment I kneel after the whistle. They don’t see the mornings I didn’t want to get up. The weeks I couldn’t feel anything when I prayed. I kept showing up to that car park anyway.' },
      { type: 'paragraph', text: 'Discipline, for me, isn’t about the gym. It’s about coming back to the same quiet place when nothing is happening there. Most of the time nothing is. That’s the point.' },
      { type: 'paragraph', text: 'If you’re young and you’re reading this: the lights are loud. Find the hour before them.' },
    ],
  },
]
