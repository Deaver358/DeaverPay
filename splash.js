document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("splashVideo");

  if (!video) return;

  // Redirect to landing page when video ends
  video.addEventListener("ended", () => {
    window.location.href = "landing.html"; // change if your landing page has another name
  });
});