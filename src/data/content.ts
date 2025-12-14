export interface HeroVideo {
  id: string;
  videoUrl: string;
}

export interface Work {
  id: string;
  title: string;
  year: number;
  videoUrl: string;
  tags?: string[];
}

export interface AvailableWork extends Work {
  edition?: string;
  viewCollectUrl: string;
}

export interface Exhibition {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate?: string;
  role?: string;
  link?: string;
}

export const heroVideos: HeroVideo[] = [
  {
    id: 'hero-1',
    videoUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c58fd45932aa57813f0ac621545cecb9_animation'
  },
  {
    id: 'hero-2',
    videoUrl: 'https://assets.objkt.media/file/assets-003/bafybeibjjuuljbixgfbq5bvggostdy6ar7n7oagaefyld5mbmww3ga3m4a/artifact'
  },
  {
    id: 'hero-3',
    videoUrl: 'https://assets.objkt.media/file/assets-003/QmUKGTVzeiTWWxkUkXyn1ug8cL6mBbX1NEytB3rvJ7vC6C/artifact'
  },
  {
    id: 'hero-4',
    videoUrl: 'https://assets.objkt.media/file/assets-003/bafybeihswxn36d6duxh6ufkqubn57ilp4q5rasbsh2nnutbpuvckway2xe/artifact'
  }
];

export const works: Work[] = [
  {
  id: "work-001",
  title: "MNEME - LIGHT FAILS HERE",
  year: 2025,
  videoUrl: "https://assets.objkt.media/file/assets-003/bafybeidhium22z2qrl6rfhv62li3o4w23kmiw2cmpwythkrfijztg3dsga/artifact",
  tags: ["audiovisual", "3d"],
},

  
  {
    id: 'work-002',
    title: 'Machine Breath',
    year: 2023,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  }
];

export const availableWorks: AvailableWork[] = [
  {
    id: 'avail-001',
    title: 'Synthetic Horizon',
    year: 2024,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    edition: 'Edition of 25',
    viewCollectUrl: 'https://objkt.com'
  }
];

export const exhibitions: Exhibition[] = [
  {
    id: 'exh-001',
    name: 'Post-Internet Dreams',
    location: 'Berlin, DE',
    startDate: '2024-09-10',
    endDate: '2024-10-15',
    role: 'Solo'
  }
];

export const contactEmail = 'contact@hoxid.art';

export const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    label: 'IG'
  },
  {
    name: 'Tezos',
    url: 'https://objkt.com',
    label: 'TZ'
  }
];

export const bioText = `I explore the tension between human consciousness and machine intelligence, investigating themes of
surveillance, generative systems, and post-internet aesthetics. Selected exhibitions include institutions across Europe and North
America, with works held in private collections internationally.`;
