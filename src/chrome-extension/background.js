chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
    updateContentScriptMatches();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      chrome.storage.sync.get('userId', async (data) => {
        const userId = data.userId;
        if (userId) {
          try {
            const response = await fetch(`http://localhost:3000/api/${userId}`);
            const data = await response.json();
            if (data.urls && data.urls.some(url => new URL(tab.url).hostname === new URL(url).hostname)) {
              chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content-script.js']
              });
            }
          } catch (error) {
            console.error('Failed to fetch URLs', error);
          }
        }
      });
    }
  });