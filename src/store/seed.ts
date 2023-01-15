export const creators = [
  {
    id: '0001',
    email: 'john@no.one',
    name: 'John',
    handle: '@john',
    avatar: 'https://picsum.photos/id/13/200/200',
    interactions: ['1000', '1001', '1002', '1003', '1004'],
    permissions: ['READ', 'WRITE'],
  },
  {
    id: '0002',
    email: 'jane@no.one',
    name: 'Jane',
    handle: '@jane',
    avatar: 'https://picsum.photos/id/15/200/200',
    interactions: ['1005', '1006', '1007'],
  },
  {
    id: '0003',
    email: 'keneucker@gmail.com',
    name: 'Ken',
    verified: true,
    handle: '@kendridspirit',
    avatar: '/twitter-profile.jpg',
    banner: '/twitter-banner.jpg',
  },
]

export const interactions = [
  {
    id: '1000',
    creator: '0001',
    post: '0100',
    text: 'Good for finding out what a dragon really is.',
  },
  {
    id: '1001',
    creator: '0001',
    post: '0100',
    text: 'I now know what dragons are, thanks!',
  },
  {
    id: '1002',
    creator: '0001',
    post: '0101',
    text: "Read this book you know what dragons are and you've decided to feed one.",
  },
  {
    id: '1003',
    creator: '0001',
    post: '0101',
    text: 'Wait... what did I just read??',
  },
  {
    id: '1004',
    creator: '0001',
    post: '0102',
    text: "For when you've given up on your dragon, or are very hungry.",
  },
  {
    id: '1005',
    creator: '002',
    post: '0103',
    text: 'Do you ever ask yourself what people are talking about when they say dragons? This book helps demystify the problem.',
  },
  {
    id: '1006',
    creator: '0002',
    post: '0104',
    text: 'Look, everyone knows that dragons are dangerous. This is nothing new.',
  },
]

export const posts = [
  {
    id: '0100',
    creator: '0001',
    title: 'December 7 2022 @ 17:42',
    interactions: ['1000', '1001'],
    published: false,
    text: `I am hanging out by the peer today and I always think of my childhood when I am here.`,
    media: ['https://picsum.photos/id/230/200/300'],
  },
  {
    id: '0101',
    creator: '0001',
    title: 'December 11 2022 @ 7:20',
    interactions: ['1002', '1003'],
    published: true,
    text: `These beautiful shots of the sky.😍`,
    media: ['https://picsum.photos/id/719/200/300', 'https://picsum.photos/id/721/200/300'],
  },
  {
    id: '0102',
    creator: '0001',
    title: 'Old Timey Beach Photo',
    interactions: ['1004'],
    published: true,
    media: ['https://picsum.photos/id/100/200/300'],
  },
  {
    id: '0103',
    creator: '0003',
    title: 'December 10, 2020 @ 17:20',
    interactions: ['1005'],
    published: true,
    text: `Spending the year in Cuba taught me a lot. My studies were hard but the people and the nightlife was amazing.`,
    tags: `#photo #cuba #travel #studies`,
    media: ['https://picsum.photos/id/110/200/300', 'https://picsum.photos/id/111/200/300'],
  },
  {
    id: '0104',
    creator: '0003',
    title: 'All The 🌸 On Christmas',
    interactions: ['1006'],
    published: true,
    tags: `#photograhy`,
    media: [
      'https://picsum.photos/id/72/200/300',
      'https://picsum.photos/id/73/200/300',
      'https://picsum.photos/id/74/200/300',
      'https://picsum.photos/id/75/200/300',
    ],
  },
  {
    id: '0105',
    creator: '0002',
    title: 'Portrait Photography by Jane',
    published: true,
    text: `My artwork is available at mycoolartwork.com`,
    website: 'http://mycoolartwork.com',
    media: [
      'https://picsum.photos/id/90/200/300',
      'https://picsum.photos/id/91/200/300',
      'https://picsum.photos/id/92/200/300',
      'https://picsum.photos/id/93/200/300',
      'https://picsum.photos/id/94/200/300',
    ],
  },
]

const db = {
  posts,
  interactions,
  creators,
}

export default db
