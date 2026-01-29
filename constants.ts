
import { Song, ScheduleItem } from './types';

// Replace 'YOUR_STATION_ID' with your actual Zeno.fm station ID
export const ZENO_STATION_ID = 'upifdlfot6ltv'; 
export const ZENO_STREAM_URL = `https://stream.zeno.fm/${ZENO_STATION_ID}`;

// Using a reliable placeholder for music album art as a fallback or primary
const DEFAULT_COVER = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop';

export const MOCK_PLAYLIST: Song[] = [
  {
    id: '1',
    title: 'Sanahas Media Unit',
    artist: 'Live Broadcast',
    album: 'Walasmulla National School',
    duration: 243,
    // Original URL preserved but added a high-quality music fallback link to ensure visibility
    coverUrl: 'https://sandanuwanwimalagunarathna.lk/wp-content/uploads/2025/12/walasmulla_sanhas-removebg-preview.png',
    startTime: '14:20'
  }
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { 
    id: '1', 
    time: '07:25 - 07:50', 
    show: 'Morning Program', 
    host: 'Announcing Team', 
    type: 'Live',
    description: 'Start your day with the latest school news, local updates, and fresh morning vibes. Hosted live by our premier announcing squad.'
  },
  { 
    id: '2', 
    time: '08:00 - 10:29', 
    show: 'Day Special', 
    host: 'Auto DJ', 
    type: 'Auto',
    description: 'A curated selection of the best hits to keep you productive throughout the morning. No talk, just pure music energy.'
  },
  { 
    id: '3', 
    time: '10:30 - 10:50', 
    show: 'Midday Brief', 
    host: 'Sarah Jenkins', 
    type: 'Live',
    description: 'Sarah Jenkins brings you the most important headlines and trending topics from around the campus and beyond.'
  },
  { 
    id: '4', 
    time: '10:50 - 18.00', 
    show: 'The Rock Block', 
    host: 'Mike Hammer', 
    type: 'Recorded',
    description: 'Mike Hammer dives deep into the archives of classic and alternative rock. A marathon session of guitar-driven anthems.'
  },
  { 
    id: '5', 
    time: '18:00 - 19.00', 
    show: 'Sunset Grooves', 
    host: 'DJ Luna', 
    type: 'Auto',
    description: 'Winding down the day with chill electronic beats and lo-fi melodies. Perfect background for study or relaxation.'
  },
  { 
    id: '6', 
    time: '19:00 - 00.00', 
    show: 'Night Owls', 
    host: 'DJ Luna', 
    type: 'Auto',
    description: 'Deep house and atmospheric tracks for the late-night listeners. Exploring the darker side of electronic music.'
  }
];

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'LayoutDashboard' },
  { label: 'Playlist', icon: 'Music2' },
  { label: 'Schedule', icon: 'CalendarDays' },
  { label: 'Analytics', icon: 'BarChart3' },
  { label: 'Settings', icon: 'Settings' }
];
