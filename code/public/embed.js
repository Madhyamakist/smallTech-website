(function() {
  const chatUrl = document.currentScript.getAttribute("data-chat-url") || "https://smalltech.in/embed";

  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  // Create iframe container
  const iframeWrapper = document.createElement("div");
  iframeWrapper.style.position = "fixed";
  iframeWrapper.style.bottom = "20px";
  iframeWrapper.style.right = "20px";
  iframeWrapper.style.width = "380px";
  iframeWrapper.style.height = "520px";
  iframeWrapper.style.borderRadius = "16px";
  iframeWrapper.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  iframeWrapper.style.zIndex = "999999";
  iframeWrapper.style.transition = "all 0.3s ease";
  iframeWrapper.style.display = "none";
  iframeWrapper.style.overflow = "hidden";
  iframeWrapper.style.background = "white";
  // if(isMobile){
  //   iframeWrapper.style.bottom = "0";
  //   iframeWrapper.style.right = "0";
  //   iframeWrapper.style.top = "0"; // Added top: 0
  //   iframeWrapper.style.left = "0";
  // }

  // iframe inside wrapper
  const iframe = document.createElement("iframe");
  iframe.src = chatUrl;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.borderRadius = "16px";
  iframeWrapper.appendChild(iframe);

  // Close button
  const closeBtn = document.createElement("div");
  closeBtn.innerHTML = "✖";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "8px";
  closeBtn.style.right = "8px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.background = "rgba(0,0,0,0.1)";
  closeBtn.style.width = "28px";
  closeBtn.style.height = "28px";
  closeBtn.style.borderRadius = "50%";
  closeBtn.style.display = "flex";
  closeBtn.style.alignItems = "center";
  closeBtn.style.justifyContent = "center";
  closeBtn.addEventListener("click", () => {
    iframeWrapper.style.display = "none";
  });
  iframeWrapper.appendChild(closeBtn);

  // Floating chat bubble
  const bubble = document.createElement("div");
  bubble.innerHTML = "💬";
  bubble.style.position = "fixed";
  bubble.style.bottom = "20px";
  bubble.style.right = "20px";
  bubble.style.width = "60px";
  bubble.style.height = "60px";
  bubble.style.borderRadius = "50%";
  bubble.style.background = "#5A2A27"; 
  bubble.style.color = "white";
  bubble.style.display = "flex";
  bubble.style.alignItems = "center";
  bubble.style.justifyContent = "center";
  bubble.style.cursor = "pointer";
  bubble.style.fontSize = "28px";
  bubble.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  bubble.style.zIndex = "999998";

  bubble.addEventListener("click", () => {
    iframeWrapper.style.display = "block";
  });

  document.body.appendChild(iframeWrapper);
  document.body.appendChild(bubble);
})();
