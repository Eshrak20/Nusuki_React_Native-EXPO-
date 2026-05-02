import { ServiceItem } from "../types/service.types";

export const services: ServiceItem[] = [
  { id: 1, title: "Flights", icon: "flight", route: "/flights" },
  { id: 2, title: "Hotels", icon: "hotel", route: "/hotels" },
  { id: 3, title: "Visa", icon: "visa", route: "/visa" },
  { id: 4, title: "Holiday", icon: "holiday", route: "/packages/holiday" },
  { id: 5, title: "Hajj", icon: "hajj", route: "/packages/hajj" },
  { id: 6, title: "Umrah", icon: "umrah", route: "/packages/umrah" },
  { id: 7, title: "Course", icon: "course", route: "/education/courses" },
  { id: 8, title: "Test", icon: "test", route: "/education/tests" },
  { id: 9, title: "Universities", icon: "university", route: "/education/universities" },
  { id: 10, title: "Shop", icon: "shop", route: "/shop" },
];