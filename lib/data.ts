export type MenuCategory =
  | "All"
  | "Pizza"
  | "Appetizers"
  | "Breads"
  | "Momo"
  | "Chicken Wings"
  | "Pasta"
  | "Burgers"
  | "Salads"
  | "Soups"
  | "Coffee"
  | "Shakes"
  | "Drinks"
  | "Ice Cream";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  tags: string[];
  bestseller?: boolean;
  image: string;
  sizes?: { label: string; price: string }[];
}

const pizzaImg = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80";
const pizzaImg2 = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80";
const pizzaImg3 = "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80";
const pizzaImg4 = "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80";
const pizzaImg5 = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80";
const friesImg = "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80";
const wingsImg = "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80";
const pastaImg = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80";
const burgerImg = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80";
const saladImg = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80";
const soupImg = "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80";
const coffeeImg = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80";
const shakeImg = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80";
const drinkImg = "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80";
const icecreamImg = "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80";
const momoImg = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80";
const breadImg = "https://images.unsplash.com/photo-1619535860434-ba1d8fa125a8?w=400&q=80";
const garlicBreadImg = "https://images.unsplash.com/photo-1619535860434-ba1d8fa125a8?w=400&q=80";

export const menuItems: MenuItem[] = [
  {
    id: "p01", name: "Margherita",
    description: "Mushroom, onion, capsicum, tomato and mozzarella cheese",
    price: "390–1350", category: "Pizza", tags: ["VEG", "CLASSIC"], bestseller: true,
    image: pizzaImg2,
    sizes: [{ label: "Small Pan", price: "390" }, { label: "Med Pan", price: "700" }, { label: "Large Pan", price: "1200" }],
  },
  {
    id: "p02", name: "Pepperoni",
    description: "Classic pepperoni with mozzarella cheese on our signature sauce",
    price: "500–1350", category: "Pizza", tags: ["NON-VEG", "CLASSIC"], bestseller: true,
    image: pizzaImg3,
    sizes: [{ label: "Small Pan", price: "500" }, { label: "Med Pan", price: "830" }, { label: "Large Pan", price: "1350" }],
  },
  {
    id: "p03", name: "Hawaiian",
    description: "Ham, pineapple chunks, mozzarella — a tropical classic",
    price: "450–1200", category: "Pizza", tags: ["NON-VEG", "CLASSIC"],
    image: pizzaImg5,
    sizes: [{ label: "Small Pan", price: "450" }, { label: "Med Pan", price: "780" }, { label: "Large Pan", price: "1200" }],
  },
  {
    id: "p04", name: "Spicy Inferno",
    description: "Jalapeños, chili flakes, spicy sausage, mozzarella — for the brave",
    price: "520–1350", category: "Pizza", tags: ["NON-VEG", "SPICY"], bestseller: true,
    image: pizzaImg4,
    sizes: [{ label: "Small Pan", price: "520" }, { label: "Med Pan", price: "820" }, { label: "Large Pan", price: "1350" }],
  },
  {
    id: "p05", name: "Farm Fresh",
    description: "Fresh mushrooms, onions, olives, capsicum, sweet corn, tomatoes",
    price: "390–780", category: "Pizza", tags: ["VEG", "HEALTHY"],
    image: pizzaImg,
    sizes: [{ label: "Thin Med", price: "390" }, { label: "Thin Large", price: "780" }],
  },
  {
    id: "p06", name: "Chicken Supreme",
    description: "Grilled chicken, onions, capsicum, olives, mozzarella",
    price: "500–1050", category: "Pizza", tags: ["NON-VEG", "PREMIUM"],
    image: pizzaImg3,
    sizes: [{ label: "Thin Med", price: "500" }, { label: "Thin Large", price: "1050" }],
  },
  {
    id: "p07", name: "Cheese Burst Veg",
    description: "Premium veggie overload with a gooey cheese burst crust",
    price: "840–1190", category: "Pizza", tags: ["VEG", "INDULGENT"], bestseller: true,
    image: pizzaImg4,
    sizes: [{ label: "Medium", price: "840" }, { label: "Large", price: "1190" }],
  },
  {
    id: "p08", name: "Cheese Burst Non-Veg",
    description: "Loaded meat toppings with extra cheese in every bite",
    price: "940–1350", category: "Pizza", tags: ["NON-VEG", "INDULGENT"],
    image: pizzaImg3,
    sizes: [{ label: "Medium", price: "940" }, { label: "Large", price: "1350" }],
  },
  {
    id: "p09", name: "Planet Size Veg",
    description: "Massive 50cm pizza for the ultimate feast — serves 4+",
    price: "1690–1850", category: "Pizza", tags: ["VEG", "PARTY"],
    image: pizzaImg,
    sizes: [{ label: "Large 50cm", price: "1690" }, { label: "Deluxe", price: "1850" }],
  },
  {
    id: "p10", name: "Planet Size Non-Veg",
    description: "Giant 50cm pizza loaded with meats — for true planet-sized hunger",
    price: "1990–2310", category: "Pizza", tags: ["NON-VEG", "PARTY"], bestseller: true,
    image: pizzaImg5,
    sizes: [{ label: "Large 50cm", price: "1990" }, { label: "Deluxe", price: "2310" }],
  },
  {
    id: "a01", name: "French Fry", description: "Crispy golden fries seasoned to perfection",
    price: "190", category: "Appetizers", tags: ["VEG", "CRISPY"], image: friesImg,
  },
  {
    id: "a02", name: "Cheesy French Fries", description: "Loaded fries smothered in melted cheese",
    price: "230", category: "Appetizers", tags: ["VEG", "CHEESY"], image: friesImg,
  },
  {
    id: "a03", name: "Peri Peri French Fries", description: "Fries tossed in zesty peri peri seasoning",
    price: "230", category: "Appetizers", tags: ["VEG", "SPICY"], image: friesImg,
  },
  {
    id: "a04", name: "Crispy Spicy Aalu", description: "Spicy potato bites",
    price: "190", category: "Appetizers", tags: ["VEG", "LOCAL"], image: friesImg,
  },
  {
    id: "a05", name: "Super Spicy Aalu", description: "Extra heat, extra crunch — for spice lovers",
    price: "240", category: "Appetizers", tags: ["VEG", "HOT"], image: friesImg,
  },
  {
    id: "a06", name: "Cheese Tortillas", description: "Warm tortillas stuffed with melted cheese",
    price: "220", category: "Appetizers", tags: ["VEG", "MELTED"], image: breadImg,
  },
  {
    id: "a07", name: "Mixed Veggie Balls", description: "Assorted vegetable croquettes",
    price: "230", category: "Appetizers", tags: ["VEG", "CRISPY"], image: friesImg,
  },
  {
    id: "a08", name: "Crispy Sweet Corn", description: "Deep-fried sweet corn kernels",
    price: "250", category: "Appetizers", tags: ["VEG", "CRUNCHY"], image: friesImg,
  },
  {
    id: "a09", name: "Chicken Popcorn", description: "Bite-sized crispy chicken morsels",
    price: "280", category: "Appetizers", tags: ["NON-VEG", "CRISPY"], image: wingsImg,
  },
  {
    id: "a10", name: "Chicken Kurkure", description: "Extra crispy fried chicken pieces",
    price: "380", category: "Appetizers", tags: ["NON-VEG", "CRISPY"], image: wingsImg,
  },
  {
    id: "a11", name: "Cheesy Tangy Fries", description: "Fries with a tangy cheese sauce drizzle",
    price: "280", category: "Appetizers", tags: ["VEG", "TANGY"], image: friesImg,
  },
  {
    id: "a12", name: "Meat Balls", description: "Juicy meatballs in a rich tomato sauce",
    price: "310", category: "Appetizers", tags: ["NON-VEG", "HEARTY"], image: pastaImg,
  },
  {
    id: "a13", name: "Fried Chicken Sausage", description: "Crispy fried chicken sausages",
    price: "70", category: "Appetizers", tags: ["NON-VEG"], image: wingsImg,
    sizes: [{ label: "1pc", price: "70" }, { label: "2pcs", price: "110" }, { label: "4pcs", price: "210" }],
  },
  {
    id: "b01", name: "Plain Garlic Bread", description: "Toasted bread with garlic butter",
    price: "120", category: "Breads", tags: ["VEG"], image: garlicBreadImg,
  },
  {
    id: "b02", name: "Cheesy Garlic Bread", description: "Garlic bread loaded with mozzarella",
    price: "210", category: "Breads", tags: ["VEG", "CHEESY"], image: garlicBreadImg,
  },
  {
    id: "b03", name: "Spicy Garlic Bread", description: "Garlic bread with a spicy kick",
    price: "240", category: "Breads", tags: ["VEG", "SPICY"], image: garlicBreadImg,
  },
  {
    id: "b04", name: "Chicken Garlic Bread", description: "Garlic bread topped with seasoned chicken",
    price: "270", category: "Breads", tags: ["NON-VEG"], image: garlicBreadImg,
  },
  {
    id: "b05", name: "Garlic Bread Platter", description: "An assortment of all garlic breads",
    price: "350", category: "Breads", tags: ["VEG", "SHARING"], image: garlicBreadImg,
  },
  {
    id: "m01", name: "Chicken Momo", description: "Steamed dumplings filled with spiced minced chicken",
    price: "220", category: "Momo", tags: ["NON-VEG", "STEAMED"], bestseller: true, image: momoImg,
  },
  {
    id: "m02", name: "Buff Momo", description: "Traditional steamed buff meat dumplings",
    price: "210", category: "Momo", tags: ["NON-VEG", "STEAMED"], image: momoImg,
  },
  {
    id: "w01", name: "Seasoned Fried Wings", description: "Classic seasoned chicken wings, deep fried",
    price: "280", category: "Chicken Wings", tags: ["NON-VEG", "CRISPY"], image: wingsImg,
    sizes: [{ label: "4pcs", price: "280" }, { label: "6pcs", price: "400" }, { label: "10pcs", price: "660" }, { label: "15pcs", price: "1000" }],
  },
  {
    id: "w02", name: "Spicy Tangy Hot Wings", description: "Wings tossed in a spicy tangy sauce",
    price: "310", category: "Chicken Wings", tags: ["NON-VEG", "SPICY"], image: wingsImg,
    sizes: [{ label: "4pcs", price: "310" }, { label: "6pcs", price: "430" }, { label: "10pcs", price: "710" }, { label: "15pcs", price: "1070" }],
  },
  {
    id: "w03", name: "Pepper Lime Hot Wings", description: "Zesty lime and cracked pepper wings",
    price: "290", category: "Chicken Wings", tags: ["NON-VEG", "ZESTY"], image: wingsImg,
    sizes: [{ label: "4pcs", price: "290" }, { label: "6pcs", price: "410" }, { label: "10pcs", price: "680" }, { label: "15pcs", price: "1020" }],
  },
  {
    id: "w04", name: "Schezwan Fried Wings", description: "Schezwan-style spicy numbing wings",
    price: "300", category: "Chicken Wings", tags: ["NON-VEG", "SCHAEZWAN"], image: wingsImg,
    sizes: [{ label: "4pcs", price: "300" }, { label: "6pcs", price: "420" }, { label: "10pcs", price: "700" }, { label: "15pcs", price: "1050" }],
  },
  {
    id: "pa01", name: "Creamy Mushroom Pasta", description: "Pasta in a rich creamy mushroom sauce",
    price: "470", category: "Pasta", tags: ["VEG", "CREAMY"], image: pastaImg,
  },
  {
    id: "pa02", name: "Go Italia Spaghetti (Veg)", description: "Italian-style spaghetti with vegetables",
    price: "310", category: "Pasta", tags: ["VEG"], image: pastaImg,
  },
  {
    id: "pa03", name: "Go Italia Spaghetti (Chicken)", description: "Italian-style spaghetti with chicken",
    price: "370", category: "Pasta", tags: ["NON-VEG"], image: pastaImg,
  },
  {
    id: "pa04", name: "Creamy Mixed Pasta (Veg)", description: "Mixed vegetables in a creamy sauce",
    price: "340", category: "Pasta", tags: ["VEG", "CREAMY"], image: pastaImg,
  },
  {
    id: "pa05", name: "Creamy Mixed Pasta (Chicken)", description: "Chicken and vegetables in creamy sauce",
    price: "390", category: "Pasta", tags: ["NON-VEG", "CREAMY"], image: pastaImg,
  },
  {
    id: "pa06", name: "Napolitana Pasta (Veg)", description: "Classic tomato-based pasta with vegetables",
    price: "300", category: "Pasta", tags: ["VEG", "TOMATO"], image: pastaImg,
  },
  {
    id: "pa07", name: "Napolitana Pasta (Chicken)", description: "Tomato-based pasta with chicken",
    price: "360", category: "Pasta", tags: ["NON-VEG", "TOMATO"], image: pastaImg,
  },
  {
    id: "bu01", name: "Regular Chicken Burger", description: "Classic chicken patty burger with lettuce and mayo",
    price: "360", category: "Burgers", tags: ["NON-VEG", "CLASSIC"], image: burgerImg,
  },
  {
    id: "bu02", name: "Spicy Chicken Burger", description: "Spiced chicken patty with jalapeños and hot sauce",
    price: "380", category: "Burgers", tags: ["NON-VEG", "SPICY"], image: burgerImg,
  },
  {
    id: "s01", name: "Fresh Chicken Salad", description: "Grilled chicken on a bed of fresh garden greens",
    price: "330", category: "Salads", tags: ["NON-VEG", "HEALTHY"], image: saladImg,
  },
  {
    id: "s02", name: "Russian Salad", description: "Creamy classic Russian-style salad",
    price: "250", category: "Salads", tags: ["VEG", "CREAMY"], image: saladImg,
  },
  {
    id: "so01", name: "Creamy Veg Soup", description: "Rich and creamy vegetable soup with garlic bread",
    price: "180", category: "Soups", tags: ["VEG", "COMFORT"], image: soupImg,
  },
  {
    id: "so02", name: "Creamy Chicken Soup", description: "Hearty chicken soup with garlic bread",
    price: "220", category: "Soups", tags: ["NON-VEG", "COMFORT"], image: soupImg,
  },
  {
    id: "c01", name: "Espresso", description: "Single or double shot of pure espresso",
    price: "110/130", category: "Coffee", tags: ["HOT", "CLASSIC"], image: coffeeImg,
    sizes: [{ label: "Single", price: "110" }, { label: "Doppio", price: "130" }],
  },
  {
    id: "c02", name: "Espresso Macchiato", description: "Espresso marked with a dollop of milk foam",
    price: "110/130", category: "Coffee", tags: ["HOT"], image: coffeeImg,
    sizes: [{ label: "Single", price: "110" }, { label: "Doppio", price: "130" }],
  },
  {
    id: "c03", name: "Americano", description: "Espresso shots topped with hot water",
    price: "140/170", category: "Coffee", tags: ["HOT", "CLASSIC"], image: coffeeImg,
    sizes: [{ label: "Single", price: "140" }, { label: "Doppio", price: "170" }],
  },
  {
    id: "c04", name: "Cappuccino", description: "Espresso with steamed milk and a thick foam crown",
    price: "190", category: "Coffee", tags: ["HOT", "CLASSIC"], image: coffeeImg,
  },
  {
    id: "c05", name: "Cafe Latte", description: "Smooth espresso with steamed milk",
    price: "190", category: "Coffee", tags: ["HOT", "SMOOTH"], image: coffeeImg,
  },
  {
    id: "c06", name: "Caramel Macchiato", description: "Layered vanilla steamed milk with espresso and caramel",
    price: "230", category: "Coffee", tags: ["HOT", "SWEET"], image: coffeeImg,
  },
  {
    id: "c07", name: "Mocha Madness", description: "Rich chocolate meets bold espresso",
    price: "230", category: "Coffee", tags: ["HOT", "CHOCOLATE"], image: coffeeImg,
  },
  {
    id: "c08", name: "Iced Americano", description: "Chilled americano over ice",
    price: "140/170", category: "Coffee", tags: ["COLD", "REFRESHING"], image: coffeeImg,
    sizes: [{ label: "Single", price: "140" }, { label: "Doppio", price: "170" }],
  },
  {
    id: "c09", name: "Iced Latte", description: "Chilled latte over ice, smooth and refreshing",
    price: "190", category: "Coffee", tags: ["COLD", "SMOOTH"], image: coffeeImg,
  },
  {
    id: "c10", name: "Iced Mocha", description: "Iced chocolate and espresso blend",
    price: "230", category: "Coffee", tags: ["COLD", "CHOCOLATE"], image: coffeeImg,
  },
  {
    id: "c11", name: "Iced Strawberry Macchiato", description: "Strawberry syrup, milk, espresso over ice",
    price: "230", category: "Coffee", tags: ["COLD", "FRUITY"], image: drinkImg,
  },
  {
    id: "sh01", name: "Strawberry Shake", description: "Creamy strawberry milkshake",
    price: "220", category: "Shakes", tags: ["COLD", "FRUITY"], image: shakeImg,
  },
  {
    id: "sh02", name: "Oreo Shake", description: "Cookies & cream milkshake bliss",
    price: "220", category: "Shakes", tags: ["COLD", "INDULGENT"], image: shakeImg,
  },
  {
    id: "sh03", name: "Caramel Shake", description: "Rich caramel milkshake",
    price: "220", category: "Shakes", tags: ["COLD", "SWEET"], image: shakeImg,
  },
  {
    id: "sh04", name: "Pink Guava Shake", description: "Tropical pink guava milkshake",
    price: "240", category: "Shakes", tags: ["COLD", "TROPICAL"], image: shakeImg,
  },
  {
    id: "sh05", name: "Mango Shake", description: "Fresh mango milkshake",
    price: "240", category: "Shakes", tags: ["COLD", "FRUITY"], image: shakeImg,
  },
  {
    id: "sh06", name: "Kiwi Shake", description: "Tangy kiwi milkshake",
    price: "240", category: "Shakes", tags: ["COLD", "TROPICAL"], image: shakeImg,
  },
  {
    id: "d01", name: "Mint Lemonade", description: "Fresh lemonade with mint leaves",
    price: "160/540", category: "Drinks", tags: ["COLD", "REFRESHING"], image: drinkImg,
    sizes: [{ label: "Regular", price: "160" }, { label: "Jug", price: "540" }],
  },
  {
    id: "d02", name: "Fresh Lime Soda", description: "Classic lime soda, sweet or salty",
    price: "140", category: "Drinks", tags: ["COLD", "CLASSIC"], image: drinkImg,
  },
  {
    id: "d03", name: "Masala Lemonade", description: "Spiced lemonade with chaat masala",
    price: "180/680", category: "Drinks", tags: ["COLD", "SPICY"], image: drinkImg,
    sizes: [{ label: "Regular", price: "180" }, { label: "Jug", price: "680" }],
  },
  {
    id: "d04", name: "Lemon Ice Tea", description: "Refreshing lemon iced tea",
    price: "160", category: "Drinks", tags: ["COLD", "TEA"], image: drinkImg,
  },
  {
    id: "d05", name: "Peach Ice Tea", description: "Sweet peach-infused iced tea",
    price: "170", category: "Drinks", tags: ["COLD", "FRUITY"], image: drinkImg,
  },
  {
    id: "d06", name: "Blue Lemonade", description: "Vibrant blue citrus lemonade",
    price: "170", category: "Drinks", tags: ["COLD", "COLORFUL"], image: drinkImg,
  },
  {
    id: "d07", name: "Mojito Mint", description: "Classic mint mojito, non-alcoholic",
    price: "210", category: "Drinks", tags: ["COLD", "REFRESHING"], image: drinkImg,
  },
  {
    id: "d08", name: "Hot Chocolate", description: "Rich and creamy hot chocolate",
    price: "160", category: "Drinks", tags: ["HOT", "COMFORT"], image: coffeeImg,
  },
  {
    id: "d09", name: "Milk Tea", description: "Traditional milk tea",
    price: "80", category: "Drinks", tags: ["HOT", "LOCAL"], image: coffeeImg,
  },
  {
    id: "d10", name: "Black Tea", description: "Pure black tea",
    price: "35", category: "Drinks", tags: ["HOT", "CLASSIC"], image: coffeeImg,
  },
  {
    id: "i01", name: "Classic Scoop", description: "Choose from our classic ice cream flavors",
    price: "130/250", category: "Ice Cream", tags: ["COLD", "CLASSIC"], image: icecreamImg,
    sizes: [{ label: "Single", price: "130" }, { label: "Double", price: "250" }],
  },
  {
    id: "i02", name: "Exotic Scoop", description: "Premium exotic flavor ice cream",
    price: "160/310", category: "Ice Cream", tags: ["COLD", "PREMIUM"], image: icecreamImg,
    sizes: [{ label: "Single", price: "160" }, { label: "Double", price: "310" }],
  },
  {
    id: "i03", name: "Signature Scoop", description: "Our signature chef-crafted ice cream",
    price: "170/330", category: "Ice Cream", tags: ["COLD", "SIGNATURE"], image: icecreamImg,
    sizes: [{ label: "Single", price: "170" }, { label: "Double", price: "330" }],
  },
];

export const todaysSpecials = [
  { name: "Cheese Burst Veg", price: "From 840" },
  { name: "Chicken Momo", price: "220" },
  { name: "Spicy Inferno Pizza", price: "From 520" },
  { name: "Planet Size Non-Veg", price: "From 1990" },
];

export const testimonials = [
  { name: "Arjun Shrestha", location: "Kathmandu", stars: 5,
    review: "After trying Pizza Planet's Mozzarella Crust, no other pizza tastes good. Absolutely amazing taste! This place truly is 'Planet of Cheeseness'." },
  { name: "Priya Thapa", location: "Pokhara", stars: 5,
    review: "The Chicken Momo here is something else entirely. Best dumplings I've had, hands down. The vibe is pure joy!" },
  { name: "Roshan Adhikari", location: "Lalitpur", stars: 5,
    review: "A Slice of HAPPINESS — that's what Pizza Planet delivers every single time. The Planet Size pizza is our weekend ritual now." },
  { name: "Sujata Maharjan", location: "Bhaktapur", stars: 5,
    review: "The peri peri fries, the shakes, the pizza — everything is made with so much love. You can taste the happiness in every bite!" },
  { name: "Kiran Rai", location: "Kathmandu", stars: 5,
    review: "Welcome to Planet of Togetherness! This place brings people together. Great food, great music, great times." },
];
