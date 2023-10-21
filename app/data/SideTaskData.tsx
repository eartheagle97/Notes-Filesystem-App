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
        src: '/assets/img/hide-folder.png',
        alt: 'Hide the contents of this drive',
        title: 'Hide the contents of this drive',
      },
      {
        src: '/assets/img/add-program.png',
        alt: 'Add or remove programs',
        title: 'Add or remove programs',
      },
      {
        src: '/assets/img/search.png',
        alt: 'Search for files or folders',
        title: 'Search for files or folders',
      },
    ],
  },
  {
    sectionTitle: 'File and Folder Tasks',
    content: [
      {
        src: '/assets/img/new-folder.png',
        alt: 'Make a new folder',
        title: 'Make a new folder',
      },
      {
        src: '/assets/img/notepad.png',
        alt: 'Make a new file',
        title: 'Make a new file',
      },
      {
        src: '/assets/img/share-folder.png',
        alt: 'Share this folder',
        title: 'Share this folder',
      },
    ],
  },
  {
    sectionTitle: 'Other Places',
    content: [
      {
        src: '/assets/img/home-directory.png',
        alt: 'My Computer',
        title: 'My Computer',
      },
      {
        src: '/assets/img/my-documents.png',
        alt: 'My Documents',
        title: 'My Documents',
      },
      {
        src: '/assets/img/explorer.png',
        alt: 'Shared Documents',
        title: 'Shared Documents',
      },
      {
        src: '/assets/img/network-place.png',
        alt: 'My Network Places',
        title: 'My Network Places',
      },
    ],
  },
  {
    sectionTitle: 'Details',
    content: [
      {
        src: '',
        alt: '',
        title: '(C:)',
      },
      {
        src: '',
        alt: '',
        title: 'Local Disk',
      },
      {
        src: '',
        alt: '',
        title: 'File System: NTFS',
      },
      {
        src: '',
        alt: '',
        title: 'Free Space: 48.6 GB',
      },
      {
        src: '',
        alt: '',
        title: 'Total Space: 98.8 GB',
      },
    ],
  },
];

export default sections;
