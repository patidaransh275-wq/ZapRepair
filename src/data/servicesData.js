export const SERVICES_DATA = [
  {
    id: 'ac-repair',
    name: 'AC Repair & Service',
    slug: 'ac-repair',
    iconName: 'Wind',
    badge: 'Popular',
    startingPrice: 399,
    description: 'PlumberIndore offers professional, doorstep Air Conditioner repair, servicing, and installation by certified HVAC technicians in Indore. We service all brands including Daikin, Voltas, LG, Samsung, Blue Star, Carrier, and Hitachi with 100% original spare parts.',
    heroSubtitle: '45-Minute Arrival | 30-Day Warranty | Certified HVAC Pros in Indore',
    packages: [
      { id: 'ac-foam', title: 'Power Foam Jet Service', price: 499, originalPrice: 699, duration: '45 mins', description: 'Deep foam jet cleaning of indoor cooling coils, outdoor condenser unit, drain pipe flush & gas check.' },
      { id: 'ac-gas', title: 'Gas Refill & Leak Fix', price: 1499, originalPrice: 1999, duration: '60 mins', description: 'Nitrogen pressure testing, copper pipe brazing gas leak repair & full R32 / R410 refrigerant charging.' },
      { id: 'ac-repair-diag', title: 'AC Inspection & Diagnostics', price: 299, originalPrice: 499, duration: '30 mins', description: 'Complete electrical, PCB, compressor & cooling checkup. Fee adjusted against final repair bill.' },
      { id: 'ac-install', title: 'Split AC Installation / Uninstallation', price: 999, originalPrice: 1299, duration: '90 mins', description: 'Precision mounting, outdoor bracket installation, vacuuming & copper pipe connectivity.' }
    ],
    commonIssues: [
      { issue: 'AC Not Cooling Properly', cause: 'Dust clog in cooling coil or low refrigerant pressure' },
      { issue: 'Water Leaking Indoors', cause: 'Blocked condensate drain tray or pipe dislocation' },
      { issue: 'Compressor Trip / Noisy Operation', cause: 'Capacitor failure or voltage fluctuation' }
    ],
    faqs: [
      { q: 'Is there a warranty on AC repair?', a: 'Yes, PlumberIndore provides a 30-day warranty on all repairs and a 60-day warranty on gas refill services.' },
      { q: 'How fast can a technician reach my home in Indore?', a: 'Our assigned technician reaches your doorstep within 45 minutes of booking confirmation across all Indore sectors.' }
    ]
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator Repair',
    slug: 'refrigerator',
    iconName: 'Refrigerator',
    startingPrice: 299,
    description: 'Expert single door, double door, and side-by-side refrigerator repair services in Indore.',
    heroSubtitle: 'Same-Day Cooling Repair | Original Spare Parts | Doorstep Service',
    packages: [
      { id: 'ref-gas', title: 'Compressor & Gas Charging', price: 1299, originalPrice: 1699, duration: '60 mins', description: 'Eco-friendly R600a gas charging, filter drier replacement, and copper pipe sealing.' },
      { id: 'ref-defrost', title: 'Defrost & Thermostat Repair', price: 499, originalPrice: 699, duration: '45 mins', description: 'Fixing ice buildup, defrost timer/heater issues, and temperature sensor replacement.' }
    ],
    commonIssues: [
      { issue: 'Fridge Not Cooling Below', cause: 'Gas leak, relay switch failure, or clogged coils' },
      { issue: 'Excessive Ice Accumulation', cause: 'Faulty defrost heater or worn-out door gasket' }
    ],
    faqs: [
      { q: 'Do you repair all fridge brands?', a: 'Yes, we service LG, Samsung, Whirlpool, Haier, Godrej, Bosch, and Panasonic fridges.' }
    ]
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine Repair',
    slug: 'washing-machine',
    iconName: 'Shirt',
    badge: 'Trending',
    startingPrice: 349,
    description: 'Top load, front load, and semi-automatic washing machine repair at your doorstep in Indore.',
    heroSubtitle: 'Drum & Motor Specialists | Genuine Spares | Doorstep Inspection',
    packages: [
      { id: 'wm-descaling', title: 'Deep Descaling & Drum Service', price: 499, originalPrice: 699, duration: '45 mins', description: 'Complete drum descaling, inlet filter cleaning, and vibration dampening adjustment.' },
      { id: 'wm-motor', title: 'Motor & Belt Repair', price: 799, originalPrice: 1099, duration: '60 mins', description: 'Drive belt replacement, gear box repair, and PCB error code resolution.' }
    ],
    commonIssues: [
      { issue: 'Vibration & Loud Noise', cause: 'Worn drum bearings or unbalanced shock absorbers' },
      { issue: 'Water Drainage Error', cause: 'Clogged drain pump or faulty pressure sensor' }
    ],
    faqs: [
      { q: 'Do you fix PCB board issues?', a: 'Yes, our technicians specialize in inverter washing machine PCB diagnosis and repair.' }
    ]
  },
  {
    id: 'air-cooler',
    name: 'Air Cooler Repair',
    slug: 'air-cooler',
    iconName: 'Fan',
    startingPrice: 199,
    description: 'Honey-comb pad replacement, water pump repair, and motor rewinding for all cooler types.',
    heroSubtitle: 'Quick Summer Servicing | Pump & Motor Repair | Original Honeycomb Pads',
    packages: [
      { id: 'clr-full', title: 'Complete Cooler Overhaul', price: 299, originalPrice: 449, duration: '30 mins', description: 'Cleaning, motor lubrication, fan blade balancing, and water distribution check.' }
    ],
    commonIssues: [
      { issue: 'Water Pump Not Working', cause: 'Burned pump winding or hard water limescale blockage' }
    ],
    faqs: []
  },
  {
    id: 'geyser',
    name: 'Geyser Repair',
    slug: 'geyser',
    iconName: 'Flame',
    startingPrice: 299,
    description: 'Electric and gas geyser repair, heating element replacement, and safety valve fitting in Indore.',
    heroSubtitle: 'Safe & Instant Heating Fix | Thermostat & Element Specialists',
    packages: [
      { id: 'gys-element', title: 'Heating Element & Thermostat Replacement', price: 599, originalPrice: 899, duration: '45 mins', description: 'Heavy-duty copper heating element installation with safety thermostat testing.' }
    ],
    commonIssues: [
      { issue: 'Water Not Heating', cause: 'Burnt heating coil or tripped safety thermostat' }
    ],
    faqs: []
  },
  {
    id: 'microwave',
    name: 'Microwave Repair',
    slug: 'microwave',
    iconName: 'Microwave',
    startingPrice: 299,
    description: 'Solo, Grill, and Convection microwave repair. Magnetron and touch panel fixes.',
    heroSubtitle: 'Magnetron & High-Voltage Repair | Doorlock & Touch Panel Fixes',
    packages: [
      { id: 'mw-heat', title: 'Heating & Magnetron Repair', price: 699, originalPrice: 999, duration: '45 mins', description: 'High-voltage diode, capacitor & magnetron diagnostic and replacement.' }
    ],
    commonIssues: [
      { issue: 'Sparks Inside Microwave', cause: 'Damaged mica wave-guide sheet or metal contact' }
    ],
    faqs: []
  },
  {
    id: 'ro-purifier',
    name: 'RO Purifier Repair',
    slug: 'ro-purifier',
    iconName: 'Droplets',
    startingPrice: 299,
    description: 'RO water purifier filter change, membrane replacement, and TDS balancing in Indore.',
    heroSubtitle: '100% Pure Drinking Water | Authentic Membrane & Carbon Filters',
    packages: [
      { id: 'ro-service', title: 'Complete Filter Kit Service', price: 799, originalPrice: 1199, duration: '45 mins', description: 'Pre-filter, sediment filter, activated carbon, and post-carbon filter replacement.' }
    ],
    commonIssues: [
      { issue: 'Bad Water Taste / High TDS', cause: 'Exhausted RO membrane or clogged carbon filters' }
    ],
    faqs: []
  },
  {
    id: 'kitchen-chimney',
    name: 'Kitchen Chimney Repair',
    slug: 'kitchen-chimney',
    iconName: 'UtensilsCrossed',
    startingPrice: 399,
    description: 'Deep degreasing, baffle filter washing, motor repair, and ducting installation.',
    heroSubtitle: 'High Suction Restored | Baffle & Mesh Cleaning | Motor Repair',
    packages: [
      { id: 'chm-clean', title: 'Deep Degreasing Service', price: 599, originalPrice: 899, duration: '60 mins', description: 'Chemical degreasing of blower, motor housing, and baffle filters.' }
    ],
    commonIssues: [
      { issue: 'Low Suction Power', cause: 'Heavy oil & grease accumulation in blower rotor' }
    ],
    faqs: []
  },
  {
    id: 'inverter',
    name: 'Inverter & Battery',
    slug: 'inverter',
    iconName: 'Zap',
    startingPrice: 299,
    description: 'Inverter PCB repair, battery distilled water top-up, and terminal cleaning.',
    heroSubtitle: 'Uninterrupted Power Backup | Inverter PCB & Battery Care',
    packages: [
      { id: 'inv-check', title: 'Inverter & Battery Checkup', price: 299, originalPrice: 499, duration: '30 mins', description: 'Charging current test, battery gravity test, and acid top-up.' }
    ],
    commonIssues: [
      { issue: 'Not Switching to Backup Mode', cause: 'Faulty relay switch or blown fuse' }
    ],
    faqs: []
  },
  {
    id: 'atta-chakki',
    name: 'Atta Chakki Repair',
    slug: 'atta-chakki',
    iconName: 'Wheat',
    startingPrice: 349,
    description: 'Domestic flour mill cutter replacement, stone grinding fix, and motor repair in Indore.',
    heroSubtitle: 'Domestic Flour Mill Repair | Motor & Cutter Alignment',
    packages: [
      { id: 'atk-service', title: 'Flour Mill General Servicing', price: 399, originalPrice: 599, duration: '45 mins', description: 'Chamber cleaning, cutter sharpening, and motor bearing greasing.' }
    ],
    commonIssues: [
      { issue: 'Coarse Flour Output', cause: 'Worn cutter blades or incorrect stone clearance' }
    ],
    faqs: []
  },
  {
    id: 'electrician',
    name: 'Electrician Services',
    slug: 'electrician',
    iconName: 'PlugZap',
    badge: 'Essential',
    startingPrice: 149,
    description: 'Short circuit fix, switchboard repair, MCB trip resolution, and house wiring in Indore.',
    heroSubtitle: 'Safety First | Certified Electricians | Immediate Short Circuit Fix',
    packages: [
      { id: 'elec-fix', title: 'Switchboard & Socket Fix', price: 199, originalPrice: 299, duration: '30 mins', description: 'Wiring check, modular switch replacement, and earthing test.' }
    ],
    commonIssues: [
      { issue: 'MCB Frequently Tripping', cause: 'Overload circuit or neutral line leakage' }
    ],
    faqs: []
  },
  {
    id: 'plumber',
    name: 'Plumber Services',
    slug: 'plumber',
    iconName: 'Wrench',
    badge: 'Essential',
    startingPrice: 149,
    description: 'Tap leakage repair, pipe blockage removal, toilet fitting, and water tank installation in Indore.',
    heroSubtitle: 'Expert Plumbers | Leakage & Blockage Specialists | Doorstep Service',
    packages: [
      { id: 'plm-leak', title: 'Tap & Flush Tank Leakage Repair', price: 199, originalPrice: 299, duration: '30 mins', description: 'Spindle change, washer replacement, and flush tank valve overhaul.' }
    ],
    commonIssues: [
      { issue: 'Water Pipe Seepage', cause: 'Cracked PVC joint or worn thread seal tape' }
    ],
    faqs: []
  }
];
