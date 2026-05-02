export type ServiceIconName =
  | "flight"
  | "hotel"
  | "visa"
  | "holiday"
  | "hajj"
  | "umrah"
  | "course"
  | "test"
  | "university"
  | "shop";

export type ServiceItem = {
  id: number;
  title: string;
  icon: ServiceIconName;
  route: string;
};