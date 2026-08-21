export const SERVICES_DATA = [
  {
    id: 'ac-repair',
    slug: 'ac-repair',
    name: 'AC Repair & Service',
    category: 'appliance',
    iconName: 'Wind',
    shortDesc: 'Split & Window AC installation, foam jet cleaning, gas charging, & PCB repairs.',
    startingPrice: 399,
    rating: 4.9,
    reviewCount: 3420,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    description: 'ZapRepair offers professional, doorstep Air Conditioner repair, servicing, and installation by certified HVAC technicians. We service all brands including Daikin, Voltas, LG, Samsung, Blue Star, Carrier, and Hitachi with 100% original spare parts.',
    packages: [
      { id: 'ac-1', title: 'Power Foam Jet Service', price: 499, originalPrice: 699, duration: '45 Mins', description: 'Deep foam jet cleaning of indoor cooling coils, outdoor unit high-pressure wash, filter cleaning, and gas check.' },
      { id: 'ac-2', title: 'AC Diagnostic / Repair', price: 299, originalPrice: 399, duration: '30 Mins', description: 'Complete inspection of cooling, compressor, PCB, motor, and electrical wiring. Inspection fee waived on repair.' },
      { id: 'ac-3', title: 'AC Gas Refill (R22/R32/R410)', price: 2199, originalPrice: 2799, duration: '60 Mins', description: 'Leak detection, pressure test, vacuum evacuation, and full original refrigerant top-up with 60-day warranty.' },
      { id: 'ac-4', title: 'Split AC Installation / Uninstallation', price: 799, originalPrice: 999, duration: '90 Mins', description: 'Wall mounting, piping connection, vacuuming, and testing for peak cooling efficiency.' }
    ],
    issues: [
      { title: 'AC Not Cooling Properly', startingPrice: 399 },
      { title: 'Water Leakage from Indoor Unit', startingPrice: 299 },
      { title: 'Noisy Operation / Bad Smell', startingPrice: 349 },
      { title: 'AC Not Turning On / Power Fault', startingPrice: 299 },
      { title: 'Compressor Trip & PCB Repair', startingPrice: 899 }
    ],
    faqs: [
      { q: 'How often should I get my AC serviced?', a: 'We recommend servicing your AC at least twice a year—once before summer begins and once after the monsoon season—to maintain energy efficiency and air quality.' },
      { q: 'Is there a warranty on AC repair?', a: 'Yes, ZapRepair provides a 30-day warranty on all repairs and a 60-day warranty on gas refill services.' },
      { q: 'Do you charge an inspection fee if I don\'t proceed with repair?', a: 'A nominal inspection fee of ₹199 applies if you decide not to proceed with the repair. If you proceed with the repair, the inspection fee is completely waived!' }
    ]
  },
  {
    id: 'refrigerator',
    slug: 'refrigerator',
    name: 'Refrigerator Repair',
    category: 'appliance',
    iconName: 'Refrigerator',
    shortDesc: 'Single door, double door, & side-by-side fridge cooling, compressor & gas service.',
    startingPrice: 299,
    rating: 4.8,
    reviewCount: 2850,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80',
    description: 'Expert doorstep refrigerator repair for single door, double door, inverter, and side-by-side refrigerators. We fix cooling issues, gas leakage, thermostat failures, and compressor breakdown.',
    packages: [
      { id: 'ref-1', title: 'Fridge Checkup & Repair Inspection', price: 299, originalPrice: 399, duration: '30 Mins', description: 'Thorough diagnosis of cooling coil, defrost timer, relay, thermostat, and compressor.' },
      { id: 'ref-2', title: 'Refrigerator Gas Charging', price: 1499, originalPrice: 1899, duration: '60 Mins', description: 'Gas leak fixing, capillary flushing, filter replacement, and eco-friendly gas filling.' },
      { id: 'ref-3', title: 'Thermostat / Relay / Defrost Repair', price: 499, originalPrice: 699, duration: '45 Mins', description: 'Replacement of faulty temperature controller, defrost sensor, or starter relay.' }
    ],
    issues: [
      { title: 'Fridge Freezing Everything in Fresh Food Area', startingPrice: 299 },
      { title: 'Freezer Cold But Lower Section Not Cooling', startingPrice: 399 },
      { title: 'Water Accumulation Under Fridge', startingPrice: 249 },
      { title: 'Compressor Making Loud Noise', startingPrice: 499 }
    ],
    faqs: [
      { q: 'What brands of refrigerators do you fix?', a: 'We repair LG, Samsung, Whirlpool, Godrej, Haier, Bosch, Panasonic, and all major brands.' },
      { q: 'How long does a fridge gas refill take?', a: 'Gas charging and leak detection usually take 45 to 60 minutes at your doorstep.' }
    ]
  },
  {
    id: 'washing-machine',
    slug: 'washing-machine',
    name: 'Washing Machine Repair',
    category: 'appliance',
    iconName: 'Shirt',
    shortDesc: 'Top load & front load washer motor, drum, drain pump, & motherboard repair.',
    startingPrice: 299,
    rating: 4.9,
    reviewCount: 3100,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1200&q=80',
    description: 'Doorstep repair and deep scaling service for fully automatic top load, front load, and semi-automatic washing machines with genuine replacement parts.',
    packages: [
      { id: 'wm-1', title: 'Washing Machine Diagnostic', price: 299, originalPrice: 399, duration: '30 Mins', description: 'Complete testing of drive motor, drum belt, water inlet valve, drain pump, and control board.' },
      { id: 'wm-2', title: 'Deep Descaling & Drum Service', price: 499, originalPrice: 699, duration: '45 Mins', description: 'Removal of lint, limescale, bad odors, and drum balancing check for smooth spin cycles.' },
      { id: 'wm-3', title: 'Drain Pump & Valve Replacement', price: 599, originalPrice: 799, duration: '45 Mins', description: 'Fixing water drainage issues and water overflow errors.' }
    ],
    issues: [
      { title: 'Machine Not Spinning or Shaking Excessively', startingPrice: 299 },
      { title: 'Water Not Draining Out', startingPrice: 299 },
      { title: 'Error Code Displayed on Panel', startingPrice: 349 },
      { title: 'Loud Grinding Noise During Wash Cycle', startingPrice: 399 }
    ],
    faqs: [
      { q: 'Do you fix front-loading washer error codes?', a: 'Yes, our technicians are trained in diagnosing PCB circuit errors for IFB, Bosch, LG, and Samsung front-load washers.' }
    ]
  },
  {
    id: 'air-cooler',
    slug: 'air-cooler',
    name: 'Air Cooler Repair',
    category: 'appliance',
    iconName: 'Fan',
    shortDesc: 'Desert & personal cooler pump replacement, motor rewinding, & pad change.',
    startingPrice: 199,
    rating: 4.7,
    reviewCount: 1420,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1590725140246-20acddc1f711?auto=format&fit=crop&w=1200&q=80',
    description: 'Keep cool with quick doorstep service for desert coolers, tower coolers, and window coolers. We replace water pumps, honey-comb cooling pads, fan motors, and fan blades.',
    packages: [
      { id: 'acool-1', title: 'Cooler Full Service & Cleaning', price: 299, originalPrice: 399, duration: '30 Mins', description: 'Tank descaling, water line flush, pump testing, and motor lubrication.' },
      { id: 'acool-2', title: 'Submersible Water Pump Change', price: 249, originalPrice: 349, duration: '20 Mins', description: 'Fitting high-flow copper submersible pump for maximum water distribution.' },
      { id: 'acool-3', title: 'Cooler Fan Motor Repair / Change', price: 449, originalPrice: 599, duration: '45 Mins', description: 'High-speed motor rewinding or new motor installation.' }
    ],
    issues: [
      { title: 'Cooler Throwing Warm Air / Pump Not Working', startingPrice: 199 },
      { title: 'Fan Not Rotating / Hummer Sound', startingPrice: 249 },
      { title: 'Water Leakage From Tank', startingPrice: 199 }
    ],
    faqs: [
      { q: 'Do you provide new honeycomb pads?', a: 'Yes, we supply and fit high-density Aspen and Honeycomb pads on demand.' }
    ]
  },
  {
    id: 'geyser',
    slug: 'geyser',
    name: 'Geyser & Water Heater',
    category: 'appliance',
    iconName: 'Flame',
    shortDesc: 'Electric & gas geyser element replacement, thermostat fix, & descaling.',
    startingPrice: 249,
    rating: 4.8,
    reviewCount: 1950,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=80',
    description: 'Safe and instant doorstep geyser repair for storage electric geysers, instant geysers, and gas water heaters. Heating element change, thermostat safety check, and tank descaling.',
    packages: [
      { id: 'gey-1', title: 'Geyser Checkup & Inspection', price: 249, originalPrice: 349, duration: '30 Mins', description: 'Diagnosis of heating coil, thermal cut-out, safety valve, and wiring.' },
      { id: 'gey-2', title: 'Heating Element & Thermostat Replacement', price: 499, originalPrice: 699, duration: '45 Mins', description: 'Heavy-duty copper heating element installation with safety thermostat.' },
      { id: 'gey-3', title: 'Geyser Tank Descaling & Flush', price: 399, originalPrice: 549, duration: '45 Mins', description: 'Removal of heavy mineral deposits and hard water scale to improve heating speed.' }
    ],
    issues: [
      { title: 'Water Not Heating / Takes Too Long', startingPrice: 249 },
      { title: 'Geyser Tripping Main MCB Box', startingPrice: 299 },
      { title: 'Water Leakage From Geyser Body', startingPrice: 249 }
    ],
    faqs: [
      { q: 'Is it dangerous if geyser leaks water?', a: 'Yes, water leaking near electrical terminals can cause short circuits. Turn off the power supply immediately and book a technician.' }
    ]
  },
  {
    id: 'microwave',
    slug: 'microwave',
    name: 'Microwave Oven Repair',
    category: 'appliance',
    iconName: 'Microwave',
    shortDesc: 'Solo, grill, & convection microwave magnetron, glass plate, & touchpad fix.',
    startingPrice: 249,
    rating: 4.7,
    reviewCount: 1680,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=1200&q=80',
    description: 'Fast doorstep repair for solo, grill, and convection microwaves. We fix non-heating issues, spark/arcing inside chamber, dead display panels, and broken glass turntables.',
    packages: [
      { id: 'mw-1', title: 'Microwave Diagnostic & Inspection', price: 249, originalPrice: 349, duration: '30 Mins', description: 'Safety insulation check, high voltage transformer, magnetron, and door switch test.' },
      { id: 'mw-2', title: 'Magnetron Replacement', price: 899, originalPrice: 1199, duration: '45 Mins', description: 'Original high-power magnetron installation for instant heating.' },
      { id: 'mw-3', title: 'Touchpad Membrane / Control Panel Fix', price: 499, originalPrice: 699, duration: '45 Mins', description: 'Keypad repair or display board replacement.' }
    ],
    issues: [
      { title: 'Microwave Running But Not Heating Food', startingPrice: 249 },
      { title: 'Sparks / Arcing Smoke Inside Oven', startingPrice: 299 },
      { title: 'Glass Plate Not Rotating', startingPrice: 199 }
    ],
    faqs: [
      { q: 'Why is microwave making a hum noise but not heating?', a: 'This is usually caused by a failed high-voltage magnetron or diode. Our technician can replace it in 30 minutes.' }
    ]
  },
  {
    id: 'ro-purifier',
    slug: 'ro-purifier',
    name: 'RO Water Purifier',
    category: 'appliance',
    iconName: 'Droplets',
    shortDesc: 'Filter replacement, membrane change, UV lamp fix, & TDS calibration.',
    startingPrice: 299,
    rating: 4.9,
    reviewCount: 2940,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=1200&q=80',
    description: 'Pure drinking water guaranteed with our doorstep RO service. Filter replacement (Sediment, Pre-carbon, Post-carbon), RO membrane, UV lamp, and booster pump repairs for Kent, Aquaguard, Pureit, etc.',
    packages: [
      { id: 'ro-1', title: 'RO Complete Filter Service Kit', price: 799, originalPrice: 1099, duration: '45 Mins', description: 'Includes Pre-filter candle, Sediment filter, Carbon filter, and sanitization of water storage tank.' },
      { id: 'ro-2', title: 'RO Membrane & Mineralizer Replacement', price: 999, originalPrice: 1399, duration: '45 Mins', description: 'High GPD membrane fitting with TDS balancer to retain natural essential minerals.' },
      { id: 'ro-3', title: 'Booster Pump & Adapter Repair', price: 599, originalPrice: 799, duration: '30 Mins', description: 'Fixing low water pressure and booster pump leakage.' }
    ],
    issues: [
      { title: 'Bad Water Taste / High TDS Level', startingPrice: 299 },
      { title: 'Water Tank Not Filling / Slow Drop Flow', startingPrice: 299 },
      { title: 'Continuous Water Leakage From Purifier', startingPrice: 249 }
    ],
    faqs: [
      { q: 'When should RO filters be replaced?', a: 'Pre-filters should be replaced every 3–6 months, while main RO membranes should be changed every 12–18 months depending on water hardness.' }
    ]
  },
  {
    id: 'kitchen-chimney',
    slug: 'kitchen-chimney',
    name: 'Kitchen Chimney Service',
    category: 'appliance',
    iconName: 'UtensilsCrossed',
    shortDesc: 'Deep chemical degreasing, baffle filter wash, suction motor repair.',
    startingPrice: 399,
    rating: 4.8,
    reviewCount: 1820,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    description: 'Restore 100% kitchen suction with deep chemical cleaning for auto-clean, ductless, and baffle filter chimneys. We clean heavy grease, carbon deposits, and repair blower motors.',
    packages: [
      { id: 'chim-1', title: 'Kitchen Chimney Deep Chemical Cleaning', price: 599, originalPrice: 799, duration: '60 Mins', description: 'Complete dismantling, caustic chemical degreasing of filters, blower wheel, and oil collector tray.' },
      { id: 'chim-2', title: 'Chimney Repair & Blower Motor Servicing', price: 399, originalPrice: 549, duration: '45 Mins', description: 'Fixing weak suction power, high vibration noise, or touch control panel fault.' }
    ],
    issues: [
      { title: 'Low Suction Power / Smoke Accumulation', startingPrice: 399 },
      { title: 'Oil Dripping From Chimney Body', startingPrice: 349 },
      { title: 'Touch Control / Motion Sensor Not Working', startingPrice: 299 }
    ],
    faqs: [
      { q: 'Why is my chimney leaking oil onto the stove?', a: 'Oil collectors and baffle filters become saturated over time. A deep chemical cleaning removes all trapped oil and sludge.' }
    ]
  },
  {
    id: 'inverter',
    slug: 'inverter',
    name: 'Inverter & Battery Repair',
    category: 'appliance',
    iconName: 'Zap',
    shortDesc: 'Home inverter PCB repair, battery backup check, & distilled water topping.',
    startingPrice: 299,
    rating: 4.8,
    reviewCount: 1540,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1558441719-6705546fe3a2?auto=format&fit=crop&w=1200&q=80',
    description: 'Uninterrupted power supply for your home! We repair all home inverters (Luminous, Microtek, Exide, Su-Kam) and test tubular battery gravity, terminal corrosion, and charging circuits.',
    packages: [
      { id: 'inv-1', title: 'Inverter & Battery Health Checkup', price: 299, originalPrice: 399, duration: '30 Mins', description: 'Specific gravity test of battery acid, charging voltage check, and terminal cleaning.' },
      { id: 'inv-2', title: 'Inverter Main Board / PCB Repair', price: 599, originalPrice: 799, duration: '45 Mins', description: 'MOSFET replacement, relay fix, and transformer repair.' }
    ],
    issues: [
      { title: 'Inverter Not Charging Battery', startingPrice: 299 },
      { title: 'Overload Alarm Beeping Continuously', startingPrice: 299 },
      { title: 'Short Battery Backup Time', startingPrice: 249 }
    ],
    faqs: [
      { q: 'How often should battery water be topped up?', a: 'Check battery water levels every 2 to 3 months and top up with pure distilled water only.' }
    ]
  },
  {
    id: 'atta-chakki',
    slug: 'atta-chakki',
    name: 'Atta Chakki Repair',
    category: 'appliance',
    iconName: 'Wheat',
    shortDesc: 'Domestic flour mill stone grinding, motor repair, & hopper adjustment.',
    startingPrice: 299,
    rating: 4.7,
    reviewCount: 980,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    description: 'Expert repair for domestic home flour mills (Atta Chakki). Stone dress-up, belt replacement, motor vibration fix, and fine flour grinding adjustment.',
    packages: [
      { id: 'chakki-1', title: 'Atta Chakki Servicing & Stone Dressing', price: 399, originalPrice: 549, duration: '45 Mins', description: 'Cleaning grinding chamber, stone sharpening/grooving, and alignment check.' },
      { id: 'chakki-2', title: 'Chakki Motor & Capacitor Repair', price: 349, originalPrice: 499, duration: '30 Mins', description: 'Fixing motor jam, overload protector trip, and capacitor change.' }
    ],
    issues: [
      { title: 'Flour Coming Out Coarse / Not Fine', startingPrice: 299 },
      { title: 'Motor Jammed / Not Rotating', startingPrice: 299 },
      { title: 'Vibration & Burning Odor', startingPrice: 349 }
    ],
    faqs: [
      { q: 'Do you repair automatic domestic chakki models?', a: 'Yes, we repair Natraj, Microactive, Laxmi, and all fully automatic domestic flour mills.' }
    ]
  },
  {
    id: 'electrician',
    slug: 'electrician',
    name: 'Electrician Services',
    category: 'electrician',
    iconName: 'PlugZap',
    shortDesc: 'Switchboard wiring, MCB tripping fix, ceiling fan, & LED light installation.',
    startingPrice: 149,
    rating: 4.9,
    reviewCount: 4210,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    description: 'Certified, background-checked electricians for home wiring, short circuit repair, MCB replacement, chandelier installation, and appliance points.',
    packages: [
      { id: 'elec-1', title: 'Switch / Socket Installation & Repair', price: 149, originalPrice: 199, duration: '20 Mins', description: 'Replacement or new installation of modular switch, socket, or dimmer.' },
      { id: 'elec-2', title: 'MCB / Fuse Box Tripping Fix', price: 299, originalPrice: 399, duration: '30 Mins', description: 'Short circuit tracking, phase balancing, and main distribution box repair.' },
      { id: 'elec-3', title: 'Ceiling Fan / Chandelier Fitting', price: 199, originalPrice: 299, duration: '30 Mins', description: 'Secure ceiling hook mounting, fan regulator connection, and testing.' }
    ],
    issues: [
      { title: 'Complete House Power Outage / Short Circuit', startingPrice: 299 },
      { title: 'Sparking in Switchboard or Wall Plug', startingPrice: 149 },
      { title: 'Fan Running Slow / Capacitor Change', startingPrice: 149 }
    ],
    faqs: [
      { q: 'Are your electricians licensed?', a: 'Yes, all our electricians are certified with rigorous background verification.' }
    ]
  },
  {
    id: 'plumber',
    slug: 'plumber',
    name: 'Plumbing Services',
    category: 'plumber',
    iconName: 'Wrench',
    shortDesc: 'Tap leak repair, drain block clearance, pipe fitting, & bathroom fixture install.',
    startingPrice: 149,
    rating: 4.9,
    reviewCount: 3890,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Prompt plumbing solutions for tap leakages, clogged drainage pipes, water tank cleaning, washbasin fitting, and sanitaryware installations.',
    packages: [
      { id: 'plumb-1', title: 'Tap & Mixer Leakage Repair', price: 149, originalPrice: 199, duration: '20 Mins', description: 'Wasper/spindle change, thread sealing, or new faucet installation.' },
      { id: 'plumb-2', title: 'Drainage Pipe Blockage Clearance', price: 349, originalPrice: 499, duration: '40 Mins', description: 'Removal of hair, debris, and grease blockages in kitchen sink or bathroom drain.' },
      { id: 'plumb-3', title: 'Overhead Water Tank Cleaning', price: 699, originalPrice: 999, duration: '60 Mins', description: 'Submersible sludge removal, high pressure wall scrub, and anti-bacterial spray.' }
    ],
    issues: [
      { title: 'Continuous Dripping Water Tap', startingPrice: 149 },
      { title: 'Blocked Kitchen Sink / Bathroom Floor Drain', startingPrice: 349 },
      { title: 'Flush Tank Not Filling or Overflowing', startingPrice: 249 }
    ],
    faqs: [
      { q: 'Do you bring plumbing spare parts?', a: 'Yes, our plumbers carry standard brass fittings, CPVC pipes, teflon tapes, and washers.' }
    ]
  }
];
