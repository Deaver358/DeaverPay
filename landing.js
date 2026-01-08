<script>
document.addEventListener("DOMContentLoaded", function () {
// === CHANGE ONLY THESE WHEN APP IS LIVE === // e.g. https://play.google.com/store/apps/details?id=com.deaverpay.app
  const ANDROID_STORE_URL = "";
  const IOS_STORE_URL = "";
  const COMING_SOON_URL = "coming-soon.html";

  /* ADD THESE (APP LINKS) */
  const ANDROID_APP_INTENT = "intent://deaverpay#Intent;scheme=deaverpay;package=com.deaverpay.app;end;";
  const IOS_APP_SCHEME = "deaverpay://open";

  const androidBtn = document.getElementById("androidLink");
  const iosBtn = document.getElementById("iosLink");

  if (!androidBtn || !iosBtn) return;

  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.includes("android");
  const isIOS = /iphone|ipad|ipod/.test(ua);

  // Default (store / coming soon)
  androidBtn.href = ANDROID_STORE_URL || COMING_SOON_URL;
  iosBtn.href = IOS_STORE_URL || COMING_SOON_URL;

  /* SMART OPEN (ONLY WHEN APP EXISTS) */
  androidBtn.addEventListener("click", function (e) {
    if (!ANDROID_STORE_URL) return;
    e.preventDefault();

    window.location.href = ANDROID_APP_INTENT;
    setTimeout(() => {
      window.location.href = ANDROID_STORE_URL;
    }, 1500);
  });

  iosBtn.addEventListener("click", function (e) {
    if (!IOS_STORE_URL) return;
    e.preventDefault();

    window.location.href = IOS_APP_SCHEME;
    setTimeout(() => {
      window.location.href = IOS_STORE_URL;
    }, 1500);
  });

});
</script>