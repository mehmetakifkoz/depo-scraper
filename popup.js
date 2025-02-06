document.getElementById('openWebsitesBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'openWebsites' });
  });
  