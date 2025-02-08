chrome.runtime.onInstalled.addListener(() => {
  console.log('Depo Scraper installed.');
});

// Function to fetch barcode from the local server
async function fetchBarcode() {
  try {
      const response = await fetch('http://localhost:3030/barcode');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const newBarcode = await response.text();
      if (newBarcode !== lastBarcode) {
          console.log(`Barcode changed: ${newBarcode}`);
          lastBarcode = newBarcode;
      }
  } catch (error) {
      console.error('Error fetching barcode:', error);
  }
}

// Variable to store the last fetched barcode
let lastBarcode = "";

// Poll the local server every second to check for barcode updates
setInterval(fetchBarcode, 1000);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "openWebsites") {
      const websites = [
          'https://esiparisv2.alliance-healthcare.com.tr/',
          'https://webdepo.selcukecza.com.tr/',
          'http://webdepo.nevzatecza.com.tr/',
          'https://b2b.anadolupharma.com/',
          'https://www.sentezb2b.com/',
          'https://b4b.anadoluitriyat.com/',
          'https://eticaret.saglikeczadeposu.com/',
          "https://www.farmazonrx.com.tr/",
          'https://www.farmazon.com.tr/',
          'https://www.ecza1.com/'
      ];

      websites.forEach((url) => {
          chrome.tabs.create({ url: url });
      });
  }
});
