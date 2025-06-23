const serverURL = import.meta.env.VITE_SERVER_URL;
import axios from 'axios';

export async function apiLogin(username: string, password: string) {
    const res = await axios.post(`${serverURL}/login`, { username, password });
    return res.data.token;
}

export async function apiFetchPhotos() {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.get(`${serverURL}/photos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch photos');
    }
}

export async function apiSaveFavouritePhoto(photoId: string) {
    const token = localStorage.getItem('token');

    try {
        await axios.post(`${serverURL}/favourite`, { photoId },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (error) {
        console.error('Failed to toggle favorite', error);
    }
}