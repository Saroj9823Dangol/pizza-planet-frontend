export type MenuCategory =
  | "All"
  | "Classic"
  | "Signature"
  | "Vegan"
  | "Sides"
  | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  tags: string[];
  bestseller?: boolean;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "01",
    name: "Margherita Supreme",
    description:
      "San Marzano tomatoes, fresh buffalo mozzarella, hand-torn basil, extra virgin olive oil drizzle",
    price: 799,
    category: "Classic",
    tags: ["VEG", "CLASSIC"],
    bestseller: true,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
  },
  {
    id: "02",
    name: "Heritage Pepperoni",
    description:
      "Double-stacked pepperoni, spicy honey, smoked mozz, chili flake — the house signature",
    price: 999,
    category: "Classic",
    tags: ["SPICY", "BESTSELLER"],
    bestseller: true,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
  },
  {
    id: "03",
    name: "Spicy Inferno",
    description:
      "Ghost pepper salsa, jalapeños, Nduja sausage, calabrese chili, cooling cream swirl",
    price: 1099,
    category: "Signature",
    tags: ["HOT", "SPICY"],
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  },
  {
    id: "04",
    name: "Mozzarella Crust",
    description:
      "Five-cheese stuffed edge, Gruyère béchamel, truffle oil, shaved Parmesan, black pepper",
    price: 1199,
    category: "Signature",
    tags: ["VEG", "INDULGENT"],
    bestseller: true,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
  },
  {
    id: "05",
    name: "Flame-Grilled BBQ",
    description:
      "Smoked pulled chicken, wood-fired BBQ sauce, caramelized onion, pickled jalapeño, cilantro",
    price: 1049,
    category: "Signature",
    tags: ["CHICKEN", "SMOKY"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  },
  {
    id: "06",
    name: "Earth & Vine",
    description:
      "Roasted zucchini, sun-dried tomato, artichoke hearts, olive tapenade, cashew mozzarella",
    price: 899,
    category: "Vegan",
    tags: ["VEGAN", "GF OPTION"],
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e71e9b7b?w=800&q=80",
  },
  {
    id: "07",
    name: "Basil Harvest",
    description:
      "Pesto base, spinach, broccoli, capers, pine nuts, lemon zest, nutritional yeast",
    price: 849,
    category: "Vegan",
    tags: ["VEGAN", "HEALTHY"],
    image:
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80",
  },
  {
    id: "08",
    name: "Umami Truffle",
    description:
      "Black truffle cream, wild mushroom medley, taleggio, thyme, walnut crumble",
    price: 1299,
    category: "Signature",
    tags: ["VEG", "PREMIUM"],
    image:
      "https://images.unsplash.com/photo-1548369937-47519962c11a?w=800&q=80",
  },
  {
    id: "09",
    name: "Artisanal Garlic Plank",
    description:
      "Hand-rolled dough, compound garlic butter, rosemary, sea salt, slow-cooked marinara dip",
    price: 399,
    category: "Sides",
    tags: ["VEG", "SHARING"],
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80",
  },
  {
    id: "10",
    name: "Wood-Fired Wings",
    description:
      "Crispy wings, house-made fermented hot sauce, blue cheese dip, fresh celery",
    price: 649,
    category: "Sides",
    tags: ["CHICKEN", "CRISPY"],
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  },
  {
    id: "11",
    name: "Barrel Cold Brew",
    description:
      "Slow-drip artisanal roast, thick cream foam, vanilla bean, oat milk, cinnamon wash",
    price: 299,
    category: "Drinks",
    tags: ["COLD", "CAFFEINE"],
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
  },
  {
    id: "12",
    name: "Orchard Lemonade",
    description:
      "Fresh squeezed citrus, lavender extraction, butterfly pea infusion, sharp sparkling water",
    price: 249,
    category: "Drinks",
    tags: ["COLD", "REFRESHING"],
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80",
  },
  {
    id: "13",
    name: "Coastal Pineapple",
    description:
      "House-cured ham, caramelized pineapple chunks, habanero glaze drizzle, smoked mozzarella",
    price: 949,
    category: "Classic",
    tags: ["SWEET+SAVORY"],
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
  },
];

export const todaysSpecials = [
  { name: "Mozzarella Crust", price: 1199 },
  { name: "Heritage Pepperoni", price: 999 },
  { name: "Spicy Inferno", price: 1099 },
  { name: "Umami Truffle", price: 1299 },
];

export const testimonials = [
  {
    name: "Arjun Shrestha",
    location: "Kathmandu",
    review:
      "Pizza Planet को Mozzarella Crust खाएपछि अरु कुनै pizza मन पर्दैन। एकदम अद्भुत स्वाद!",
    stars: 5,
  },
  {
    name: "Priya Thapa",
    location: "Pokhara",
    review:
      "The Flame-Grilled BBQ is something else entirely. Best bake I've had in Nepal, hands down. The crust alone is pure craft.",
    stars: 5,
  },
  {
    name: "Roshan Adhikari",
    location: "Lalitpur",
    review:
      "The vibes, the food, the presentation — everything feels premium. Umami Truffle is our go-to every weekend now.",
    stars: 5,
  },
  {
    name: "Sujata Maharjan",
    location: "Bhaktapur",
    review:
      "As someone who swore off pizza for years, Pizza Planet changed everything. The Basil Harvest vegan option is genuinely extraordinary.",
    stars: 5,
  },
];
