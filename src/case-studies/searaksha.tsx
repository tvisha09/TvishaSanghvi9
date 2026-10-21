import {
  BarChart,
  Callout,
  Cards,
  Chapter,
  Crop,
  Gallery,
  Label,
  Lead,
  Prose,
  Split,
  Stats,
  Steps,
  Table,
} from "@/components/case/Case";
import {
  Donut,
  Donuts,
  Flow,
  Layers,
  Matrix,
  Palette,
  Persona,
  Pictogram,
  RatedConcepts,
  Rings,
  TypeSpecimen,
} from "@/components/case/Diagrams";
import Phones from "@/components/case/Phones";
import SeaArt from "./SeaScene";
import { getProject } from "@/data/projects";
import styles from "./searaksha.module.css";

/*
 * SeaRaksha, told as a web case study rather than a deck. Copy and data are
 * transcribed from the original Capstone 2025 slides; crops reuse the
 * original artwork (photos, renders, sketches) where it can't be rebuilt.
 */

const plates = getProject("searaksha")?.plates ?? [];
/** Slide n of the original deck (1-based). */
const slide = (n: number) => plates[n - 1];

/*
 * The brand's own typefaces, Poppins and Roboto, are loaded once at the root
 * (src/app/layout.tsx) as CSS variables; this theme class just opts the page
 * into them via searaksha.module.css.
 */

/** Class for the project page, so the hero picks up the identity too. */
export const theme = styles.theme;

const brandColors = [
  { name: "Navy", hex: "#2E4078" },
  { name: "Cyan", hex: "#3BB7D8" },
  { name: "Ice", hex: "#E6F7FB" },
  { name: "Coral", hex: "#F4CFC4" },
];

/** Opening band in the brand's colours, built around the logo. */
function Brand() {
  return (
    <section className={styles.brand} aria-label="SeaRaksha identity">
      <div className={styles.bubbles} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={styles.logo}>
        <Crop
          {...slide(48)}
          box={{ x: 26, y: 54.5, w: 46, h: 36 }}
          alt="SeaRaksha logo: the wordmark sea रक्षा beside a shield with a fishing boat"
          framed={false}
        />
      </div>
      <div className={styles.brandText}>
        <p className={styles.brandKicker}>Sea + रक्षा / protection</p>
        <p className={styles.brandLine}>A safety net for the people who work the sea.</p>
        <p className={styles.brandNote}>
          The shield holds a small fishing boat on the waves: the boats this is built for, under watch. Navy for the
          deep sea, cyan for the shallows they fish.
        </p>
        <ul className={styles.brandChips}>
          {brandColors.map((c) => (
            <li key={c.hex}>
              <i style={{ background: c.hex }} />
              {c.name} {c.hex}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function SeaRakshaCase() {
  return (
    <>
      <Brand />
      <Chapter n="01" title="Context" kicker="Life on the shoreline">
        <Lead>
          Small-scale fishermen form the backbone of coastal livelihoods in India, contributing significantly to local
          economies and food security.
        </Lead>
        <Prose>
          <p>
            Despite their vital role, they face numerous challenges, from unpredictable weather and declining fish
            stocks to lack of access to modern technology, navigation tools, and market information.
          </p>
        </Prose>
        <Stats
          items={[
            {
              value: "10,000+",
              label: "Deaths a year",
              note: "in fishing-related accidents, more than triple earlier estimates. Many were preventable.",
            },
            {
              value: "< 10 nm",
              label: "Small-boat range",
              note: "Small boats work within ten nautical miles of shore, with 1 to 5 people aboard.",
            },
            {
              value: "120–200 kg",
              label: "Small-boat catch",
              note: "Typical catch capacity, often with no fish hold, only boxes and baskets.",
            },
          ]}
        />
        <Split>
          <Crop
            {...slide(2)}
            box={{ x: 6, y: 18, w: 47, h: 52 }}
            alt="Map of India's fishing zones: the 200 nautical mile EEZ, 200 to 400 nm, and beyond 400 nm, with boat types by zone"
            caption="Fishing zones around India and the boats that work them"
          />
          <Prose>
            <p>
              Most fatalities are caused by a lack of safety equipment, and no navigation or signal to send to the
              shore. The smallest boats, the ones that work closest to shore with the fewest resources, are the most
              exposed.
            </p>
          </Prose>
        </Split>
        <Label>Boats by size</Label>
        <Table
          head={["", "Small boats", "Medium boats", "Large boats"]}
          rows={[
            ["Length", "5.5–10.0 m", "7.5–15.0 m", "11.0–25.0 m"],
            ["Engine", "None, outboard or inboard", "Inboard", "Inboard"],
            ["Power", "2–10 hp", "50–200 hp", "100 hp and above"],
            ["Fish hold", "None; boxes and baskets", "Ordinary hold", "Insulated or refrigerated"],
            ["Catch capacity", "120–200 kg", "200–2,000 kg", "1,000 kg and above"],
            ["Crew", "1–5 people", "2–7 people", "5–20 people"],
            ["Time at sea", "A few hours to half a day", "Half a day to 1.5 days", "1 day to 1.5 weeks"],
            ["Operating zone", "< 10 nm from shore", "< 30 nm", "> 30 nm"],
          ]}
        />
      </Chapter>

      <Chapter n="02" title="The state of the sea" kicker="Secondary research">
        <Prose>
          <p>
            In 2022 the Central Marine Fisheries Research Institute ran India’s first stock assessment, evaluating{" "}
            <strong>135 fish stocks covering 70 species</strong>, 49 finfish and 21 shellfish. It found 91.1% of
            stocks healthy, but the pressure is visible: overfished stocks, rising catches across the region, and
            pollution events like the mass fish death in Pune’s rivers.
          </p>
        </Prose>
        <BarChart
          title="Health of 135 Indian fish stocks (CMFRI, 2022)"
          data={[
            { label: "Sustainable", value: 86.7 },
            { label: "Overfished", value: 8.2 },
            { label: "Subject to overfishing", value: 4.4 },
            { label: "Rebuilding", value: 0.7 },
          ]}
          max={100}
          caption="Overfished: sharks, lobsters, thinspine catfish, tigertooth croaker. Subject to overfishing: eels, tuna, cuttlefish."
        />
      </Chapter>

      <Chapter n="03" title="Process" kicker="A double diamond, from not knowing to knowing">
        <Steps
          items={[
            { title: "Discover", text: "Research. Finalise the topic and brief; primary and secondary research." },
            { title: "Define", text: "Synthesis. Affinity mapping, covert observation, insights and how-might-we statements." },
            { title: "Develop", text: "Ideation. Ideate for each HMW, then evaluate and sequence the ideas." },
            { title: "Deliver", text: "Implement. Scenario planning, a service blueprint and prototypes." },
          ]}
        />
      </Chapter>

      <Chapter n="04" title="What’s missing" kicker="Gaps in existing research and tools">
        <Cards
          items={[
            {
              title: "Training & digital literacy",
              text: "Even where tools exist, from mobile apps to digital fish finders, many fishermen lack the confidence, literacy or familiarity to use them.",
            },
            {
              title: "Localised fishing-ground data",
              text: "Most rely on generational knowledge, bird movement or trial and error. Scientific data isn’t granular, real-time, or available in simple local formats.",
            },
            {
              title: "Market blind spots",
              text: "Fishermen rarely know real-time prices or demand, and rely on middlemen who underpay.",
            },
            {
              title: "Contextual weather",
              text: "Forecasts are too broad (city-level) or too technical (wave height, currents). Nothing combines micro-weather, sea state and local knowledge.",
            },
            {
              title: "Safety & rescue networks",
              text: "No easy distress tools: most small boats lack VHF radios or GPS beacons, and rescue is split between marine police, coast guard and informal alerts.",
            },
          ]}
        />
      </Chapter>

      <Chapter n="05" title="Who’s involved" kicker="Stakeholder map">
        <Rings
          center="Small-scale fishermen"
          levels={[
            {
              name: "Primary",
              text: "Small-scale fishermen, whose daily experiences, challenges and decisions directly shape the research.",
              items: [],
            },
            {
              name: "Secondary",
              text: "People indirectly affected by, or influencing, the fishing ecosystem.",
              items: [
                { label: "Families", angle: -40 },
                { label: "Consumers", angle: 140 },
              ],
            },
            {
              name: "Tertiary",
              text: "Those more distantly connected who shape the wider systems around fishing communities.",
              items: [
                { label: "Government", angle: -140 },
                { label: "Tech providers", angle: 180 },
                { label: "Policy makers", angle: 40 },
                { label: "Indian Coast Guard", angle: 105 },
              ],
            },
          ]}
        />
      </Chapter>

      <Chapter
        n="06"
        title="On the ground"
        kicker="Primary research in Versova, Juhu and Santacruz"
        art={<SeaArt scene="line" title="A fisherman in a bucket hat fishing with a line from a long teal boat" />}
      >
        <Stats
          items={[
            { value: "82", label: "Interviews", note: "across three fishing villages in Mumbai" },
            { value: "44", label: "Fishermen" },
            { value: "32", label: "Fisherwomen & sellers" },
            { value: "06", label: "Fisherkids" },
          ]}
        />
        <Pictogram
          groups={[
            { label: "Fishermen", count: 44, tone: 1 },
            { label: "Fisherwomen / sellers", count: 32, tone: 2 },
            { label: "Fisherkids", count: 6, tone: 3 },
          ]}
        />
        <Gallery columns={3}>
          <Crop {...slide(8)} box={{ x: 12.4, y: 12.7, w: 15.4, h: 17.4 }} alt="Interviewing a fishing family at home" />
          <Crop {...slide(8)} box={{ x: 31.7, y: 12.7, w: 15.4, h: 17.4 }} alt="Interview with four people seated on a sofa" />
          <Crop {...slide(8)} box={{ x: 12.4, y: 33.5, w: 15.4, h: 17.4 }} alt="Interviewing fisherwomen at home" />
          <Crop {...slide(8)} box={{ x: 12.4, y: 54.5, w: 15.4, h: 17.4 }} alt="Group interview on a bench against blue walls" />
          <Crop {...slide(8)} box={{ x: 12.4, y: 75.3, w: 15.4, h: 17.4 }} alt="Interview with four fishermen" />
        </Gallery>
        <Label>What the interviews revealed</Label>
        <Donuts>
          <Donut part={82} total={82} text="have all fished at locations passed down through their families." />
          <Donut part={12} total={82} text="have actually spent time researching fish patterns; the other 70 haven’t." />
          <Donut part={67} total={82} text="have at least once swum or rowed back to shore, even with an engine on board." />
        </Donuts>
      </Chapter>

      <Chapter
        n="07"
        title="Insights"
        kicker="What we heard, distilled"
        art={<SeaArt scene="net" title="A fisherman hauling a net into a green boat" />}
      >
        <Cards
          items={[
            {
              title: "They don’t fear the sea, they fear not returning",
              text: "Despite years of experience, many feel vulnerable without a way to signal for help or know their exact location in an emergency.",
            },
            {
              title: "Knowledge travels by word of mouth",
              text: "Fishing grounds and safety alerts are shared informally. A tool should build on local knowledge while making it more accurate.",
            },
            {
              title: "The catch has fallen",
              text: "Women now travel all the way to Colaba and the docks, where catch is higher, to buy cheaper and sell on.",
            },
            {
              title: "Restricted zones are a constant fear",
              text: "Drifting into navy zones or international waters can mean arrests or fines, and there are no clear boundary alerts.",
            },
            {
              title: "Right place, right time",
              text: "Catch quality depends on fish availability patterns, sea currents and what other boats are doing.",
            },
            {
              title: "Fuel is the biggest cost",
              text: "Poor navigation means inefficient trips. Better routes could significantly cut daily spending.",
            },
          ]}
        />
        <Label>Primary gaps</Label>
        <Table
          head={["Gap", "Why it matters"]}
          rows={[
            ["Route optimisation", "No guidance on fuel-efficient or time-saving routes; unnecessary fuel hurts margins and sustainability."],
            ["Battery & power", "Boats have no charging; any electronics need long battery life, solar support or very low power draw."],
            ["Navigation & positioning", "No reliable, low-cost GPS leaves fishermen disoriented in poor visibility or unfamiliar water."],
          ]}
        />
      </Chapter>

      <Chapter n="08" title="People" kicker="Two personas from the interviews">
        <Persona
          name="Jayu Mehta"
          role="Experienced fisherman"
          quote="The sea has taught me everything, but sometimes it turns in seconds. I don’t need fancy tech, just something I can trust when things go wrong."
          facts={[
            ["Age", "47"],
            ["From", "Versova, Mumbai"],
            ["Education", "12th pass"],
            ["At sea", "25+ years"],
          ]}
          bio="A seasoned fisherman who relies on traditional knowledge and a basic phone to navigate, but struggles with unpredictable weather and limited safety tools. He values simple, reliable solutions that help him get home safely."
          goals={[
            "Provide a steady income for his family",
            "Train his son to carry on the family tradition",
            "Avoid risky areas and stay safe in rough weather",
            "Maximise daily catch by finding the right zones",
            "Return home safely every day",
          ]}
          frustrations={[
            "Can’t predict sudden weather changes",
            "No reliable GPS or navigation tools",
            "Gets disoriented in fog or at night",
            "Relies on radio or word of mouth for weather",
            "Anxious in emergencies with no support",
            "Finds complex devices and apps hard to use",
          ]}
          traits={[
            { label: "Resourceful", value: 67 },
            { label: "Compassionate", value: 91 },
            { label: "Organised", value: 77 },
          ]}
          photo={{ ...slide(13), box: { x: 13.3, y: 13, w: 9.7, h: 17.8 } }}
        />
        <Persona
          name="Jayshree Patil"
          role="Fish seller & homemaker"
          quote="I wake up before dawn to sell fish, but my mind is always at sea with my husband."
          facts={[
            ["Age", "44"],
            ["From", "Mumbai"],
            ["Education", "10th pass"],
            ["Works", "Local fish markets"],
          ]}
          bio="Married to a fisherman, she sells the daily catch at local markets while managing the household and its finances. With only a basic phone, she often feels anxious while her husband is at sea."
          goals={[
            "Support the family income by selling fish",
            "Make sure her husband and son return safely",
            "Save for her children’s education and health",
            "Run the household and its daily expenses",
          ]}
          frustrations={[
            "No real-time updates on her husband’s location or safety",
            "No visibility or control when emergencies happen at sea",
            "Fish prices swing unpredictably; income is unstable",
          ]}
          traits={[
            { label: "Resourceful", value: 67 },
            { label: "Compassionate", value: 98 },
            { label: "Organised", value: 100 },
          ]}
          photo={{ ...slide(14), box: { x: 12.9, y: 11.7, w: 9.7, h: 18.5 } }}
        />
      </Chapter>

      <Chapter n="09" title="Framing" kicker="From problem to vision">
        <Callout label="Problem statement">
          Small-scale fishermen in Mumbai face high risks at sea due to a lack of real-time weather, navigation and
          emergency tools. Existing solutions are often expensive, complex or unreliable.
        </Callout>
        <Callout label="How might we">
          How might we create an affordable, weatherproof safety and navigation toolkit that delivers real-time weather
          and location alerts, works offline, and ensures easy access to emergency services for coastal fishermen?
        </Callout>
        <Label>Objectives</Label>
        <Cards
          columns={2}
          items={[
            {
              title: "Affordable & weather-resistant",
              text: "Design and develop an affordable, weather-resistant navigation and safety device for small-scale fishermen in Mumbai.",
            },
            {
              title: "SOS that always gets through",
              text: "Let fishermen send distress signals to nearby boats or rescue services, even in low-connectivity zones.",
            },
            {
              title: "Built for every literacy level",
              text: "Support low-literate and non-digital users through audio alerts, iconography and physical simplicity.",
            },
            {
              title: "30% fewer incidents",
              text: "Reduce accidents, missed routes and lost vessels by at least 30% during the pilot phase.",
            },
          ]}
        />
        <Callout label="Product vision">
          To empower small-scale fishermen with an affordable, easy-to-use navigation and safety device that delivers
          real-time weather alerts, offline location guidance and emergency connectivity, helping them return home
          safely, every time they go to sea.
        </Callout>
      </Chapter>

      <Chapter n="10" title="System" kicker="Who exchanges what, and how data moves">
        <Label>System architecture</Label>
        <Layers
          items={[
            { title: "Artefacts", text: "The device, the app and the dockside touchpoints people actually use." },
            { title: "Data flow", text: "How positions, alerts and sea data travel between boat, shore and services." },
            { title: "Tech plan", text: "GNSS positioning, cellular and satellite fallback, peer-to-peer mesh between boats." },
            { title: "Data points", text: "The raw inputs each scenario needs, mapped below." },
          ]}
        />
        <Label>Data points by scenario</Label>
        <Table
          head={["Scenario", "Data needed"]}
          rows={[
            [
              "Drifting toward a navy zone",
              "Geofences of restricted zones with a 1–2 km warning buffer; live GPS/NavIC position, heading drift and speed; fog and visibility; nearby landmarks and buoys.",
            ],
            ["Low catch, high fuel burn", "Historical fish density and seasonal movement; fuel cost per litre and the minimum catch to break even."],
            [
              "Anxious waiting at the harbour",
              "Estimated return time and last known position for each boat; check-ins and emergency status; family contacts and alert groups.",
            ],
            [
              "Peer-to-peer rescue at sea",
              "Position, distance and heading of nearby helper boats; exact location and status of the boat in distress.",
            ],
          ]}
        />
        <Split reverse>
          <Crop
            {...slide(22)}
            box={{ x: 55, y: 24, w: 40, h: 49 }}
            alt="Line drawing of a mesh network at sea: boats linked to each other, relay buoys and a shore base station"
            caption="Boats relay to each other and to shore, 0.5–1 nautical miles apart"
          />
          <Prose>
            <p>
              <strong>Location</strong> comes from GNSS (GPS, GLONASS, NavIC) and goes to the fisherman’s map, then on
              to a base station so family and the dock can track the boat live.
            </p>
            <p>
              <strong>Distress signals</strong> are triggered by hand or automatically on capsize, high impact or
              engine stall, and travel by satellite or cellular to the coast guard, navy and marine police, with a
              peer-to-peer signal to nearby boats.
            </p>
            <p>
              <strong>Fish stock and sea data</strong> flows from fisheries departments, scientific databases and
              cooperative catch reports through the cloud to the device, shown as simple icons.
            </p>
          </Prose>
        </Split>
      </Chapter>

      <Chapter
        n="11"
        title="Filtering"
        kicker="30 concepts, narrowed down to 3"
        art={<SeaArt scene="basket" title="A fisherman sorting fish from a round basket in the water" />}
      >
        <Lead>30 device concepts, narrowed down to 3 on the following parameters.</Lead>
        <Steps
          items={[
            { title: "Range vs. infrastructure", text: "How far it can reach, and how little it leans on towers and power." },
            { title: "Portability vs. ease of use", text: "Whether it fits a small boat, and a fisherman can use it without training." },
            { title: "Cost vs. reliability", text: "Affordable for small-scale fishermen, with a power source that holds up." },
            { title: "Maintenance vs. durability", text: "Survives salt, spray and knocks, with little upkeep." },
          ]}
        />
        <Prose>
          <p>
            Each round plotted the concepts on a 2×2 against two of these. Only those in the ideal quadrant, shown
            in navy, moved on.
          </p>
        </Prose>
        <Matrix
          round="Round 01 / 30 concepts"
          title="Range vs. infrastructure"
          y={{ label: "Communication range", low: "Low", high: "High" }}
          x={{ label: "Dependency on infrastructure", low: "Low", high: "High" }}
          ideal="tl"
          items={{
            tl: ["Magnetic Compass Disk", "Compact Satellite Pager", "Dockside Charging Rail", "Underwater Acoustic Beacon", "Smartphone Mesh Add-on"],
            tr: ["Hull Vibration Sensor Pod", "Solar Drone Relay", "Skyflare Drone Lantern", "Holographic Projector", "Solar Mini Radar", "Voice-Guided Compass", "Smart Float Beacon", "Throwable Smart Disk"],
            bl: ["Smart Rope Sensor Line", "Solar Flagpole Beacon", "Hand-Crank Radio + GPS", "Sonar Wristband", "Fishing Net Beacon", "Mast Sensor Pod"],
            br: ["Laser Beacon", "Dockside Bulletin Board", "Dockside Signal Lamp", "Solar Mesh Console", "Weather Capsule Tag", "Mesh Pendant", "Throwable Light Beacon", "Inflatable Buoy", "Boat-to-Boat Chat", "Dockside AI Screen", "Dockside Display Board"],
          }}
        />
        <Matrix
          round="Round 02 / 30 concepts"
          title="Portability vs. ease of use"
          y={{ label: "Portability / integration", low: "Low", high: "High" }}
          x={{ label: "Ease of use", low: "Low", high: "High" }}
          ideal="tr"
          items={{
            tl: ["Magnetic Compass Disk", "Throwable Smart Disk", "Hull Vibration Sensor Pod", "Holographic Projector", "Smart Float Beacon", "Solar Mini Radar", "Smart Rope Sensor Line", "Mast Sensor Pod"],
            tr: ["Inflatable Buoy", "Smartphone Mesh Add-on", "Sonar Wristband", "Dockside Charging Rail", "Compact Satellite Pager", "Hand-Crank Radio + GPS"],
            bl: ["Solar Drone Relay", "Dockside Display Board", "Solar Mesh Console", "Dockside AI Screen", "Underwater Acoustic Beacon", "Voice-Guided Compass", "Fishing Net Beacon", "Dockside Bulletin Board", "Skyflare Drone Lantern", "Solar Flagpole Beacon"],
            br: ["Laser Beacon", "Mesh Pendant", "Weather Capsule Tag", "Boat-to-Boat Chat", "Dockside Signal Lamp", "Throwable Light Beacon"],
          }}
        />
        <Matrix
          round="Round 03 / 8 shortlisted"
          title="Cost vs. power & reliability"
          y={{ label: "Cost", low: "Low", high: "High" }}
          x={{ label: "Power source & reliability", low: "Low", high: "High" }}
          ideal="bl"
          items={{
            tl: ["Sonar Wristband"],
            tr: ["Dockside Charging Rail", "Hand-Crank Radio + GPS"],
            bl: ["Inflatable Buoy", "Smartphone Mesh Add-on", "Compact Satellite Pager", "Magnetic Compass Disk"],
            br: ["Underwater Acoustic Beacon"],
          }}
        />
        <Matrix
          round="Round 04 / 4 finalists"
          title="Maintenance vs. durability"
          y={{ label: "Maintenance needs", low: "Low", high: "High" }}
          x={{ label: "Durability at sea", low: "Low", high: "High" }}
          ideal="br"
          items={{
            tl: [],
            tr: [],
            bl: ["Magnetic Compass Disk"],
            br: ["Compact Satellite Pager", "Smartphone Mesh Add-on", "Inflatable Buoy"],
          }}
        />
      </Chapter>

      <Chapter
        n="12"
        title="System concepts"
        kicker="Three directions, one taken forward"
        art={<SeaArt scene="divers" title="Two divers swimming underwater among fish" />}
      >
        <RatedConcepts
          items={[
            {
              title: "Dockside sync hub",
              text: "Shared dock infrastructure: an e-ink board and one satellite terminal that boats sync with as they leave and return.",
              image: { ...slide(40), box: { x: 5.5, y: 21, w: 39, h: 39 }, alt: "Sketch of a boat at a jetty syncing with a dockside kiosk and satellite dish" },
              ratings: [
                { label: "Coverage at sea", value: 0.45 },
                { label: "Affordability", value: 0.8 },
                { label: "Ease of use", value: 0.65 },
              ],
            },
            {
              title: "Shared dock beacons",
              text: "Palm-sized, audio-driven devices signed out daily with an RFID token and charged in solar lockers at the dock.",
              image: { ...slide(43), box: { x: 12.6, y: 29, w: 27.5, h: 53 }, alt: "Sketch of the dock beacon device with antenna, indicator and button" },
              ratings: [
                { label: "Coverage at sea", value: 0.65 },
                { label: "Affordability", value: 0.7 },
                { label: "Ease of use", value: 0.55 },
              ],
            },
          ]}
        />
      </Chapter>

      <Chapter
        n="13"
        title="The solution"
        kicker="A puck on the boat, an app in the pocket"
        art={<SeaArt scene="cast" title="A fisherman standing in a wooden boat casting a wide net" />}
      >
        <Lead>
          The puck put the intelligence on every boat: a small connectivity enhancer that pairs with the
          fisherman’s phone, and an app built around how fishing communities already work.
        </Lead>
        <Cards
          items={[
            { title: "Multi-constellation navigation", text: "Precise location tracking using NavIC, GPS and GLONASS." },
            { title: "Peer-to-peer mesh", text: "Boat-to-boat communication offshore, no towers needed." },
            { title: "Shore connectivity", text: "Auto-sync with dock beacons or phones for updates and safety checks." },
            { title: "Pin locations", text: "Pin a spot at sea to return to it later." },
            { title: "Equipment sharing", text: "Fishing is a tight-knit community; sharing resources is vital." },
            { title: "Attendance & licences", text: "Daily attendance and yearly licence renewals, handled in the app." },
          ]}
        />
      </Chapter>

      <Chapter n="14" title="The device" kicker="SeaRaksha IoT connectivity enhancer">
        <Split>
          <Crop
            id="/case-studies/searaksha/device.jpg"
            w={706}
            h={423}
            box={{ x: 0, y: 0, w: 100, h: 100 }}
            alt="Exploded view of the SeaRaksha puck showing the LoRaWAN chip, circular PCB and USB-C connector, with the shield emblem on the lid and dimensions: 60mm diameter, 30mm height, 15mm band width"
            caption="The SeaRaksha puck"
          />
          <Stats
            items={[
              { value: "60 mm", label: "Diameter" },
              { value: "30 mm", label: "Height" },
              { value: "₹881", label: "LoRaWAN module", note: "RAK3172 (STM32WLE5), per unit at DigiKey" },
            ]}
          />
        </Split>
        <Gallery columns={2}>
          <Crop
            id="/case-studies/searaksha/device-pucks.png"
            w={1604}
            h={997}
            box={{ x: 0, y: 0, w: 100, h: 100 }}
            alt="Three white SeaRaksha pucks in three sizes, each stamped with the shield emblem, two with USB-C charging cables, on a navy background with cyan bubbles"
            caption="The puck"
          />
          <div>
            <Gallery columns={2}>
              <Crop
                id="/case-studies/searaksha/pcb.png"
                w={279}
                h={278}
                box={{ x: 0, y: 0, w: 100, h: 100 }}
                alt="The circular PCB: a green round board with the microcontroller, LoRaWAN module and connector pads"
                caption="Circular PCB"
              />
              <Crop
                id="/case-studies/searaksha/usb-c.png"
                w={278}
                h={278}
                box={{ x: 0, y: 0, w: 100, h: 100 }}
                alt="USB 3.1 Type-C female connector board with its pinout labelled"
                caption="USB-C connector"
              />
            </Gallery>
            <Table
              head={["Part", "Spec"]}
              rows={[
                ["Radio", "RAK3172 WisDuo LoRaWAN, STM32WLE5"],
                ["Bands", "915 / 920 / 923 MHz"],
                ["Supply", "2 V – 3.6 V"],
                ["Charging", "USB 3.1 Type-C, 10 × 4 mm port"],
                ["Lead time", "12 weeks"],
              ]}
            />
          </div>
        </Gallery>
      </Chapter>

      <Chapter n="15" title="Information architecture" kicker="How people move through the app">
        <Flow
          n="01"
          title="Using the device to navigate"
          steps={[
            { label: "Home" },
            { label: "Navigation", kind: "action", branches: ["SOS emergency", "AI grading", "Pin location"] },
            { label: "Location", kind: "action", branches: ["Use old locations"] },
            { label: "Add location", kind: "action" },
            { label: "Search", kind: "action" },
            { label: "Navigate", kind: "action" },
          ]}
        />
        <Flow
          n="02"
          title="Onboarding"
          steps={[
            { label: "Onboarding" },
            { label: "Welcome", kind: "action" },
            { label: "Select language", kind: "action", branches: ["Hindi", "Marathi", "Konkani", "English"] },
            { label: "Introduction", kind: "action", branches: ["Skip"] },
            { label: "Product explanation", kind: "action" },
            { label: "Usage", kind: "action" },
            { label: "Home page", kind: "action" },
          ]}
        />
        <Flow
          n="03"
          title="Checking fish migration patterns"
          steps={[
            { label: "Home" },
            { label: "Explore categories", kind: "action" },
            { label: "Fishes", kind: "action", branches: ["Types", "Price"] },
            { label: "Check location", kind: "action", branches: ["Navigate"] },
            { label: "Save route", kind: "action" },
            { label: "Confirm", kind: "action" },
          ]}
        />
        <Flow
          n="04"
          title="Renewing licences"
          steps={[
            { label: "Home", branches: ["Profile", "Notifications", "Navigation"] },
            { label: "Renew licence", kind: "action", branches: ["Search"] },
            { label: "Check validity", kind: "action", branches: ["All licences", "Valid till", "Insurance"] },
            { label: "Closest to expire", kind: "action", branches: ["Check"] },
            { label: "Go to the page", kind: "action" },
            { label: "Government site", kind: "action" },
            { label: "Seamless request", kind: "action" },
          ]}
        />
      </Chapter>

      <Chapter n="16" title="The app" kicker="Six screens, one day at sea">
        <Phones
          screens={[
            {
              label: "Splash",
              ...slide(56),
              box: { x: 8.74, y: 20.5, w: 19.43, h: 73.77 },
              alt: "Splash screen with the SeaRaksha logo on navy",
              text: "The first thing a fisherman sees: the shield, the boat and the name, in the navy of deep water.",
              features: [
                { name: "Shield emblem", text: "Protection. A fishing boat held safe on the waves." },
                { name: "Bilingual wordmark", text: "“sea” in English, रक्षा in Devanagari: built for Mumbai’s shores." },
              ],
            },
            {
              label: "Welcome",
              ...slide(56),
              box: { x: 40.87, y: 20.41, w: 19.34, h: 73.86 },
              alt: "Welcome to SeaRaksha screen with a Get Started button",
              text: "One promise before anything is asked of them: everything they need at sea, in one place.",
              features: [
                { name: "One-line promise", text: "Navigation, safety and communication, said plainly." },
                { name: "Language first", text: "Onboarding starts with Hindi, Marathi, Konkani or English." },
                { name: "Get Started", text: "A single, large action. Nothing to read twice." },
              ],
            },
            {
              label: "Home",
              ...slide(56),
              box: { x: 72.17, y: 19.52, w: 19.78, h: 75.56 },
              alt: "Home screen: greeting, search and explore categories",
              text: "A morning greeting, then the four things that decide a day on the water.",
              features: [
                { name: "My locations", text: "Pinned fishing spots, to head straight back to a good catch." },
                { name: "Fish types & price", text: "What’s in the sea today, and what it’s worth at market." },
                { name: "Weather", text: "Conditions at a glance, before the boat leaves the shore." },
                { name: "Equipment", text: "Rent and share gear: the community already works this way." },
              ],
            },
            {
              label: "Fish & prices",
              ...slide(57),
              box: { x: 12.89, y: 15.14, w: 19.63, h: 75.4 },
              alt: "Fishes in the sea today, with prices per kg",
              text: "Today’s fish with a price per kilo, so the catch is never sold blind to a middleman.",
              features: [
                { name: "Dated daily list", text: "Prices for this morning, not last week." },
                { name: "Photo cards", text: "Recognised by sight, not by reading a name." },
                { name: "Price per kg", text: "Tilapia, trout, rohu, flounder: a fair number to bargain from." },
              ],
            },
            {
              label: "Licences",
              ...slide(57),
              box: { x: 40.19, y: 14.57, w: 20.02, h: 77.39 },
              alt: "Renew licences: boat, fishing and insurance",
              text: "Paperwork that used to mean a trip to an office, handled from the boat.",
              features: [
                { name: "Closest to expire, first", text: "The boat licence is highlighted because it’s due soonest." },
                { name: "Who signs it", text: "Each licence names its office: secretary, supervisor, admin." },
                { name: "Straight to the source", text: "Renewal hands off to the government site in one step." },
              ],
            },
            {
              label: "Navigation",
              ...slide(57),
              box: { x: 67.82, y: 15.52, w: 19.53, h: 75.02 },
              alt: "Map of Versova and Juhu with a pinned location at sea",
              text: "The coastline they know, from Versova to Juhu, with their own spots pinned out at sea.",
              features: [
                { name: "Pin location", text: "Mark a spot at sea and find the way back to it." },
                { name: "Voice", text: "Speak the destination, hear directions: hands stay on the boat." },
                { name: "Multi-constellation fix", text: "NavIC, GPS and GLONASS for accuracy offshore." },
              ],
            },
          ]}
        />
      </Chapter>

      <Chapter n="17" title="Design system" kicker="Material, tuned for the sea">
        <Palette
          colors={[
            { role: "Primary", hex: "#2E4078" },
            { role: "Secondary", hex: "#3BB7D8" },
            { role: "Tertiary", hex: "#E6F7FB" },
            { role: "Accent", hex: "#F4CFC4" },
            { role: "Neutral", hex: "#000000" },
          ]}
        />
        <TypeSpecimen
          faces={[
            { role: "Primary typeface", name: "Poppins", family: "var(--font-poppins), sans-serif", weights: ["Bold, primary text", "Medium, secondary text"] },
            { role: "Secondary typeface", name: "Roboto", family: "var(--font-roboto), sans-serif", weights: ["Regular, body text", "Light, tertiary text"] },
          ]}
          scale={[
            { style: "Header", weight: "Bold", size: "40px" },
            { style: "Sub headings", weight: "Medium", size: "28px" },
            { style: "Button text", weight: "Medium", size: "24px" },
            { style: "Body copy", weight: "Regular", size: "20px" },
            { style: "Caption", weight: "Light", size: "16px" },
          ]}
        />
        <Split>
          <Gallery columns={2}>
            <Crop {...slide(61)} box={{ x: 6.5, y: 10, w: 20.5, h: 58 }} alt="Phone with a four-column layout grid" caption="4 columns, 16px gutters" framed={false} />
            <Crop {...slide(61)} box={{ x: 30, y: 10, w: 20.5, h: 58 }} alt="Phone with an 8 by 8 pixel baseline grid" caption="8 × 8px baseline" framed={false} />
          </Gallery>
          <Table
            head={["Layout", "Value"]}
            rows={[
              ["Columns", "4 × 66px"],
              ["Gutters", "16px"],
              ["Side margins", "24px"],
              ["Module height", "176px"],
              ["Baseline grid", "8px, text on 4px"],
              ["Text colours", "#242424 headers, #2F2F2F subheads and buttons, #424242 body"],
            ]}
          />
        </Split>
      </Chapter>

      <Chapter n="18" title="User testing" kicker="Back on the boats">
        <Split>
          <Stats items={[{ value: "4.5 / 5", label: "Average rating", note: "from fishermen testing the app and device" }]} />
          <Crop
            id="/case-studies/searaksha/user-testing.webp"
            w={683}
            h={811}
            box={{ x: 0, y: 0, w: 100, h: 100 }}
            alt="Four photos of fishermen testing SeaRaksha at sunset: holding the app on a boat, two people reading it on the beach, two fishermen checking it on a jetty, and a fisherman glancing at the app at sea"
            framed={false}
          />
        </Split>
        <Table
          head={["What worked", "What can be improved"]}
          rows={[
            [
              "Multi-constellation navigation was appreciated for its accuracy, especially in poor visibility.",
              "Cost: some worried it may still be unaffordable without subsidies or co-operative ownership.",
            ],
            ["The rugged, sea-proof build got positive responses.", "No light or visual signifier that the device is switched on."],
            ["When a message reached the shore, they were relieved, “like a burden was taken off their chest”.", ""],
          ]}
        />
      </Chapter>

      <Chapter n="19" title="Business model" kicker="How SeaRaksha sustains itself">
        <Cards
          items={[
            { tag: "Partners", title: "Key partners", text: "Fishermen, local fisheries co-operatives, IoT manufacturers for GPS and SOS units." },
            { tag: "Activities", title: "Key activities", text: "Building the app and hardware, analysing sea, weather and safety data, training, and deploying with local government." },
            { tag: "Value", title: "Value proposition", text: "SOS that works offshore, low-cost offline navigation, peer alerts, and a fraction of the cost of commercial marine systems." },
            { tag: "Segments", title: "Customers", text: "Small-scale fishermen (primary) and their families (secondary, for tracking and alerts)." },
            { tag: "Channels", title: "Channels", text: "Co-operatives, maritime offices, local markets and docks, NGOs and microfinance, app stores." },
            { tag: "Relations", title: "Relationships", text: "On-ground support, training workshops, peer ambassadors, and local-language support." },
          ]}
        />
        <Table
          head={["Revenue streams", "Costs"]}
          rows={[
            ["Subscription: low monthly fee for the app and SOS connectivity", "Hardware R&D and manufacturing"],
            ["Device sales: affordable GPS + SOS units", "App development and maintenance"],
            ["Government and NGO safety grants", "Field training and deployment"],
            ["Anonymised sea data for research institutes", "Partnerships and licensing"],
          ]}
        />
      </Chapter>
    </>
  );
}
