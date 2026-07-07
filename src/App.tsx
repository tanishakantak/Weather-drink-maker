import React, { useState, useEffect, useRef } from "react";
import { 
  Sun, 
  Snowflake, 
  CloudRain, 
  Leaf, 
  Sparkles, 
  Heart, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Check, 
  Droplet, 
  Coffee, 
  GlassWater,
  RotateCw,
  Layers,
  Cloud,
  CircleDot,
  Grid,
  Citrus,
  ArrowDownCircle,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";

// I. THE MANDATORY REASONING & RECIPE DATA TREE
const SEASONAL_RECIPES = {
  SUMMER: {
    "Iced Tea": {
      "Peach Iced Tea": [
        { type: "Tap", label: "Drop black tea bag", icon: "Coffee", color: "#78350f" },
        { type: "Tap", label: "Pour hot water to brew", icon: "Droplet", color: "#b45309" },
        { type: "Tap", label: "Add sweet peach puree", icon: "Sparkles", color: "#f97316" },
        { type: "Knob", label: "Set ice level", options: ["None", "Chilled", "Frosty", "Arctic"] },
        { type: "Tap", label: "Drop sliced peaches", icon: "Citrus", color: "#fb923c" },
        { type: "Whisk", label: "Stir ingredients to blend peach nectar" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Mint Lemon Iced Tea": [
        { type: "Tap", label: "Drop green tea bag", icon: "Coffee", color: "#15803d" },
        { type: "Tap", label: "Pour fresh hot water", icon: "Droplet", color: "#16a34a" },
        { type: "Tap", label: "Squeeze fresh lemon juice", icon: "Citrus", color: "#eab308" },
        { type: "Knob", label: "Set sweetness profile", options: ["Gentle", "Comforting", "Rich", "Dreamy"] },
        { type: "Tap", label: "Slap fresh mint leaves", icon: "Leaf", color: "#22c55e" },
        { type: "Whisk", label: "Muddle mint leaves at bottom" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    },
    "Fruit Juice": {
      "Mango Passionfruit Juice": [
        { type: "Tap", label: "Dice fresh golden mangoes", icon: "Sparkles", color: "#f59e0b" },
        { type: "Tap", label: "Scoop tart passionfruit pulp", icon: "Citrus", color: "#d97706" },
        { type: "Tap", label: "Add pristine coconut water", icon: "Droplet", color: "#fef08a" },
        { type: "Knob", label: "Adjust chill dial", options: ["Cool", "Cold", "Ice Locked", "Deep Freeze"] },
        { type: "Tap", label: "Add a splash of organic honey", icon: "Heart", color: "#b45309" },
        { type: "Tap", label: "Toss in organic chia seeds", icon: "Layers", color: "#d97706" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Watermelon Lime Juice": [
        { type: "Tap", label: "Cut fresh watermelon cubes", icon: "Layers", color: "#f43f5e" },
        { type: "Tap", label: "Squeeze lime juice", icon: "Citrus", color: "#a3e635" },
        { type: "Tap", label: "Add cold filtered water", icon: "Droplet", color: "#e0f2fe" },
        { type: "Knob", label: "Turn the chill dial", options: ["Chilled", "Crisp", "Sub-Zero", "Deep Frost"] },
        { type: "Tap", label: "Drop sweet mint crystals", icon: "Sparkles", color: "#34d399" },
        { type: "Tap", label: "Add pristine ice shards", icon: "Snowflake", color: "#bae6fd" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    },
    "Milkshake": {
      "Strawberry Milkshake": [
        { type: "Tap", label: "Scoop premium vanilla ice cream", icon: "CircleDot", color: "#fef3c7" },
        { type: "Tap", label: "Drop in fresh ripe strawberries", icon: "Heart", color: "#f43f5e" },
        { type: "Tap", label: "Pour cold whole milk", icon: "Droplet", color: "#fff7ed" },
        { type: "Knob", label: "Turn the blending dial", options: ["Slow Mix", "Smooth Blend", "Frothy Whipped", "Max Whirl"] },
        { type: "Tap", label: "Squeeze sweet strawberry syrup", icon: "Sparkles", color: "#db2777" },
        { type: "Tap", label: "Add whipped cream and sprinkles", icon: "Cloud", color: "#fce7f3" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Chocolate Milkshake": [
        { type: "Tap", label: "Scoop rich chocolate ice cream", icon: "CircleDot", color: "#451a03" },
        { type: "Tap", label: "Add crunchy cocoa nibs", icon: "Layers", color: "#78350f" },
        { type: "Tap", label: "Pour cold whole milk", icon: "Droplet", color: "#fff7ed" },
        { type: "Knob", label: "Turn the blending dial", options: ["Slow Mix", "Smooth Blend", "Frothy Whipped", "Max Whirl"] },
        { type: "Tap", label: "Squeeze decadent fudge syrup", icon: "Sparkles", color: "#27160c" },
        { type: "Tap", label: "Top with sweet chocolate chips", icon: "CircleDot", color: "#3b2314" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    }
  },
  WINTER: {
    "Hot Cocoa": {
      "Classic Dark Cocoa": [
        { type: "Tap", label: "Toss dark chocolate shavings", icon: "Layers", color: "#451a03" },
        { type: "Tap", label: "Add fine cocoa powder", icon: "Sparkles", color: "#78350f" },
        { type: "Whisk", label: "Whisk cocoa powder to dissolve lumps" },
        { type: "Tap", label: "Pour whole creamy milk", icon: "Droplet", color: "#fed7aa" },
        { type: "Knob", label: "Set warm frothing level", options: ["Warm", "Cozy", "Steaming", "Toasty"] },
        { type: "Tap", label: "Drop fluffy marshmallows", icon: "CircleDot", color: "#fffff0" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Peppermint Cocoa": [
        { type: "Tap", label: "Add milk chocolate pieces", icon: "Layers", color: "#542e17" },
        { type: "Tap", label: "Pour rich hot cocoa base", icon: "Droplet", color: "#78350f" },
        { type: "Tap", label: "Add cool peppermint extract", icon: "Sparkles", color: "#99f6e4" },
        { type: "Knob", label: "Set steam warmth", options: ["Gentle Heat", "Steamy", "Hot", "Blazing Warmth"] },
        { type: "Whisk", label: "Stir chocolate and peppermint syrup" },
        { type: "Tap", label: "Top with crushed candy cane", icon: "Heart", color: "#ef4444" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    },
    "Coffee": {
      "Vanilla Latte": [
        { type: "Tap", label: "Grind aromatic espresso beans", icon: "Layers", color: "#27160c" },
        { type: "Tap", label: "Pull fresh espresso shot", icon: "Droplet", color: "#4a2c11" },
        { type: "Tap", label: "Pump sweet vanilla syrup", icon: "Sparkles", color: "#fde047" },
        { type: "Knob", label: "Set steam temperature", options: ["Light Foam", "Medium", "Extra Froth", "Velvety Microfoam"] },
        { type: "Tap", label: "Pour velvety frothed milk", icon: "Cloud", color: "#fafaf9" },
        { type: "Tap", label: "Dust warm cinnamon powder", icon: "Leaf", color: "#b45309" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Mocha Mocha": [
        { type: "Tap", label: "Grind premium dark roast beans", icon: "Layers", color: "#1c1009" },
        { type: "Tap", label: "Pull intense double espresso shot", icon: "Droplet", color: "#2d1a0e" },
        { type: "Tap", label: "Add sweet chocolate drizzle", icon: "Sparkles", color: "#3d2212" },
        { type: "Knob", label: "Set milk foam level", options: ["Flat", "Light", "Standard Latte", "Deep Foam Cap"] },
        { type: "Tap", label: "Pour rich steamed milk", icon: "Cloud", color: "#f5f5f4" },
        { type: "Tap", label: "Top with dark cocoa dust", icon: "Grid", color: "#5c3317" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    },
    "Winter Tea": {
      "Spiced Apple Cider Tea": [
        { type: "Tap", label: "Pour crisp fresh apple juice", icon: "Droplet", color: "#f59e0b" },
        { type: "Tap", label: "Drop organic cinnamon stick", icon: "Layers", color: "#78350f" },
        { type: "Tap", label: "Add whole fragrant star anise", icon: "Sparkles", color: "#b45309" },
        { type: "Knob", label: "Set winter simmer level", options: ["Low Infuse", "Warm Steep", "Rolling Simmer", "Deep Brew"] },
        { type: "Tap", label: "Slice fresh orange wedges", icon: "Citrus", color: "#ea580c" },
        { type: "Tap", label: "Drizzle amber maple syrup", icon: "Heart", color: "#b45309" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Ginger Honey Green Tea": [
        { type: "Tap", label: "Drop premium green tea leaves", icon: "Leaf", color: "#166534" },
        { type: "Tap", label: "Add sliced spicy ginger", icon: "Layers", color: "#fef08a" },
        { type: "Tap", label: "Pour steaming hot water", icon: "Droplet", color: "#f0fdf4" },
        { type: "Knob", label: "Set heat steep level", options: ["Light Steep", "Medium Balanced", "Strong Herbal", "Max Intensity"] },
        { type: "Tap", label: "Add golden honey swirl", icon: "Heart", color: "#d97706" },
        { type: "Tap", label: "Add zesty lemon peel", icon: "Citrus", color: "#eab308" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    }
  },
  RAINY: {
    "Matcha": {
      "Sweet Cream Float Matcha": [
        { type: "Tap", label: "Sift ceremonial matcha powder", icon: "Sparkles", color: "#166534" },
        { type: "Tap", label: "Pour pristine warm water", icon: "Droplet", color: "#14532d" },
        { type: "Whisk", label: "Whisk matcha to a frothy green lather" },
        { type: "Knob", label: "Set sweetness scale", options: ["Unsweetened", "Subtle", "Balanced", "Sweet"] },
        { type: "Tap", label: "Layer organic oat milk", icon: "Droplet", color: "#f0fdf4" },
        { type: "Tap", label: "Layer dense sweet cream foam", icon: "Cloud", color: "#ffffff" },
        { type: "Pour", label: "Hold the lever to pour layer", target: 100 }
      ],
      "Lavender Matcha": [
        { type: "Tap", label: "Sift organic matcha powder", icon: "Sparkles", color: "#166534" },
        { type: "Tap", label: "Pour pristine warm water", icon: "Droplet", color: "#14532d" },
        { type: "Whisk", label: "Whisk into uniform green foam" },
        { type: "Knob", label: "Set floral syrup strength", options: ["Hint of Rose", "Mild Lavender", "Aromatic", "Deep Bloom"] },
        { type: "Tap", label: "Add fragrant lavender syrup", icon: "Heart", color: "#a855f7" },
        { type: "Tap", label: "Drop chilled ice cubes", icon: "Snowflake", color: "#f3e8ff" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    },
    "Herbal Infusion": {
      "Honey Chamomile": [
        { type: "Tap", label: "Steep organic chamomile petals", icon: "Leaf", color: "#eab308" },
        { type: "Tap", label: "Pour steaming hot water", icon: "Droplet", color: "#fef9c3" },
        { type: "Tap", label: "Add sweet honey spoon", icon: "Heart", color: "#ca8a04" },
        { type: "Knob", label: "Set calm warmth profiles", options: ["Restful", "Sleepy Warm", "Soothing", "Max Comfort"] },
        { type: "Tap", label: "Drop fresh lemon slice", icon: "Citrus", color: "#fde047" },
        { type: "Whisk", label: "Stir lemon and chamomile blend gently" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Rose Hibiscus": [
        { type: "Tap", label: "Add dried hibiscus petals", icon: "Leaf", color: "#991b1b" },
        { type: "Tap", label: "Pour pure hot water", icon: "Droplet", color: "#dc2626" },
        { type: "Tap", label: "Add organic rose syrup", icon: "Heart", color: "#f43f5e" },
        { type: "Knob", label: "Set bloom infusion level", options: ["Delicate", "Fragrant", "Full Steep", "Rich Herbal"] },
        { type: "Tap", label: "Add sweet mixed berry garnish", icon: "Sparkles", color: "#be123c" },
        { type: "Whisk", label: "Stir petals for deeper infusion" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    }
  },
  AUTUMN: {
    "Pumpkin Shake": {
      "Spiced Pumpkin Shake": [
        { type: "Tap", label: "Scoop organic pumpkin cream", icon: "Layers", color: "#c2410c" },
        { type: "Tap", label: "Add sweet cinnamon dust", icon: "Sparkles", color: "#9a3412" },
        { type: "Tap", label: "Pour chilled whole milk", icon: "Droplet", color: "#ffedd5" },
        { type: "Knob", label: "Turn spice intensity dial", options: ["Mild", "Spiced", "Autumnal", "Harvest Blast"] },
        { type: "Tap", label: "Add freshly grated nutmeg sprinkle", icon: "Grid", color: "#ea580c" },
        { type: "Tap", label: "Top with rich whipped cream", icon: "Cloud", color: "#fffbeb" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Salted Caramel Pumpkin Shake": [
        { type: "Tap", label: "Scoop sweet pumpkin base", icon: "Layers", color: "#c2410c" },
        { type: "Tap", label: "Add rich caramel drizzle", icon: "Sparkles", color: "#b45309" },
        { type: "Tap", label: "Pour ice-cold whole milk", icon: "Droplet", color: "#fff7ed" },
        { type: "Knob", label: "Turn the sweetness dial", options: ["Balanced", "Caramel Rich", "Extra Sweet", "Decadent"] },
        { type: "Tap", label: "Add a pinch of sea salt", icon: "Snowflake", color: "#fba518" },
        { type: "Tap", label: "Top with crunchy caramel crunchies", icon: "Grid", color: "#d97706" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    },
    "Spiced Cider": {
      "Cinnamon Pear Cider": [
        { type: "Tap", label: "Pour sweet local pear juice", icon: "Droplet", color: "#ca8a04" },
        { type: "Tap", label: "Drop aromatic cinnamon stick", icon: "Layers", color: "#78350f" },
        { type: "Tap", label: "Add a whole fragrant clove bud", icon: "Sparkles", color: "#a16207" },
        { type: "Knob", label: "Set cider simmer warmth", options: ["Warm Glow", "Toasty", "Simmering", "Hot Hearth"] },
        { type: "Tap", label: "Add a fresh sweet pear slice", icon: "Citrus", color: "#eab308" },
        { type: "Tap", label: "Drizzle deep brown sugar syrup", icon: "Heart", color: "#713f12" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ],
      "Clove Cranberry Cider": [
        { type: "Tap", label: "Pour tart ruby cranberry juice", icon: "Droplet", color: "#991b1b" },
        { type: "Tap", label: "Add fragrant clove buds", icon: "Sparkles", color: "#78350f" },
        { type: "Tap", label: "Add twist of organic orange peel", icon: "Citrus", color: "#ea580c" },
        { type: "Knob", label: "Set autumn spice warmth", options: ["Mild Infuse", "Aromatic", "Mulled Warmth", "Deep Spice"] },
        { type: "Tap", label: "Drop glistening sugared cranberries", icon: "CircleDot", color: "#991b1b" },
        { type: "Whisk", label: "Stir mulled cider spices" },
        { type: "Pour", label: "Hold the lever to finish pour", target: 100 }
      ]
    }
  }
};

const COZY_REVIEWS: Record<string, string> = {
  "Peach Iced Tea": "A sun-kissed peach breeze with a sweet, refreshing soul. Simply delightful!",
  "Mint Lemon Iced Tea": "Zesty, crisp, and wonderfully cooling. The mint leaves add a clean cozy sparkle!",
  "Mango Passionfruit Juice": "A tropical embrace in a glass. Richly sweet with a bright passionfruit giggle.",
  "Watermelon Lime Juice": "Pure hydration and summer bliss! Crisp watermelon with a tongue-tingling citrus twist.",
  "Strawberry Milkshake": "Creamy, nostalgic, and sweet. Like drinking a strawberry-flavored cloud!",
  "Chocolate Milkshake": "Rich, velvet indulgence. A chocolate lover's absolute dream come true.",
  "Classic Dark Cocoa": "Richly dark and comforting. Perfect for wrapping your hands around on a cold day.",
  "Peppermint Cocoa": "Sweet minty warmth that tingles. Like a cozy fireside hug for your spirit.",
  "Vanilla Latte": "Smooth, aromatic, and perfectly balanced. The cinnamon dust makes it feel like home.",
  "Mocha Mocha": "A gorgeous duet of deep espresso and fudge. Absolute chocolatey coffee heaven.",
  "Spiced Apple Cider Tea": "Warm, spiced apple goodness that feels like walking through a golden autumn orchard.",
  "Ginger Honey Green Tea": "Soothing, gentle, and deeply restorative. The ginger warmth is incredibly healing.",
  "Sweet Cream Float Matcha": "Rich, frothy matcha layered with cloud-like sweet cream. Utterly luxurious!",
  "Lavender Matcha": "An exquisite lavender bloom meets rich green tea. Calming, floral, and sublime.",
  "Honey Chamomile": "Liquid serenity. A warm chamomile glow that whispers of sweet dreams.",
  "Rose Hibiscus": "A vibrant, floral blossom in a glass. Refreshing, tart, and beautifully aromatic.",
  "Spiced Pumpkin Shake": "A rich autumn harvest in a cup. Perfectly spiced and wonderfully comforting.",
  "Salted Caramel Pumpkin Shake": "The ultimate autumn luxury. Salty caramel ribbons met with cozy pumpkin cream.",
  "Cinnamon Pear Cider": "Deeply simmered pear cider with a sweet cinnamon spine. Golden and glowing.",
  "Clove Cranberry Cider": "Tart, spiced cranberry joy. A ruby red tonic that brightens any cloudy afternoon."
};

const getIngredientImageAndCaption = (label: string): { url: string; caption: string } => {
  const lbl = label.toLowerCase();
  if (lbl.includes("stir") || lbl.includes("whisk") || lbl.includes("mix") || lbl.includes("muddle") || lbl.includes("blend")) {
    return {
      url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop&q=80",
      caption: "Cozy Hand Stirring"
    };
  }

  if (lbl.includes("tea bag") || lbl.includes("green tea") || lbl.includes("matcha")) {
    if (lbl.includes("matcha")) {
      return {
        url: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400&auto=format&fit=crop&q=80",
        caption: "Ceremonial Matcha Green Tea"
      };
    }
    if (lbl.includes("green tea")) {
      return {
        url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&auto=format&fit=crop&q=80",
        caption: "Organic Loose Green Tea Leaves"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&auto=format&fit=crop&q=80",
      caption: "Aromatic Loose Black Tea Leaves"
    };
  }
  
  if (lbl.includes("water") || lbl.includes("brew") || lbl.includes("liquid")) {
    return {
      url: "https://images.unsplash.com/photo-1495556650867-99590cea3657?w=400&auto=format&fit=crop&q=80",
      caption: "Pure Spring Water"
    };
  }

  if (lbl.includes("peach")) {
    return {
      url: "https://images.unsplash.com/photo-1595124253363-c596eedc467a?w=400&auto=format&fit=crop&q=80",
      caption: "Sweet Sun-Ripened Peaches"
    };
  }

  if (lbl.includes("ice") || lbl.includes("shards") || lbl.includes("chill")) {
    return {
      url: "https://images.unsplash.com/photo-1551216223-37c89bbaec52?w=400&auto=format&fit=crop&q=80",
      caption: "Crystal Purified Ice"
    };
  }

  if (lbl.includes("mint")) {
    return {
      url: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&auto=format&fit=crop&q=80",
      caption: "Vibrant Garden Mint Leaves"
    };
  }

  if (lbl.includes("lemon") || lbl.includes("lime") || lbl.includes("citrus")) {
    if (lbl.includes("lime")) {
      return {
        url: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&auto=format&fit=crop&q=80",
        caption: "Fresh Tangy Lime Slices"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&auto=format&fit=crop&q=80",
      caption: "Fresh Lemon Wedge"
    };
  }

  if (lbl.includes("mango")) {
    return {
      url: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4b3d?w=400&auto=format&fit=crop&q=80",
      caption: "Luscious Golden Mango Dices"
    };
  }

  if (lbl.includes("passionfruit")) {
    return {
      url: "https://images.unsplash.com/photo-1534080391025-a17c0508a3f6?w=400&auto=format&fit=crop&q=80",
      caption: "Fragrant Passionfruit Pulp"
    };
  }

  if (lbl.includes("honey") || lbl.includes("sweetness") || lbl.includes("syrup") || lbl.includes("caramel")) {
    if (lbl.includes("caramel")) {
      return {
        url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
        caption: "Golden Caramel Drizzle"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
      caption: "Sweet Forest Honey Flow"
    };
  }

  if (lbl.includes("chia")) {
    return {
      url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80",
      caption: "Nutritious Chia Seeds"
    };
  }

  if (lbl.includes("watermelon")) {
    return {
      url: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a4c?w=400&auto=format&fit=crop&q=80",
      caption: "Juicy Seedless Watermelon"
    };
  }

  if (lbl.includes("ice cream") || lbl.includes("scoop")) {
    return {
      url: "https://images.unsplash.com/photo-1501443762594-e2bc0abd1b27?w=400&auto=format&fit=crop&q=80",
      caption: "Creamy Vanilla Gelato"
    };
  }

  if (lbl.includes("strawberry") || lbl.includes("berries")) {
    return {
      url: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400&auto=format&fit=crop&q=80",
      caption: "Fresh Crimson Strawberries"
    };
  }

  if (lbl.includes("milk") || lbl.includes("cream")) {
    if (lbl.includes("cream") || lbl.includes("whip")) {
      return {
        url: "https://images.unsplash.com/photo-1579306193793-0be3c9668994?w=400&auto=format&fit=crop&q=80",
        caption: "Fluffy Dairy Whipped Cream"
      };
    }
    return {
      url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80",
      caption: "Cold Organic Whole Milk"
    };
  }

  if (lbl.includes("chocolate") || lbl.includes("cocoa") || lbl.includes("fudge") || lbl.includes("nibs")) {
    return {
      url: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&auto=format&fit=crop&q=80",
      caption: "Artisanal Chocolate Cocoa"
    };
  }

  if (lbl.includes("marshmallow")) {
    return {
      url: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&auto=format&fit=crop&q=80",
      caption: "Soft Pillowy Marshmallows"
    };
  }

  if (lbl.includes("candy cane") || lbl.includes("peppermint")) {
    return {
      url: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?w=400&auto=format&fit=crop&q=80",
      caption: "Sweet Minty Candy Shards"
    };
  }

  if (lbl.includes("espresso") || lbl.includes("beans") || lbl.includes("coffee") || lbl.includes("grind")) {
    return {
      url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&auto=format&fit=crop&q=80",
      caption: "Freshly Ground Espresso Beans"
    };
  }

  if (lbl.includes("cinnamon") || lbl.includes("nutmeg") || lbl.includes("clove") || lbl.includes("spice") || lbl.includes("anise")) {
    return {
      url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80",
      caption: "Cozy Whole Simmer Spices"
    };
  }

  if (lbl.includes("orange") || lbl.includes("peel")) {
    return {
      url: "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&auto=format&fit=crop&q=80",
      caption: "Sun-Cured Orange Wedges"
    };
  }

  if (lbl.includes("lavender")) {
    return {
      url: "https://images.unsplash.com/photo-1565192647048-f997ded87970?w=400&auto=format&fit=crop&q=80",
      caption: "Fragrant Lavender Blossoms"
    };
  }

  if (lbl.includes("chamomile")) {
    return {
      url: "https://images.unsplash.com/photo-1523945339743-0fe06f0945bc?w=400&auto=format&fit=crop&q=80",
      caption: "Dried Golden Chamomile Flowers"
    };
  }

  if (lbl.includes("hibiscus") || lbl.includes("rose")) {
    return {
      url: "https://images.unsplash.com/photo-1596512398517-5e60934c9c72?w=400&auto=format&fit=crop&q=80",
      caption: "Organic Dried Crimson Hibiscus"
    };
  }

  if (lbl.includes("pumpkin")) {
    return {
      url: "https://images.unsplash.com/photo-1507269811115-0a29b209c5db?w=400&auto=format&fit=crop&q=80",
      caption: "Vibrant Local Pumpkin Cream"
    };
  }

  if (lbl.includes("pear")) {
    return {
      url: "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?w=400&auto=format&fit=crop&q=80",
      caption: "Fresh Garden Pear Slices"
    };
  }

  if (lbl.includes("cranberry") || lbl.includes("cranberries")) {
    return {
      url: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=400&auto=format&fit=crop&q=80",
      caption: "Tart Crimson Cranberries"
    };
  }

  return {
    url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&auto=format&fit=crop&q=80",
    caption: "Delicious Cozy Accent"
  };
};

const getFinishedDrinkImage = (recipeName: string): { url: string; caption: string } => {
  const r = recipeName;
  if (r === "Peach Iced Tea") {
    return {
      url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80",
      caption: "Ice-cold Peach Iced Tea floating with fresh peach wheels."
    };
  }
  if (r === "Mint Lemon Iced Tea") {
    return {
      url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop&q=80",
      caption: "Zesty Mint Lemon Iced Tea clinking with ice cubes and lemon wheels."
    };
  }
  if (r === "Mango Passionfruit Juice") {
    return {
      url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80",
      caption: "Golden Mango Passionfruit nectar glowing in the sun."
    };
  }
  if (r === "Watermelon Lime Juice") {
    return {
      url: "https://images.unsplash.com/photo-1508888620463-30bfe1058af4?w=500&auto=format&fit=crop&q=80",
      caption: "Ice Watermelon Lime tonic crowned with cool garden mint."
    };
  }
  if (r === "Strawberry Milkshake") {
    return {
      url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80",
      caption: "Creamy pink Strawberry Milkshake with whipped dairy foam."
    };
  }
  if (r === "Chocolate Milkshake") {
    return {
      url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=80",
      caption: "Decadent Chocolate Milkshake topped with heavy fudge ribbons."
    };
  }
  if (r === "Classic Dark Cocoa") {
    return {
      url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80",
      caption: "Steaming Classic Hot Cocoa topped with melt-in marshmallows."
    };
  }
  if (r === "Peppermint Cocoa") {
    return {
      url: "https://images.unsplash.com/photo-1517088455888-abffb4b8e961?w=500&auto=format&fit=crop&q=80",
      caption: "Peppermint Hot Cocoa garnished with crimson candy cane pieces."
    };
  }
  if (r === "Vanilla Latte") {
    return {
      url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=80",
      caption: "Artisanal Vanilla Latte featuring velvety warm milk foam."
    };
  }
  if (r === "Mocha Mocha") {
    return {
      url: "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=500&auto=format&fit=crop&q=80",
      caption: "Double-espresso Mocha fudge crown with rich dusting."
    };
  }
  if (r === "Spiced Apple Cider Tea") {
    return {
      url: "https://images.unsplash.com/photo-1606240724602-5b21f896eae8?w=500&auto=format&fit=crop&q=80",
      caption: "Spiced Apple Cider mug steaming with cinnamon and cloves."
    };
  }
  if (r === "Ginger Honey Green Tea") {
    return {
      url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80",
      caption: "Soothing Ginger Honey Green Tea with steam slowly rising."
    };
  }
  if (r === "Sweet Cream Float Matcha") {
    return {
      url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80",
      caption: "Matcha Latte layered with dense, velvety sweet milk float."
    };
  }
  if (r === "Lavender Matcha") {
    return {
      url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80",
      caption: "Lavender Matcha Latte with light purple and organic green."
    };
  }
  if (r === "Honey Chamomile") {
    return {
      url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80",
      caption: "Cozy Chamomile Tea brewed with sweet forest honey."
    };
  }
  if (r === "Rose Hibiscus") {
    return {
      url: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?w=500&auto=format&fit=crop&q=80",
      caption: "Vibrant Hibiscus tea garnished with delicate dried rose."
    };
  }
  if (r === "Spiced Pumpkin Shake") {
    return {
      url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop&q=80",
      caption: "Thick Autumnal Pumpkin Spice shake topped with fresh cream."
    };
  }
  if (r === "Salted Caramel Pumpkin Shake") {
    return {
      url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80",
      caption: "Salted Caramel Pumpkin cream drizzled with amber syrup."
    };
  }
  if (r === "Cinnamon Pear Cider") {
    return {
      url: "https://images.unsplash.com/photo-1606240724602-5b21f896eae8?w=500&auto=format&fit=crop&q=80",
      caption: "Golden Pear Cider slow-simmered with cinnamon bark."
    };
  }
  if (r === "Clove Cranberry Cider") {
    return {
      url: "https://images.unsplash.com/photo-1508609349937-5ee4cb3e01d5?w=500&auto=format&fit=crop&q=80",
      caption: "Mulled Cranberry spiced cider sparkling with sugar crystals."
    };
  }

  return {
    url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&auto=format&fit=crop&q=80",
    caption: "Your beautifully crafted custom beverage is ready to enjoy!"
  };
};

const getLiquidGradient = (selectedRecipe: string | null) => {
  if (!selectedRecipe) return { background: "transparent" };
  const r = selectedRecipe;
  
  if (r === "Peach Iced Tea") {
    return {
      background: "linear-gradient(to top, #7c2d12 0%, #ea580c 60%, #f97316 100%)",
      opacity: 0.85
    };
  }
  if (r === "Mint Lemon Iced Tea") {
    return {
      background: "linear-gradient(to top, #14532d 0%, #15803d 50%, #ca8a04 100%)",
      opacity: 0.85
    };
  }
  if (r === "Mango Passionfruit Juice") {
    return {
      background: "linear-gradient(to top, #ea580c 0%, #f59e0b 60%, #fef08a 100%)",
      opacity: 0.9
    };
  }
  if (r === "Watermelon Lime Juice") {
    return {
      background: "linear-gradient(to top, #be123c 0%, #f43f5e 70%, #fda4af 100%)",
      opacity: 0.85
    };
  }
  if (r === "Strawberry Milkshake") {
    return {
      background: "linear-gradient(to top, #db2777 0%, #f43f5e 50%, #fce7f3 100%)",
      opacity: 0.95
    };
  }
  if (r === "Chocolate Milkshake") {
    return {
      background: "linear-gradient(to top, #1c1009 0%, #3b2314 50%, #451a03 100%)",
      opacity: 0.95
    };
  }
  if (r === "Classic Dark Cocoa") {
    return {
      background: "linear-gradient(to top, #1c1009 0%, #451a03 60%, #78350f 100%)",
      opacity: 0.95
    };
  }
  if (r === "Peppermint Cocoa") {
    return {
      background: "linear-gradient(to top, #2d1a0e 0%, #542e17 60%, #ef4444 100%)",
      opacity: 0.95
    };
  }
  if (r === "Vanilla Latte") {
    return {
      background: "linear-gradient(to top, #4a2c11 0%, #b45309 40%, #fafaf9 100%)",
      opacity: 0.92
    };
  }
  if (r === "Mocha Mocha") {
    return {
      background: "linear-gradient(to top, #1c1009 0%, #3d2212 55%, #faf5f0 100%)",
      opacity: 0.95
    };
  }
  if (r === "Spiced Apple Cider Tea") {
    return {
      background: "linear-gradient(to top, #78350f 0%, #ca8a04 70%, #fde047 100%)",
      opacity: 0.85
    };
  }
  if (r === "Ginger Honey Green Tea") {
    return {
      background: "linear-gradient(to top, #166534 0%, #d97706 60%, #fef08a 100%)",
      opacity: 0.85
    };
  }
  if (r === "Sweet Cream Float Matcha") {
    return {
      background: "linear-gradient(to top, #14532d 0%, #15803d 75%, #ffffff 95%)",
      opacity: 0.95
    };
  }
  if (r === "Lavender Matcha") {
    return {
      background: "linear-gradient(to top, #14532d 0%, #15803d 45%, #a855f7 85%, #f3e8ff 100%)",
      opacity: 0.9
    };
  }
  if (r === "Honey Chamomile") {
    return {
      background: "linear-gradient(to top, #a16207 0%, #ca8a04 50%, #fef9c3 100%)",
      opacity: 0.85
    };
  }
  if (r === "Rose Hibiscus") {
    return {
      background: "linear-gradient(to top, #7f1d1d 0%, #be123c 60%, #fda4af 100%)",
      opacity: 0.85
    };
  }
  if (r === "Spiced Pumpkin Shake") {
    return {
      background: "linear-gradient(to top, #9a3412 0%, #c2410c 60%, #fffbeb 100%)",
      opacity: 0.95
    };
  }
  if (r === "Salted Caramel Pumpkin Shake") {
    return {
      background: "linear-gradient(to top, #713f12 0%, #b45309 60%, #fff7ed 100%)",
      opacity: 0.95
    };
  }
  if (r === "Cinnamon Pear Cider") {
    return {
      background: "linear-gradient(to top, #713f12 0%, #ca8a04 65%, #fde047 100%)",
      opacity: 0.85
    };
  }
  if (r === "Clove Cranberry Cider") {
    return {
      background: "linear-gradient(to top, #7f1d1d 0%, #991b1b 60%, #ea580c 100%)",
      opacity: 0.85
    };
  }

  return {
    background: "linear-gradient(to top, #7c2d12 0%, #d97706 70%, #fef08a 100%)",
    opacity: 0.85
  };
};

const CLIMATES = ["SUMMER", "WINTER", "RAINY", "AUTUMN"] as const;
type ClimateType = typeof CLIMATES[number];

export default function App() {
  const [selectedSeason, setSelectedSeason] = useState<ClimateType>("SUMMER");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  
  // Game Play States
  const [currentStep, setCurrentStep] = useState(0);
  const [pourProgress, setPourProgress] = useState(0);
  const [knobRotationIndex, setKnobRotationIndex] = useState(0);
  
  // Dynamic drop indicator triggers
  const [droppingItem, setDroppingItem] = useState<{ icon: string; color: string; label: string } | null>(null);
  const [isWiggling, setIsWiggling] = useState(false);
  const [isPouring, setIsPouring] = useState(false);
  const [isLeverActive, setIsLeverActive] = useState(false);
  const [muted, setMuted] = useState(false);
  
  // Celebration Confetti
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number; shape: string }[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  // New Tactile & Modal States
  const [whiskCount, setWhiskCount] = useState(0);
  const [lastWhiskSide, setLastWhiskSide] = useState<"left" | "right" | null>(null);
  const [isModalHidden, setIsModalHidden] = useState(false);

  // Play Cozy Sound Effects Synthesized via Web Audio API
  const playSound = (type: "click" | "pour" | "success" | "spin") => {
    if (muted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "pour") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(160 + Math.random() * 40, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "success") {
        const now = ctx.currentTime;
        const notes = [294.0, 392.0, 494.0, 587.0]; // cozy chord G major
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.06, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.35);
        });
      } else if (type === "spin") {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.6);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start();
        osc.stop(now + 0.65);
      }
    } catch (e) {
      console.warn("Audio Context is blocked by browser interaction policies.", e);
    }
  };

  // Rotate weather dial pointer
  const getClimateRotation = () => {
    const idx = CLIMATES.indexOf(selectedSeason);
    return idx * 90;
  };

  // Select Climate directly & Rotate Wheel
  const handleClimateClick = (season: ClimateType) => {
    if (selectedRecipe) return; // fully locked
    playSound("spin");
    setSelectedSeason(season);
  };

  // Spin Wheel sequentially
  const spinClimateWheel = () => {
    if (selectedRecipe) return; // fully locked
    playSound("spin");
    const currentIdx = CLIMATES.indexOf(selectedSeason);
    const nextIdx = (currentIdx + 1) % CLIMATES.length;
    setSelectedSeason(CLIMATES[nextIdx]);
  };

  // Complete Recipe steps array
  const recipeSteps = selectedSeason && selectedCategory && selectedRecipe
    ? (SEASONAL_RECIPES[selectedSeason] as any)[selectedCategory]?.[selectedRecipe] || []
    : [];

  const activeStep = recipeSteps[currentStep];

  const hasAdded = (keyword: string) => {
    if (!selectedRecipe || recipeSteps.length === 0) return false;
    return recipeSteps.slice(0, currentStep).some((step: any) => 
      step.label && step.label.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Dynamic grow & drop state engine syncer
  useEffect(() => {
    if (recipeSteps.length > 0) {
      if (currentStep < recipeSteps.length - 1) {
        // Grow level incrementally step-by-step
        setPourProgress(Math.round((currentStep / recipeSteps.length) * 100));
      } else {
        // Set to final baseline before continuous lever pour
        const baseline = Math.round(((recipeSteps.length - 1) / recipeSteps.length) * 100);
        setPourProgress(prev => Math.max(prev, baseline));
      }
    }
  }, [currentStep, recipeSteps.length]);

  // Retrieve step color or active fluid color beautifully
  const getActiveLiquidColor = () => {
    if (!selectedRecipe) return "transparent";
    // Try to read current step's color, or default back to recipe color tokens
    if (activeStep && activeStep.color) {
      return activeStep.color;
    }
    // Fallback based on name keyword matching
    const r = selectedRecipe;
    if (r.includes("Peach")) return "#fb923c";
    if (r.includes("Mint Lemon")) return "#eab308";
    if (r.includes("Mango")) return "#f59e0b";
    if (r.includes("Watermelon")) return "#f43f5e";
    if (r.includes("Strawberry")) return "#db2777";
    if (r.includes("Chocolate")) return "#78350f";
    if (r.includes("Classic Dark Cocoa")) return "#451a03";
    if (r.includes("Peppermint Cocoa")) return "#be123c";
    if (r.includes("Vanilla")) return "#f5ebe0";
    if (r.includes("Mocha")) return "#27160c";
    if (r.includes("Apple Cider")) return "#ca8a04";
    if (r.includes("Ginger Honey")) return "#d97706";
    if (r.includes("Sweet Cream")) return "#15803d";
    if (r.includes("Lavender")) return "#a855f7";
    if (r.includes("Honey Chamomile")) return "#ca8a04";
    if (r.includes("Rose Hibiscus")) return "#be123c";
    if (r.includes("Spiced Pumpkin")) return "#c2410c";
    if (r.includes("Salted Caramel")) return "#b45309";
    if (r.includes("Cinnamon Pear")) return "#ebd197";
    if (r.includes("Clove Cranberry")) return "#991b1b";
    return "#e67e22";
  };

  // Dynamic Lucide icon helper mapping standard string keys to imported packages
  const renderDynamicIcon = (iconName: string) => {
    switch (iconName) {
      case "Coffee": return <Coffee className="w-10 h-10 stroke-[2]" />;
      case "Droplet": return <Droplet className="w-10 h-10 stroke-[2]" />;
      case "Sparkles": return <Sparkles className="w-10 h-10 stroke-[2]" />;
      case "Citrus": return <Citrus className="w-10 h-10 stroke-[2]" />;
      case "RotateCw": return <RotateCw className="w-10 h-10 stroke-[2]" />;
      case "Leaf": return <Leaf className="w-10 h-10 stroke-[2]" />;
      case "Snowflake": return <Snowflake className="w-10 h-10 stroke-[2]" />;
      case "Layers": return <Layers className="w-10 h-10 stroke-[2]" />;
      case "Heart": return <Heart className="w-10 h-10 stroke-[2]" />;
      case "Cloud": return <Cloud className="w-10 h-10 stroke-[2]" />;
      case "CircleDot": return <CircleDot className="w-10 h-10 stroke-[2]" />;
      case "Grid": return <Grid className="w-10 h-10 stroke-[2]" />;
      default: return <Sparkles className="w-10 h-10 stroke-[2]" />;
    }
  };

  // Tap action trigger
  const handleTapAction = () => {
    if (isWiggling || !activeStep) return;
    playSound("click");
    setIsWiggling(true);
    
    // Set drop overlay animation item
    setDroppingItem({
      icon: activeStep.icon || "Sparkles",
      color: activeStep.color || "#db2777",
      label: activeStep.label
    });

    // Animate item drop & proceed to next index
    setTimeout(() => {
      setIsWiggling(false);
      setDroppingItem(null);
      if (currentStep < recipeSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 600);
  };

  // Knob Rotation trigger
  const rotateKnob = () => {
    playSound("click");
    setKnobRotationIndex(prev => (prev + 1) % 4);
  };

  const confirmKnobAction = () => {
    playSound("click");
    if (currentStep < recipeSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Continuous Pour System
  const handlePourMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPouring(true);
    setIsLeverActive(true);
  };

  const handlePourTouchStart = (e: React.TouchEvent) => {
    setIsPouring(true);
    setIsLeverActive(true);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const pct = Math.max(0, Math.min(100, Math.round((relativeY / rect.height) * 100)));
    const baseline = Math.round(((recipeSteps.length - 1) / recipeSteps.length) * 100);
    setPourProgress(Math.max(baseline, pct));
    playSound("click");
  };

  // Global continuous mouse move listener
  useEffect(() => {
    if (!isPouring) return;

    const onMove = (clientY: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const relativeY = clientY - rect.top;
      const pct = Math.max(0, Math.min(100, Math.round((relativeY / rect.height) * 100)));
      
      const baseline = Math.round(((recipeSteps.length - 1) / recipeSteps.length) * 100);
      const targetProgress = Math.max(baseline, pct);
      setPourProgress(targetProgress);

      if (targetProgress > baseline && targetProgress < 100) {
        playSound("pour");
      }
    };

    const handleGlobalMove = (e: MouseEvent) => {
      onMove(e.clientY);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        onMove(e.touches[0].clientY);
      }
    };

    const handleGlobalUp = () => {
      setIsPouring(false);
      setIsLeverActive(false);
    };

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchmove", handleGlobalTouchMove);
    window.addEventListener("touchend", handleGlobalUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [isPouring, recipeSteps.length]);

  // Continuously ticks pourProgress to 100 when holding down buttons
  useEffect(() => {
    if (!isLeverActive) return;
    if (pourProgress >= 100) return;

    const interval = setInterval(() => {
      setPourProgress(prev => {
        const next = Math.min(100, prev + 2);
        if (next >= 100) {
          clearInterval(interval);
          playSound("success");
          return 100;
        }
        playSound("pour");
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isLeverActive, pourProgress]);

  // Confetti overlay trigger
  useEffect(() => {
    if (pourProgress === 100 && confetti.length === 0) {
      const colors = ["#ffccd5", "#ffb3c1", "#e8f0fe", "#d8f3dc", "#ffe5ec", "#ffd166", "#fbc4b6"];
      const shapes = ["circle", "star", "leaf", "petal"];
      const list = Array.from({ length: 65 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 14,
        delay: Math.random() * 2.5,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      }));
      setConfetti(list);
    }
  }, [pourProgress, confetti]);

  const handleWhiskAction = (side: "left" | "right") => {
    if (side === lastWhiskSide || !activeStep) return;
    playSound("click");
    setLastWhiskSide(side);
    const newCount = whiskCount + 1;
    setWhiskCount(newCount);

    if (newCount >= 6) {
      playSound("success");
      // Advance step
      setTimeout(() => {
        setWhiskCount(0);
        setLastWhiskSide(null);
        if (currentStep < recipeSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }, 300);
    }
  };

  // Master Cleanup state flush
  const resetEntireGame = () => {
    playSound("click");
    setPourProgress(0);
    setCurrentStep(0);
    setKnobRotationIndex(0);
    setSelectedCategory(null);
    setSelectedRecipe(null);
    setConfetti([]);
    setIsWiggling(false);
    setIsPouring(false);
    setIsLeverActive(false);
    setDroppingItem(null);
    setWhiskCount(0);
    setLastWhiskSide(null);
    setIsModalHidden(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#fcf8f2] text-[#4a3525] flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Absolute floating backdrop organic accent leaves / snowflakes according to season */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#fceade] opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#e8f6fc] opacity-50 blur-3xl pointer-events-none" />

      {/* Confetti canvas overlay container */}
      {pourProgress === 100 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map(p => (
            <div
              key={p.id}
              className="absolute animate-fall"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: p.shape === "circle" ? "50%" : p.shape === "petal" ? "100% 0" : "4px",
                animationDelay: `${p.delay}s`,
                opacity: 0.8
              }}
            />
          ))}
        </div>
      )}

      {/* Main Console Box Frame (Figma aesthetic layout: Left Studio & Right Machine panel) */}
      <div className="w-full max-w-5xl bg-[#f7efe6] border-[10px] border-[#ebdccb] rounded-[48px] shadow-2xl overflow-hidden flex flex-col relative z-10">
        
        {/* Soft, Minimalist Header Panel */}
        <div className="w-full bg-[#fcf8f2] py-4 px-6 sm:px-10 border-b border-[#ebdccb] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#b26a72] animate-pulse" />
            <h1 className="font-display font-extrabold text-xl text-[#5a4231] tracking-tight">Cozy Seasonal Beverage Console</h1>
          </div>
          
          <button
            onClick={() => setMuted(!muted)}
            className="p-2.5 rounded-full bg-white hover:bg-[#faf6f0] border border-[#ebdccb] text-[#b26a72] active:scale-95 transition-all cursor-pointer shadow-sm"
            title={muted ? "Unmute Sound" : "Mute Sound"}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Master Studio Grid split exactly in two halves */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* THE LEFT HALF (The Preparation Studio & Atmosphere View) */}
          <div className="md:col-span-6 bg-[#f0f9ff] border-r-0 md:border-r border-[#ebdccb] flex flex-col justify-between overflow-hidden relative">
            
            {/* Top Section: The Cozy Weather Window */}
            <div className="p-6 relative cozy-wallpaper border-b border-[#ebdccb] flex-1 flex flex-col justify-between min-h-[250px]">
              
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-white/90 text-stone-700 px-3 py-1 rounded-full border border-stone-200">
                  {selectedSeason} Atmosphere
                </span>
                <span className="text-xs text-stone-500 font-bold bg-white/70 px-2 py-0.5 rounded">Bedroom Window View</span>
              </div>

              {/* The Window Box and flanking plants */}
              <div className="relative my-4 flex items-end justify-center">
                
                {/* Left Digital Potted Plant */}
                <div className="absolute left-2 bottom-0 z-20 flex flex-col items-center pointer-events-none animate-sway">
                  {/* Leaves */}
                  <div className="relative w-10 h-10 flex items-end justify-center">
                    <div className="absolute bottom-1.5 -left-2.5 w-5 h-7 bg-emerald-800 rounded-tr-full rounded-bl-full rotate-[15deg] shadow-xs" />
                    <div className="absolute bottom-2.5 -right-1.5 w-5 h-6 bg-emerald-700 rounded-tl-full rounded-br-full -rotate-[25deg] shadow-xs" />
                    <div className="absolute bottom-5 left-1 w-5.5 h-6 bg-[#34d399] rounded-t-full rotate-[5deg] shadow-xs" />
                    <div className="absolute bottom-1.5 left-0 w-3 h-5 bg-emerald-600 rounded-tr-full rounded-bl-full -rotate-[45deg] opacity-90" />
                  </div>
                  {/* Pot */}
                  <div className="w-8 h-7 bg-[#b07d62] border-t-2 border-[#7f5539] rounded-b-lg shadow-md flex flex-col items-center justify-between overflow-hidden">
                    <div className="w-full h-1 bg-[#8c5e3d]" />
                    <span className="text-[6px] text-amber-100 font-mono scale-90 mb-0.5 opacity-80">✿</span>
                  </div>
                </div>

                {/* The Window Box Framing Curtains */}
                <div className="relative h-32 w-full max-w-[260px] rounded-3xl border-4 border-[#8c5e3d] overflow-hidden shadow-inner flex items-center justify-center bg-gradient-to-b from-sky-200 to-sky-100">
                  
                  {/* Dynamic weather sky graphic background */}
                  {selectedSeason === "SUMMER" && (
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-amber-100 flex items-center justify-center overflow-hidden">
                      <Sun className="w-16 h-16 text-yellow-300 animate-spin absolute -right-2 -top-2" style={{ animationDuration: '24s' }} />
                      <div className="absolute left-6 top-8 w-16 h-8 bg-white/70 rounded-full blur-[4px]" />
                      <div className="absolute right-12 top-12 w-20 h-10 bg-white/80 rounded-full blur-[6px]" />
                    </div>
                  )}

                  {selectedSeason === "WINTER" && (
                    <div className="absolute inset-0 bg-gradient-to-b from-teal-900 to-stone-800 flex items-center justify-center overflow-hidden">
                      {/* Floating snow stars */}
                      <div className="absolute inset-0 opacity-40">
                        <div className="absolute left-4 top-2 text-white animate-bounce text-sm">❄</div>
                        <div className="absolute right-6 top-8 text-white animate-pulse text-lg">❄</div>
                        <div className="absolute left-1/3 top-12 text-white text-xs">❄</div>
                        <div className="absolute right-1/3 top-3 text-white text-md">❄</div>
                      </div>
                      <span className="text-xs text-teal-100/40 tracking-widest font-mono">CHILLY FEELS</span>
                    </div>
                  )}

                  {selectedSeason === "RAINY" && (
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-600 to-blue-900 flex items-center justify-center overflow-hidden">
                      {/* Falling raindrops */}
                      <div className="absolute inset-0 flex justify-around opacity-40">
                        <div className="w-0.5 h-full bg-blue-300 animate-pulse" />
                        <div className="w-0.5 h-full bg-blue-200" />
                        <div className="w-0.5 h-full bg-blue-400 animate-bounce" />
                      </div>
                      <CloudRain className="w-10 h-10 text-blue-200/50 animate-bounce" />
                    </div>
                  )}

                  {selectedSeason === "AUTUMN" && (
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-800 to-orange-900 flex items-center justify-center overflow-hidden">
                      {/* Floating autumn leaves */}
                      <div className="absolute inset-0 opacity-50 flex justify-around pointer-events-none">
                        <Leaf className="w-6 h-6 text-orange-400 animate-bounce" />
                        <Leaf className="w-4 h-4 text-amber-500 animate-pulse" />
                        <Leaf className="w-5 h-5 text-red-500" />
                      </div>
                      <span className="text-xs text-orange-200/40 tracking-widest font-mono font-bold">FALL HARVEST</span>
                    </div>
                  )}

                  {/* Curtain Rod */}
                  <div className="absolute top-0 left-1 right-1 h-2 bg-[#b58a63] border-b border-[#8c5e3d] z-20 rounded-full shadow-sm" />

                  {/* Draped Curtains Left & Right in dusty rose */}
                  <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#b3868c] via-[#946b70] to-[#734e52] border-r-2 border-[#5c3c40] shadow-xl z-10 flex flex-col justify-around py-4 pl-1">
                    {/* Fold lines inside fabric */}
                    <div className="w-[1px] h-full bg-white/10 absolute top-0 left-3" />
                    <div className="w-[1px] h-full bg-black/15 absolute top-0 left-6" />
                    {/* Little tie-back sash */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 bg-[#e0b0b5] border-y border-[#b3868c] shadow-xs" />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#b3868c] via-[#946b70] to-[#734e52] border-l-2 border-[#5c3c40] shadow-xl z-10 flex flex-col justify-around py-4 pr-1">
                    {/* Fold lines inside fabric */}
                    <div className="w-[1px] h-full bg-white/10 absolute top-0 right-3" />
                    <div className="w-[1px] h-full bg-black/15 absolute top-0 right-6" />
                    {/* Little tie-back sash */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 bg-[#e0b0b5] border-y border-[#b3868c] shadow-xs" />
                  </div>
                </div>

                {/* Right Digital Potted Plant */}
                <div className="absolute right-2 bottom-0 z-20 flex flex-col items-center pointer-events-none animate-sway" style={{ animationDelay: '1s' }}>
                  {/* Leaves */}
                  <div className="relative w-10 h-10 flex items-end justify-center">
                    <div className="absolute bottom-1.5 -left-1.5 w-4.5 h-6.5 bg-[#1b4332] rounded-tr-full rounded-bl-full -rotate-[15deg] shadow-xs" />
                    <div className="absolute bottom-3.5 -right-2.5 w-5 h-6.5 bg-emerald-800 rounded-tl-full rounded-br-full rotate-[35deg] shadow-xs" />
                    <div className="absolute bottom-5 -left-1 w-5 h-5.5 bg-[#4ade80] rounded-t-full -rotate-[10deg] shadow-xs" />
                    <div className="absolute bottom-2 right-0 w-3 h-4 bg-[#22c55e] rounded-tl-full rounded-br-full rotate-[45deg] opacity-90" />
                  </div>
                  {/* Pot */}
                  <div className="w-8 h-7 bg-[#cb997e] border-t-2 border-[#b07d62] rounded-b-lg shadow-md flex flex-col items-center justify-between overflow-hidden">
                    <div className="w-full h-1 bg-[#b07d62]" />
                    <span className="text-[6px] text-green-100 font-mono scale-90 mb-0.5 opacity-80">♣</span>
                  </div>
                </div>

              </div>

              {/* Wooden horizontal baseline desk */}
              <div className="relative h-10 w-full bg-gradient-to-b from-[#65432a] via-[#523520] to-[#3a2516] border-t-2 border-[#825b3e] shadow-xl rounded-b-lg flex items-center justify-between px-6 z-20">
                {/* Cozy brass drawer knobs as a visual bedroom desk touch */}
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="w-16 h-1 bg-black/25 rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-sm animate-pulse" style={{ animationDuration: '4s' }} />
              </div>

            </div>

            {/* Bottom Section: Glassware Studio & Light Blue Canvas */}
            <div className="bg-[#e0f2fe] p-6 sm:p-8 flex-1 flex flex-col justify-between items-center min-h-[320px] relative">
              
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-white/80 text-sky-700 px-3 py-1 rounded-full shadow-xs">
                Glassware Studio
              </span>

              {/* Core Transparent Glass with Nozzle overhead */}
              <div className="relative my-6 flex flex-col items-center justify-center">
                
                {/* Steaming air waves (Renders only when liquid is filled) */}
                {pourProgress > 0 && (
                  <div className="absolute top-[-35px] flex space-x-2.5 pointer-events-none z-20">
                    <span className="w-2 h-7 bg-white/60 rounded-full blur-[2px] animate-steam" />
                    <span className="w-2.5 h-9 bg-[#ebdccb]/50 rounded-full blur-[2.5px] animate-steam" style={{ animationDelay: "0.4s" }} />
                    <span className="w-1.5 h-6 bg-white/40 rounded-full blur-[1.5px] animate-steam" style={{ animationDelay: "0.8s" }} />
                  </div>
                )}

                {/* THE RED INVERTED TRIANGLE DISPENSER NOZZLE */}
                <div className="absolute top-[-48px] z-20 flex flex-col items-center">
                  <div className="w-12 h-6 bg-[#b22d2d] border-b-2 border-[#801e1e] rounded-t-sm shadow-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-stone-300 rounded-full animate-pulse" />
                  </div>
                  {/* Pointy tip */}
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-[#801e1e]" />
                  
                  {/* continuous pouring nozzle stream (only during lever or tap click drop) */}
                  {isLeverActive && pourProgress < 100 && (
                    <div 
                      className="w-2 absolute top-[20px] left-1/2 -ml-1 animate-pour z-10 rounded-full"
                      style={{
                        height: "180px",
                        backgroundColor: getActiveLiquidColor(),
                        boxShadow: `0 0 10px ${getActiveLiquidColor()}`
                      }}
                    />
                  )}
                </div>

                {/* Dynamic Dropping Item animation overlays */}
                {droppingItem && (
                  <div className="absolute top-[-20px] z-30 animate-drop-item flex flex-col items-center">
                    <div 
                      className="p-2 rounded-full border shadow-md flex items-center justify-center text-white"
                      style={{ backgroundColor: droppingItem.color, borderColor: `${droppingItem.color}88` }}
                    >
                      {renderDynamicIcon(droppingItem.icon)}
                    </div>
                    <span className="text-[10px] bg-white font-mono border border-stone-200 px-1.5 py-0.5 rounded mt-1 shadow-xs">
                      {droppingItem.label}
                    </span>
                  </div>
                )}

                {/* High-Contrast Tapered Glass Cup */}
                <div className="relative p-6 bg-white/30 rounded-3xl border border-white/60 shadow-[0_12px_32px_rgba(74,53,37,0.06)] flex justify-center items-center mt-6">
                  
                  {/* Decorative Straw / Lemon Wheel poked/hung on glass rim if drink is done */}
                  {pourProgress === 100 && selectedRecipe && (
                    <div className="absolute -top-12 left-12 w-3 h-28 bg-gradient-to-b from-rose-400 via-rose-300 to-rose-200 rounded-full -rotate-[15deg] border-x-2 border-white shadow-md z-10 flex flex-col justify-around overflow-hidden pointer-events-none">
                      <div className="h-1 bg-red-400 rotate-12 opacity-80" />
                      <div className="h-1 bg-red-400 rotate-12 opacity-80" />
                      <div className="h-1 bg-red-400 rotate-12 opacity-80" />
                      <div className="h-1 bg-red-400 rotate-12 opacity-80" />
                      <div className="h-1 bg-red-400 rotate-12 opacity-80" />
                    </div>
                  )}

                  {pourProgress === 100 && selectedRecipe && (selectedRecipe.includes("Lemon") || selectedRecipe.includes("Tea") || selectedRecipe.includes("Juice")) && (
                    <div className="absolute -top-4 right-10 w-10 h-10 bg-yellow-400 border-2 border-yellow-500 rounded-full flex items-center justify-center rotate-12 shadow-md z-25 pointer-events-none">
                      <div className="w-8 h-8 bg-yellow-300 rounded-full border border-dashed border-yellow-500 relative flex items-center justify-center">
                        <div className="absolute w-full h-0.5 bg-yellow-100" />
                        <div className="absolute h-full w-0.5 bg-yellow-100" />
                      </div>
                      <div className="absolute bottom-0 left-1/2 -ml-1 w-2 h-4 bg-sky-200/50" />
                    </div>
                  )}

                  {/* 100% visible tapered transparent body frame */}
                  <div className="w-36 h-52 border-x-[5px] border-b-[5px] border-white/90 rounded-b-[28px] relative overflow-hidden flex items-end bg-white/10 shadow-lg">
                    
                    {/* The dynamic fluid block inside glass */}
                    <div 
                      className="w-full transition-all duration-300 ease-out relative animate-wave"
                      style={{ 
                        height: `${pourProgress}%`, 
                        ...getLiquidGradient(selectedRecipe),
                        boxShadow: `inset 0 10px 20px -3px rgba(255, 255, 255, 0.4), 0 0 16px ${getActiveLiquidColor()}40`
                      }}
                    >
                      {/* Gentle wavy highlight rim */}
                      {pourProgress > 0 && (
                        <div className="absolute top-0 left-0 right-0 h-3 bg-white/40 blur-[0.5px] flex justify-around">
                          <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <span className="w-1.5 h-1.5 bg-white/90 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                          <span className="w-2 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
                        </div>
                      )}

                      {/* Dynamic Real Topping Overlays inside the liquid */}
                      {pourProgress > 0 && (
                        <>
                          {/* Ice Cubes */}
                          {(hasAdded("ice") || hasAdded("chilled") || hasAdded("frosty") || hasAdded("shards")) && (
                            <div className="absolute top-1 left-2 right-2 bottom-2 pointer-events-none flex justify-around items-center opacity-70">
                              <div className="w-7 h-7 bg-white/30 border border-white/60 rounded-sm rotate-[15deg] shadow-inner flex items-center justify-center text-[10px] text-white/50 font-bold font-mono">❄</div>
                              <div className="w-6 h-6 bg-white/20 border border-white/50 rounded-sm -rotate-[25deg] shadow-inner flex items-center justify-center text-[8px] text-white/40 font-bold font-mono" style={{ animationDelay: '1.2s' }}>❄</div>
                            </div>
                          )}

                          {/* Mint Leaves */}
                          {hasAdded("mint") && (
                            <div className="absolute top-1 left-4 right-4 pointer-events-none flex justify-between">
                              <div className="w-5 h-3 bg-emerald-600 rounded-tr-full rounded-bl-full rotate-[12deg] shadow-sm border border-emerald-500/25" />
                              <div className="w-4 h-2.5 bg-emerald-700 rounded-tl-full rounded-br-full -rotate-[18deg] shadow-sm border border-emerald-500/25" />
                            </div>
                          )}

                          {/* Marshmallows */}
                          {hasAdded("marshmallow") && (
                            <div className="absolute top-1 left-2 right-2 pointer-events-none flex justify-center space-x-1.5 z-10">
                              <div className="w-5 h-5 bg-stone-50 border border-stone-200 rounded-full shadow-xs flex items-center justify-center rotate-6">
                                <span className="w-3.5 h-1.5 bg-stone-100 rounded-full" />
                              </div>
                              <div className="w-6 h-5 bg-stone-50 border border-stone-200 rounded-full shadow-xs flex items-center justify-center -rotate-12">
                                <span className="w-4 h-2 bg-stone-100 rounded-full" />
                              </div>
                            </div>
                          )}

                          {/* Whipped Cream */}
                          {(hasAdded("whip") || hasAdded("whipped cream")) && (
                            <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none flex justify-center z-15">
                              <div className="w-full h-8 bg-white/95 rounded-t-[14px] shadow-xs flex items-center justify-center relative overflow-hidden border-b border-rose-100">
                                {/* Colorful sprinkles! */}
                                <div className="absolute inset-0 opacity-80 pointer-events-none">
                                  <div className="absolute top-1 left-4 w-1.5 h-0.5 bg-pink-400 rounded-full rotate-45" />
                                  <div className="absolute top-2 left-10 w-1.5 h-0.5 bg-sky-400 rounded-full -rotate-12" />
                                  <div className="absolute top-1.5 right-6 w-1.5 h-0.5 bg-yellow-400 rounded-full rotate-12" />
                                  <div className="absolute top-3 right-12 w-1.5 h-0.5 bg-green-400 rounded-full rotate-90" />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Strawberries */}
                          {(hasAdded("strawberry") || hasAdded("strawberries")) && (
                            <div className="absolute top-2 left-6 right-6 pointer-events-none flex justify-around">
                              <div className="w-5 h-5 bg-red-500 rounded-full relative flex items-center justify-center rotate-[35deg] shadow-sm">
                                <div className="w-1.5 h-1 bg-emerald-600 rounded-t-full absolute -top-0.5" />
                                <div className="w-0.5 h-0.5 bg-white rounded-full absolute left-1 top-2" />
                                <div className="w-0.5 h-0.5 bg-white rounded-full absolute right-1 top-2" />
                              </div>
                            </div>
                          )}

                          {/* Peach Wedges */}
                          {hasAdded("peach") && (
                            <div className="absolute top-2 left-4 right-4 pointer-events-none flex justify-around">
                              <div className="w-6 h-3 bg-orange-400 border border-orange-500 rounded-t-full rounded-b-md rotate-[15deg] shadow-xs" />
                            </div>
                          )}

                          {/* Orange wedges */}
                          {hasAdded("orange") && (
                            <div className="absolute top-2 left-6 right-6 pointer-events-none flex justify-around">
                              <div className="w-5 h-5 bg-amber-400 border border-amber-500 rounded-full relative flex items-center justify-center rotate-45 shadow-sm">
                                <div className="w-full h-0.5 bg-amber-200 absolute" />
                                <div className="h-full w-0.5 bg-amber-200 absolute" />
                              </div>
                            </div>
                          )}

                          {/* Cinnamon stick */}
                          {hasAdded("cinnamon stick") && (
                            <div className="absolute -top-4 left-10 w-2 h-14 bg-[#5c3317] border border-[#3b2314] rounded-sm rotate-[25deg] shadow-sm z-10 pointer-events-none" />
                          )}

                          {/* Chocolate chips / nibs */}
                          {(hasAdded("chocolate chips") || hasAdded("nibs")) && (
                            <div className="absolute top-1 left-3 right-3 pointer-events-none flex justify-around">
                              <div className="w-1.5 h-1.5 bg-[#27160c] rounded-full" />
                              <div className="w-2 h-2 bg-[#27160c] rounded-full" />
                              <div className="w-1.5 h-1.5 bg-[#27160c] rounded-full" />
                            </div>
                          )}
                        </>
                      )}

                    </div>

                    {/* Left vertical glass highlight shine */}
                    <div className="absolute top-3 left-3 bottom-3 w-2 bg-white/35 rounded-full pointer-events-none blur-[0.5px]" />
                    <div className="absolute top-3 right-3 bottom-3 w-1 bg-white/20 rounded-full pointer-events-none" />
                  </div>
                </div>

                {/* Handheld-style rounded support tablet */}
                <div className="w-52 h-4 bg-gradient-to-r from-[#9a3412] to-[#7c2d12] rounded-full shadow-lg mt-4 border-b border-stone-800" />
              </div>

              {/* Fluid level indicator tag */}
              <span className="text-xs text-sky-900 font-mono font-bold bg-[#bae6fd] border border-sky-200 px-3 py-1 rounded-full">
                Glass Status: {pourProgress}% Filled
              </span>

            </div>

          </div>

          {/* THE RIGHT HALF (The Interactive Console Room) */}
          <div className="md:col-span-6 bg-[#fffbf7] p-6 sm:p-8 flex flex-col justify-between">
            
            {/* Top Section: The Weather Spinner Wheel */}
            <div className="mb-6">
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-[#b26a72] uppercase tracking-wider">
                  Atmosphere selector dial
                </span>
                
                {/* Pointer Help Tip */}
                <div className="flex items-center space-x-1 text-stone-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">Click seasons to set climate</span>
                </div>
              </div>

              {/* The Spinning Bezel Container */}
              <div className="flex flex-col sm:flex-row items-center justify-around bg-[#faf6f0] p-4 rounded-[32px] border border-[#ebdccb] space-y-4 sm:space-y-0 relative">
                
                {/* Large visual Wheel */}
                <div className={`relative flex items-center justify-center ${selectedRecipe ? "pointer-events-none opacity-40" : ""}`}>
                  
                  {/* Outer Bezel housing */}
                  <div className="absolute w-36 h-36 bg-white rounded-full border-2 border-[#ebdccb] shadow-md pointer-events-none" />

                  {/* Rotating Inner Wheel */}
                  <div 
                    onClick={spinClimateWheel}
                    className="w-32 h-32 rounded-full border-4 border-[#b26a72] relative overflow-hidden transition-transform duration-1000 ease-out shadow-inner cursor-pointer active:scale-95 bg-white"
                    style={{ transform: `rotate(-${getClimateRotation()}deg)` }}
                  >
                    {/* Dotted sector separators */}
                    <div className="absolute inset-0 border-r border-dashed border-[#b26a72]/15" />
                    <div className="absolute inset-0 border-b border-dashed border-[#b26a72]/15" />

                    {/* SUMMER segment (0 degrees relative) */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <Sun className="w-5 h-5 text-amber-500 animate-pulse" />
                      <span className="text-[9px] font-mono font-bold text-[#b26a72] mt-0.5">SUMMER</span>
                    </div>

                    {/* WINTER segment (90 degrees clockwise) */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ transform: "rotate(90deg)" }}>
                      <Snowflake className="w-5 h-5 text-sky-400" />
                      <span className="text-[9px] font-mono font-bold text-[#b26a72] mt-0.5">WINTER</span>
                    </div>

                    {/* RAINY segment (180 degrees) */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ transform: "rotate(180deg)" }}>
                      <CloudRain className="w-5 h-5 text-indigo-400" />
                      <span className="text-[9px] font-mono font-bold text-[#b26a72] mt-0.5">RAINY</span>
                    </div>

                    {/* AUTUMN segment (270 degrees) */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ transform: "rotate(270deg)" }}>
                      <Leaf className="w-5 h-5 text-orange-500" />
                      <span className="text-[9px] font-mono font-bold text-[#b26a72] mt-0.5">AUTUMN</span>
                    </div>
                  </div>

                  {/* Red Pointer Arrow centered pointing inwards */}
                  <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-red-600 shadow" />
                  </div>
                </div>

                {/* Selection pills */}
                <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                  {CLIMATES.map((season) => (
                    <button
                      key={season}
                      disabled={!!selectedRecipe}
                      onClick={() => handleClimateClick(season)}
                      className={`px-3 py-1.5 rounded-xl border text-[11px] font-display font-bold transition-all ${
                        selectedRecipe ? "pointer-events-none" : "cursor-pointer"
                      } ${
                        selectedSeason === season
                          ? "bg-[#b26a72] text-white border-[#b26a72] shadow-sm scale-105"
                          : "bg-white text-stone-600 border-stone-200 hover:bg-[#faf6f0]"
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>

              </div>

            </div>

            {/* Bottom Section: Retro machine console board holding step interactions */}
            <div className="bg-[#a82424] rounded-[28px] p-4 sm:p-5 shadow-2xl border-4 border-[#821818] flex-1 flex flex-col justify-between">
              
              {/* Cozy cream-toned central wrapper inside the deep-red card */}
              <div className="bg-[#fefaf4] rounded-2xl p-4 sm:p-5 border border-[#ebdccb] flex-1 flex flex-col justify-between min-h-[300px]">
                
                {selectedRecipe ? (
                  // Active crafting view
                  <div className="flex-1 flex flex-col justify-between h-full animate-fade-in">
                    
                    {/* Header breadcrumbs */}
                    <div className="flex justify-between items-center border-b border-[#f3e9dc] pb-3 mb-3">
                      <div>
                        <h3 className="font-display font-black text-base text-[#5a4231] tracking-tight">{selectedRecipe}</h3>
                        <p className="text-[10px] text-[#b26a72] font-semibold">{selectedCategory} Category</p>
                      </div>
                      <button 
                        onClick={resetEntireGame}
                        className="text-[10px] text-stone-400 hover:text-red-600 font-bold underline cursor-pointer"
                      >
                        Reset Game
                      </button>
                    </div>

                    {/* Circular breadcrumbs indicators */}
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {recipeSteps.map((stepObj: any, idx: number) => {
                        const isCompleted = idx < currentStep;
                        const isActive = idx === currentStep;
                        return (
                          <div 
                            key={idx}
                            className={`w-6.5 h-6.5 rounded-full flex items-center justify-center border transition-all text-[9px] font-bold ${
                              isCompleted 
                                ? "bg-emerald-100 border-emerald-400 text-emerald-700" 
                                : isActive
                                  ? "bg-rose-100 border-red-500 text-red-600 animate-pulse scale-110"
                                  : "bg-stone-100 border-stone-200 text-stone-400"
                            }`}
                            title={stepObj.label}
                          >
                            {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                          </div>
                        );
                      })}
                    </div>

                    {/* The interactive components by type */}
                    {activeStep && (
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 items-center py-2">
                        
                        {/* LEFT ACTION BOX */}
                        <div className="md:col-span-7 flex flex-col justify-center h-full space-y-3">
                          {activeStep.type === "Tap" && (
                            <div className="text-center space-y-3 w-full">
                              
                              <span className="inline-block text-xs font-mono bg-amber-50 text-[#8d5a5e] border border-[#ebdccb]/70 px-4 py-1 rounded-full font-semibold">
                                {activeStep.label}
                              </span>

                              {/* Center Tap Circular Button */}
                              <div className="flex justify-center">
                                <button
                                  onClick={handleTapAction}
                                  className={`w-24 h-24 rounded-full bg-white border-4 border-[#ebdccb] shadow-md hover:shadow-lg hover:border-[#b26a72] text-[#b26a72] flex flex-col items-center justify-center transition-all cursor-pointer ${
                                    isWiggling ? "animate-wiggle" : "hover:scale-102"
                                  }`}
                                >
                                  <div className="p-2.5 rounded-full bg-[#fdfbf7]">
                                    {renderDynamicIcon(activeStep.icon)}
                                  </div>
                                </button>
                              </div>

                              <span className="block text-[10px] text-stone-400 font-mono tracking-tight font-medium">
                                Tap core button to drop ingredient
                              </span>

                            </div>
                          )}

                          {activeStep.type === "Knob" && (
                            <div className="text-center space-y-3 w-full">
                              
                              <span className="inline-block text-xs font-mono bg-amber-50 text-[#8d5a5e] border border-[#ebdccb]/70 px-4 py-1 rounded-full font-semibold">
                                {activeStep.label}
                              </span>

                              {/* Rotary mechanical 3D Knob */}
                              <div className="flex flex-col items-center justify-center space-y-2">
                                
                                <div 
                                  onClick={rotateKnob}
                                  className="w-20 h-20 rounded-full bg-stone-100 shadow-[inset_0_4px_6px_rgba(0,0,0,0.08),0_10px_15px_-3px_rgba(0,0,0,0.1)] border-4 border-stone-200 relative cursor-pointer active:scale-95 transition-transform"
                                  style={{ transform: `rotate(${knobRotationIndex * 90}deg)` }}
                                >
                                  {/* Pointer Line */}
                                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-[#b26a72] rounded-full" />
                                  {/* Inner bezel outline */}
                                  <div className="absolute inset-2.5 rounded-full border border-stone-200/50 pointer-events-none" />
                                </div>

                                {/* Dial mark list */}
                                <div className="flex items-center space-x-1 text-[9px] font-mono text-stone-400 font-bold">
                                  {activeStep.options ? (
                                    activeStep.options.map((opt: string, i: number) => (
                                      <React.Fragment key={opt}>
                                        {i > 0 && <span>•</span>}
                                        <span className={knobRotationIndex === i ? "text-[#b26a72] underline font-extrabold" : ""}>
                                          {opt}
                                        </span>
                                      </React.Fragment>
                                    ))
                                  ) : (
                                    <>
                                      <span className={knobRotationIndex === 0 ? "text-[#b26a72] underline font-extrabold" : ""}>Soft</span>
                                      <span>•</span>
                                      <span className={knobRotationIndex === 1 ? "text-[#b26a72] underline font-extrabold" : ""}>Mid</span>
                                      <span>•</span>
                                      <span className={knobRotationIndex === 2 ? "text-[#b26a72] underline font-extrabold" : ""}>Heated</span>
                                      <span>•</span>
                                      <span className={knobRotationIndex === 3 ? "text-[#b26a72] underline font-extrabold" : ""}>Max</span>
                                    </>
                                  )}
                                </div>

                              </div>

                              <button
                                onClick={confirmKnobAction}
                                className="px-5 py-1.5 bg-[#b26a72] hover:bg-[#94585f] text-white font-display text-[10px] font-bold rounded-full transition-colors cursor-pointer shadow-sm active:scale-95"
                              >
                                Confirm dial setting
                              </button>

                            </div>
                          )}

                          {activeStep.type === "Whisk" && (
                            <div className="text-center space-y-3 w-full">
                              
                              <span className="inline-block text-xs font-mono bg-amber-50 text-[#8d5a5e] border border-[#ebdccb]/70 px-4 py-1 rounded-full font-semibold">
                                {activeStep.label}
                              </span>

                              {/* Interactive Stirring / Whisking bowl and gauge */}
                              <div className="flex flex-col items-center justify-center space-y-3">
                                
                                {/* Whisk visual track area */}
                                <div className="relative w-48 h-12 bg-stone-100 border-2 border-stone-200 rounded-full shadow-inner flex items-center justify-between px-2 overflow-hidden">
                                  
                                  {/* Progress fluid splash in background */}
                                  <div 
                                    className="absolute left-0 top-0 bottom-0 bg-emerald-100/60 transition-all duration-300 rounded-l-full"
                                    style={{ width: `${(whiskCount / 6) * 100}%` }}
                                  />

                                  {/* Dynamic moving whisk icon */}
                                  <div 
                                    className="absolute transition-all duration-300 ease-out z-10"
                                    style={{ 
                                      left: `${15 + (whiskCount / 6) * 70}%`,
                                      transform: `translateX(-50%) rotate(${lastWhiskSide === "left" ? "-15deg" : "15deg"})` 
                                    }}
                                  >
                                    <div className="p-2 bg-emerald-600 rounded-full text-white shadow-md animate-bounce">
                                      <RotateCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                                    </div>
                                  </div>

                                  <span className="text-[10px] text-stone-300 font-mono select-none pl-3 z-0">Stir Left</span>
                                  <span className="text-[10px] text-stone-300 font-mono select-none pr-3 z-0">Stir Right</span>
                                </div>

                                {/* Alternate Whisking Clicks */}
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => handleWhiskAction("left")}
                                    className={`px-4 py-2 bg-white hover:bg-stone-50 text-[#5a4231] font-display text-[10px] font-extrabold rounded-xl border-2 border-[#ebdccb] shadow-sm transition-all active:scale-95 cursor-pointer ${
                                      lastWhiskSide === "left" ? "opacity-30 cursor-not-allowed" : "hover:border-[#b26a72]"
                                    }`}
                                  >
                                    ◀ STIR LEFT
                                  </button>

                                  {/* Ticks count lights */}
                                  <div className="flex space-x-1">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                      <div 
                                        key={i} 
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                          i < whiskCount 
                                            ? "bg-emerald-500 shadow-md scale-110" 
                                            : "bg-stone-200"
                                        }`} 
                                      />
                                    ))}
                                  </div>

                                  <button
                                    onClick={() => handleWhiskAction("right")}
                                    className={`px-4 py-2 bg-white hover:bg-stone-50 text-[#5a4231] font-display text-[10px] font-extrabold rounded-xl border-2 border-[#ebdccb] shadow-sm transition-all active:scale-95 cursor-pointer ${
                                      lastWhiskSide === "right" ? "opacity-30 cursor-not-allowed" : "hover:border-[#b26a72]"
                                    }`}
                                  >
                                    STIR RIGHT ▶
                                  </button>
                                </div>

                                <span className="block text-[9px] text-[#b26a72] font-mono tracking-tight font-extrabold animate-pulse">
                                  Stir Left and Right alternately to mix ({whiskCount}/6 steps)
                                </span>

                              </div>

                            </div>
                          )}

                          {activeStep.type === "Pour" && (
                            <div className="text-center space-y-3 w-full">
                              
                              <span className="inline-block text-xs font-mono bg-amber-50 text-[#8d5a5e] border border-[#ebdccb]/70 px-4 py-1 rounded-full font-semibold animate-pulse">
                                {activeStep.label}
                              </span>

                              {/* Continuous slider track slot */}
                              <div className="flex flex-col items-center space-y-2">
                                
                                <div 
                                  ref={trackRef}
                                  onClick={handleTrackClick}
                                  className="w-6 h-20 bg-stone-200 rounded-full border-2 border-stone-300 relative shadow-inner flex justify-center cursor-pointer overflow-hidden"
                                >
                                  {/* Fill glow tracing */}
                                  <div 
                                    className="absolute top-0 w-full bg-[#ebdccb]/60 rounded-t-full pointer-events-none"
                                    style={{ height: `${pourProgress}%` }}
                                  />

                                  {/* Rounded handle knob */}
                                  <div 
                                    onMouseDown={handlePourMouseDown}
                                    onTouchStart={handlePourTouchStart}
                                    className="w-8 h-8 rounded-full bg-[#b26a72] border-2 border-white shadow-md cursor-grab active:cursor-grabbing absolute left-1/2 -ml-4 transition-all"
                                    style={{ top: `calc(${pourProgress}% - 16px)` }}
                                  />
                                </div>

                                <div className="w-full max-w-[180px]">
                                  <button
                                    onMouseDown={() => { setIsPouring(true); setIsLeverActive(true); }}
                                    onMouseUp={() => { setIsPouring(false); setIsLeverActive(false); }}
                                    onTouchStart={() => { setIsPouring(true); setIsLeverActive(true); }}
                                    onTouchEnd={() => { setIsPouring(false); setIsLeverActive(false); }}
                                    className="w-full py-1.5 bg-[#b26a72] hover:bg-[#94585f] text-white font-display text-[10px] font-bold rounded-full transition-colors cursor-pointer select-none active:scale-95 shadow-xs flex items-center justify-center space-x-1"
                                  >
                                    <span>Hold to dispense</span>
                                  </button>
                                </div>

                              </div>

                            </div>
                          )}
                        </div>

                        {/* RIGHT REAL INGREDIENT IMAGE CARD */}
                        <div className="md:col-span-5 bg-white border border-[#ebdccb] rounded-2xl p-3 shadow-xs flex flex-col items-center justify-center space-y-2 h-full min-h-[160px] animate-fade-in">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-[#b26a72] uppercase bg-stone-50 px-2 py-0.5 rounded border border-stone-200/50">
                            Recipe Ingredient
                          </span>
                          
                          <div className="relative w-full h-28 rounded-xl overflow-hidden border border-stone-100 shadow-inner group">
                            <img 
                              src={getIngredientImageAndCaption(activeStep.label).url} 
                              alt={activeStep.label}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute bottom-1.5 left-2 text-[8px] font-mono text-white/90 font-bold bg-emerald-600 px-1.5 py-0.5 rounded-sm shadow-xs">
                              Organic Source
                            </span>
                          </div>

                          <div className="text-center w-full">
                            <span className="block text-[11px] font-display font-extrabold text-[#5a4231] leading-tight truncate">
                              {getIngredientImageAndCaption(activeStep.label).caption}
                            </span>
                            <span className="block text-[8px] text-stone-400 font-mono tracking-tight mt-0.5 font-medium truncate">
                              [{activeStep.label}]
                            </span>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                ) : (
                  // Phase 0: Beverage selection discovery list
                  <div className="flex-1 flex flex-col justify-between h-full animate-fade-in">
                    
                    <div>
                      <h4 className="font-display font-extrabold text-[#5a4231] text-sm mb-3">
                        Select seasonal drink to brew
                      </h4>

                      {/* Filter category groups of current season */}
                      <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
                        {Object.entries(SEASONAL_RECIPES[selectedSeason]).map(([catName, recipes]) => (
                          <div key={catName} className="space-y-1.5">
                            <span className="block text-[9px] font-mono font-bold tracking-wider text-[#b26a72] uppercase">
                              {catName} Selection
                            </span>

                            <div className="grid grid-cols-1 gap-2">
                              {Object.keys(recipes).map((recipeName) => (
                                <button
                                  key={recipeName}
                                  onClick={() => {
                                    playSound("click");
                                    setSelectedCategory(catName);
                                    setSelectedRecipe(recipeName);
                                    setCurrentStep(0);
                                    setPourProgress(0);
                                    setKnobRotationIndex(0);
                                  }}
                                  className="group p-2.5 rounded-xl bg-[#faf6f0] hover:bg-white border border-[#ebdccb] hover:border-[#b26a72] text-left flex items-center justify-between transition-all cursor-pointer shadow-xs"
                                >
                                  <div>
                                    <span className="block text-[11px] font-display font-bold text-[#5a4231] group-hover:text-[#b26a72] transition-colors">
                                      {recipeName}
                                    </span>
                                    <span className="block text-[9px] text-stone-400">
                                      {catName === "Milkshake" ? "Fresh Whip shake" : catName === "Iced Tea" ? "Botanical Brew" : "Simmered Nectar"}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-[#ebdccb] group-hover:text-[#b26a72] group-hover:translate-x-0.5 transition-all" />
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    <div className="pt-3 border-t border-[#f3e9dc] text-center">
                      <p className="text-[10px] text-stone-400 font-medium">
                        Change the climate dial above to load more comforting recipes!
                      </p>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CRAFTING COMPLETE CELEBRATION MODAL OVERLAY */}
      {pourProgress === 100 && selectedRecipe && !isModalHidden && (
        <div className="fixed inset-0 bg-[#4a3525]/30 flex items-center justify-center p-4 z-50 animate-fade-in">
          
          <div className="bg-[#fefaf4] rounded-[36px] max-w-sm w-full p-6 sm:p-8 border-4 border-[#ebdccb] shadow-2xl text-center relative overflow-hidden animate-scale-up">
            
            {/* Soft decorative visual glow */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none blur-3xl"
              style={{ backgroundColor: getActiveLiquidColor() }}
            />

            {/* Eye toggle button to peek at background */}
            <button
              onClick={() => setIsModalHidden(true)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-[#b26a72] transition-colors cursor-pointer"
              title="Peek at Drink behind card"
            >
              <EyeOff className="w-4 h-4" />
            </button>

            <div className="absolute top-4 left-4 text-pink-300 animate-spin" style={{ animationDuration: '8s' }}>★</div>

            {/* Real Finished Drink Image Polaroid Card */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border-2 border-[#ebdccb] shadow-inner mb-4 mt-2 group">
              <img 
                src={getFinishedDrinkImage(selectedRecipe).url} 
                alt={selectedRecipe}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <span className="absolute bottom-2 left-3 text-[9px] font-mono text-white bg-emerald-600 px-2 py-0.5 rounded-sm shadow-sm font-bold uppercase tracking-wider">
                Brew Complete
              </span>
            </div>

            {/* Name & comfort review string block */}
            <h2 className="font-display font-extrabold text-xl text-[#5a4231] tracking-tight mb-2">
              {selectedRecipe}
            </h2>
            <div className="w-12 h-1 bg-[#b26a72] rounded-full mx-auto mb-3" />

            <p className="text-xs text-[#8d5a5e] font-display font-medium bg-[#faf6f0] border border-[#ebdccb] p-3 rounded-2xl mb-5 shadow-xs leading-relaxed italic">
              "{COZY_REVIEWS[selectedRecipe] || 'Brewed to absolute cozy perfection. Delicious!'}"
            </p>

            <button
              onClick={resetEntireGame}
              className="w-full py-2.5 bg-[#b26a72] hover:bg-[#94585f] text-white font-display text-xs font-bold rounded-full shadow transition-all cursor-pointer hover:scale-102"
            >
              Craft another seasonal recipe
            </button>

          </div>
        </div>
      )}

      {/* FLOATING PEEK BUTTON IN COMPLETED STATE */}
      {pourProgress === 100 && isModalHidden && (
        <button
          onClick={() => setIsModalHidden(false)}
          className="fixed bottom-6 right-6 bg-[#b26a72] hover:bg-[#94585f] text-white font-display font-extrabold text-xs px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 z-50 transition-all scale-105 active:scale-95 animate-bounce cursor-pointer border-2 border-white"
        >
          <Eye className="w-4 h-4" />
          <span>Show Drink Card</span>
        </button>
      )}

    </div>
  );
}
