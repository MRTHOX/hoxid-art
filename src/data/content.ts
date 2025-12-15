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
  // TEMP: layout testing duplicates
  {
    id: 'work-01',
    title: 'REVERIE PROTOCOL',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeihswxn36d6duxh6ufkqubn57ilp4q5rasbsh2nnutbpuvckway2xe/artifact',
    tags: ['exhibitied in Miami NFT 25', '3d']
  },
  {
    id: 'work-02',
    title: 'A STATE BETWEEN',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeibjjuuljbixgfbq5bvggostdy6ar7n7oagaefyld5mbmww3ga3m4a/artifact',
    tags: ['audiovisual', '3d', 'exhibited in Spain']
  },
  {
    id: 'work-03',
    title: 'DREAM STATE OF A STATE BETWEEN',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeicodkwpajhi3nhaak6k2d2fyrrvbmkc3yw44m46cpfeam3bltbtxi/artifact',
    tags: ['3d']
  },
  {
    id: 'work-04',
    title: 'VOTUM',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmdRXuPBKUuXYVNer9nsMyFMjMFp4EZy8T6kN1iZ4qAeDT/artifact',
    tags: ['3d']
  },
  {
    id: 'work-12',
    title: 'TOMORROWS WHISPERS',
    year: 2024,
    videoUrl:
      'https://bits.raster.art/660a/660a093ba037d88bdea5560af4d313af0df817863f483a4684f3ed8e131eaaea/original',
    tags: ['audiovisual','3d']
  },
  {
    id: 'work-05',
    title: 'Glass Obscure',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmUKGTVzeiTWWxkUkXyn1ug8cL6mBbX1NEytB3rvJ7vC6C/artifact',
    tags: ['3d']
  },
  {
    id: 'work-06',
    title: 'Synkrasis',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmSrucqXLJGmeTBJn2GB5VD2Zvjxzye5GydqoRcv6eEKvU/artifact',
    tags: ['3d']
  },
  {
    id: 'work-07',
    title: 'The Weight of Invisibility',
    year: 2023,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmRidJu4PtxWzpGsXfBVir1FghacYSAayPQgNN1GeFK3i9/artifact',
    tags: ['3d']
  },
  {
    id: 'work-08',
    title: 'STRATA',
    year: 2024,
    videoUrl:
      'https://bits.raster.art/9d2e/9d2ed77c559ac806c7ee0b014265ad794be860ed75dc45e6b18b1bb25aa1904f/original',
    tags: ['3d']
  },
  {
    id: 'work-09',
    title: 'Endless Morphogenesis',
    year: 2024,
    videoUrl:
      'https://bits.raster.art/ae9f/ae9f8718c56ffe32c9ebc75a05d2fdb6304e175bec61c5a5257c32ffa8c99901/original',
    tags: ['3d']
  },
  {
    id: 'work-10',
    title: 'KINESIS',
    year: 2025,
    videoUrl:
      'https://bits.raster.art/c5d7/c5d7ec3ffca2619e0f9b772f987bf28b73e4b69c8d6fefa1614d94c38af264e9/original',
    tags: ['3d']
  },
  {
    id: 'work-13',
    title: 'INGRESS',
    year: 2024,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmTebEoja5Cfgfsqy8QBmtzGEWoLkpeHhmV4sX7WYa4244/artifact',
    tags: ['audiovisual','3d']
  },
  {
    id: 'work-14',
    title: 'MUTATIOx',
    year: 2024,
    videoUrl:
      'https://assets.manifold.xyz/optimized/d08859bca4515a5f48f6f0e22008a262ed09f64bc649735028271112a698ee12/w_1024.mp4',
    tags: ['3d']
  },
  // Original works can be restored below when layout testing is complete:
  // {
  //   id: 'work-002',
  //   title: 'Machine Breath',
  //   year: 2023,
  //   videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  // }
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
  // 2024
  {
    id: 'exh-2024-panopticon',
    name: 'PANOPTICON',
    location: 'Spain – Lugo',
    startDate: '2024-01-01'
  },
  {
    id: 'exh-2024-tezdev',
    name: 'TEZDEV',
    location: 'Belgium – Brussels',
    startDate: '2024-01-02'
  },
  {
    id: 'exh-2024-conf3rence',
    name: 'CONF3RENCE',
    location: 'Germany – Dortmund',
    startDate: '2024-01-03'
  },
  {
    id: 'exh-2024-nft-nyc',
    name: 'NFT NYC',
    location: 'USA – New York City',
    startDate: '2024-01-04'
  },
  {
    id: 'exh-2024-digital-art-mile',
    name: 'THE DIGITAL ART MILE',
    location: 'Switzerland – Basel',
    startDate: '2024-01-05'
  },
  {
    id: 'exh-2024-ribela',
    name: 'RIBELA',
    location: 'Spain – Sarria',
    startDate: '2024-01-06'
  },
  // 2023
  {
    id: 'exh-2023-nft-paris',
    name: 'NFT PARIS',
    location: 'France – Paris',
    startDate: '2023-01-01'
  },
  {
    id: 'exh-2023-nft-nyc',
    name: 'NFT NYC',
    location: 'USA – New York City',
    startDate: '2023-01-02'
  },
  {
    id: 'exh-2023-nft-show-europe',
    name: 'NFT SHOW EUROPE',
    location: 'Spain – Valencia',
    startDate: '2023-01-03'
  },
  {
    id: 'exh-2023-iham',
    name: 'IHAM GALLERY',
    location: 'France – Paris',
    startDate: '2023-01-04'
  },
  {
    id: 'exh-2023-canvas',
    name: 'THE CANVAS',
    location: 'USA – Miami',
    startDate: '2023-01-05'
  },
  {
    id: 'exh-2023-webx',
    name: 'WEBX-ASIA',
    location: 'Japan – Tokyo',
    startDate: '2023-01-06'
  },
  {
    id: 'exh-2023-nox',
    name: 'NOX GALLERY',
    location: 'Japan – Tokyo',
    startDate: '2023-01-07'
  },
  {
    id: 'exh-2023-neo-shibuya',
    name: 'NEO SHIBUYA TV',
    location: 'Japan – Tokyo',
    startDate: '2023-01-08'
  },
  {
    id: 'exh-2023-tezartmtl',
    name: 'TEZARTMTL',
    location: 'Canada – Montreal',
    startDate: '2023-01-09'
  },
  {
    id: 'exh-2023-crypto-art-seoul',
    name: 'CRYPTO ART SEOUL',
    location: 'South Korea – Seoul',
    startDate: '2023-01-10'
  },
  // 2022
  {
    id: 'exh-2022-museum-angewandte-kunst',
    name: 'MUSEUM ANGEWANDTE KUNST',
    location: 'Germany – Frankfurt',
    startDate: '2022-01-01'
  },
  {
    id: 'exh-2022-artyfarty',
    name: 'ARTYFARTY GALLERY',
    location: 'Germany – Cologne',
    startDate: '2022-01-02'
  },
  {
    id: 'exh-2022-nft-art-con',
    name: 'NFT ART CON',
    location: 'Thailand – Chiang Mai',
    startDate: '2022-01-03'
  },
  // 2021
  {
    id: 'exh-2021-offspace',
    name: 'OFFSPACE AR GALLERY',
    location: 'Germany – Mönchengladbach',
    startDate: '2021-01-01'
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
