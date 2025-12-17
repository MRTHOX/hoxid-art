export interface HeroVideo {
  id: string;
  videoUrl: string;
}

export interface Work {
  id: string;
  title: string;
  year: number;
  videoUrl?: string;
  imageUrl?: string;
  tags?: string[];
  aspect?: 'landscape' | 'portrait' | 'square';
  hasSound?: boolean;
}

export interface AvailableWork extends Work {
  edition?: string;
  viewUrl: string;
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
    videoUrl: 'https://bits.raster.art/e3bc/e3bc8cd84d5ac79dacde6b93571dc9000ff259b896d50dd7bc46454c953164af/original'
  },
  {
    id: 'hero-3',
    videoUrl: 'https://bits.raster.art/d956/d956f9acea491659b445fb523e4f5256aef7280287cb9d93b421e1582c50b431/original'
  },
  {
    id: 'hero-4',
    videoUrl: 'https://bits.raster.art/9d2e/9d2ed77c559ac806c7ee0b014265ad794be860ed75dc45e6b18b1bb25aa1904f/original'
  }
];

export const works: Work[] = [
  // TEMP: layout testing duplicates
  {
    id: 'work-01',
    title: 'REVERIE PROTOCOL',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeihswxn36d6duxh6ufkqubn57ilp4q5rasbsh2nnutbpuvckway2xe/original',
    tags: ['exhibitied in Miami NFT 25', '3d'],
    hasSound: true
  },
  {
    id: 'work-02',
    title: 'A STATE BETWEEN',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeibjjuuljbixgfbq5bvggostdy6ar7n7oagaefyld5mbmww3ga3m4a/original',
    tags: ['audiovisual', '3d', 'exhibited in Spain'],
    aspect: 'portrait',
    hasSound: true
  },
  {
    id: 'work-03',
    title: 'DREAM STATE OF A STATE BETWEEN',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeicodkwpajhi3nhaak6k2d2fyrrvbmkc3yw44m46cpfeam3bltbtxi/original',
    tags: ['3d']
  },
  {
    id: 'work-04',
    title: 'VOTUM',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmdRXuPBKUuXYVNer9nsMyFMjMFp4EZy8T6kN1iZ4qAeDT/original',
    tags: ['3d']
  },
  {
    id: 'work-12',
    title: 'TOMORROWS WHISPERS',
    year: 2024,
    videoUrl:
      'https://raw2.seadn.io/ethereum/0x3eff3fcffd9690afd59ec8d6dc3751ed772c65b5/e28ff40733cc379da6aeff32fe23cd/b1e28ff40733cc379da6aeff32fe23cd.mov',
    tags: ['audiovisual','3d']
  },
  {
    id: 'work-05',
    title: 'Glass Obscure',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmUKGTVzeiTWWxkUkXyn1ug8cL6mBbX1NEytB3rvJ7vC6C/original',
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
      'https://assets.objkt.media/file/assets-003/QmRidJu4PtxWzpGsXfBVir1FghacYSAayPQgNN1GeFK3i9/original',
    tags: ['3d']
  },
  {
    id: 'work-08',
    title: 'STRATA',
    year: 2024,
    videoUrl:
      'https://arweave.net/FcAmEd8xOarFHhkIaUx6bNSGkonRpZWw2D3FJwxn8N4',
    tags: ['3d'],
    aspect: 'square'
  },
  {
    id: 'work-09',
    title: 'Endless Morphogenesis',
    year: 2024,
    videoUrl:
      'https://raw2.seadn.io/ethereum/0x4ac6dccf5366cce0d3c15666c107a2d5d298fdd0/45d4e36ad37dc6934ab25e8320f66a/f745d4e36ad37dc6934ab25e8320f66a.mp4',
    tags: ['3d']
  },
  {
    id: 'work-10',
    title: 'KINESIS',
    year: 2025,
    videoUrl:
      'https://raw2.seadn.io/ethereum/0x2c2fba4a4ba889bf4b8a08b95ff7fe6a215bba24/e8d911f341b5db7f674de138b0a66b/83e8d911f341b5db7f674de138b0a66b.mp4',
    tags: ['3d']
  },
  {
    id: 'work-13',
    title: 'INGRESS',
    year: 2024,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmTebEoja5Cfgfsqy8QBmtzGEWoLkpeHhmV4sX7WYa4244/original',
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
    id: 'avail-x_7',
    title: 'x_7',
    year: 2025,
    imageUrl:
      'https://assets.objkt.media/file/assets-003/Qma6HSPHEcNGxCRj3ncJ9kBth9owkMAcLdENh2EQRDwB6C/original',
    viewUrl: 'https://objkt.com/tokens/KT1A6U8cuz9XQxE5fo9fMoBT5KZ9wyiM78Ty/6',
    tags: ['edition']
  },
  {
    id: 'avail-transmutation',
    title: 'TRANSMUTATION',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/Qmeg7izFSmExc1oaq3YSZqD9jJMtwFunCRsg2JBjR26AvS/original',
    viewUrl: 'https://objkt.com/tokens/KT1Sfvkj5boovQCRRFSroE6SAecPHnLed7uD/28',
    tags: ['edition']
  },
  {
    id: 'avail-accumulating',
    title: 'accumulating',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmRPoBpfSoattrH7h864iFuehgQjgFJJ1dN3qg7Mxvr8HY/original',
    viewUrl: 'https://objkt.com/tokens/KT1Jj7EgKyiJcQs2JVs1q9pjfP8iQUni8fEr/2',
    tags: ['edition']
  },
  {
    id: 'avail-mneme-light-fails-here',
    title: 'MNEME — LIGHT FAILS HERE',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeidhium22z2qrl6rfhv62li3o4w23kmiw2cmpwythkrfijztg3dsga/original',
    viewUrl: 'https://objkt.com/tokens/KT1RD7CgPLLp4Na4cqVYz7v5pdaeAYeyewdr/28',
    tags: ['edition']
  },
  {
    id: 'avail-a-state-between',
    title: 'A STATE BETWEEN',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeibjjuuljbixgfbq5bvggostdy6ar7n7oagaefyld5mbmww3ga3m4a/original',
    viewUrl: 'https://objkt.com/tokens/KT1Dv9Q4xwzDEbPFciBnEFxGmry5BwxztXnG/10',
    tags: ['edition']
  },
  {
    id: 'avail-reverie-protocol',
    title: 'REVERIE PROTOCOL',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/bafybeihswxn36d6duxh6ufkqubn57ilp4q5rasbsh2nnutbpuvckway2xe/original',
    viewUrl: 'https://objkt.com/tokens/KT1LruoY7jir29GUMUYwxnYsbmiVmNcaML7A/19',
    tags: ['edition']
  },
  {
    id: 'avail-the-weight-of-invisibility',
    title: 'The Weight of Invisibility',
    year: 2025,
    videoUrl:
      'https://assets.objkt.media/file/assets-003/QmRidJu4PtxWzpGsXfBVir1FghacYSAayPQgNN1GeFK3i9/original',
    viewUrl: 'https://objkt.com/tokens/objkt-one/137',
    tags: ['single']
  }
];

export const exhibitions: Exhibition[] = [
  // 2025
  {
    id: 'exh-2025-nft-miami',
    name: 'NFT Miami — “The Ocean Has Infinite Waves”',
    location: 'USA – Miami',
    startDate: '2025-01-01'
  },
  {
    id: 'exh-2025-british-art-fair',
    name: 'British Art Fair',
    location: 'United Kingdom – London',
    startDate: '2025-01-02'
  },
  {
    id: 'exh-2025-trienal-sarria',
    name: 'Trienal Sarria',
    location: 'Spain – Sarria',
    startDate: '2025-01-03'
  },
  {
    id: 'exh-2025-nfc-summit',
    name: 'NFC Summit',
    location: 'Portugal – Lisbon',
    startDate: '2025-01-04'
  },
  {
    id: 'exh-2025-art-rotterdam',
    name: 'Art Rotterdam',
    location: 'Netherlands – Rotterdam',
    startDate: '2025-01-05'
  },
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
  {
    id: 'exh-2024-british-art-fair',
    name: 'British Art Fair',
    location: 'United Kingdom – London',
    startDate: '2024-01-07'
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

export const contactEmail = 'hoxidart@gmail.com';

export const bioText = `I explore the tension between human consciousness and machine intelligence, investigating themes of
surveillance, generative systems, and post-internet aesthetics. Selected exhibitions include institutions across Europe and North
America, with works held in private collections internationally.`;
