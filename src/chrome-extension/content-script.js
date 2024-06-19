(() => {
    const updateStreakCounter = async (url) => {
      chrome.storage.sync.get('userId', async (data) => {
        const userId = data.userId;
        if (userId) {
          try {
            await fetch(`http://localhost:3000/api/streak/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url }),
            });
          } catch (error) {
            console.error('Failed to update streak counter', error);
          }
        }
      });
    };
  
    const currentUrl = window.location.href;
    updateStreakCounter(currentUrl);
  })();
  