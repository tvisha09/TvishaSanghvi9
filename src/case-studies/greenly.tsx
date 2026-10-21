import { Callout, Cards, Chapter, Crop, Gallery, Label, Lead, Prose, Split, Stats, Steps, Table } from "@/components/case/Case";
import DimmableImage from "@/components/case/DimmableImage";
import ZoomableImage from "@/components/case/ZoomableImage";
import GreenlyValueExchange from "./GreenlyValueExchange";
import { ManualIcon, MarketIcon, ProfitIcon } from "./GreenlyLegendIcons";
import { Flow, InsightEquation, Layers, Palette, TagColumns, Tree } from "@/components/case/Diagrams";
import { getProject } from "@/data/projects";
import styles from "./greenly.module.css";

/*
 * Greenly, told as a web case study rather than a board. Copy and data are
 * transcribed from the original slides; crops reuse the original photography
 * and screens where they can't be rebuilt.
 */

const plates = getProject("greenly")?.plates ?? [];
/** Slide n of the original board (1-based). */
const slide = (n: number) => plates[n - 1];

/*
 * Greenly's own typeface, Quicksand, is loaded once at the root
 * (src/app/layout.tsx) as a CSS variable; this theme class just opts the
 * page into it via greenly.module.css.
 */

/** Class for the project page, so the hero picks up the identity too. */
export const theme = styles.theme;

const brandColors = [
  { name: "Sprout", hex: "#5AA847" },
  { name: "Leaf", hex: "#78BB52" },
  { name: "Slate navy", hex: "#1E3648" },
  { name: "Pale leaf", hex: "#E8F5E0" },
];

/** Opening band in the brand's colours, built around the logo. */
function Brand() {
  return (
    <section className={styles.brand} aria-label="Greenly identity">
      <div className={styles.leaves} aria-hidden="true">
        <span />
        <span />
      </div>
      <div className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a small static brand asset, not worth next/image here */}
        <img src="/case-studies/greenly/logo.png" alt="Greenly logo: a sprout above a looped line" />
      </div>
      <div className={styles.brandText}>
        <p className={styles.brandKicker}>A greener way to grow</p>
        <p className={styles.brandLine}>Where profit, sustainability and precision cultivation meet.</p>
        <p className={styles.brandNote}>
          Two leaves sprout from a looped channel line, the nutrient loop every hydroponic system runs on. Green for
          growth, a deep slate navy for the data and discipline behind it.
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

export default function GreenlyCase() {
  return (
    <>
      <Brand />

      <Chapter n="01" title="Context" kicker="Growing without soil">
        <Lead>
          Hydroponic farming grows plants without soil, using nutrient-rich water, with precise control over growing
          conditions.
        </Lead>
        <Gallery columns={3}>
          <Crop {...slide(1)} box={{ x: 45, y: 5, w: 24.5, h: 69 }} alt="Rows of lettuce in white hydroponic channels" />
          <Crop {...slide(1)} box={{ x: 72, y: 5, w: 24, h: 36 }} alt="A greenhouse aisle lined with hydroponic lettuce" />
          <Crop {...slide(1)} box={{ x: 72, y: 43, w: 24, h: 31 }} alt="Hands lifting a lettuce plant with its roots from a channel" />
        </Gallery>
        <Prose>
          <p>
            It leads to <strong>higher yields and resource efficiency</strong>. As global demand for sustainable
            agriculture grows, hydroponics is a viable solution, particularly in{" "}
            <strong>urban areas with limited space</strong>.
          </p>
        </Prose>
        <Stats
          items={[
            { value: "13.5%", label: "Market CAGR", note: "₹671.7 billion (2022) to ₹1,377.8 billion (2027)" },
            { value: "90%", label: "Less water", note: "compared with traditional farming" },
            { value: "1%", label: "Of agriculture", note: "uses hydroponic methods today" },
          ]}
        />
      </Chapter>

      <Chapter n="02" title="Who’s involved" kicker="Stakeholder map">
        <DimmableImage
          src="/case-studies/greenly/stakeholder-map.png"
          alt="Stakeholder map: Hydroponic Farmers, Logistics, Revenue Models, Raw Material Providers and Consumers at the core, surrounded by Farming Consultants, Contractors, Tech Providers, Media, Architectural Firms, Municipal Corporations, Policy Makers, Environmental Organizations and Investors"
          ratio={820 / 791}
          toggleLabel="Main stakeholders only"
          core={[
            { label: "Logistics", x: 42, y: 22 },
            { label: "Revenue Models", x: 71, y: 42 },
            { label: "Hydroponic Farmers", x: 42, y: 54, w: 24 },
            { label: "Consumers", x: 74, y: 54 },
            { label: "Raw Material Providers", x: 43, y: 73, w: 20 },
          ]}
          links={[
            { from: "Hydroponic Farmers", to: "Logistics" },
            { from: "Hydroponic Farmers", to: "Revenue Models", dashed: true },
            { from: "Logistics", to: "Revenue Models", dashed: true },
            { from: "Hydroponic Farmers", to: "Consumers" },
            { from: "Hydroponic Farmers", to: "Raw Material Providers" },
            { from: "Raw Material Providers", to: "Logistics", dashed: true, bend: -22 },
          ]}
        />
        <Callout label="Initial how might we">
          How might we enable farmers and small-scale industry to connect to marketplaces, for raw material as well as
          sales?
        </Callout>
      </Chapter>

      <Chapter n="03" title="Process" kicker="A double diamond">
        <Steps
          items={[
            { title: "Discover", text: "Research. Finalise the topic and brief; primary and secondary research." },
            { title: "Define", text: "Synthesis. Affinity mapping, covert observation, insights and how-might-we statements." },
            { title: "Develop", text: "Ideation. Ideate for each HMW, then evaluate and sequence the ideas." },
            { title: "Deliver", text: "Implement. Scenario planning, a service blueprint and prototypes." },
          ]}
        />
      </Chapter>

      <Chapter n="04" title="Discover" kicker="Three perspectives, three insights">
        <Label>Consumers</Label>
        <InsightEquation
          secondary={{
            title: "Supply gaps",
            text: "Inconsistent production cycles and the need for cold storage create gaps, so retailers can’t stock hydroponic produce consistently.",
          }}
          primary={{
            title: "Seen as super-premium",
            text: "Shelved beside organic produce without the same positioning, priced as a luxury, and hard to find in local markets.",
          }}
          insight={{
            title: "Poor market penetration",
            text: "Low awareness among premium stores and establishments restricts sourcing and hinders growth, made worse by weak positioning.",
          }}
        />
        <Label>Suppliers & logistics</Label>
        <InsightEquation
          secondary={{
            title: "Costly to operate",
            text: "High energy costs, technical complexity, and the need for skilled operators and trained handlers raise costs for small farmers.",
          }}
          primary={{
            title: "Imported, not adapted",
            text: "Limited local manufacturing means imports, and equipment isn’t built for Indian weather or tight spaces. Distribution outside local markets brings delays and quality loss.",
          }}
          insight={{
            title: "Distribution drags profit",
            text: "Logistics that aren’t built for hydroponic produce, plus heavy manual labour, cause inefficiency and lower profits.",
          }}
        />
        <Label>Farmers</Label>
        <InsightEquation
          secondary={{
            title: "Promising, but unfunded",
            text: "Up to 90% less water and far fewer pesticides, with high yields, yet banks don’t understand hydroponics well enough to lend.",
          }}
          primary={{
            title: "Limited access",
            text: "Small farmers struggle to get affordable equipment, seeds and nutrients, and lack training. Subsidies are limited and restrictive.",
          }}
          insight={{
            title: "Hobby farms close",
            text: "Farms often start as a hobby without proper knowledge. Upkeep is expensive, market access never comes, and the farm closes.",
          }}
        />
      </Chapter>

      <Chapter n="05" title="The gap" kicker="Where it breaks down">
        <Cards
          items={[
            { title: "Knowledge", text: "A lack of knowledge leads to misconceptions about hydroponic farming." },
            { title: "Marketing", text: "Poor marketing means low sales and no reach to the right audience." },
            { title: "Productivity", text: "Limited market insight and restricted growing space hold productivity back." },
          ]}
        />
        <Callout label="How might we">
          How might we design an ecosystem that lowers the risk of farm closures by increasing the profitability of
          hydroponic farmers, while also expanding market reach and increasing crop yield through reduced manual
          intervention?
        </Callout>
      </Chapter>

      <Chapter n="06" title="System" kicker="Six layers, from scenarios to artefacts">
        <Layers
          items={[
            { title: "Artefacts", text: "The app, the dashboards and the sensor unit." },
            { title: "Data flow", text: "The site map that connects every actor’s screens." },
            { title: "Tech plan", text: "IoT sensors, a trained AI model and the order flows between actors." },
            { title: "Data points", text: "What each actor needs to know, at each stage." },
            { title: "Task flow", text: "The steps each actor takes." },
            { title: "Scenarios", text: "A day in the life of each actor." },
          ]}
        />
        <Label>Layer 1 / Scenarios</Label>
        <Cards
          columns={2}
          items={[
            {
              tag: "Farmer",
              title: "Grow smarter",
              text: "IoT sensors monitor crops; the system recommends profitable crops, automates material orders, flags issues, tracks stock and connects the farmer to food trucks and restaurants.",
            },
            {
              tag: "Supplier",
              title: "Fulfil and get paid",
              text: "Checks new and ongoing orders, reviews stock and replenishment, accepts or declines orders, and tracks payments and outstanding amounts.",
            },
            {
              tag: "Logistics",
              title: "Keep produce moving",
              text: "Reviews pending and urgent orders, tracks delays in real time, assigns vehicles by route, handles maintenance and emergency deliveries.",
            },
            {
              tag: "Customer",
              title: "See it before buying",
              text: "Subscribes with a free trial, watches live farm streams, learns about hydroponics, then shops, checks out and pays.",
            },
          ]}
        />
      </Chapter>

      <Chapter n="07" title="Task flows" kicker="Layer 2">
        <Flow
          n="01"
          title="Customer"
          steps={[
            { label: "Sign up" },
            { label: "Free trial", kind: "action" },
            { label: "Farm live streams", kind: "action" },
            { label: "Learn hydroponics", kind: "action" },
            { label: "Browse vegetables", kind: "action" },
            { label: "Add to cart", kind: "action" },
            { label: "Checkout & pay", kind: "action" },
          ]}
        />
        <Flow
          n="02"
          title="Hydroponic farmer"
          steps={[
            { label: "Check demand" },
            { label: "Select crops", kind: "action" },
            { label: "Assess space & materials", kind: "action" },
            { label: "Order raw materials", kind: "action" },
            { label: "Monitor crop health", kind: "action" },
            { label: "Respond to alerts", kind: "action" },
            { label: "Partner with a food truck", kind: "action" },
          ]}
        />
        <Flow
          n="03"
          title="Logistics"
          steps={[
            { label: "Orders summary" },
            { label: "Urgent orders", kind: "action" },
            { label: "Track delays", kind: "action" },
            { label: "Route management", kind: "action" },
            { label: "Emergency deliveries", kind: "action" },
            { label: "Assign vehicles", kind: "action" },
            { label: "Fleet status", kind: "action", branches: ["Maintenance issues"] },
          ]}
        />
        <Flow
          n="04"
          title="Supplier"
          steps={[
            { label: "Order counts" },
            { label: "New orders", kind: "action" },
            { label: "Product details", kind: "action" },
            { label: "Accept or decline", kind: "action" },
            { label: "Check stock", kind: "action", branches: ["Replenish"] },
            { label: "Review payments", kind: "action" },
            { label: "Send reminder", kind: "action" },
          ]}
        />
      </Chapter>

      <Chapter n="08" title="Data points" kicker="Layer 3: what each actor needs to know">
        <TagColumns
          title="Hydroponic farmer"
          columns={[
            {
              heading: "Pre-production",
              tags: ["Inventory details", "Quality of equipment", "Demand for produce", "Quality of raw materials"],
            },
            {
              heading: "During production",
              tags: [
                "Temperature, humidity, light",
                "Water pH and EC",
                "Nutrient levels",
                "Plant growth status",
                "Energy system status",
                "Harvest status",
              ],
            },
            {
              heading: "Post-production",
              tags: ["Quantity of produce", "Quality of produce", "No. of packages"],
            },
          ]}
        />
        <TagColumns
          title="Customers"
          columns={[
            {
              heading: "HoReCa, airlines, cruises",
              tags: ["Most-ordered produce", "Freshness & shelf life", "Price", "Order status & location"],
            },
            { heading: "Direct to consumer", tags: ["Freshness & benefits", "Price", "Most-ordered produce", "Order status & location"] },
            { heading: "Retailer", tags: ["Freshness & shelf life", "Price", "Most-ordered produce", "Order status & location"] },
          ]}
        />
        <TagColumns
          title="Logistics & suppliers"
          columns={[
            {
              heading: "Raw-material logistics",
              tags: ["Terms of transport", "Cost of transport", "Shipment location", "Equipment condition on arrival"],
            },
            {
              heading: "Outbound logistics",
              tags: ["Cost & terms (dispatch)", "Storage environment (tracking)", "Loss in delivery", "Produce condition on arrival"],
            },
            {
              heading: "Tech & raw-material suppliers",
              tags: ["Supplier details", "Inventory details", "Quantity of stock", "Farm & farmer details"],
            },
          ]}
        />
      </Chapter>

      <Chapter n="09" title="Tech plan" kicker="Layer 4: sensors, AI and the order loop">
        <Prose>
          <p>
            Each farm runs a <strong>modular hydroponic unit</strong>: a DHT22 for temperature and humidity, a GY-302
            for light, and an analog pH probe, all read by a <strong>NodeMCU</strong> that sends the data over Wi-Fi.
            It feeds the farmer’s environment check-up, farm schematics and plant list, while a{" "}
            <strong>trained AI model</strong> scans plant health and growth.
          </p>
          <p>
            Around the farm, the orders loop: customers order from the farmer’s produce list, low inventory triggers
            supplier demand forecasting, suppliers fulfil the farmer’s shop, and logistics manage the routes, fleet and
            drivers that move it all.
          </p>
        </Prose>
        <Cards
          columns={2}
          items={[
            { tag: "Sensor", title: "DHT22", text: "Temperature and humidity." },
            { tag: "Sensor", title: "GY-302", text: "Light level." },
            { tag: "Sensor", title: "Analog pH probe", text: "Water pH." },
            { tag: "Controller", title: "NodeMCU", text: "Reads every sensor and sends it over Wi-Fi to the farm dashboard." },
          ]}
        />
        <Label>Full system map</Label>
        <ZoomableImage
          src="/case-studies/greenly/tech-plan.png"
          alt="Tech plan: sensors on the modular hydroponic unit feed farm status and a trained AI model; farmer, supplier, logistics and customer order loops connect through inventory, demand forecasting and fleet management"
          ratio={1118 / 864}
          caption="Scroll or pinch to zoom, drag to pan"
        />
      </Chapter>

      <Chapter n="10" title="Site map" kicker="Layer 5: Farm Connect">
        <Tree
          root="Farm Connect"
          branches={[
            {
              label: "Supplier",
              children: [
                { label: "Profile", children: [{ label: "Verification" }, { label: "Reviews" }, { label: "Contacts" }, { label: "Location" }] },
                { label: "Inventory", children: [{ label: "Current stock" }, { label: "Last ordered" }] },
                { label: "Demand forecast", children: [{ label: "Farmers’ demand" }] },
                { label: "Orders", children: [{ label: "Farm details" }, { label: "Pre-orders" }, { label: "Order details" }, { label: "Current orders" }] },
              ],
            },
            {
              label: "Logistics",
              children: [
                { label: "Profile", children: [{ label: "Verification" }, { label: "Reviews" }, { label: "Contacts" }, { label: "Location" }] },
                { label: "Pending deliveries", children: [{ label: "Future deliverables" }] },
                { label: "Ongoing deliveries", children: [{ label: "Delivery status" }, { label: "Driver status" }] },
              ],
            },
            {
              label: "Farmer",
              children: [
                {
                  label: "Farm status",
                  children: [
                    { label: "Environment tracking" },
                    { label: "Crop cycle" },
                    { label: "Plant health" },
                    { label: "Farm map" },
                    { label: "System status" },
                    { label: "Demand forecasting" },
                  ],
                },
                { label: "Inventory", children: [{ label: "Existing inventory" }, { label: "Re-order & suggestions" }] },
                { label: "Suppliers", children: [{ label: "Supplier list" }, { label: "Product catalogue" }] },
                { label: "Logistics", children: [{ label: "Logistics list" }, { label: "Services" }, { label: "Delivery status" }] },
                {
                  label: "Hydroponic unit (Arduino)",
                  children: [{ label: "pH" }, { label: "Light" }, { label: "Humidity" }, { label: "Temperature" }],
                },
              ],
            },
          ]}
        />
        <Label>Full site map</Label>
        <ZoomableImage
          src="/case-studies/greenly/site-map.webp"
          alt="Farm Connect site map: Supplier, Logistics, Farmer, Services and Consumer branches, down to the Hydroponic Unit's Arduino sensors and the Demand Forecast's Farmers, Revenue Model and D2C flows"
          ratio={2000 / 705}
          caption="Scroll or pinch to zoom, drag to pan"
          legend={[
            { icon: <ProfitIcon />, text: "Increase profitability", muted: true },
            { icon: <ManualIcon />, text: "Reduce manual intervention" },
            { icon: <MarketIcon />, text: "Expands market reach" },
          ]}
        />
      </Chapter>

      <Chapter n="11" title="Design language" kicker="Four artefacts, one vocabulary">
        <Prose>
          <p>
            Each artefact was designed with three tools: <strong>skeuomorphism</strong> so it feels familiar,{" "}
            <strong>signifiers</strong> so state is readable at a glance, and a <strong>metaphor</strong> that
            frames the whole experience.
          </p>
        </Prose>
        <Label>Palette</Label>
        <Palette
          colors={[
            { role: "Sprout", hex: "#5AA847" },
            { role: "Leaf", hex: "#78BB52" },
            { role: "Pale leaf", hex: "#E8F5E0" },
            { role: "Slate navy", hex: "#1E3648" },
            { role: "Caution amber", hex: "#E8B23D" },
          ]}
        />
        <Cards
          columns={2}
          items={[
            {
              tag: "Digital",
              title: "Farm Connect",
              text: "Temperature reads like a thermometer. Crop illustrations turn green, yellow or brown with plant health; system status is blue when stable, yellow for caution, red for critical, orange while updating and grey when idle.",
            },
            {
              tag: "Digital",
              title: "E-commerce app",
              text: "Listings resemble stalls at a farmers’ market. Order status is green when confirmed, yellow in transit, red when delayed; the dashboard borrows from the garden, with a “Harvest Calendar” for upcoming produce.",
            },
            {
              tag: "Physical",
              title: "Hydroponic unit",
              text: "Grow beds look like familiar pots and trays in cheap, durable materials. Sensors carry universal icons (water, leaf, sun), a blinking red LED flags urgent action, and modules snap together like puzzle pieces.",
            },
            {
              tag: "Physical",
              title: "Food truck",
              text: "Sensor icons for humidity and temperature, the truck’s location on a map, and a simple promise: farm-fresh, pesticide-free produce straight to the consumer.",
            },
          ]}
        />
        <Label>Value exchange</Label>
        <GreenlyValueExchange />
        <Callout label="Product vision">
          To build a sustainable, profitable and space-optimising hydroponic system that increases sales through higher
          market reach and increased awareness.
        </Callout>
      </Chapter>

      <Chapter n="12" title="The unit" kicker="A smart, modular hydroponic system">
        <Lead>
          The MVP: a smart hydroponic unit that maximises crop yield by integrating multiple sensors for real-time
          monitoring.
        </Lead>
        <Split>
          <Crop
            {...slide(29)}
            box={{ x: 9, y: 27, w: 33, h: 39 }}
            alt="Render of the staggered white hydroponic channel with leafy greens in each cell"
            caption="Zig-zag channel, assembled"
          />
          <Stats
            items={[
              { value: "3′6″", label: "Channel length" },
              { value: "9″", label: "Depth", note: "three 3-inch tiers" },
              { value: "7″", label: "Module width", note: "snap-together cells" },
            ]}
          />
        </Split>
        <Gallery columns={2}>
          <Crop {...slide(29)} box={{ x: 46, y: 17, w: 46, h: 21 }} alt="Top-view dimension drawing of the modular channel" caption="Top view" />
          <Crop {...slide(29)} box={{ x: 52, y: 59, w: 39, h: 29 }} alt="A single module, partly exploded, with inflow and outflow pipes" caption="Single module" />
        </Gallery>
        <Label>Unit redesign</Label>
        <Split reverse>
          <Crop
            {...slide(30)}
            box={{ x: 40, y: 16, w: 56, h: 51 }}
            alt="Front view of the four-tier rack with water flow arrows from inflow to outflow"
            caption="Four tiers, one recirculating loop"
          />
          <Prose>
            <p>
              The redesign stacks the channels into a <strong>four-tier rack</strong> over a reservoir. Water is
              pumped to the top tier and flows down through each level before returning to the tank.
            </p>
            <p>
              Sensors report pH, nutrient concentration, temperature and humidity, giving farmers precise control over
              growing conditions for healthier plants and higher productivity.
            </p>
          </Prose>
        </Split>
      </Chapter>

      <Chapter n="13" title="Food truck" kicker="Fresh salads on wheels">
        <Crop
          {...slide(31)}
          box={{ x: 44, y: 41, w: 53, h: 43 }}
          alt="Branded green food truck with solar panels, a hydroponic lettuce wrap and a QR code"
          caption="“Harvested through hydroponics, served fresh on the spot”"
        />
        <Prose>
          <p>
            A service Greenly provides to farmers: a solar-powered truck that takes hydroponic produce straight to
            customers, raising awareness while it sells. A QR code on the side leads to the app.
          </p>
        </Prose>
      </Chapter>

      <Chapter n="14" title="Farmer dashboard" kicker="Fresh Roots, the farm at a glance">
        <Crop
          {...slide(32)}
          box={{ x: 3, y: 25, w: 46, h: 66 }}
          alt="Farmer dashboard: farm environment controls, orders, deliveries, crop cycles, low stock and tracking"
          caption="Farm management dashboard"
        />
        <Cards
          items={[
            { title: "Farm environment", text: "Temperature, humidity, CO₂, light cycle and pH per unit, adjustable in place." },
            { title: "Orders", text: "Bulk, spot and pre-orders, with a stock check on each so the farmer knows what’s safe to accept." },
            { title: "Crop cycles", text: "What’s ready to harvest, growing, germinating, and which racks sit empty." },
            { title: "Schedule delivery", text: "Ready orders lead straight to booking a vehicle." },
            { title: "Low stock", text: "Seeds, cocopeat and nutrients running low, one tap from reordering." },
            { title: "Tracking", text: "Orders to and from the farm, confirmed to delivered." },
          ]}
        />
        <Split>
          <Crop
            {...slide(32)}
            box={{ x: 51, y: 25, w: 46, h: 66 }}
            alt="Emergency alert: pH level exceeded in Unit 4, with a stop-inflow button and next steps"
            caption="Emergency alert"
          />
          <Prose>
            <p>
              When something goes wrong, the dashboard says exactly where. Here the pH in Unit 4 has spiked to{" "}
              <strong>7.8</strong>; the alert pinpoints the cell on the rack, recommends immediate adjustment to avoid
              nutrient lockout, and offers one action: <strong>stop inflow</strong>, then drain and resume.
            </p>
            <p>The pH stays flagged on the environment card even after the alert is closed.</p>
          </Prose>
        </Split>
      </Chapter>

      <Chapter n="15" title="Supplier dashboard" kicker="Orders, inventory, payments">
        <Crop
          {...slide(36)}
          box={{ x: 1, y: 22, w: 49, h: 75 }}
          alt="Supplier dashboard: orders overview, inventory summary and payment details"
          caption="Supplier home"
        />
        <Cards
          items={[
            { title: "Orders overview", text: "New, ongoing and upcoming orders by type, each with accept or decline." },
            { title: "Inventory", text: "400 items at a glance as full, low or critical, with reorder right there." },
            { title: "Payments", text: "Receivables and payables, overdue invoices, and one-tap payment reminders." },
          ]}
        />
        <Crop
          {...slide(36)}
          box={{ x: 50, y: 22, w: 49, h: 75 }}
          alt="Supplier inventory management: stock health, priority recommendations and inventory table"
          caption="Inventory management"
        />
      </Chapter>

      <Chapter n="16" title="Logistics dashboard" kicker="Keeping produce fresh in transit">
        <Crop
          {...slide(39)}
          box={{ x: 2.5, y: 31, w: 46, h: 63 }}
          alt="Logistics dashboard: delay alert, deliveries donut, priority orders, route map and fleet status"
          caption="Schedule delivery"
        />
        <Stats
          items={[
            { value: "54", label: "In transit" },
            { value: "24", label: "Delivered" },
            { value: "4", label: "Delayed" },
            { value: "64", label: "Active vehicles", note: "12 idle, 5 in maintenance" },
          ]}
        />
        <Split reverse>
          <Crop
            {...slide(39)}
            box={{ x: 50, y: 31, w: 47.5, h: 63 }}
            alt="Idle vehicles modal: a verified transporter with rating, capacity and an assign button"
            caption="Assigning an idle vehicle"
          />
          <Prose>
            <p>
              Delays come with a reason (“engine failure”) and a call to action. Priority and emergency orders sit at
              the top with <strong>resolve</strong> and <strong>track</strong> buttons; route management maps every
              order by city and area; and idle vehicles from verified transporters can be assigned in one step.
            </p>
          </Prose>
        </Split>
      </Chapter>

      <Chapter n="17" title="Customer app" kicker="From onboarding to doorstep">
        <Gallery columns={4} phones>
          <Crop {...slide(42)} box={{ x: 21.5, y: 33, w: 13, h: 55 }} alt="Splash screen with the Greenly logo on green" caption="Splash" framed={false} />
          <Crop {...slide(42)} box={{ x: 36.5, y: 33, w: 13, h: 55 }} alt="Onboarding: explore hydroponics easily" caption="Explore" framed={false} />
          <Crop {...slide(42)} box={{ x: 51.5, y: 33, w: 13, h: 55 }} alt="Onboarding: consumes 90% less water" caption="90% less water" framed={false} />
          <Crop {...slide(42)} box={{ x: 67, y: 33, w: 13, h: 55 }} alt="Onboarding: higher nutritional value" caption="Nutrition" framed={false} />
        </Gallery>
        <Gallery columns={4} phones>
          <Crop {...slide(43)} box={{ x: 4, y: 7, w: 17, h: 79 }} alt="Product page for spinach: price, pesticide-free and 15-day badges, add to cart" caption="Product" framed={false} />
          <Crop {...slide(43)} box={{ x: 23.5, y: 7, w: 17, h: 79 }} alt="Basket with delivery in 30 minutes and suggested greens" caption="Basket" framed={false} />
          <Crop {...slide(43)} box={{ x: 43, y: 7, w: 17, h: 79 }} alt="Order placed confirmation" caption="Confirmed" framed={false} />
          <Crop {...slide(43)} box={{ x: 64, y: 7, w: 17, h: 79 }} alt="Home screen with a delivery-delayed alert explaining the reason" caption="Delay alert" framed={false} />
        </Gallery>
        <Prose>
          <p>
            Onboarding sells the idea before the produce: easy to explore, <strong>90% less water</strong>, higher
            nutritional value. Product pages lead with freshness (pesticide-free, 15-day shelf life), the basket
            promises delivery in 30 minutes, and if a delivery slips the app says why.
          </p>
        </Prose>
        <Label>Building trust</Label>
        <Split>
          <Gallery columns={2} phones>
            <Crop {...slide(44)} box={{ x: 6, y: 8, w: 17, h: 79 }} alt="Customer home with testimonials highlighted" caption="Testimonials" framed={false} />
            <Crop {...slide(44)} box={{ x: 39.5, y: 8, w: 17, h: 79 }} alt="Customer home with the Fresh Wheels food truck map highlighted" caption="Fresh Wheels" framed={false} />
          </Gallery>
          <Cards
            columns={2}
            items={[
              { title: "Live farm view", text: "Stream farms that are live right now to see how the produce is grown." },
              { title: "Testimonials", text: "Stories from previous customers." },
              { title: "Fresh Wheels", text: "Find the food truck for in-person trials and a quality guarantee." },
              { title: "Recipes", text: "Ideas for cooking with what’s in season." },
            ]}
          />
        </Split>
      </Chapter>

      <Chapter n="18" title="Business model" kicker="How Greenly sustains itself">
        <Cards
          items={[
            {
              tag: "Value",
              title: "Value proposition",
              text: "Fresh, local, pesticide-free produce; cost-effective systems; lower transport costs and emissions; real-time monitoring; farm to table.",
            },
            {
              tag: "Segments",
              title: "Customers",
              text: "Hydroponic farmers, health-conscious consumers, cafes, restaurants and airlines, and urban eco-friendly shoppers.",
            },
            {
              tag: "Partners",
              title: "Key partners",
              text: "Equipment suppliers, IoT sensor makers, logistics partners, high-end cafes and airlines, farmer co-operatives, marketing agencies.",
            },
            { tag: "Channels", title: "Channels", text: "The e-commerce platform, partner stores and cafes, food trucks, and social media." },
            { tag: "Relations", title: "Relationships", text: "Support for farmers, education for consumers, loyalty programmes, community engagement." },
            { tag: "Revenue", title: "Revenue streams", text: "Unit sales, produce subscriptions, B2B partnerships, workshops, and data insights." },
          ]}
        />
        <Table
          head={["Cost", "Estimate"]}
          rows={[
            ["Hydroponic unit production", "₹7,000 – ₹75,000 per unit (manual systems)"],
            ["Tech development & maintenance", "₹2,00,000 – ₹7,00,000 (basic app, affordable sensors)"],
            ["Logistics & operations", "₹50,000 – ₹1,50,000 / month"],
            ["Warehouse & storage", "₹30,000 – ₹1,00,000 / month"],
            ["Marketing", "₹20,000 – ₹1,00,000 / month, organic social first"],
          ]}
        />
      </Chapter>

      <Chapter n="19" title="Future scope" kicker="Where Greenly could grow next">
        <Steps
          items={[
            {
              title: "Medicinal plants",
              text: "Better nutritional value suits the medicinal industry, where people pay more for it.",
            },
            {
              title: "Longer journeys",
              text: "Airlines and cruises could serve hydroponic produce, which stays fresh for longer.",
            },
            {
              title: "Niche markets",
              text: "Nutritionists and gyms could adopt hydroponics for people who want more nutritious food.",
            },
            {
              title: "Scale",
              text: "Larger farms lower the cost per plant, widening reach and turning growth into a positive loop.",
            },
          ]}
        />
      </Chapter>
    </>
  );
}
