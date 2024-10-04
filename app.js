
  let deferredPrompt;
  const installButton = document.getElementById('install-button')

window.addEventListener('beforeinstallprompt', (e) => {
  // Mencegah prompt default
  e.preventDefault();
  
  // Menyimpan event untuk nanti
  deferredPrompt = e;
  
  // Tampilkan tombol install
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    // Sembunyikan tombol install
    installButton.style.display = 'none';
    
    // Tampilkan prompt instalasi
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Pengguna menerima prompt instalasi');
      } else {
        console.log('Pengguna menolak prompt instalasi');
      }
      deferredPrompt = null; // Reset setelah prompt selesai
    });
  });
});