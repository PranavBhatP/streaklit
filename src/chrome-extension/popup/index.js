document.getElementById('saveUserId').addEventListener('click', () => {
    const userId = document.getElementById('userId').value;
    if (userId) {
      chrome.storage.sync.set({ userId }, () => {
        console.log('User ID saved:', userId);
        alert('User ID saved!');
      });
    } else {
      alert('Please enter a User ID.');
    }
  });
  