/** @type {import('next').NextConfig} */
const nextConfig = {
    "env": {
        API_URL: "http://localhost:8000",
    },
    "images": {
        "domains": [
            "images.pexels.com",
            "www.pexels.com",
        ],
    }
};

export default nextConfig;
