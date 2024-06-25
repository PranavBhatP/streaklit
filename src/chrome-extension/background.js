chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ visits: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logVisit') {
    const visit = {
      url: request.url,
      time: new Date().toISOString()
    };

    chrome.storage.local.get('visits', (data) => {
      const visits = data.visits || [];
      visits.push(visit);
      chrome.storage.local.set({ visits }, () => {
        sendResponse({ status: 'success' });
      });
    });

    return true; // Indicates that the response will be sent asynchronously
  }
});
