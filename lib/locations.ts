// Pizza Planet pizzeria locations — powers the locations pages + booking form

export interface Location {
  slug: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  kitchenNote: string;
  description: string[];
  features: string[];
  heroImage: string;
  storyImage: string;
  seats: number;
}

export const LOCATIONS: Location[] = [
  {
    slug: "baneshwor",
    name: "Baneshwor",
    tagline: "The original oven",
    address: "Mid-Baneshwor Chowk, New Baneshwor",
    city: "Kathmandu",
    phone: "+977 1 4470001",
    hours: "10:00 – 22:00",
    kitchenNote: "Where it all started in 2022 — one oven, six tables and a line out the door.",
    description: [
      "The first Pizza Planet. A small dining room that fills up fast, a rooftop garden for slow evenings, and the oven that set the standard for every pie we've made since.",
      "Walk-ins always welcome. Fridays bring the Oven Sessions — live acoustics while the dough proves.",
    ],
    features: ["Rooftop garden", "Oven Sessions Fridays", "Street parking"],
    heroImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1400&q=85",
    storyImage: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1200&q=85",
    seats: 64,
  },
  {
    slug: "jhamsikhel",
    name: "Jhamsikhel",
    tagline: "The corner oven",
    address: "Jhamsikhel Road, Lalitpur",
    city: "Lalitpur",
    phone: "+977 1 4470002",
    hours: "10:00 – 22:00",
    kitchenNote: "Brick walls, vinyl on rotation, and a counter made for watching the oven work.",
    description: [
      "Our Lalitpur pizzeria sits on the corner everyone rounds on a Saturday night. Long counter seats facing the oven, vinyl nights every second Thursday, and a lunch rush we plan the whole day around.",
      "Groups of six or more should book ahead — the corner table goes fast.",
    ],
    features: ["Vinyl nights", "Counter seating", "Open kitchen"],
    heroImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=85",
    storyImage: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&q=85",
    seats: 48,
  },
  {
    slug: "lakeside",
    name: "Lakeside, Pokhara",
    tagline: "The mountain view",
    address: "Lakeside Road, Baidam",
    city: "Pokhara",
    phone: "+977 61 460003",
    hours: "09:00 – 23:00",
    kitchenNote: "Same dough, different sunrise — the Annapurnas do the decorating here.",
    description: [
      "Our first pizzeria outside the valley. A lakeside terrace built for long dinners, with the Annapurna range on one side and the oven glow on the other.",
      "Open late through the tourist season. The jug lemonade was practically invented for this terrace.",
    ],
    features: ["Lake terrace", "Late kitchen", "Mountain views"],
    heroImage: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1400&q=85",
    storyImage: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=1200&q=85",
    seats: 80,
  },
];

export const getLocation = (slug: string) =>
  LOCATIONS.find((l) => l.slug === slug);
