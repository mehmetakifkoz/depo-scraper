chrome.runtime.onInstalled.addListener(() => {
    console.log('Depo Scraper installed.');
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "openWebsites") {
      // List of wholesaler websites
      const websites = [
        'https://esiparisv2.alliance-healthcare.com.tr/',
        'https://webdepo.selcukecza.com.tr/',
        'http://webdepo.nevzatecza.com.tr/',
        'https://b2b.anadolupharma.com/',
        'https://www.sentezb2b.com/',
        'https://b4b.anadoluitriyat.com/',
        'https://www.akvitaecza.com/',
        'https://www.farmazon.com.tr/'
      ];
      
      // Open each website in a new tab
      websites.forEach((url) => {
        chrome.tabs.create({ url: url });
      });
    }
  });
  