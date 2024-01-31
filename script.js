$(document).ready(async function () {
  // Html elements
  const divContainer = $("#containing");
  const loadingContainer = $("#loading-tag");

  // AWS Link
  const cdnLink = "https://kawisha-assets.s3.amazonaws.com/external/360/ext/";
  const exId = searchParams.get("id");

  // Check if ID exists
  if (exId == null || exId.trim() == "") {
    $("#loading-label").text("Panorámica no disponible");
    $(".loader").remove();
    return false;
  }

  // Full URL
  const fullUrl = cdnLink + exId + "/";

  const preload = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  let promises = [];
  for (var i = 1; i <= 65; i++) {
    promises[i] = preload(fullUrl + `pic-${i}.jpeg`);
  }

  await Promise.all(promises).then(async function (response) {
    await divContainer.append(`
    <div
    class="cloudimage-360"
    data-folder=${fullUrl}
    data-filename="pic-{index}.jpeg"
    data-hide-360-logo="false"
    data-logo-src="360_view.svg"
    data-amount="65"
    data-drag-speed="50"
    data-bottom-circle-offset="0"
    data-full-screen=${true}
    data-keys="true"
    data-speed="225"
    data-autoplay="true"
  ></div>
    `);

    loadingContainer.fadeOut();

    window.CI360.init();
  });
});
