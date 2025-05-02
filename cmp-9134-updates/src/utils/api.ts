import axios from 'axios';

export const searchMedia = async (query: string) => {
  const [imageRes, audioRes] = await Promise.all([
    axios.get('https://api.openverse.org/v1/images', {
      params: { q: query, license_type: 'all' },
    }),
    axios.get('https://api.openverse.org/v1/audio', {
      params: { q: query, license_type: 'all' },
    }),
  ]);

  return {
    images: imageRes.data.results,
    audio: audioRes.data.results,
  };
};
