document.addEventListener('DOMContentLoaded', () => {
  const visitList = document.getElementById('visitList');
  const logVisitButton = document.getElementById('logVisit');

  function updateVisitList() {
    chrome.storage.local.get('visits', (data) => {
      const visits = data.visits || [];
      visitList.innerHTML = visits.map((visit, index) => `
        <li>
          <span class="website-data"><h5 class="url">${visit.url}</h5> - ${new Date(visit.time).toLocaleString()}</span>
          <div class="task-buttons">
            <button data-index="${index}" class="edit">Edit</button>
            <button data-index="${index}" class="delete">Delete</button>
            <button data-index="${index}" class="copy">Copy</button>
          </div>
        </li>
      `).join('');
    });
  }

  logVisitButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      chrome.runtime.sendMessage({ action: 'logVisit', url: currentTab.url }, (response) => {
        if (response.status === 'success') {
          updateVisitList();
        }
      });
    });
  });

  visitList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains('edit')) {
      const newUrl = prompt('Enter new URL:', '');
      if (newUrl) {
        chrome.storage.local.get('visits', (data) => {
          const visits = data.visits || [];
          visits[index].url = newUrl;
          chrome.storage.local.set({ visits }, updateVisitList);
        });
      }
    }

    if (e.target.classList.contains('delete')) {
      chrome.storage.local.get('visits', (data) => {
        const visits = data.visits || [];
        visits.splice(index, 1);
        chrome.storage.local.set({ visits }, updateVisitList);
      });
    }

    if (e.target.classList.contains('copy')) {
      const urlElement = e.target.closest('li').querySelector('.url');
      const url = urlElement.textContent;
      navigator.clipboard.writeText(url).then(() => {
        alert('URL copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  });

  updateVisitList();
});
