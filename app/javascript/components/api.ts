interface AllPhotosResponse {
  id: number;
  pexels_id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src_original: string;
  src_large2x: string;
  src_large: string;
  src_medium: string;
  src_small: string;
  src_portrait: string;
  src_landscape: string;
  src_tiny: string;
  alt: string;
  likes_count: number;
  liked_by_current_user: boolean;
}

export async function fetchPhotos() {
  return fetch('/api/photos', { credentials: 'same-origin' }).then(async res => {
    if (res.status === 401 || res.redirected) {
      throw new Error('unauthenticated');
    }
    return res.json() as Promise<AllPhotosResponse[]>;
  });
}

export async function likePhoto(photoId: number) {
  return fetch(`/api/photos/${photoId}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  }).then(async res => res.json());
}

export async function unlikePhoto(photoId: number) {
  return fetch(`/api/photos/${photoId}/like`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  }).then(async res => res.json());
}

export async function signOut() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  return fetch('/session', {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken || ''
    },
  }).then(() => {
    globalThis.location.reload();
  });
} 