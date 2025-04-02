document.getElementById("openWebsitesBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "openWebsites" });
});

document.getElementById("searchBtn").addEventListener("click", searchBarcode);

document.getElementById("barcodeInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
      searchBarcode();
  }
});

function searchBarcode() {
  const barcode = document.getElementById("barcodeInput").value.trim();
  if (barcode) {
      chrome.runtime.sendMessage({ type: "searchBarcode", barcode: barcode });
  } else {
      alert("Lütfen bir barkod girin.");
  }
}
