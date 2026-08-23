export const SERVICES_DATA = [
  {
    id: 'ac-repair',
    name: 'AC Repair & Service',
    slug: 'ac-repair',
    iconName: 'Wind',
    badge: 'Popular',
    rating: 4.9,
    reviewCount: 480,
    startingPrice: 399,
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'PlumberIndore offers professional, doorstep Air Conditioner repair, servicing, and installation by certified HVAC technicians in Indore. We service all brands including Daikin, Voltas, LG, Samsung, Blue Star, Carrier, and Hitachi with 100% original spare parts.',
    heroSubtitle: '45-Minute Arrival | 30-Day Warranty | Certified HVAC Pros in Indore',
    packages: [
      { id: 'ac-foam', title: 'Power Foam Jet Service', price: 499, originalPrice: 699, duration: '45 mins', description: 'Deep foam jet cleaning of indoor cooling coils, outdoor condenser unit, drain pipe flush & gas check.' },
      { id: 'ac-gas', title: 'Gas Refill & Leak Fix', price: 1499, originalPrice: 1999, duration: '60 mins', description: 'Nitrogen pressure testing, copper pipe brazing gas leak repair & full R32 / R410 refrigerant charging.' },
      { id: 'ac-repair-diag', title: 'AC Inspection & Diagnostics', price: 299, originalPrice: 499, duration: '30 mins', description: 'Complete electrical, PCB, compressor & cooling checkup. Fee adjusted against final repair bill.' },
      { id: 'ac-install', title: 'Split AC Installation / Uninstallation', price: 999, originalPrice: 1299, duration: '90 mins', description: 'Precision mounting, outdoor bracket installation, vacuuming & copper pipe connectivity.' }
    ],
    issues: [
      { title: 'AC Not Cooling Properly', startingPrice: 399, cause: 'Dust clog in cooling coil or low refrigerant pressure' },
      { title: 'Water Leaking Indoors', startingPrice: 299, cause: 'Blocked condensate drain tray or pipe dislocation' },
      { title: 'Compressor Trip / Noisy Operation', startingPrice: 499, cause: 'Capacitor failure or voltage fluctuation' }
    ],
    faqs: [
      { q: 'Is there a warranty on AC repair in Indore?', a: 'Yes, PlumberIndore provides a 30-day warranty on all repairs and a 60-day warranty on gas refill services.' },
      { q: 'How fast can a technician reach my home in Vijay Nagar or Palasia?', a: 'Our assigned technician reaches your doorstep within 45 minutes of booking confirmation across all Indore sectors.' },
      { q: 'Do you service inverter ACs from Daikin, Voltas, and LG?', a: 'Yes, our technicians are certified for all major brands including inverter split ACs and window units.' }
    ]
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator Repair',
    slug: 'refrigerator',
    iconName: 'Refrigerator',
    badge: 'High Demand',
    rating: 4.9,
    reviewCount: 390,
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    description: 'Expert single door, double door, and side-by-side refrigerator repair services in Indore.',
    heroSubtitle: 'Same-Day Cooling Repair | Original Spare Parts | Doorstep Service',
    packages: [
      { id: 'ref-gas', title: 'Compressor & Gas Charging', price: 1299, originalPrice: 1699, duration: '60 mins', description: 'Eco-friendly R600a gas charging, filter drier replacement, and copper pipe sealing.' },
      { id: 'ref-defrost', title: 'Defrost & Thermostat Repair', price: 499, originalPrice: 699, duration: '45 mins', description: 'Fixing ice buildup, defrost timer/heater issues, and temperature sensor replacement.' }
    ],
    issues: [
      { title: 'Fridge Not Cooling Below', startingPrice: 299, cause: 'Gas leak, relay switch failure, or clogged coils' },
      { title: 'Excessive Ice Accumulation', startingPrice: 399, cause: 'Faulty defrost heater or worn-out door gasket' }
    ],
    faqs: [
      { q: 'Do you repair double door and inverter fridges in Indore?', a: 'Yes, we service LG, Samsung, Whirlpool, Haier, Godrej, Bosch, and Panasonic fridges with 100% genuine spares.' },
      { q: 'What is the cost of fridge gas charging in Indore?', a: 'Gas charging starts at ₹1299 with eco-friendly refrigerant and nitrogen leak checking.' }
    ]
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine Repair',
    slug: 'washing-machine',
    iconName: 'Shirt',
    badge: 'Trending',
    rating: 4.88,
    reviewCount: 420,
    startingPrice: 349,
    bannerImage: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
    description: 'Top load, front load, and semi-automatic washing machine repair at your doorstep in Indore.',
    heroSubtitle: 'Drum & Motor Specialists | Genuine Spares | Doorstep Inspection',
    packages: [
      { id: 'wm-descaling', title: 'Deep Descaling & Drum Service', price: 499, originalPrice: 699, duration: '45 mins', description: 'Complete drum descaling, inlet filter cleaning, and vibration dampening adjustment.' },
      { id: 'wm-motor', title: 'Motor & Belt Repair', price: 799, originalPrice: 1099, duration: '60 mins', description: 'Drive belt replacement, gear box repair, and PCB error code resolution.' }
    ],
    issues: [
      { title: 'Vibration & Loud Noise', startingPrice: 349, cause: 'Worn drum bearings or unbalanced shock absorbers' },
      { title: 'Water Drainage Error', startingPrice: 299, cause: 'Clogged drain pump or faulty pressure sensor' }
    ],
    faqs: [
      { q: 'Do you fix front load PCB board issues?', a: 'Yes, our technicians specialize in inverter washing machine PCB diagnosis and component repair.' },
      { q: 'Are spare parts covered under warranty?', a: 'All replaced drum bearings, belts, and valves carry a 30-day PlumberIndore warranty.' }
    ]
  },
  {
    id: 'plumber',
    name: 'Plumber Services',
    slug: 'plumber',
    iconName: 'Wrench',
    badge: 'Essential',
    rating: 4.95,
    reviewCount: 520,
    startingPrice: 149,
    bannerImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    description: 'Tap leakage repair, pipe blockage removal, toilet fitting, and water tank installation in Indore.',
    heroSubtitle: 'Expert Plumbers | Leakage & Blockage Specialists | Doorstep Service',
    packages: [
      { id: 'plm-leak', title: 'Tap & Flush Tank Leakage Repair', price: 199, originalPrice: 299, duration: '30 mins', description: 'Spindle change, washer replacement, and flush tank valve overhaul.' },
      { id: 'plm-drain', title: 'Drainage & Pipe Blockage Removal', price: 349, originalPrice: 499, duration: '45 mins', description: 'Heavy-duty pressure drain snake blockage cleaning for sinks & bathrooms.' }
    ],
    issues: [
      { title: 'Water Pipe Seepage', startingPrice: 149, cause: 'Cracked PVC joint or worn thread seal tape' },
      { title: 'Continuous Toilet Flush Leak', startingPrice: 199, cause: 'Worn flapper valve or syphon mechanism fault' }
    ],
    faqs: [
      { q: 'How quickly can a plumber reach Vijay Nagar or Bhanwarkuan?', a: 'Our local Indore plumbing team arrives in 30 to 45 minutes for urgent leaks and blockages.' },
      { q: 'Do you provide fittings for bathroom mixers and geysers?', a: 'Yes, we handle complete bathroom sanitary fittings, mixer taps, and underground pipe repair.' }
    ]
  },
  {
    id: 'electrician',
    name: 'Electrician Services',
    slug: 'electrician',
    iconName: 'PlugZap',
    badge: 'Essential',
    rating: 4.92,
    reviewCount: 450,
    startingPrice: 149,
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Short circuit fix, switchboard repair, MCB trip resolution, and house wiring in Indore.',
    heroSubtitle: 'Safety First | Certified Electricians | Immediate Short Circuit Fix',
    packages: [
      { id: 'elec-fix', title: 'Switchboard & Socket Fix', price: 199, originalPrice: 299, duration: '30 mins', description: 'Wiring check, modular switch replacement, and earthing test.' },
      { id: 'elec-mcb', title: 'MCB & Distribution Box Repair', price: 399, originalPrice: 599, duration: '45 mins', description: 'Single phase / 3-phase MCB replacement & neutral fault detection.' }
    ],
    issues: [
      { title: 'MCB Frequently Tripping', startingPrice: 149, cause: 'Overload circuit or neutral line leakage' },
      { title: 'Burnt Switchboard Smell', startingPrice: 199, cause: 'Loose wire contact or spark overheating' }
    ],
    faqs: [
      { q: 'Are your electricians certified for emergency short circuit repair?', a: 'Yes, all electricians are ITI-certified and equipped with digital multimeters and insulation tools.' }
    ]
  },
  {
    id: 'ro-purifier',
    name: 'RO Purifier Repair',
    slug: 'ro-purifier',
    iconName: 'Droplets',
    badge: 'Popular',
    rating: 4.9,
    reviewCount: 380,
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=800&q=80',
    description: 'RO water purifier filter change, membrane replacement, and TDS balancing in Indore.',
    heroSubtitle: '100% Pure Drinking Water | Authentic Membrane & Carbon Filters',
    packages: [
      { id: 'ro-service', title: 'Complete Filter Kit Service', price: 799, originalPrice: 1199, duration: '45 mins', description: 'Pre-filter, sediment filter, activated carbon, and post-carbon filter replacement.' }
    ],
    issues: [
      { title: 'Bad Water Taste / High TDS', startingPrice: 299, cause: 'Exhausted RO membrane or clogged carbon filters' }
    ],
    faqs: [
      { q: 'What is the recommended TDS level for Indore groundwater?', a: 'Our technician checks and adjusts TDS to optimal healthy drinking levels between 80-150 ppm.' }
    ]
  },
  {
    id: 'geyser',
    name: 'Geyser Repair',
    slug: 'geyser',
    iconName: 'Flame',
    rating: 4.89,
    reviewCount: 310,
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Electric and gas geyser repair, heating element replacement, and safety valve fitting in Indore.',
    heroSubtitle: 'Safe & Instant Heating Fix | Thermostat & Element Specialists',
    packages: [
      { id: 'gys-element', title: 'Heating Element & Thermostat Replacement', price: 599, originalPrice: 899, duration: '45 mins', description: 'Heavy-duty copper heating element installation with safety thermostat testing.' }
    ],
    issues: [
      { title: 'Water Not Heating', startingPrice: 299, cause: 'Burnt heating coil or tripped safety thermostat' }
    ],
    faqs: [
      { q: 'Is heating element replacement safe?', a: 'Yes, we use shockproof copper elements with dual thermostat cutouts.' }
    ]
  },
  {
    id: 'microwave',
    name: 'Microwave Repair',
    slug: 'microwave',
    iconName: 'Microwave',
    rating: 4.87,
    reviewCount: 260,
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
    description: 'Solo, Grill, and Convection microwave repair. Magnetron and touch panel fixes.',
    heroSubtitle: 'Magnetron & High-Voltage Repair | Doorlock & Touch Panel Fixes',
    packages: [
      { id: 'mw-heat', title: 'Heating & Magnetron Repair', price: 699, originalPrice: 999, duration: '45 mins', description: 'High-voltage diode, capacitor & magnetron diagnostic and replacement.' }
    ],
    issues: [
      { title: 'Sparks Inside Microwave', startingPrice: 299, cause: 'Damaged mica wave-guide sheet or metal contact' }
    ],
    faqs: [
      { q: 'Why is the microwave plate turning but food not heating?', a: 'This is usually caused by a blown high-voltage diode or magnetron failure, which our technician replaces at home.' }
    ]
  },
  {
    id: 'air-cooler',
    name: 'Air Cooler Repair',
    slug: 'air-cooler',
    iconName: 'Fan',
    rating: 4.86,
    reviewCount: 220,
    startingPrice: 199,
    bannerImage: 'https://images.unsplash.com/photo-1618941709602-92849f611320?auto=format&fit=crop&w=800&q=80',
    description: 'Honey-comb pad replacement, water pump repair, and motor rewinding for all cooler types.',
    heroSubtitle: 'Quick Summer Servicing | Pump & Motor Repair | Original Honeycomb Pads',
    packages: [
      { id: 'clr-full', title: 'Complete Cooler Overhaul', price: 299, originalPrice: 449, duration: '30 mins', description: 'Cleaning, motor lubrication, fan blade balancing, and water distribution check.' }
    ],
    issues: [
      { title: 'Water Pump Not Working', startingPrice: 199, cause: 'Burned pump winding or hard water limescale blockage' }
    ],
    faqs: [
      { q: 'Do you replace high-density honeycomb pads?', a: 'Yes, we supply and fit original honeycomb pads for Symphony, Kenstar, Bajaj, and Crompton coolers.' }
    ]
  },
  {
    id: 'kitchen-chimney',
    name: 'Kitchen Chimney Repair',
    slug: 'kitchen-chimney',
    iconName: 'UtensilsCrossed',
    rating: 4.88,
    reviewCount: 290,
    startingPrice: 399,
    bannerImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Deep degreasing, baffle filter washing, motor repair, and ducting installation.',
    heroSubtitle: 'High Suction Restored | Baffle & Mesh Cleaning | Motor Repair',
    packages: [
      { id: 'chm-clean', title: 'Deep Degreasing Service', price: 599, originalPrice: 899, duration: '60 mins', description: 'Chemical degreasing of blower, motor housing, and baffle filters.' }
    ],
    issues: [
      { title: 'Low Suction Power', startingPrice: 399, cause: 'Heavy oil & grease accumulation in blower rotor' }
    ],
    faqs: [
      { q: 'How often should chimney deep cleaning be done?', a: 'We recommend deep degreasing every 6 months to maintain motor health and high suction.' }
    ]
  },
  {
    id: 'inverter',
    name: 'Inverter & Battery',
    slug: 'inverter',
    iconName: 'Zap',
    rating: 4.9,
    reviewCount: 340,
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    description: 'Inverter PCB repair, battery distilled water top-up, and terminal cleaning.',
    heroSubtitle: 'Uninterrupted Power Backup | Inverter PCB & Battery Care',
    packages: [
      { id: 'inv-check', title: 'Inverter & Battery Checkup', price: 299, originalPrice: 499, duration: '30 mins', description: 'Charging current test, battery gravity test, and acid top-up.' }
    ],
    issues: [
      { title: 'Not Switching to Backup Mode', startingPrice: 299, cause: 'Faulty relay switch or blown fuse' }
    ],
    faqs: [
      { q: 'Do you repair Luminous and Microtek inverters?', a: 'Yes, we repair all major inverter brands and test battery health at home.' }
    ]
  },
  {
    id: 'atta-chakki',
    name: 'Atta Chakki Repair',
    slug: 'atta-chakki',
    iconName: 'Wheat',
    rating: 4.85,
    reviewCount: 190,
    startingPrice: 349,
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: 'Domestic flour mill cutter replacement, stone grinding fix, and motor repair in Indore.',
    heroSubtitle: 'Domestic Flour Mill Repair | Motor & Cutter Alignment',
    packages: [
      { id: 'atk-service', title: 'Flour Mill General Servicing', price: 399, originalPrice: 599, duration: '45 mins', description: 'Chamber cleaning, cutter sharpening, and motor bearing greasing.' }
    ],
    issues: [
      { title: 'Coarse Flour Output', startingPrice: 349, cause: 'Worn cutter blades or incorrect stone clearance' }
    ],
    faqs: [
      { q: 'Do you service domestic Atta Chakki at home?', a: 'Yes, our technician brings specialized tools to service and align flour mills on site.' }
    ]
  }
];
