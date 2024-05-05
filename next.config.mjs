/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  pageExtensions: ['useFollow.ts', 'usePostsUser.ts', 'useUnfollow.ts', 'useUser.ts', 'useDeleteProfile.ts', 'useInitialForm.ts', 'useUpdateProfile.ts']
};

export default nextConfig;
