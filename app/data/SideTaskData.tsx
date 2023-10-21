import explorerImg from '/components/rushik-static/explorer.png';

interface ImageConfig {
  src: string;
  alt: string;
  title: string;
}

interface Section {
  sectionTitle: string;
  content: ImageConfig[];
}

const sections: Section[] = [
  {
    sectionTitle: 'System Tasks',
    content: [
      {
        src: '/explorer.png',
        alt: 'Hide the contents of this drive',
        title: 'Hide the contents of this drive',
      },
      {
        src: '/explorer.png',
        alt: 'Add or remove programs',
        title: 'Add or remove programs',
      },
      {
        src: '/explorer.png',
        alt: 'Search for files or folders',
        title: 'Search for files or folders',
      },
    ],
  },
  {
    sectionTitle: 'File and Folder Tasks',
    content: [
      {
        src: '/explorer.png',
        alt: 'Make a new folder',
        title: 'Make a new folder',
      },
      {
        src: '/explorer.png',
        alt: 'Make a new file',
        title: 'Make a new file',
      },
      {
        src: '/explorer.png',
        alt: 'Share this folder',
        title: 'Share this folder',
      },
    ],
  },
  {
    sectionTitle: 'Other Places',
    content: [
      {
        src: '/explorer.png',
        alt: 'My Computer',
        title: 'My Computer',
      },
      {
        src: '/explorer.png',
        alt: 'My Documents',
        title: 'My Documents',
      },
      {
        src: '/explorer.png',
        alt: 'Shared Documents',
        title: 'Shared Documents',
      },
      {
        src: '/explorer.png',
        alt: 'My Network Places',
        title: 'My Network Places',
      },
    ],
  },
];

export default sections;
