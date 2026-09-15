"use client";

import { useEffect } from "react";

// Belt-and-braces zoom blocking. The viewport meta (maximum-scale=1,
// user-scalable=no) stops pinch-zoom on Android Chrome, but iOS Safari ignores
// it, so we also cancel Safari's gesture events and the double-tap zoom.
export default function NoZoom() {
  useEffect(() => {
    // iOS Safari pinch-zoom gestures.
    const preventGesture = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    // Double-tap zoom: cancel a second tap that lands within 300ms.
    let lastTouch = 0;
    const preventDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouch <= 300) e.preventDefault();
      lastTouch = now;
    };
    document.addEventListener("touchend", preventDoubleTap, { passive: false });

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
      document.removeEventListener("touchend", preventDoubleTap);
    };
  }, []);

  return null;
}
