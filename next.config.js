/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'asset.cloudinary.com',
                port: '',  // Leave this empty unless you're using a specific port
                pathname: '/**',  // Match all paths
            },
        ],
    },
};

export default config;
