// Preload all images before showing the main content
const imagePaths = [
  // Images
  'assets/images/blue.png',
  'assets/images/catppuccin-logo.png',
  'assets/images/design.png',
  'assets/images/frame1.png',
  'assets/images/frame2.png',
  'assets/images/malware.png',
  'assets/images/mauve.png',
  'assets/images/mindmeld.png',
  'assets/images/mobframe1.png',
  'assets/images/mobframe2.png',
  'assets/images/old.png',
  'assets/images/rainbow.png',
  // Favicons
  'assets/favicon/android-chrome-192x192.png',
  'assets/favicon/android-chrome-512x512.png',
  'assets/favicon/apple-touch-icon.png',
  'assets/favicon/favicon-16x16.png',
  'assets/favicon/favicon-32x32.png',
  'assets/favicon/favicon.ico',
];

function preloadImages(paths, callback) {
  let loaded = 0;
  const total = paths.length;
  if (total === 0) return callback();
  paths.forEach((src) => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === total) callback();
    };
    img.src = src;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  preloadImages(imagePaths, () => {
    loadingScreen.style.display = 'none';
    mainContent.style.display = '';
  });
});
