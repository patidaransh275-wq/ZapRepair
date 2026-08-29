export const SERVICES_DATA = [
  {
    id: 'ac-repair',
    name: 'AC Repair & Service',
    slug: 'ac-repair',
    iconName: 'Wind',
    badge: 'Popular',
    startingPrice: 399,
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Urban Company-grade doorstep Air Conditioner repair, foam jet servicing, gas leak refill, and installation by certified HVAC technicians across Indore.',
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
    id: 'plumber',
    name: 'Plumber Services',
    slug: 'plumber',
    iconName: 'Wrench',
    badge: 'Essential',
    startingPrice: 149,
    bannerImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    description: 'Expert doorstep plumbing services in Indore inspired by Urban Company standards. Tap & mixer repair, toilet flush tank fix, sink & floor drain blockage removal, water tank installation, and bathroom fittings.',
    heroSubtitle: 'Expert Plumbers | Leakage & Blockage Specialists | 45-Min Doorstep Arrival',
    packages: [
      { id: 'plm-tap', title: 'Tap, Nozzle & Wall Mixer Repair', price: 149, originalPrice: 249, duration: '30 mins', description: 'Fixing dripping taps, ceramic spindle change, washer replacement, and single lever basin mixer repair.' },
      { id: 'plm-toilet', title: 'Toilet & Flush Tank Service', price: 199, originalPrice: 299, duration: '30 mins', description: 'Cistern syphon repair, flush button change, jet spray fitting, and Western/Indian commode leak fix.' },
      { id: 'plm-drain', title: 'Drainage & Pipe Blockage Removal', price: 349, originalPrice: 499, duration: '45 mins', description: 'Heavy-duty drain snake blockage cleaning for clogged kitchen sinks, washbasins, and bathroom floor traps.' },
      { id: 'plm-tank', title: 'Water Tank & Motor Pump Fitting', price: 499, originalPrice: 799, duration: '60 mins', description: 'Overhead water tank deep cleaning (up to 1000L), automatic water level controller fitting, and pump connection.' },
      { id: 'plm-fittings', title: 'Bathroom Accessory & Shower Fitting', price: 299, originalPrice: 449, duration: '45 mins', description: 'Overhead shower arm replacement, towel rod, mirror, soap holder, and health faucet installation.' }
    ],
    issues: [
      { title: 'Dripping Tap / Basin Mixer Leak', startingPrice: 149, cause: 'Worn out spindle gasket, ceramic disc wear, or thread corrosion' },
      { title: 'Continuous Toilet Flush Tank Leak', startingPrice: 199, cause: 'Faulty flapper valve, damaged inlet ball valve, or syphon seal wear' },
      { title: 'Blocked Kitchen Sink / Bathroom Floor Trap', startingPrice: 349, cause: 'Accumulated grease, food waste particles, hair, or hard water scale' },
      { title: 'Underground / Concealed Pipe Seepage', startingPrice: 499, cause: 'Cracked PVC joint, loose CPVC fitting, or wall seepage' }
    ],
    faqs: [
      { q: 'How quickly can a plumber reach Vijay Nagar or Palasia?', a: 'Our assigned local plumber reaches your doorstep within 45 minutes of booking across all Indore sectors.' },
      { q: 'Do you bring spare parts like ceramic spindles, washers, and flush valves?', a: 'Yes, our plumbers carry 100% genuine spares from Jaquar, Hindware, Cera, and Kohler.' },
      { q: 'Is there a warranty on plumbing repairs?', a: 'Yes, PlumberIndore provides a 30-day post-service warranty on all fittings and leakage repairs.' },
      { q: 'What if the plumber inspects but I decide not to do the repair?', a: 'You only pay a nominal doorstep inspection fee of ₹149, which is 100% waived if you approve the repair.' }
    ]
  },
  {
    id: 'electrician',
    name: 'Electrician Services',
    slug: 'electrician',
    iconName: 'PlugZap',
    badge: 'Essential',
    startingPrice: 149,
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Certified doorstep electrician services in Indore. Switchboard & socket repair, ceiling fan installation, light & chandelier mounting, MCB tripping fix, and short circuit fault finding.',
    heroSubtitle: 'Safety First | ITI-Certified Electricians | 45-Min Doorstep Arrival',
    packages: [
      { id: 'elec-switch', title: 'Switchboard & Power Socket Repair', price: 149, originalPrice: 249, duration: '30 mins', description: 'Modular switch replacement, 16A heavy power socket fitting for AC/Geyser, and fan speed regulator fix.' },
      { id: 'elec-fan', title: 'Ceiling Fan & Wall Fan Repair', price: 199, originalPrice: 299, duration: '30 mins', description: 'Ceiling fan installation/uninstallation, motor capacitor change, noisy bearing greasing, and exhaust fan fitting.' },
      { id: 'elec-light', title: 'Lights & Chandelier Installation', price: 249, originalPrice: 399, duration: '45 mins', description: 'False ceiling LED cob light fitting, decorative tube light/batten mounting, and chandelier assembly.' },
      { id: 'elec-mcb', title: 'MCB & Distribution Box Safety', price: 399, originalPrice: 599, duration: '45 mins', description: 'Tripping MCB replacement, main RCCB/ELCB safety breaker installation, and 3-phase DB box wiring overhaul.' },
      { id: 'elec-wiring', title: 'Home Wiring & Short Circuit Fix', price: 499, originalPrice: 799, duration: '60 mins', description: 'Emergency short circuit fault finding with digital multimeter, open casing/concealed copper wiring, and earthing test.' }
    ],
    issues: [
      { title: 'Switch Sparking / Burnt Smell', startingPrice: 149, cause: 'Loose wire contact, overloaded circuit, or carbon accumulation' },
      { title: 'Ceiling Fan Rotating Slowly', startingPrice: 199, cause: 'Weak motor capacitor or worn out rotor bearing' },
      { title: 'MCB Frequently Tripping in House', startingPrice: 399, cause: 'Short circuit in appliances, neutral line leakage, or heavy load trip' },
      { title: 'Complete Power Loss in Room', startingPrice: 299, cause: 'Blown fuse, broken phase wire inside wall conduit, or DB box failure' }
    ],
    faqs: [
      { q: 'Are your electricians ITI-certified for high-voltage short circuit fixes?', a: 'Yes, all our electricians are ITI-certified Indian technicians and carry professional multimeters and insulated safety gear.' },
      { q: 'Do you install heavy 16A sockets for ACs, Geysers, and Refrigerators?', a: 'Yes, we fit heavy-duty modular 16A sockets with copper wiring and earthing safety.' },
      { q: 'How fast can an electrician reach my home in Indore?', a: 'Our technician arrives at your doorstep in Vijay Nagar, Palasia, Bhanwarkuan, or any Indore location within 45 minutes.' },
      { q: 'Is there a warranty on electrical fittings?', a: 'Yes, PlumberIndore offers a 30-day doorstep warranty on all switch, socket, fan, and MCB installations.' }
    ]
  },
  {
    id: 'cleaning-pest-control',
    name: 'Cleaning & Pest Control',
    slug: 'cleaning-pest-control',
    iconName: 'Sparkles',
    badge: 'Popular',
    startingPrice: 499,
    bannerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Urban Company style home cleaning & pest control in Indore. Deep bathroom cleaning, kitchen degreasing, sofa & carpet shampooing, full home sanitization, and odorless herbal cockroach pest control.',
    heroSubtitle: 'Hospital-Grade Sanitization | Odorless Pest Control | 45-Min Arrival',
    packages: [
      { id: 'cln-bath', title: 'Bathroom Deep Cleaning & Hard Water Stain Removal', price: 499, originalPrice: 799, duration: '45 mins', description: 'Floor scrub, tile descaling, toilet bowl sanitization, tap chrome shine & mirror polishing.' },
      { id: 'cln-kitchen', title: 'Kitchen Deep Cleaning & Degreasing', price: 799, originalPrice: 1199, duration: '60 mins', description: 'Countertop degreasing, cabinet exterior wipe, sink sanitization, exhaust fan & tile stain cleanup.' },
      { id: 'cln-sofa', title: 'Sofa & Mattress Shampooing (Per Seat)', price: 299, originalPrice: 449, duration: '45 mins', description: 'Deep extraction vacuuming, fabric foam shampooing, and dust mite sanitization.' },
      { id: 'cln-full-home', title: 'Full House Deep Cleaning (1BHK/2BHK/3BHK)', price: 1999, originalPrice: 2799, duration: '180 mins', description: 'Complete floor scrubbing, window track cleaning, balcony wash, kitchen & bathroom deep sanitation.' },
      { id: 'cln-pest', title: 'Cockroach & General Pest Control', price: 599, originalPrice: 899, duration: '45 mins', description: '100% odorless gel baiting and chemical spray in kitchen, cabinets, drain holes & rooms.' }
    ],
    issues: [
      { title: 'Hard Water Yellow Stains on Bathroom Tiles', startingPrice: 499, cause: 'Indore hard water mineral build-up and soap scum' },
      { title: 'Greasy Kitchen Tiles & Exhaust Fan', startingPrice: 799, cause: 'Accumulated cooking oil vapours and spice dust' },
      { title: 'Cockroach Infestation in Cabinets', startingPrice: 599, cause: 'Hidden nests near warm appliances and kitchen sinks' }
    ],
    faqs: [
      { q: 'Are the cleaning and pest control chemicals safe for kids and pets?', a: 'Yes, we use eco-friendly, non-toxic, and odorless chemicals approved for residential use.' },
      { q: 'Do you bring your own mechanized scrubbing machines and vacuum cleaners?', a: 'Yes, our cleaning team comes fully equipped with high-pressure steamers, vacuums, and specialized cleaning tools.' }
    ]
  },
  {
    id: 'carpenter',
    name: 'Carpenter Services',
    slug: 'carpenter',
    iconName: 'Hammer',
    badge: 'Essential',
    startingPrice: 199,
    bannerImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Doorstep carpenter services in Indore. Door lock replacement, wardrobe & cupboard hinge repair, bed and sofa assembly, wall hanging drill work, and custom furniture adjustments.',
    heroSubtitle: 'Master Carpenters | Precision Woodwork & Hardware Fixes | 45-Min Arrival',
    packages: [
      { id: 'crp-lock', title: 'Door Lock, Latch & Handle Repair', price: 199, originalPrice: 299, duration: '30 mins', description: 'Main door lock replacement, cylindrical lock fix, tower bolt, handle & magnetic catcher fitting.' },
      { id: 'crp-hinge', title: 'Cupboard & Wardrobe Hinge / Slider Fix', price: 249, originalPrice: 399, duration: '30 mins', description: 'Hydraulic soft-close hinge fitting, drawer channel replacement, and sliding door alignment.' },
      { id: 'crp-drill', title: 'Drill & Hang (Frames, Mirrors, Curtains)', price: 199, originalPrice: 299, duration: '30 mins', description: 'Precision hammer drilling for TV mounts, curtain rods, heavy mirrors, paintings & wall shelves.' },
      { id: 'crp-bed', title: 'Bed Assembly & Furniture Repair', price: 399, originalPrice: 599, duration: '45 mins', description: 'Hydraulic bed lift repair, dining table wobble fix, chair joint tightening, and wardrobe dismantling/assembly.' }
    ],
    issues: [
      { title: 'Door Scraping Floor / Not Latching', startingPrice: 199, cause: 'Loose hinge screws, frame warping, or misaligned latch plate' },
      { title: 'Wardrobe Drawer Jammed', startingPrice: 249, cause: 'Bent telescopic channel or broken ball bearings' }
    ],
    faqs: [
      { q: 'Do carpenters bring their own power tools and drill bits?', a: 'Yes, our carpenters carry professional power drills, circular saws, and standard hardware fittings.' },
      { q: 'Can you assemble IKEA / Urban Ladder / Pepperfry furniture?', a: 'Yes, we specialize in flat-pack furniture assembly and dismantling across all Indore locations.' }
    ]
  },
  {
    id: 'painting-waterproofing',
    name: 'Painting & Waterproofing',
    slug: 'painting-waterproofing',
    iconName: 'Paintbrush',
    badge: 'Trending',
    startingPrice: 999,
    bannerImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    description: 'Professional home painting, wall dampness waterproofing, wall putty, and touch-up services in Indore with dust-free mechanized tools and Asian Paints/Berger products.',
    heroSubtitle: 'Dust-Free Mechanized Painting | Wall Dampness Fix | Asian Paints Certified',
    packages: [
      { id: 'pnt-touch', title: 'Wall Putty, Crack & Touch-up Painting', price: 999, originalPrice: 1499, duration: '60 mins', description: 'Filling cracks, anti-fungal putty application, sanding & double coat touch-up paint match.' },
      { id: 'pnt-damp', title: 'Wall Dampness & Leakage Waterproofing', price: 1499, originalPrice: 2199, duration: '90 mins', description: 'Dr. Fixit / Asian Paints SmartCare waterproofing barrier coating for peeling paint and wet patches.' },
      { id: 'pnt-room', title: 'Single Room Painting (Walls & Ceiling)', price: 2499, originalPrice: 3499, duration: '180 mins', description: 'Primer coat, 2 coats of premium plastic emulsion paint, and complete masking protection.' }
    ],
    issues: [
      { title: 'Wall Paint Peeling & White Powder Seepage', startingPrice: 999, cause: 'Underlying moisture in bricks or bathroom pipe leakage' }
    ],
    faqs: [
      { q: 'Do you offer a free site inspection for full home painting in Indore?', a: 'Yes, we provide free doorstep laser measurement and color consultation across Indore.' }
    ]
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator Repair',
    slug: 'refrigerator',
    iconName: 'Refrigerator',
    badge: 'High Demand',
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    description: 'Expert single door, double door, and side-by-side refrigerator repair services in Indore.',
    heroSubtitle: 'Same-Day Cooling Repair | Original Spare Parts | Doorstep Service',
    packages: [
      { id: 'ref-gas', title: 'Compressor & Gas Charging', price: 1299, originalPrice: 1699, duration: '60 mins', description: 'Eco-friendly R600a/R134a gas charging, filter drier replacement, and copper pipe sealing.' },
      { id: 'ref-defrost', title: 'Defrost & Thermostat Repair', price: 499, originalPrice: 699, duration: '45 mins', description: 'Fixing ice buildup, defrost timer/heater issues, and temperature sensor replacement.' },
      { id: 'ref-pcb', title: 'Inverter Fridge PCB Board Repair', price: 799, originalPrice: 1199, duration: '60 mins', description: 'Micro-controller diagnostics, capacitor replacement, and power supply circuit repair.' }
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
    startingPrice: 349,
    bannerImage: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
    description: 'Top load, front load, and semi-automatic washing machine repair at your doorstep in Indore.',
    heroSubtitle: 'Drum & Motor Specialists | Genuine Spares | Doorstep Inspection',
    packages: [
      { id: 'wm-descaling', title: 'Deep Descaling & Drum Service', price: 499, originalPrice: 699, duration: '45 mins', description: 'Complete drum descaling, inlet filter cleaning, and vibration dampening adjustment.' },
      { id: 'wm-motor', title: 'Motor & Belt Repair', price: 799, originalPrice: 1099, duration: '60 mins', description: 'Drive belt replacement, gear box repair, and PCB error code resolution.' },
      { id: 'wm-drain', title: 'Drain Pump & Water Inlet Valve Fix', price: 399, originalPrice: 599, duration: '30 mins', description: 'Clogged drain pump cleaning, solenoid inlet valve replacement & pipe leak fix.' }
    ],
    issues: [
      { title: 'Vibration & Loud Noise', startingPrice: 349, cause: 'Worn drum bearings or unbalanced shock absorbers' },
      { title: 'Water Drainage Error (OE/5E/E20)', startingPrice: 299, cause: 'Clogged drain pump or faulty pressure sensor' }
    ],
    faqs: [
      { q: 'Do you fix front load PCB board issues?', a: 'Yes, our technicians specialize in inverter washing machine PCB diagnosis and component repair.' },
      { q: 'Are spare parts covered under warranty?', a: 'All replaced drum bearings, belts, and valves carry a 30-day PlumberIndore warranty.' }
    ]
  },
  {
    id: 'ro-purifier',
    name: 'RO Purifier Repair',
    slug: 'ro-purifier',
    iconName: 'Droplets',
    badge: 'Popular',
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=800&q=80',
    description: 'RO water purifier filter change, membrane replacement, and TDS balancing in Indore.',
    heroSubtitle: '100% Pure Drinking Water | Authentic Membrane & Carbon Filters',
    packages: [
      { id: 'ro-service', title: 'Complete Filter Kit Service', price: 799, originalPrice: 1199, duration: '45 mins', description: 'Pre-filter, sediment filter, activated carbon, and post-carbon filter replacement.' },
      { id: 'ro-membrane', title: 'RO Membrane & Pump Replacement', price: 1299, originalPrice: 1799, duration: '60 mins', description: 'High TDS 80 GPD Filmtec/CSM membrane installation and booster pump pressure test.' }
    ],
    issues: [
      { title: 'Bad Water Taste / High TDS', startingPrice: 299, cause: 'Exhausted RO membrane or clogged carbon filters' },
      { title: 'Continuous Water Drain / Low Output', startingPrice: 299, cause: 'Choked pre-filter or faulty auto-cut off switch' }
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
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Electric and gas geyser repair, heating element replacement, and safety valve fitting in Indore.',
    heroSubtitle: 'Safe & Instant Heating Fix | Thermostat & Element Specialists',
    packages: [
      { id: 'gys-element', title: 'Heating Element & Thermostat Replacement', price: 599, originalPrice: 899, duration: '45 mins', description: 'Heavy-duty copper heating element installation with safety thermostat testing.' },
      { id: 'gys-install', title: 'Geyser Installation / Uninstallation', price: 399, originalPrice: 599, duration: '45 mins', description: 'Wall mounting with heavy fastener anchors, inlet-outlet connection & earthing verification.' }
    ],
    issues: [
      { title: 'Water Not Heating', startingPrice: 299, cause: 'Burnt heating coil or tripped safety thermostat' },
      { title: 'Geyser Tank Water Leakage', startingPrice: 349, cause: 'Corroded inlet gasket or loose safety valve fitting' }
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
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
    description: 'Solo, Grill, and Convection microwave repair. Magnetron and touch panel fixes.',
    heroSubtitle: 'Magnetron & High-Voltage Repair | Doorlock & Touch Panel Fixes',
    packages: [
      { id: 'mw-heat', title: 'Heating & Magnetron Repair', price: 699, originalPrice: 999, duration: '45 mins', description: 'High-voltage diode, capacitor & magnetron diagnostic and replacement.' },
      { id: 'mw-touch', title: 'Touchpad & PCB Repair', price: 499, originalPrice: 799, duration: '45 mins', description: 'Membrane keypad replacement, display circuit repair & door switch alignment.' }
    ],
    issues: [
      { title: 'Sparks Inside Microwave', startingPrice: 299, cause: 'Damaged mica wave-guide sheet or metal contact' },
      { title: 'Plate Rotating but Food Cold', startingPrice: 299, cause: 'Failed high-voltage capacitor or magnetron burnout' }
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
    startingPrice: 199,
    bannerImage: 'https://images.unsplash.com/photo-1618941709602-92849f611320?auto=format&fit=crop&w=800&q=80',
    description: 'Honey-comb pad replacement, water pump repair, and motor rewinding for all cooler types.',
    heroSubtitle: 'Quick Summer Servicing | Pump & Motor Repair | Original Honeycomb Pads',
    packages: [
      { id: 'clr-full', title: 'Complete Cooler Overhaul & Tank Clean', price: 299, originalPrice: 449, duration: '30 mins', description: 'Tank descaling, motor lubrication, fan blade balancing, and water distribution check.' },
      { id: 'clr-pump', title: 'Submersible Water Pump Replacement', price: 249, originalPrice: 399, duration: '30 mins', description: 'High-lift submersible pump installation with anti-rust wiring.' }
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
    startingPrice: 399,
    bannerImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Deep degreasing, baffle filter washing, motor repair, and ducting installation in Indore.',
    heroSubtitle: 'High Suction Restored | Baffle & Mesh Cleaning | Motor Repair',
    packages: [
      { id: 'chm-clean', title: 'Deep Degreasing Service', price: 599, originalPrice: 899, duration: '60 mins', description: 'Chemical degreasing of blower, motor housing, and baffle filters.' },
      { id: 'chm-motor', title: 'Chimney Motor & Duct Pipe Fix', price: 699, originalPrice: 999, duration: '60 mins', description: 'Heavy suction motor capacitor fix, noise reduction, and flexible duct pipe installation.' }
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
    startingPrice: 299,
    bannerImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    description: 'Inverter PCB repair, battery distilled water top-up, and terminal cleaning in Indore.',
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
