export function getBrowser(userAgent) {
    if (userAgent.includes("Chrome")) {
      return (
        <>
       <i class="fa fa-chrome" aria-hidden="true"></i> <span>Google Chrome</span>
        </>
      );
    } else if (userAgent.includes("Firefox")) {
      return (
        <>
        <i class="fa fa-firefox" aria-hidden="true"></i> <span>Mozilla Firefox</span>
        </>
      );
    } else if (userAgent.includes("Safari")) {
      return (
        <>
       <i class="fa fa-safari" aria-hidden="true"></i> <span>Apple Safari</span>
        </>
      );
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      return (
        <>
        <i class="fa fa-opera" aria-hidden="true"></i> <span>Opera</span>
        </>
      );
    } else if (userAgent.includes("Edge")) {
      return (
        <>
        <i class="fa fa-edge" aria-hidden="true"></i> <span>Microsoft Edge</span>
        </>
      );
    } else if (userAgent.includes("MSIE")) {
      return (
        <>
        <i class="fa fa-internet-explorer" aria-hidden="true"></i> <span>Internet Explorer</span>
        </>
      );
    } else {
      return "Unknown";
    }
  }
  

  export function getDevice(userAgent) {
    if (userAgent.includes("Mobile")) {
      return (
        <>
        <i class="fa fa-mobile" aria-hidden="true"></i>
        </>
      );
    } else if (userAgent.includes("Tablet")) {
      return (
        <>
        <i class="fa fa-tablet" aria-hidden="true"></i>
        </>
      );
    } else {
      return (
        <>
        <i class="fa fa-desktop" aria-hidden="true"></i>
        </>
      );
    }
  }
  