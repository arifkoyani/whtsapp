module.exports = {
  webpack: (config: NextConfig) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
      },
    });
    return config;
    
  },
  experimental: {
    appDir: true,
  }
};
