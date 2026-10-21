import {
  Callout,
  Cards,
  Chapter,
  Crop,
  Gallery,
  Label,
  Lead,
  Prose,
  Quote,
  Split,
  Stats,
  Steps,
  Table,
} from "@/components/case/Case";
import { Flow, Palette, Persona, Rings } from "@/components/case/Diagrams";
import { getProject } from "@/data/projects";
import styles from "./swadisht.module.css";
import SwadishtJourney from "./SwadishtJourney";

/*
 * Swadisht, told as a web case study rather than a deck. Copy is transcribed
 * from the original slides; app screens and portraits are cropped from the
 * original artwork.
 */

const plates = getProject("swadisht")?.plates ?? [];
/** Slide n of the original deck (1-based). */
const slide = (n: number) => plates[n - 1];

/** Class for the project page, so the hero picks up the identity too. */
export const theme = styles.theme;

const brandColors = [
  { name: "Mustard", hex: "#F6BC5E" },
  { name: "Navy", hex: "#1A475C" },
  { name: "Herb green", hex: "#3B7C3A" },
  { name: "Accent teal", hex: "#74C1C1" },
];

/** Opening band in the brand's colours, built around the wordmark. */
function Brand() {
  return (
    <section className={styles.brand} aria-label="Swadisht identity">
      <div className={styles.doodles} aria-hidden="true" />
      <div className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a small static brand asset, not worth next/image here */}
        <img src="/case-studies/swadisht/logo.png" alt="Swadisht logo: the wordmark with a serving cloche over “dish”" />
      </div>
      <p className={styles.tagline}>Make every meal count</p>
      <p className={styles.brandNote}>
        <strong>Swadisht</strong> (“delicious”) wears a serving cloche over the word <strong>dish</strong>, underlined
        like a plate.
      </p>
      <ul className={styles.brandChips}>
        {brandColors.map((c) => (
          <li key={c.hex}>
            <i style={{ background: c.hex }} />
            {c.name} {c.hex}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResearchChapters() {
  return (
    <>
      <Chapter n="01" title="Goals" kicker="Make every meal count">
        <Lead>Surplus food from homes and restaurants should become nourishment, not waste.</Lead>
        <Cards
          columns={2}
          items={[
            { title: "Awareness", text: "More households and restaurants aware of local food donation programmes." },
            { title: "Speed", text: "Less time for donors to find a recipient and complete a donation." },
            { title: "Partnership", text: "Clearer, ongoing communication between donors and recipients." },
            { title: "Insight", text: "App data that reveals food-waste patterns and hotspots to donate at." },
            { title: "Community", text: "Repeat donations encouraged through a possible rewards system." },
          ]}
        />
        <Label>How</Label>
        <Steps
          items={[
            { title: "Barriers & motivations", text: "Why households and restaurants hesitate to donate leftover food." },
            { title: "Patterns", text: "How often, and when, food waste is generated in each." },
            { title: "Existing solutions", text: "How well current initiatives and apps actually work." },
          ]}
        />
      </Chapter>

      <Chapter n="02" title="The scale of it" kicker="15 articles, 3 papers, 10 websites">
        <Stats
          items={[
            { value: "74M", label: "Tonnes a year", note: "of food wasted in India" },
            { value: "10%", label: "Of emissions", note: "of global greenhouse gases come from food waste (UNEP)" },
            { value: "870M", label: "People", note: "could be fed by saving a quarter of food lost or wasted (WFP)" },
          ]}
        />
        <Quote by="The Hindu, 2024">
          More than 80 per cent of the waste generated during Chitra Pournami festival in Tiruvannamalai town was food
          waste, especially items donated at annadhanam centres.
        </Quote>
        <Prose>
          <p>
            There’s a critical disconnect: there is enough food to feed everyone, yet much of it is wasted. India needs
            better infrastructure and public awareness, and national food donation laws could help surplus reach
            those in need.
          </p>
        </Prose>
      </Chapter>

      <Chapter n="03" title="Who’s involved" kicker="Stakeholder map">
        <Rings
          center="Surplus food"
          levels={[
            {
              name: "Core",
              text: "Food businesses and households that generate surplus, the NGOs that distribute it, and the people who need it.",
              items: [
                { label: "Households", angle: -150 },
                { label: "Food business", angle: -30 },
                { label: "NGOs", angle: 150 },
                { label: "People in need", angle: 30 },
              ],
            },
            {
              name: "Direct",
              text: "Consumers and delivery partners.",
              items: [
                { label: "Consumers", angle: -90 },
                { label: "Delivery partners", angle: 90 },
              ],
            },
            {
              name: "Indirect",
              text: "Farmers, food safety experts, investors, manufacturers, local government, community leaders and the wider economy.",
              items: [
                { label: "Farmers", angle: -130 },
                { label: "Food safety", angle: -50 },
                { label: "Investors", angle: 10 },
                { label: "Local government", angle: 70 },
                { label: "Community leaders", angle: 130 },
              ],
            },
          ]}
        />
      </Chapter>

      <Chapter n="04" title="People" kicker="Two donors">
        <Persona
          name="Jeshma Mehta"
          role="Household donor"
          quote="Sharing what we have is not just a good deed, it’s our duty to ensure everyone has good food."
          facts={[
            ["Age", "47"],
            ["From", "Mumbai"],
            ["Works", "Homemaker"],
            ["Education", "B.Sc."],
          ]}
          bio="Driven by a respect for food and a wish to reduce waste, she’s a passionate donor who volunteers her time and offers support wherever she sees someone in need. She gathers produce nearing its expiry date to give to the needy."
          goals={[
            "Stop perfectly good food going to waste",
            "Make food accessible for all",
            "Encourage others to value food",
          ]}
          frustrations={[
            "Doesn’t know the donation programmes in her area",
            "Worries whether shelters will accept her food",
            "Little time to volunteer around household duties",
          ]}
          traits={[
            { label: "Resourceful", value: 67 },
            { label: "Compassionate", value: 90 },
            { label: "Organised", value: 77 },
          ]}
          photo={{ ...slide(5), box: { x: 8, y: 6, w: 11.5, h: 21 } }}
        />
        <Persona
          name="Ravi Shetty"
          role="Restaurant owner"
          quote="All this good food going to waste… wish I could give it to someone in need."
          facts={[
            ["Age", "48"],
            ["From", "Mumbai"],
            ["Works", "Restaurant owner"],
            ["Education", "12th std"],
          ]}
          bio="Passionate about serving good food and equally committed to minimising waste. He watches inventory closely, plans flexible menus, and has his staff turn leftover ingredients into new dishes."
          goals={[
            "Minimise waste to control costs and protect profit",
            "Help nutritious food reach people in need",
            "Serve fresher food to customers",
          ]}
          frustrations={[
            "Unreliable pick-ups and cancellations risk spoilage",
            "Food banks’ rigid requirements don’t fit daily surplus",
          ]}
          traits={[
            { label: "Time-conscious", value: 57 },
            { label: "Compassionate", value: 90 },
            { label: "Organised", value: 77 },
          ]}
          photo={{ ...slide(8), box: { x: 8, y: 6, w: 11.5, h: 21 } }}
        />
        <Label>Empathy maps</Label>
        <Table
          head={["", "Jeshma, household donor", "Ravi, restaurant owner"]}
          rows={[
            ["Says", "Sharing should be mandatory for those who can afford it; donation should be part of everyone’s life.", "We cooked too much! I hope it can be used for something instead of wasted."],
            ["Thinks", "Sharing is caring. “Is this still good enough to donate? Will anyone accept it?”", "Most NGOs don’t accept cooked food, and there’s no assurance it reaches someone in need."],
            ["Does", "Gathers produce nearing its expiry date to donate.", "Weighs every option, then throws the food away when he finds no use for it."],
            ["Feels", "Wasteful, out of pocket, and unsure where donated food goes.", "Guilty every time his restaurant wastes food."],
          ]}
        />
      </Chapter>

      <Chapter n="05" title="Journey" kicker="Household and restaurant donors">
        <SwadishtJourney
          phases={[
            { label: "Recognizing surplus food", stages: ["Trigger", "Repurpose options"] },
            { label: "Decision & preparation", stages: ["Considering donation", "Finding a recipient"] },
            { label: "Donation", stages: ["Handing over the food"] },
          ]}
          emotions={[0.3, 0.42, 0.4, 0.72, 0.95]}
          rows={[
            {
              label: "Actions",
              cells: [
                "Households might have more cooked food than they can consume. Restaurants might have leftover dishes from miscalculated customer demand.",
                "Evaluate the leftover food’s quality and quantity.",
                "Looks over all options for how to give food for the needy.",
                "Searches in the known spots for people who might need food. Searches online for a suitable food bank, or NGO to donate the surplus.",
                "Hand over the cooked food to the needy or beggars on the street.",
              ],
            },
            {
              label: "Thoughts",
              cells: [
                "“We cooked too much! We won’t be able to eat this all before it goes bad.”",
                "“Will the food be needed later on? Can it be used for something else?”",
                "“Is this still good enough to donate? Will anyone accept it?”",
                "I hope this food won’t go to waste and will reach someone in need.",
                "“I hope the food is still good for them to eat”",
              ],
            },
            { label: "Emotions", cells: [] },
            {
              label: "Pain points",
              cells: [
                "Feeling wasteful and wanting to avoid throwing away food. Financial loss due to waste.",
                "Does not want to throw away good edible food.",
                "Uncertainty about food donation process and concerns about where the food will go.",
                "Most NGOs/food banks don’t accept cooked food. No assurance of it being provided to the needful person.",
                "The food is not immediately given to the needy as it took time to locate them.",
              ],
            },
            {
              label: "Opportunities",
              cells: [
                "Plan meals based on portion sizes or use leftovers in creative new dishes before throwing away.",
                "Properly package the surplus food, ensuring it’s fresh, sealed, and labeled with expiry dates.",
                "Awareness about local food banks or shelters that accept cooked food donations.",
                "Maintain clear communication with food bank partners regarding surplus food availability and process.",
                "Hotspots could be recognized where people in need of food generally stay. A link should be made to bridge the communication between donors and needful.",
              ],
            },
          ]}
        />
      </Chapter>

      <Chapter n="06" title="Gaps" kicker="Existing solutions vs. what’s needed">
        <Table
          head={["Existing", "Gap", "Ideal"]}
          rows={[
            ["Mostly dry rations that last for months", "Fresh food donations are rare and tied to events like food drives", "More fresh food donated within a set time window"],
            ["NGOs mostly serve children aged 3–18 in orphanages and child-care institutions", "Older homeless and underprivileged people rarely get fresh food, unless it’s leftovers", "Timely food drives at regular intervals"],
            ["Some NGOs cook food in cloud kitchens rather than redistribute surplus", "They add to supply instead of using what’s already made", "Reduce the surplus that’s already been produced"],
            ["Community service potential is untapped for lack of knowledge", "People don’t hear about food drives, so don’t contribute", "One platform to reach many people at once"],
          ]}
        />
      </Chapter>

      <Chapter n="07" title="Interviews" kicker="30 interviews: 12 restaurants, 18 donors">
        <Cards
          items={[
            {
              title: "Cafés waste more",
              text: "Of 12 restaurants, 10 were street stalls and 2 cafés. Cafés pre-make and freeze food; stalls cut everything fresh.",
            },
            { title: "Big families, big waste", text: "It’s harder to estimate how much everyone will eat, so excess is easy to make." },
            { title: "Late-night stalls", text: "Popular stalls stay open late with cheap prices, so demand never drops and little is wasted." },
            { title: "Some stalls feed the needy", text: "A few make food for the needy at the end of the day from leftover bread and vegetables." },
            { title: "Restaurants won’t give it free", text: "They’d rather reuse not-so-fresh food than give it away; it’s bad for business." },
            { title: "Plenty of volunteers", text: "Many donors would happily volunteer at NGOs, but don’t know where or when drives happen." },
          ]}
        />
      </Chapter>
    </>
  );
}

function DesignChapters() {
  return (
    <>
      <Chapter n="08" title="The problem" kicker="Defined">
        <Callout label="Problem statement">
          The lack of effective connections and pathways linking surplus food with the individuals and organisations
          in need leads to unnecessary disposal and waste of food.
        </Callout>
      </Chapter>

      <Chapter n="09" title="Task flows" kicker="Three tasks, two perspectives">
        <Flow
          n="01"
          title="Restaurant: set up an offer"
          steps={[
            { label: "Open the app" },
            { label: "Navigation bar", kind: "action" },
            { label: "Post a deal or buffet", kind: "action", branches: ["Menu / food item", "Price", "Location & time", "Seats / hours"] },
            { label: "Set up the offer", kind: "action" },
          ]}
        />
        <Flow
          n="02"
          title="Customer: book a buffet"
          steps={[
            { label: "Open the app" },
            { label: "Navigation bar", kind: "action" },
            { label: "Booking & order", kind: "action" },
            { label: "Booking", kind: "action", branches: ["Location & duration", "Seats", "Menu", "Price / offer"] },
            { label: "Payment mode", kind: "action" },
            { label: "Book the buffet", kind: "action" },
          ]}
        />
        <Flow
          n="03"
          title="Both: donate food to an NGO"
          steps={[
            { label: "Open the app" },
            { label: "Navigation bar", kind: "action" },
            { label: "Donations", kind: "action" },
            { label: "List of NGOs", kind: "action", branches: ["Select NGO", "Food details", "Pick-up / drop-off time", "Receipt"] },
            { label: "Payment", kind: "action" },
            { label: "Send to the NGO", kind: "action" },
          ]}
        />
      </Chapter>

      <Chapter n="10" title="Site map" kicker="Restaurant and customer">
        <Table
          head={["Section", "Restaurant", "Customer"]}
          rows={[
            ["Sign in", "Google or Facebook; business onboarding in three steps: details and photos, documents, agreement", "Google or Facebook; name and address"],
            ["Home", "Go live, current orders, ongoing deals and buffets, nearby offers, donate, search", "Current orders, ongoing deals and buffets, online restaurants, nearby offers, donate, search"],
            ["Profile", "Location, menu, ratings and reviews, settings, complaints", "Address, history, favourites, coupons, payments, wallet, reviews, settings"],
            ["Donations", "Through an NGO, or directly to an NGO’s or an individual’s ration wishlist", "The same donation options"],
            ["Deals", "Post a buffet or deal: location and time, menu, seats or hours, price", "Book a seat or place an order"],
            ["Orders", "Accept orders, then find a delivery partner", "Place orders and choose a payment mode"],
            ["Tracking", "Preparing → ready → picked up → delivered, with feedback", "Preparing → picked up → delivered, with feedback"],
          ]}
        />
      </Chapter>

      <Chapter n="11" title="Brand" kicker="A cloche over the dish">
        <Split>
          <Crop
            {...slide(19)}
            box={{ x: 5, y: 19, w: 17, h: 37 }}
            alt="Swadisht wordmark in black, navy and amber, and navy and cream, with a serving cloche over “dish”"
            caption="Name & logo variations"
            framed={false}
          />
          <Prose>
            <p>
              <strong>Swadisht</strong> (“delicious”) wears a serving cloche over the word <em>dish</em>, underlined
              like a plate. The tagline sets the intent: <strong>make every meal count</strong>.
            </p>
          </Prose>
        </Split>
        <Palette
          colors={[
            { role: "Primary", hex: "#FFBC58" },
            { role: "Secondary", hex: "#1A475C" },
            { role: "Tertiary", hex: "#3B7C3A" },
            { role: "Accent", hex: "#74C1C1" },
            { role: "Neutral", hex: "#000000" },
          ]}
        />
        <Table
          head={["Style", "Colour"]}
          rows={[
            ["Header", "#242424"],
            ["Sub headings & buttons", "#2F2F2F"],
            ["Body copy", "#424242"],
            ["Caption", "#242424"],
            ["Line spacing", "8px base grid, 4px for small text"],
          ]}
        />
      </Chapter>

      <Chapter n="12" title="The app" kicker="Deals, buffets and donations">
        <Gallery columns={3} phones>
          <Crop {...slide(22)} box={{ x: 19.7, y: 14, w: 12.2, h: 38 }} alt="Home: deliver-to address, search, cuisines and popular restaurants" caption="Home" framed={false} />
          <Crop {...slide(22)} box={{ x: 4, y: 14, w: 12.2, h: 38 }} alt="All deals and buffets from nearby food stalls" caption="Deals" framed={false} />
          <Crop {...slide(22)} box={{ x: 35.5, y: 14, w: 12.2, h: 38 }} alt="Tonight’s buffets with a 40% off banner" caption="Tonight’s buffets" framed={false} />
          <Crop {...slide(22)} box={{ x: 66.6, y: 14, w: 12.2, h: 38 }} alt="Seat booking with booked and available seats" caption="Book seats" framed={false} />
          <Crop {...slide(22)} box={{ x: 82.2, y: 14, w: 12.2, h: 38 }} alt="Donate: create an impact, with food drives and NGOs" caption="Donate" framed={false} />
          <Crop {...slide(22)} box={{ x: 4, y: 57, w: 12.2, h: 38 }} alt="Live order tracking with the delivery partner on a map" caption="Track" framed={false} />
        </Gallery>
        <Split>
          <Gallery columns={2} phones>
            <Crop {...slide(22)} box={{ x: 35.5, y: 57, w: 12.2, h: 38 }} alt="Post a buffet: menu, quantities, timings and location" caption="Post a buffet" framed={false} />
            <Crop {...slide(22)} box={{ x: 66.6, y: 57, w: 12.2, h: 38 }} alt="Buffet ticket listing dishes, quantity and occupancy" caption="Buffet ticket" framed={false} />
          </Gallery>
          <Prose>
            <p>
              For restaurants, surplus becomes a <strong>late-night buffet or deal</strong>: list the dishes and
              quantities, set timings and seats, and post it for the same day.
            </p>
            <p>
              For customers, it’s good food at a lower price, booked by the seat or delivered. And for everyone, a
              <strong> Donate</strong> tab connects directly to food drives, NGOs and individuals’ wishlists.
            </p>
          </Prose>
        </Split>
      </Chapter>

      <Chapter n="13" title="Testing" kicker="9 users and 6 restaurants">
        <Stats
          items={[
            { value: "15", label: "Participants", note: "9 users and 6 restaurants" },
            { value: "3.5 / 5", label: "Rating", note: "ease of use rated high: it feels like familiar food apps" },
          ]}
        />
        <Table
          head={["What worked", "What can be improved"]}
          rows={[
            ["An intuitive interface, with well-organised menus and clear labels", "More customisation for individual needs"],
            ["Transparency about the donation process, recipients and impact", "Bugs and glitches that frustrate"],
            ["Volunteer opportunities linked to local food rescue", "Better integration with existing delivery apps"],
          ]}
        />
      </Chapter>

      <Chapter n="14" title="Business model" kicker="How Swadisht sustains itself">
        <Cards
          items={[
            {
              tag: "Value",
              title: "Value proposition",
              text: "Good surplus food at lower prices after hours, easier and more trustworthy donations, and late-night buffets that cut down on food already made.",
            },
            { tag: "Segments", title: "Customers", text: "Anyone who orders, and restaurants (on commission)." },
            { tag: "Partners", title: "Key partners", text: "Delivery partners, restaurants, users and NGOs." },
            {
              tag: "Activities",
              title: "Key activities",
              text: "Restaurants post buffets and accept orders; users book and order; both donate to NGOs or individuals.",
            },
            { tag: "Channels", title: "Channels", text: "Social media, digital and physical advertising, and the app." },
            { tag: "Revenue", title: "Revenue", text: "Commission from restaurants and subscriptions from users." },
          ]}
        />
      </Chapter>
    </>
  );
}

export default function SwadishtCase() {
  return (
    <>
      <Brand />
      <ResearchChapters />
      <DesignChapters />
    </>
  );
}

