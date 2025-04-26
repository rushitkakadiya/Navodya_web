import { env } from '@/env';

interface BunnyStreamConfig {
  libraryId: string;
  apiKey: string;
}

export class BunnyStream {
  private config: BunnyStreamConfig;
  private baseUrl: string;

  constructor(config: BunnyStreamConfig) {
    this.config = config;
    this.baseUrl = `https://video.bunnycdn.com/library/${config.libraryId}`;
  }

  // Get direct stream URL
  getStreamUrl(videoId: string): string {
    return `https://iframe.mediadelivery.net/embed/${this.config.libraryId}/${videoId}`;
  }

  // Upload a video
  async uploadVideo(file: File, title: string): Promise<string> {
    // Get upload URL
    const response = await fetch(`${this.baseUrl}/videos`, {
      method: 'POST',
      headers: {
        'AccessKey': this.config.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    const { guid } = await response.json();

    // Upload the file
    await fetch(`${this.baseUrl}/videos/${guid}`, {
      method: 'PUT',
      headers: {
        'AccessKey': this.config.apiKey
      },
      body: file
    });

    return guid;
  }

  // Get video details
  async getVideo(videoId: string) {
    const response = await fetch(`${this.baseUrl}/videos/${videoId}`, {
      headers: {
        'AccessKey': this.config.apiKey
      }
    });
    return response.json();
  }
}

// Create a singleton instance
export const bunnyStream = new BunnyStream({
  libraryId: env.BUNNY_STREAM_LIBRARY_ID,
  apiKey: env.BUNNY_STREAM_API_KEY
});
