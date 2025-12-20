 const menuToggle = document.getElementById('menuToggle');
  const navList = document.querySelector('.nav-list');

  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });


  // For mobile click behavior
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const dropdownMenu = toggle.nextElementSibling;
    dropdownMenu.classList.toggle('show');
  });
});



  // ====== Generate fake demo UPI QR on load ======
  function generateDemoQR(upiId = "demo@upi", name = "Demo Merchant", amount = "") {
    // create UPI deep-link (amount optional; leave empty for no preset amount)
    const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;
    const container = document.getElementById("upi-qr-demo");
    container.innerHTML = "";
    new QRCode(container, {
      text: upiLink,
      width: 220,
      height: 220,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // initial demo QR
  generateDemoQR();

  // regenerate button (for testing)
  document.getElementById("regenDemoQR").addEventListener("click", function(){
    // toggles between two fake IDs so scanning again looks different
    const alt = Math.random() > 0.5 ? "demo@upi" : "demo2@upi";
    generateDemoQR(alt, "Demo Merchant " + Math.floor(Math.random()*99));
  });


  // ====== HTML5 QR CODE SCANNER setup ======
  let html5QrScanner = null;
  const scanResultEl = document.getElementById("scanResult");
  const scannerDivId = "html5qr";

  function startScanner() {
    if (html5QrScanner) return; // already started
    html5QrScanner = new Html5Qrcode(scannerDivId, /* verbose= */ false);

    Html5Qrcode.getCameras().then(cameras => {
      if (!cameras || cameras.length === 0) {
        scanResultEl.textContent = "⚠️ No camera found on this device.";
        return;
      }
      // prefer back camera if available
      let cameraId = cameras[0].id;
      for (let cam of cameras) {
        if (cam.label && /back|rear|environment/gi.test(cam.label)) { cameraId = cam.id; break; }
      }

      html5QrScanner.start(
        cameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText, decodedResult) => {
          // success callback
          scanResultEl.innerHTML = "✅ Scanned: <code style='color:#0055aa;'>" + decodedText + "</code>";

          // if UPI deep-link detected, show open link
          if (decodedText.startsWith("upi://")) {
            scanResultEl.innerHTML += `<div style="margin-top:8px;"><a href="${decodedText}" target="_blank" style="display:inline-block;padding:8px 12px;background:#004488;color:#fff;border-radius:8px;text-decoration:none;">Open UPI Payment</a></div>`;
          } else if (/^https?:\/\//.test(decodedText)) {
            scanResultEl.innerHTML += `<div style="margin-top:8px;"><a href="${decodedText}" target="_blank" style="display:inline-block;padding:8px 12px;background:#0077cc;color:#fff;border-radius:8px;text-decoration:none;">Open Link</a></div>`;
          }

          // optionally stop after success (comment out if you want continuous scanning)
          // html5QrScanner.stop().then(()=>{ html5QrScanner = null; }).catch(()=>{});
        },
        (errorMessage) => {
          // scan in progress - you can show scanning status if needed
          // console.debug("scan:", errorMessage);
        }
      ).catch(err => {
        scanResultEl.textContent = "⚠️ Could not start camera: " + err;
      });
    }).catch(err => {
      scanResultEl.textContent = "⚠️ Camera access denied or unavailable.";
      console.error(err);
    });
  }

  function stopScanner() {
    if (!html5QrScanner) return;
    html5QrScanner.stop().then(() => {
      html5QrScanner.clear();
      html5QrScanner = null;
      scanResultEl.textContent = "Scanner stopped.";
      // remove video element contents created by lib
      const el = document.getElementById(scannerDivId);
      if (el) el.innerHTML = "";
    }).catch(err => {
      console.error("Error stopping scanner", err);
    });
  }

  // connect buttons
  document.getElementById("startScanner").addEventListener("click", startScanner);
  document.getElementById("stopScanner").addEventListener("click", stopScanner);

  // auto-start for convenience on devices that allow camera directly (optional)
  // try { startScanner(); } catch(e){ /* ignore */ }

