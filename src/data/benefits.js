import liveTracking from '../assets/benefits/live_tracking.json';
import securityProtection from '../assets/benefits/security_protection.json';
import supportService from '../assets/benefits/support_service.json';

export const benefitsData = [
  {
    id: 1,
    title: "Live Parcel Monitoring",
    description: "Stay updated with live parcel monitoring, providing you accurate real-time location updates and estimated delivery time. Never worry about your package's location again.",
    animation: liveTracking
  },
  {
    id: 2,
    title: "End-to-End Security",
    description: "Our multi-layer security system ensures your parcel is protected throughout the entire journey, with full delivery authentication and safety guarantee.",
    animation: securityProtection
  },
  {
    id: 3,
    title: "24/7 Customer Support",
    description: "No matter when you need us, our expert support team is always ready to solve your issues and answer your queries instantly with real human support.",
    animation: supportService
  }
];
