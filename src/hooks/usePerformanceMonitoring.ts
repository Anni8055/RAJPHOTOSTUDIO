import { useEffect } from 'react';
import { analytics } from '@/config/firebase';

type MetricName = 'FCP' | 'LCP' | 'CLS' | 'TTFB' | 'FID' | 'INP';

/**
 * Custom hook to monitor web vitals and performance metrics
 * @param pageLabel - An identifier for the current page
 */
export const usePerformanceMonitoring = (pageLabel: string) => {
  useEffect(() => {
    // Web Vitals metrics collection
    const collectWebVital = (name: MetricName, value: number) => {
      // Send to analytics
      analytics.logEvent('web_vital', {
        metric_name: name,
        metric_value: Math.round(value),
        page: pageLabel,
      });
    };
    
    // First Contentful Paint (FCP)
    const entryHandler = (entryList: PerformanceObserverEntryList) => {
      for (const entry of entryList.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if ((entry as PerformancePaintTiming).name === 'first-contentful-paint') {
              collectWebVital('FCP', entry.startTime);
            }
            break;
          case 'largest-contentful-paint':
            // LCP can be reported multiple times, final LCP is the one we want
            collectWebVital('LCP', entry.startTime);
            break;
          case 'first-input':
            const delay = (entry as PerformanceEventTiming).processingStart - entry.startTime;
            collectWebVital('FID', delay);
            break;
          case 'layout-shift':
            // Cumulative Layout Shift (CLS)
            if (!(entry as any).hadRecentInput) {
              const cls = (entry as LayoutShift).value;
              // Log CLS
              collectWebVital('CLS', cls);
            }
            break;
        }
      }
    };
    
    // Set up performance observers
    const observerTypes = [
      'paint', 
      'largest-contentful-paint', 
      'first-input', 
      'layout-shift'
    ];
    
    const observers: PerformanceObserver[] = [];
    
    // Only run in browser environment
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      observerTypes.forEach(type => {
        try {
          const observer = new PerformanceObserver(entryHandler);
          observer.observe({ type: type as any, buffered: true });
          observers.push(observer);
        } catch (e) {
          console.warn(`Performance observer for ${type} not supported`);
        }
      });
      
      // Also track Time to First Byte manually
      if (performance && performance.getEntriesByType) {
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const ttfb = (navigationEntries[0] as PerformanceNavigationTiming).responseStart;
          collectWebVital('TTFB', ttfb);
        }
      }
    }
    
    // Track page view
    analytics.logEvent('page_view', {
      page_title: document.title,
      page_path: window.location.pathname,
      page_label: pageLabel
    });
    
    return () => {
      // Disconnect all observers
      observers.forEach(observer => observer.disconnect());
    };
  }, [pageLabel]);
};

export default usePerformanceMonitoring; 