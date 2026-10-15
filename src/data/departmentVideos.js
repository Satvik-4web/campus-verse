import { media } from '../services/media/media';

export const DIRECT_MEDIA = ['Startups', 'Campus Tours', 'ELC Projects', 'Resources'];

export const DEPARTMENT_VIDEOS = {
  // Department Media (Sub-menus)
  'Electronics & Comm': [
    { title: 'Project 21', url: media('/videos/ece/Copy of 21.mp4') },
    { title: 'Fasal Kavach', url: media('/videos/ece/Copy of 25_fasal_kavach_video.mp4') },
    { title: 'Project 31', url: media('/videos/ece/Copy of 31_video.mp4') },
    { title: 'Project 32G', url: media('/videos/ece/Copy of 32_g_VIDEO.mp4') },
    { title: 'Project 46', url: media('/videos/ece/Copy of 46_video.mp4') },
    { title: 'Project 47', url: media('/videos/ece/Copy of 47 video.mp4') },
    { title: 'Project 50', url: media('/videos/ece/Copy of 50_video.mp4') },
    { title: 'Project 51B', url: media('/videos/ece/Copy of 51B.mp4') },
    { title: 'Project 54', url: media('/videos/ece/Copy of 54_Video.mp4') },
  ],
  // Direct Media (No sub-menu)
  'Startups': [
    { title: 'Startup Video', url: media('/videos/startups/startup_video.mp4') },
  ],
  'Campus Tours': [
    { title: 'Tour 1', url: media('/videos/campus_tours/Website_videos(3).mp4') },
    { title: 'Tour 2', url: media('/videos/campus_tours/Website_videos(4).mp4') },
    { title: 'Tour 3', url: media('/videos/campus_tours/Website_videos(5).mp4') },
    { title: 'Tour 4', url: media('/videos/campus_tours/Website_videos(6).mp4') },
  ],
  'Resources': [
    { title: 'Bajaj Centre', url: media('/videos/resources/BajajCentre_1.mp4') },
    { title: 'Facilities', url: media('/videos/resources/Website_videos(3).mp4') },
  ],
  'ELC Projects': [
    { title: 'Project Highlights', url: media('/videos/ece/Copy of 46_video.mp4') },
  ]
};

export const TOTAL_MEDIA = Object.values(DEPARTMENT_VIDEOS).reduce((n, list) => n + list.length, 0);
