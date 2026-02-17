/**
 * Seed data: categories, crop types, and varieties from the Feroleto catalog spec.
 * Format: category name -> crop type -> { description, season, varieties[] }
 */
export const SEED_CATEGORIES = [
  { name: 'Vegetables', sort_order: 0 },
  { name: 'Herbs', sort_order: 1 },
  { name: 'Cut Flowers', sort_order: 2 },
] as const;

export interface SeedVariety {
  name: string;
  type_subtype: string;
  days_to_maturity: string;
  note: string;
}

export interface SeedCropType {
  name: string;
  category: string;
  season: string;
  description: string;
  varieties: SeedVariety[];
}

export const SEED_CROP_TYPES: SeedCropType[] = [
  {
    name: 'Slicing Tomatoes',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Full-size tomatoes for sandwiches, salads, and slicing. We grow a mix of reliable hybrids with disease resistance and heirloom-quality flavor.',
    varieties: [
      { name: 'Marbonne F1', type_subtype: 'Indeterminate slicer', days_to_maturity: '72 DTM', note: 'French heritage tomato with heirloom flavor and hybrid vigor.' },
      { name: 'Margold F1', type_subtype: 'Indeterminate slicer', days_to_maturity: '75 DTM', note: 'Heirloom appearance with good disease resistance.' },
      { name: 'Marnero F1', type_subtype: 'Indeterminate slicer', days_to_maturity: '72 DTM', note: 'Cherokee Purple analogue with much better disease resistance.' },
      { name: 'Big Beef Plus', type_subtype: 'Indeterminate beefsteak', days_to_maturity: '72 DTM', note: 'Classic big tomato — reliable, disease resistant, great flavor.' },
      { name: 'Mountain Merit F1', type_subtype: 'Determinate slicer', days_to_maturity: '66 DTM', note: 'Late blight resistant — insurance for wet summers.' },
    ],
  },
  {
    name: 'Cherry Tomatoes',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Sweet, snackable, and prolific. Cherry tomatoes are the first to ripen and the last to stop producing. Expect handfuls from July through frost.',
    varieties: [
      { name: 'Sakura F1', type_subtype: 'Indeterminate cherry', days_to_maturity: '55 DTM', note: 'Compact growth habit, great for tunnels and smaller spaces.' },
      { name: 'SunGold F1', type_subtype: 'Indeterminate cherry', days_to_maturity: '57 DTM', note: 'The gold standard — tropical sweetness, incredibly prolific.' },
      { name: 'Black Cherry', type_subtype: 'Indeterminate cherry', days_to_maturity: '64 DTM', note: 'Deep, complex heirloom flavor.' },
      { name: 'Pink Bumblebee', type_subtype: 'Indeterminate cherry', days_to_maturity: '70 DTM', note: 'Artisan series — beautiful striped fruits, crack resistant.' },
      { name: 'Sunrise Bumblebee', type_subtype: 'Indeterminate cherry', days_to_maturity: '70-75 DTM', note: 'Artisan series — golden with red streaks.' },
    ],
  },
  {
    name: 'Paste Tomatoes',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Meaty, low-moisture tomatoes built for cooking and canning. Grow a row and you\'ll have enough sauce for the winter.',
    varieties: [
      { name: 'Plum Regal F1', type_subtype: 'Determinate paste', days_to_maturity: '68-75 DTM', note: 'Late blight resistant — the most reliable paste tomato for our climate.' },
    ],
  },
  {
    name: 'Sweet Peppers',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Italian frying peppers, crunchy bells, and sweet snacking peppers. All love heat and produce heavily from midsummer through fall.',
    varieties: [
      { name: 'Carmen F1', type_subtype: 'Frying pepper (red)', days_to_maturity: '80 DTM', note: 'AAS winner — classic Italian frying type. Amazing roasted.' },
      { name: 'Escamillo F1', type_subtype: 'Frying pepper (yellow)', days_to_maturity: '80 DTM', note: 'AAS winner — pairs beautifully with Carmen.' },
      { name: 'Lunchbox Mix', type_subtype: 'Snacking pepper', days_to_maturity: '73-75 DTM', note: 'Mini sweet peppers in red, orange, yellow. High demand at farmstand.' },
      { name: 'Ace F1', type_subtype: 'Bell pepper', days_to_maturity: '70 DTM', note: 'Reliable even in cooler temps.' },
      { name: 'Flavorburst F1', type_subtype: 'Bell pepper', days_to_maturity: '87 DTM', note: 'Premium flavor — worth the wait.' },
    ],
  },
  {
    name: 'Hot Peppers',
    category: 'Vegetables',
    season: 'Summer',
    description: 'From mild shishitos to fiery cayenne. A few plants go a long way.',
    varieties: [
      { name: 'Shishito', type_subtype: 'Mild hot', days_to_maturity: '60 DTM', note: 'Blister in a hot pan with oil and salt — that\'s it.' },
      { name: 'Jalafuego F1', type_subtype: 'Jalapeño', days_to_maturity: '93 DTM', note: 'Large fruits with strong disease resistance.' },
      { name: 'Red Ember F1', type_subtype: 'Cayenne', days_to_maturity: '60 DTM', note: 'Early, versatile, great dried or fresh.' },
    ],
  },
  {
    name: 'Eggplant',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Glossy, heat-loving, and incredibly satisfying to grow. Give them a warm spot and they\'ll reward you all summer.',
    varieties: [
      { name: 'Orient Express F1', type_subtype: 'Asian type', days_to_maturity: '58 DTM', note: 'Early, long slender fruits. Great grilled or stir-fried.' },
      { name: 'Nigral F1', type_subtype: 'Italian globe', days_to_maturity: '65 DTM', note: 'Classic glossy purple — dense, creamy flesh.' },
    ],
  },
  {
    name: 'Cucumbers',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Slicers, snackers, and picklers. We select varieties with bacterial wilt resistance where possible — it\'s our biggest cucumber challenge.',
    varieties: [
      { name: 'Shintokiwa', type_subtype: 'Japanese burpless slicer', days_to_maturity: '60 DTM', note: 'Crisp, seedless, thin-skinned. Bacterial wilt resistant.' },
      { name: 'Marketmore 76', type_subtype: 'Classic slicer', days_to_maturity: '63 DTM', note: 'The industry standard — reliable and productive.' },
      { name: 'Qwerty', type_subtype: 'Mini cucumber', days_to_maturity: '50 DTM', note: 'Perfect for snacking and lunchboxes.' },
      { name: 'County Fair F1', type_subtype: 'Pickling cucumber', days_to_maturity: '52 DTM', note: 'Bacterial wilt resistant — essential for our region.' },
      { name: 'Perseus', type_subtype: 'Slicer', days_to_maturity: '50 DTM', note: 'High productivity with bacterial wilt resistance.' },
    ],
  },
  {
    name: 'Summer Squash',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Zucchini and friends. Fast-growing and prolific — you\'ll have more than you know what to do with by August.',
    varieties: [
      { name: 'Dunja F1', type_subtype: 'Zucchini', days_to_maturity: '47 DTM', note: 'Workhorse variety with powdery mildew resistance.' },
      { name: 'Zephyr F1', type_subtype: 'Bicolor summer squash', days_to_maturity: '54 DTM', note: 'Yellow top, green bottom — unique and beautiful.' },
      { name: 'Multipik F1', type_subtype: 'Yellow squash', days_to_maturity: '50 DTM', note: 'Early producer with powdery mildew resistance.' },
    ],
  },
  {
    name: 'Winter Squash',
    category: 'Vegetables',
    season: 'Fall',
    description: 'Planted in spring, harvested in fall, eaten all winter. These store for months in a cool spot.',
    varieties: [
      { name: 'Waltham Butternut', type_subtype: '', days_to_maturity: '85-110 DTM', note: 'The classic — stores up to 6 months.' },
      { name: 'Vegetable Spaghetti', type_subtype: '', days_to_maturity: '90-100 DTM', note: 'Fun alternative to pasta.' },
      { name: 'Delicata JS', type_subtype: '', days_to_maturity: '90-100 DTM', note: 'Edible skin, sweet flesh, powdery mildew resistant. A favorite.' },
    ],
  },
  {
    name: 'Pumpkins',
    category: 'Vegetables',
    season: 'Fall',
    description: 'Carving pumpkins for October. Planted in spring, harvested in September.',
    varieties: [
      { name: 'Howden', type_subtype: '', days_to_maturity: '110-115 DTM', note: 'The standard carving pumpkin.' },
      { name: 'Atlantic Giant', type_subtype: '', days_to_maturity: '110-130 DTM', note: 'For the competitive grower — these get enormous.' },
    ],
  },
  {
    name: 'Onions & Leeks',
    category: 'Vegetables',
    season: 'Spring — Fall',
    description: 'Started from seed in early spring, harvested in late summer. Storage onions will last you into the following year.',
    varieties: [
      { name: 'Patterson F1', type_subtype: 'Storage onion', days_to_maturity: '90 DTM', note: 'Long-day type — stores 10-12 months.' },
      { name: 'Redwing F1', type_subtype: 'Red storage onion', days_to_maturity: '100 DTM', note: 'Beautiful in salads and on the grill.' },
      { name: 'Ailsa Craig', type_subtype: 'Sweet onion', days_to_maturity: '90 DTM', note: 'Exhibition-size — short storage but incredible flavor.' },
      { name: 'Parade', type_subtype: 'Scallion/bunching onion', days_to_maturity: '65-70 DTM', note: 'Fresh green onions all season.' },
      { name: 'Bandit', type_subtype: 'Leek', days_to_maturity: '110 DTM', note: 'Cold hardy — can overwinter right in the ground.' },
    ],
  },
  {
    name: 'Broccoli & Cauliflower',
    category: 'Vegetables',
    season: 'Spring / Fall',
    description: 'Cool-season brassicas at their best in spring and fall. We grow them in both windows for maximum harvest.',
    varieties: [
      { name: 'Belstar F1', type_subtype: 'Broccoli', days_to_maturity: '65-68 DTM', note: 'Heat tolerant with great side shoots after the main head. Spring and fall crop.' },
      { name: 'Bishop F1', type_subtype: 'Cauliflower', days_to_maturity: '68 DTM', note: 'Best curd quality in cool weather. Spring and fall crop.' },
    ],
  },
  {
    name: 'Cabbage',
    category: 'Vegetables',
    season: 'Spring',
    description: 'Dense, sweet heads for slaws, stir-fries, and fermenting.',
    varieties: [
      { name: 'Farao F1', type_subtype: 'Standard cabbage', days_to_maturity: '65 DTM', note: 'Clean, tight heads for fresh market.' },
      { name: 'Caraflex F1', type_subtype: 'Pointed cabbage', days_to_maturity: '68-70 DTM', note: 'Sweeter than round cabbage, tight spacing, beautiful shape.' },
    ],
  },
  {
    name: 'Lettuce & Salad Greens',
    category: 'Vegetables',
    season: 'Spring / Summer / Fall',
    description: 'Succession-planted for continuous harvest. We grow spring and fall crops plus heat-tolerant varieties for summer salads.',
    varieties: [
      { name: 'Salanova Premier', type_subtype: 'Head lettuce', days_to_maturity: '55 DTM', note: 'One-cut harvest — spring crop.' },
      { name: 'Salanova Foundation', type_subtype: 'Head lettuce', days_to_maturity: '55 DTM', note: 'One-cut harvest — spring crop.' },
      { name: 'Coastal Star', type_subtype: 'Romaine', days_to_maturity: '50-57 DTM', note: 'Sturdy hearts, spring crop.' },
      { name: 'Muir F1', type_subtype: 'Summer lettuce', days_to_maturity: '50 DTM', note: 'Most heat tolerant — bridges the hot months.' },
      { name: 'Cherokee', type_subtype: 'Summer lettuce', days_to_maturity: '48 DTM', note: 'Heat tolerant red leaf.' },
      { name: 'Allstar Gourmet Mix', type_subtype: 'Baby lettuce mix', days_to_maturity: '30 DTM', note: 'Direct seeded, succession planted every 2 weeks.' },
    ],
  },
  {
    name: 'Kale & Chard',
    category: 'Vegetables',
    season: 'Spring — Fall',
    description: 'Hardy greens that improve with cold weather. Kale gets sweeter after frost, and chard produces colorful stems all season.',
    varieties: [
      { name: 'Winterbor F1', type_subtype: 'Curly kale', days_to_maturity: '60 DTM', note: 'Extremely cold hardy — stands through November.' },
      { name: 'Toscano (Dino)', type_subtype: 'Lacinato/dinosaur kale', days_to_maturity: '65 DTM', note: 'The classic Italian kale.' },
      { name: 'Bright Lights', type_subtype: 'Swiss chard', days_to_maturity: '60 DTM', note: 'Rainbow stems — as beautiful as it is productive.' },
    ],
  },
  {
    name: 'Arugula & Spinach',
    category: 'Vegetables',
    season: 'Spring / Fall',
    description: 'Fast-growing cool-season greens. Direct seeded and succession planted for steady harvests.',
    varieties: [
      { name: 'Astro', type_subtype: 'Arugula', days_to_maturity: '21-32 DTM', note: 'Peppery and fast. Direct seeded.' },
      { name: 'Space F1', type_subtype: 'Spinach', days_to_maturity: '40 DTM', note: 'Very cold hardy — one of the first things we plant.' },
    ],
  },
  {
    name: 'Carrots',
    category: 'Vegetables',
    season: 'Spring — Fall',
    description: 'Direct seeded and slow to germinate, but worth the wait. We grow a mix of classic orange, white, and gold.',
    varieties: [
      { name: 'Caravel F1', type_subtype: 'Early Nantes type', days_to_maturity: '58 DTM', note: 'Sweet, smooth, uniform.' },
      { name: 'White Satin F1', type_subtype: 'White carrot', days_to_maturity: '68 DTM', note: 'Mild, sweet — a conversation starter.' },
      { name: 'Gold Nugget F1', type_subtype: 'Gold/yellow carrot', days_to_maturity: '65-70 DTM', note: 'Beautiful color, great flavor.' },
    ],
  },
  {
    name: 'Radishes',
    category: 'Vegetables',
    season: 'Spring / Fall',
    description: 'The fastest crop from seed to table — ready in under a month. Perfect with butter and salt, or sliced into a spring salad.',
    varieties: [
      { name: 'French Breakfast', type_subtype: 'Elongated red-to-white', days_to_maturity: '25 DTM', note: 'Mild, crisp, elegant.' },
      { name: 'Crunchy King F1', type_subtype: 'Round red', days_to_maturity: '25 DTM', note: 'Bright, crunchy, classic.' },
    ],
  },
  {
    name: 'Turnips',
    category: 'Vegetables',
    season: 'Spring / Fall',
    description: 'Japanese salad turnips — nothing like the waxy things you\'re picturing. Sweet, crisp, and eaten raw or lightly sautéed.',
    varieties: [
      { name: 'Hakurei F1', type_subtype: 'Salad turnip', days_to_maturity: '38 DTM', note: 'Tender, sweet, completely unlike grocery store turnips.' },
    ],
  },
  {
    name: 'Beets',
    category: 'Vegetables',
    season: 'Spring / Fall',
    description: 'Roast them, pickle them, shave them raw. We grow red, gold, and candy-striped. The greens are just as good sautéed.',
    varieties: [
      { name: 'Red Ace F1', type_subtype: 'Classic red beet', days_to_maturity: '50 DTM', note: 'Reliable, sweet, deep color.' },
      { name: 'Touchstone Gold', type_subtype: 'Golden beet', days_to_maturity: '55 DTM', note: 'Won\'t stain your cutting board. Sweet and mild.' },
      { name: 'Chioggia Guardsmark', type_subtype: 'Candy-striped', days_to_maturity: '45-55 DTM', note: 'Red and white rings — stunning raw.' },
    ],
  },
  {
    name: 'Peas',
    category: 'Vegetables',
    season: 'Spring',
    description: 'One of the earliest crops of the year. Sweet, crunchy sugar snaps straight off the vine — nothing compares to these fresh.',
    varieties: [
      { name: 'Super Sugar Snap', type_subtype: 'Sugar snap pea', days_to_maturity: '60 DTM', note: 'Cool-season — planted in March, harvested in May.' },
    ],
  },
  {
    name: 'Beans',
    category: 'Vegetables',
    season: 'Summer',
    description: 'Bush beans planted after the soil warms up. Quick producers — we succession plant for harvests all summer.',
    varieties: [
      { name: 'Provider', type_subtype: 'Green bush bean', days_to_maturity: '50 DTM', note: 'Reliable workhorse — needs warm soil.' },
      { name: 'Dragon Tongue', type_subtype: 'Bush bean', days_to_maturity: '55-60 DTM', note: 'Cream with purple streaks — beautiful and delicious.' },
      { name: 'Maxibel', type_subtype: 'French filet bean', days_to_maturity: '55-65 DTM', note: 'Slender, tender, and elegant. Pick them small.' },
    ],
  },
  {
    name: 'Fennel',
    category: 'Vegetables',
    season: 'Fall',
    description: 'Crisp anise-flavored bulbs — beautiful braised, roasted, or shaved raw into salads.',
    varieties: [
      { name: 'Preludio F1', type_subtype: 'Bulb fennel', days_to_maturity: '80 DTM', note: 'Transplanted in July to prevent bolting — fall harvest.' },
    ],
  },
  {
    name: 'Celery',
    category: 'Vegetables',
    season: 'Summer — Fall',
    description: 'A long-season crop that rewards patience. Homegrown celery has more flavor than anything from the store.',
    varieties: [
      { name: 'Tango F1', type_subtype: 'Celery', days_to_maturity: '80-85 DTM', note: 'Long season — started early, harvested mid-August.' },
    ],
  },
  // Herbs
  {
    name: 'Basil',
    category: 'Herbs',
    season: 'Summer',
    description: 'The essential summer herb. We grow downy mildew resistant varieties so you get basil all season, not just until August.',
    varieties: [
      { name: 'Prospera DMR', type_subtype: '', days_to_maturity: '68 DTM', note: 'Downy mildew resistant — the most important trait for basil in our climate.' },
    ],
  },
  {
    name: 'Cilantro',
    category: 'Herbs',
    season: 'Spring / Fall',
    description: 'Fast-growing and bolt-prone in heat. We plant slow-bolt varieties and succession plant for steady harvests.',
    varieties: [
      { name: 'Calypso', type_subtype: '', days_to_maturity: '55-60 DTM', note: 'Slow bolt — the longest-lasting cilantro variety.' },
    ],
  },
  {
    name: 'Dill',
    category: 'Herbs',
    season: 'Spring — Summer',
    description: 'Essential for pickles, fish, and salads. Direct seeded and succession planted.',
    varieties: [
      { name: 'Hera', type_subtype: '', days_to_maturity: '40-50 DTM', note: 'Slow bolt — stays leafy longer before going to seed.' },
    ],
  },
  {
    name: 'Parsley',
    category: 'Herbs',
    season: 'Spring — Fall',
    description: 'Flat-leaf Italian parsley — a workhorse herb that produces all season once established.',
    varieties: [
      { name: 'Giant Italian', type_subtype: '', days_to_maturity: '70-75 DTM', note: 'Large, flavorful leaves. Slow to germinate but worth the wait.' },
    ],
  },
  // Cut Flowers
  {
    name: 'Snapdragons',
    category: 'Cut Flowers',
    season: 'Spring — Summer',
    description: 'Tall, elegant spikes in a range of colors. Cool-season flowers that thrive in spring — some of the first blooms of the year.',
    varieties: [
      { name: 'Potomac Mix', type_subtype: '', days_to_maturity: '90-110 DTM', note: 'Mixed colors, Group 2-3 timing.' },
      { name: 'Chantilly', type_subtype: '', days_to_maturity: '90-110 DTM', note: 'Earliest blooming — Group 1-2.' },
      { name: 'Madame Butterfly', type_subtype: '', days_to_maturity: '90-110 DTM', note: 'Double-flowered, butterfly-like open blooms. Group 3-4.' },
    ],
  },
  {
    name: 'Stock',
    category: 'Cut Flowers',
    season: 'Spring — Summer',
    description: 'Intensely fragrant spikes — one of the best-smelling flowers you can grow. A must for spring arrangements.',
    varieties: [
      { name: 'Iron Pastel Mix', type_subtype: '', days_to_maturity: '90-105 DTM', note: 'Soft pastel colors. Fragrant.' },
    ],
  },
  {
    name: 'Zinnias',
    category: 'Cut Flowers',
    season: 'Summer — Fall',
    description: 'The backbone of summer bouquets. Bold colors, long vase life, and they get more productive the more you cut them.',
    varieties: [
      { name: 'Oklahoma Series', type_subtype: '', days_to_maturity: '55-70 DTM', note: 'Large, vibrant blooms. Pinch at 8-12" for maximum stems.' },
      { name: 'Benary\'s Giant Mix', type_subtype: '', days_to_maturity: '60-75 DTM', note: 'Huge dahlia-type flowers. The standard for cut flower zinnias.' },
      { name: 'Queen Lime', type_subtype: '', days_to_maturity: '65-80 DTM', note: 'Unique lime-green to blush color. A standout.' },
    ],
  },
  {
    name: 'Cosmos',
    category: 'Cut Flowers',
    season: 'Summer — Fall',
    description: 'Airy, graceful, and effortless-looking. Cosmos fill out arrangements and add movement and lightness.',
    varieties: [
      { name: 'Sensation Mix', type_subtype: '', days_to_maturity: '70-85 DTM', note: 'Classic single blooms in pink, white, and crimson.' },
      { name: 'Double Click Mix', type_subtype: '', days_to_maturity: '75-90 DTM', note: 'Double and semi-double petals for more fullness.' },
      { name: 'Rubenza', type_subtype: '', days_to_maturity: '75-90 DTM', note: 'Deep red — rare color for cosmos.' },
    ],
  },
  {
    name: 'Sunflowers',
    category: 'Cut Flowers',
    season: 'Summer — Fall',
    description: 'Single-stem, pollenless cut flower sunflowers. We succession plant every 10 days for blooms all season. No mess on your table.',
    varieties: [
      { name: 'ProCut Orange', type_subtype: '', days_to_maturity: '50-60 DTM', note: 'Classic orange. Pollenless.' },
      { name: 'ProCut White', type_subtype: '', days_to_maturity: '50-60 DTM', note: 'Creamy white. Pollenless.' },
      { name: 'ProCut Plum', type_subtype: '', days_to_maturity: '50-60 DTM', note: 'Deep burgundy-plum. Pollenless.' },
      { name: 'ProCut Horizon', type_subtype: '', days_to_maturity: '50-60 DTM', note: 'Warm bicolor. Pollenless.' },
      { name: 'Sunrich Orange', type_subtype: '', days_to_maturity: '55-65 DTM', note: 'Single-stem, tall, classic.' },
    ],
  },
  {
    name: 'Celosia',
    category: 'Cut Flowers',
    season: 'Summer — Fall',
    description: 'Velvet-textured flowers in plumes and crests. Heat lovers that thrive in August when other flowers slow down. Dry beautifully too.',
    varieties: [
      { name: 'Chief Mix', type_subtype: 'Plume type', days_to_maturity: '70-90 DTM', note: 'Tall, feathery plumes. Pinch for multiple stems.' },
      { name: 'Celway Mix', type_subtype: 'Crested/cockscomb type', days_to_maturity: '75-95 DTM', note: 'Brain-like crests. Dries perfectly.' },
      { name: 'Sunday Mix', type_subtype: 'Crested type', days_to_maturity: '75-95 DTM', note: 'Dries well.' },
    ],
  },
  {
    name: 'Dahlias',
    category: 'Cut Flowers',
    season: 'Summer — Fall',
    description: 'The showstoppers. Grown from tubers planted in late May, blooming from August through hard frost. Every variety is different — from compact balls to massive dinner plates.',
    varieties: [
      { name: 'Totally Tangerine', type_subtype: 'Anemone type', days_to_maturity: '90-120 DTM', note: 'Bright tangerine orange, unique form.' },
      { name: 'Cornel Bronze', type_subtype: 'Ball type', days_to_maturity: '90-120 DTM', note: 'Warm bronze tones, tight ball form.' },
      { name: 'Ivanetti', type_subtype: 'Ball type', days_to_maturity: '90-120 DTM', note: 'Compact ball.' },
      { name: 'Jowey Linda', type_subtype: 'Ball type', days_to_maturity: '90-120 DTM', note: 'Peach/salmon ball.' },
      { name: 'Linda\'s Baby', type_subtype: 'Ball type', days_to_maturity: '90-120 DTM', note: 'Miniature ball — prolific producer.' },
      { name: 'Red Cap', type_subtype: 'Ball type', days_to_maturity: '90-120 DTM', note: 'Deep red ball.' },
      { name: 'Kelsey Sunshine', type_subtype: 'Collarette type', days_to_maturity: '90-120 DTM', note: 'Open center — great for pollinators.' },
      { name: 'Rhubarb and Custard', type_subtype: 'Collarette type', days_to_maturity: '90-120 DTM', note: 'Pink and yellow bicolor.' },
      { name: 'David Howard', type_subtype: 'Decorative type', days_to_maturity: '90-120 DTM', note: 'Dark bronze foliage with orange blooms.' },
      { name: 'Labyrinth', type_subtype: 'Decorative type', days_to_maturity: '90-120 DTM', note: 'Wavy, swirling petal form.' },
      { name: 'Café au Lait Royal', type_subtype: 'Dinnerplate type', days_to_maturity: '90-120 DTM', note: 'Enormous blush/mauve blooms. Needs strong staking.' },
      { name: 'Café au Lait', type_subtype: 'Dinnerplate type', days_to_maturity: '90-120 DTM', note: 'The classic — huge blush/cream/peach flowers. Each one is different.' },
    ],
  },
  {
    name: 'Everlastings',
    category: 'Cut Flowers',
    season: 'Summer — Fall',
    description: 'Flowers that dry perfectly — hang them upside down and they\'ll last for months. Strawflower, statice, globe amaranth, and more.',
    varieties: [
      { name: 'Gomphrena QIS Mix', type_subtype: 'Globe amaranth', days_to_maturity: '70-90 DTM', note: 'Round button flowers. Drought tolerant, excellent dried.' },
      { name: 'Strawflower Choice Mix', type_subtype: '', days_to_maturity: '80-100 DTM', note: 'Papery, jewel-toned flowers. Harvest tight for best drying.' },
      { name: 'Statice QIS Mix', type_subtype: 'Sea lavender', days_to_maturity: '90-110 DTM', note: 'Dries perfectly — a staple in dried arrangements.' },
      { name: 'Amaranth Hot Biscuits', type_subtype: '', days_to_maturity: '65-75 DTM', note: 'Cascading bronze/copper tassels. Great fresh or dried.' },
    ],
  },
  {
    name: 'Specialty Cut Flowers',
    category: 'Cut Flowers',
    season: 'Spring — Summer',
    description: 'Unique blooms that add character to arrangements — pincushion flowers, larkspur spikes, fragrant stock, and more.',
    varieties: [
      { name: 'Scabiosa Black Knight', type_subtype: 'Pincushion flower', days_to_maturity: '75-95 DTM', note: 'Deep maroon, long stems.' },
      { name: 'Ageratum Timeless Mix', type_subtype: '', days_to_maturity: '80-100 DTM', note: 'Fluffy blue/purple filler.' },
      { name: 'Larkspur Giant Imperial', type_subtype: '', days_to_maturity: '90-110 DTM', note: 'Tall spikes in blue, pink, white. Cool-season — direct seeded.' },
      { name: 'Bells of Ireland', type_subtype: '', days_to_maturity: '90-120 DTM', note: 'Tall green spikes. Architectural and unique.' },
      { name: 'Eucalyptus Silver Dollar', type_subtype: 'Foliage', days_to_maturity: '120-150 DTM', note: 'Silvery round leaves — essential greenery for arrangements.' },
    ],
  },
  {
    name: 'Filler Flowers & Foliage',
    category: 'Cut Flowers',
    season: 'Summer',
    description: 'The supporting cast that makes arrangements look full and professional. Airy textures, greenery, and fragrant herbs for bouquet-building.',
    varieties: [
      { name: 'Cardinal Basil', type_subtype: 'Fragrant filler', days_to_maturity: '60-80 DTM', note: 'Adds scent and texture to bouquets.' },
      { name: 'Ammi Dara', type_subtype: 'Queen Anne\'s lace type', days_to_maturity: '85-100 DTM', note: 'Airy, lacy umbels. A bouquet essential.' },
      { name: 'Bupleurum Green Gold', type_subtype: '', days_to_maturity: '60-80 DTM', note: 'Pairs with everything. Easy direct-seeded filler.' },
      { name: 'Dill Bouquet', type_subtype: '', days_to_maturity: '50-70 DTM', note: 'Fast filler. Airy and delicate.' },
    ],
  },
];
