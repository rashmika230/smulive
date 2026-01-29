
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  startTime?: string;
}

export interface BroadcastStats {
  listeners: number;
  peakListeners: number;
  avgListenTime: string;
  bitrate: string;
  status: 'LIVE' | 'OFF AIR' | 'AUTO DJ';
}

export interface ScheduleItem {
  id: string;
  time: string;
  show: string;
  host: string;
  type: 'Live' | 'Recorded' | 'Auto';
  description?: string;
}
