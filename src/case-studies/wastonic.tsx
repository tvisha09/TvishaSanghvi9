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
import { Donut, Donuts, Flow, HabitLoop, Octalysis, Persona } from "@/components/case/Diagrams";
import YouTube from "@/components/case/YouTube";
import { getProject } from "@/data/projects";
import styles from "./wastonic.module.css";
import WastonicBin from "./WastonicBin";

/*
 * Wastonic, told as a web case study rather than a deck. Copy and survey data
 * are transcribed from the original slides; photos, posters and the bin
 * render are cropped from the original artwork.
 */

const plates = getProject("wastonic")?.plates ?? [];
/** Slide n of the original deck (1-based). */
const slide = (n: number) => plates[n - 1];

/** Class for the project page, so the hero picks up the identity too. */
export const theme = styles.theme;

const brandColors = [
  { name: "Charcoal", hex: "#202024" },
  { name: "Glow green", hex: "#70C090" },
  { name: "Accent green", hex: "#44A06A" },
];

/** Opening band in the brand's colours, built around the bin render. */
function Brand() {
  return (
    <section className={styles.brand} aria-label="Wastonic identity">
      <div className={styles.bin}>
        <WastonicBin />
      </div>
      <div className={styles.brandText}>
        <p className={styles.brandKicker}>Wastonic</p>
        <p className={styles.brandLine}>
          A <strong>glowing green rim</strong> on a charcoal bin: the small signal that the small e-waste inside it
          actually matters.
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

export default function WastonicCase() {
  return (
    <>
      <Brand />

      <Chapter n="01" title="The problem" kicker="Too small to recycle">
        <YouTube id="RG-1Yhwxf0M" title="Iam Wastonic" caption="Wastonic, introduced" />
        <Lead>
          People throw old headphones, broken USB drives and batteries in the bin because they seem too minor to
          recycle.
        </Lead>
        <Stats
          items={[
            { value: "60–70%", label: "Of the harm", note: "of e-waste’s environmental damage comes from these small items" },
            { value: "< 30%", label: "Of the weight", note: "despite making up less than a third of e-waste by weight" },
            { value: "17.4%", label: "Recycled", note: "of e-waste is formally collected and recycled; small items mostly end up in the trash" },
          ]}
        />
        <Label>Stakeholders</Label>
        <Table
          head={["Group", "Who"]}
          rows={[
            ["Priority", "Households, junk dealers (kabadiwaalas), co-operative housing societies"],
            ["Influential", "Waste collectors, e-waste recycling factories, NGOs, government, informal resale markets, environmentalists"],
          ]}
        />
      </Chapter>

      <Chapter n="02" title="Ideal vs. reality" kicker="Where e-waste actually goes">
        <Split>
          <div>
            <Label>Ideal</Label>
            <Steps
              items={[
                { title: "Accumulated", text: "E-waste builds up at home." },
                { title: "Sorted", text: "Sorted and dropped off." },
                { title: "Collected", text: "Formal collectors take it to a secure facility." },
                { title: "Recycled", text: "Disassembled safely; batteries and materials recycled separately." },
              ]}
            />
          </div>
          <div>
            <Label>Reality</Label>
            <Steps
              items={[
                { title: "Binned", text: "Dumped in the regular trash, straight to landfill." },
                { title: "Sold on", text: "Or given to kabadiwaalas and sold to the highest bidder." },
                { title: "Stripped", text: "Whatever material is valuable is taken." },
                { title: "Landfill", text: "The rest is set aside, and ends up in landfill anyway." },
              ]}
            />
          </div>
        </Split>
      </Chapter>

      <Chapter n="03" title="Survey" kicker="What people do with old electronics">
        <Stats
          items={[
            { value: "73.4%", label: "Bin it", note: "have thrown small e-waste items in the dustbin" },
            { value: "75.5%", label: "Don’t know", note: "aren’t aware where those items end up" },
            { value: "83%", label: "Yearly", note: "dispose of e-waste once a year; 17% monthly" },
          ]}
        />
        <BarChart
          title="What people do with old electronics"
          unit=""
          data={[
            { label: "Keep them at home", value: 59 },
            { label: "Repair or refurbish", value: 51 },
            { label: "Sell online", value: 47 },
            { label: "Give to kabadiwaalas", value: 45 },
            { label: "Trade in for new devices", value: 38 },
            { label: "Give to friends or family", value: 34 },
            { label: "Throw in regular trash", value: 32 },
            { label: "Donate to charity", value: 29 },
          ]}
          caption="Responses, read from the original radial chart (approximate)"
        />
        <Donuts>
          <Donut part={79} total={100} label="%" text="are familiar with e-waste recycling; 19.8% somewhat, 1% not at all." />
          <Donut part={51} total={100} label="%" text="don’t buy new electronics until the old one stops working." />
          <Donut part={17} total={100} label="%" text="buy new electronics as soon as they launch; 25.5% upgrade yearly." />
        </Donuts>
        <BarChart
          title="What people consider recyclable e-waste"
          data={[
            { label: "Phones, laptops, TVs, fridges", value: 62.8 },
            { label: "Light bulbs and LEDs", value: 16 },
            { label: "Smart watches", value: 10 },
            { label: "Cables and chargers", value: 4 },
            { label: "Earbuds", value: 3.2 },
          ]}
          max={100}
          caption="Small items, the ones that do the most harm, barely register"
        />
      </Chapter>

      <Chapter n="04" title="Camera study" kicker="Inside Mumbai’s kabadiwaala shops">
        <Gallery columns={4}>
          <Crop {...slide(7)} box={{ x: 5.8, y: 14.3, w: 19.5, h: 31.9 }} alt="Pile of tangled cables and wires on a pavement" caption="Cables set aside to be burned at night" />
          <Crop {...slide(7)} box={{ x: 28.8, y: 14.3, w: 19.5, h: 31.9 }} alt="Shopfront crowded with washing machines and ACs" caption="Mostly ACs and washing machines" />
          <Crop {...slide(7)} box={{ x: 51.6, y: 14.3, w: 19.6, h: 31.9 }} alt="Heap of AC compressor units" caption="Compressors, sold in bulk" />
          <Crop {...slide(7)} box={{ x: 74.6, y: 14.3, w: 19.5, h: 31.9 }} alt="Kabadiwaala shopfront with stacked window ACs" caption="E-waste spills onto the road" />
          <Crop {...slide(7)} box={{ x: 8, y: 60, w: 19.5, h: 31.4 }} alt="CPU parts and wires on a stool in the street" caption="CPU parts waiting for a mechanic" />
          <Crop {...slide(7)} box={{ x: 39.9, y: 60, w: 19.1, h: 31.4 }} alt="Stacked washing machine drums" caption="Drums, the most sold part" />
          <Crop {...slide(7)} box={{ x: 71.5, y: 60, w: 20, h: 31.4 }} alt="Shop interior full of split AC units" caption="Inside a shop" />
        </Gallery>
      </Chapter>

      <Chapter n="05" title="People" kicker="Two personas">
        <Persona
          name="Sanjna Mathur"
          role="Recycling advocate"
          quote="Do your little bit of good where you are; it’s those little bits of good put together that overwhelm the world."
          facts={[
            ["Age", "27"],
            ["From", "Mumbai"],
            ["Works", "Office worker"],
            ["Knows", "6/10 what’s recyclable"],
          ]}
          bio="Wants to have a positive impact on the environment, and to influence others to do the same."
          goals={[
            "Learn more about every aspect of e-waste recycling",
            "Join drives and community events",
            "Recycle her household’s e-waste properly and limit its pollution",
          ]}
          frustrations={[
            "Doesn’t know where formal collection centres are",
            "Hard to get peers to dispose of e-waste properly",
            "India lacks a proper e-waste recycling system",
          ]}
          traits={[
            { label: "Community-focused", value: 73 },
            { label: "Idealistic", value: 84 },
            { label: "Environment-focused", value: 67 },
          ]}
          photo={{ ...slide(8), box: { x: 8.4, y: 21.5, w: 15.5, h: 28 } }}
        />
        <Persona
          name="Rohit Yadav"
          role="Casual consumer"
          quote="If it’s within reach and works, I’m good."
          facts={[
            ["Age", "22"],
            ["From", "Mumbai"],
            ["Is a", "Student"],
            ["Knows", "3/10 what’s recyclable"],
          ]}
          bio="Looking for convenient ways to ease the lingering guilt of not taking care of the environment."
          goals={[
            "Dispose of things only once they stop working",
            "Buy electronics only when he really needs them",
            "Declutter once too much e-waste has piled up",
            "Find easier ways to recycle",
          ]}
          frustrations={[
            "Recycling takes too much effort",
            "Won’t store e-waste to recycle it all at once",
            "Kabadiwaalas pay something; recycling pays nothing",
            "Attached to his electronics",
          ]}
          traits={[
            { label: "Community-focused", value: 37 },
            { label: "Idealistic", value: 49 },
            { label: "Environment-focused", value: 26 },
          ]}
          photo={{ ...slide(9), box: { x: 8.5, y: 22.5, w: 15.5, h: 28 } }}
        />
      </Chapter>

      <Chapter n="06" title="Behaviour today" kicker="The habit we’re trying to change">
        <Flow
          n="00"
          title="Getting rid of old devices at home"
          steps={[
            { label: "Waste piles up" },
            { label: "Mixed with general waste", kind: "action" },
            { label: "Given to the kabadiwaala", kind: "action" },
            { label: "Paid for the scrap", kind: "action" },
          ]}
        />
        <Label>Habit loop</Label>
        <HabitLoop
          cue="Old and broken electronics accumulate at home."
          routine="Thrown out with general waste, for lack of awareness or convenience."
          reward="Relief from the clutter."
        />
        <Label>Hook model</Label>
        <Table
          head={["Stage", "Today"]}
          rows={[
            ["Trigger", "A device stops working, and the frustration of wanting things back to normal"],
            ["Action", "Throw it in the regular trash and replace it"],
            ["Reward", "A decluttered home and a working device again"],
            ["Investment", "Time, and buying a new device"],
          ]}
        />
        <Callout label="How might we">
          How might we design a holistic ecosystem that makes e-waste disposal convenient for consumers, while
          formalising the role of junk dealers and connecting them to authorised processors?
        </Callout>
      </Chapter>

      <Chapter n="07" title="Gamifying it" kicker="Octalysis, stage by stage">
        <Prose>
          <p>
            The experience was mapped across the four stages of a player’s journey with the{" "}
            <strong>Octalysis framework</strong>, scoring each of its eight core drives out of ten. Drives scoring
            five or more are the key features at each stage.
          </p>
        </Prose>
        <YouTube id="DCduAX7oqX8" title="Behavioral design" caption="The behavioral design behind the Octalysis mapping" />
        <Octalysis
          title="Discovery"
          note="Balanced black and white hat"
          values={[8, 0, 6, 2, 7, 0, 0, 0]}
        />
        <Cards
          items={[
            { title: "Epic meaning", text: "Campaigns like “Old gadgets for a new future: let’s protect our planet together”." },
            { title: "Social influence", text: "Stories from active recyclers and kabadiwaalas to inspire participation." },
            { title: "Avoidance", text: "The real consequences of disposing of e-waste badly." },
          ]}
        />
        <Octalysis title="Onboarding" note="Balanced all round" values={[8, 3, 6, 6, 3, 0, 3, 6]} />
        <Cards
          columns={2}
          items={[
            { title: "Epic meaning", text: "Keep the purpose-driven message going and tie it to the ecosystem." },
            { title: "Social influence", text: "Show how many neighbours, and nearby societies, are taking part." },
            { title: "Unpredictability", text: "First-time bonuses and surprise rewards." },
            { title: "Accomplishment", text: "Milestones, progress tracking and a disposal “profile board”." },
          ]}
        />
        <Octalysis title="Scaffolding" note="White hat prioritised" values={[8, 5, 5, 3, 3, 0, 5, 5]} />
        <Cards
          columns={2}
          items={[
            { title: "Epic meaning", text: "Regular updates on personal and community contributions." },
            { title: "Social influence", text: "Challenges between individuals and societies." },
            { title: "Empowerment", text: "Varied challenges let users plan their own recycling, with feedback." },
            { title: "Ownership", text: "Dashboards of lifetime and monthly impact build a sense of ownership." },
          ]}
        />
        <Octalysis title="Endgame" note="Long-term meaning" values={[9, 6, 5, 2, 3, 0, 5, 3]} />
        <Cards
          columns={2}
          items={[
            { title: "Epic meaning", text: "Lifetime contributions and advanced metrics, like CO₂ saved." },
            { title: "Social influence", text: "Community celebrations and public recognition of top recyclers." },
            { title: "Empowerment", text: "Users choose how to redeem points, with feedback on impact." },
            { title: "Ownership", text: "A personal history of impact and rewards." },
          ]}
        />
      </Chapter>

      <Chapter n="08" title="The bin" kicker="Wastonic e-waste bin">
        <Split>
          <Crop
            {...slide(21)}
            box={{ x: 0, y: 6, w: 50, h: 92 }}
            alt="Annotated render of the Wastonic e-waste bin: banner poster, screen, circuit box, society sticker, kabadiwala door, caster wheels"
            caption="50 × 50 × 100 cm"
          />
          <div>
            <Cards
              columns={2}
              items={[
                { title: "Weight detection", text: "Four 50 kg load sensors detect deposits to about 50 g, driving on-screen gamification." },
                { title: "Motivational messages", text: "Weight-adaptive messages, from a depositor’s impact to progress towards charity goals." },
                { title: "Status indicator", text: "Shows how full the bin is, so guards know when to call the kabadiwaalas." },
                { title: "Built to last", text: "Weather-resistant HDPE, a rubber mat to soften falls, and a 50 kg capacity." },
              ]}
            />
          </div>
        </Split>
        <Prose>
          <p>
            A key-locked <strong>kabadiwaala access door</strong> formalises the junk dealer’s role, and a{" "}
            <strong>society name sticker</strong> gives each bin a sense of belonging to its community.
          </p>
        </Prose>
      </Chapter>

      <Chapter n="09" title="Behaviour change" kicker="Piloted with a Mumbai housing society">
        <Steps
          items={[
            { title: "Spreading awareness", text: "Posters and flyers on what’s accepted and why it matters." },
            { title: "Pledge", text: "Residents sign a five-point e-waste pledge." },
            { title: "Call to action", text: "The bin goes in, and residents start depositing." },
            { title: "Result", text: "Feedback from residents and guards." },
          ]}
        />
        <Label>1 / Awareness</Label>
        <Gallery columns={2}>
          <Crop {...slide(19)} box={{ x: 5, y: 29, w: 50, h: 64 }} alt="Awareness poster: accepted items, three steps, recycling process and SDGs benefited" caption="Awareness poster" />
          <Crop {...slide(19)} box={{ x: 59, y: 7, w: 35, h: 90 }} alt="Tent-card flyer: what e-waste is, its impact, and how to reduce it" caption="Tent-card flyer" />
        </Gallery>
        <Label>2 / Pledge</Label>
        <Split>
          <Crop {...slide(20)} box={{ x: 34, y: 18, w: 29, h: 73 }} alt="Pledge sheet: five commitments to responsible e-waste disposal" caption="The pledge" />
          <Gallery columns={2}>
            <Crop {...slide(20)} box={{ x: 68, y: 37, w: 12, h: 25 }} alt="Resident signing the pledge on a sofa" />
            <Crop {...slide(20)} box={{ x: 82, y: 37, w: 12, h: 25 }} alt="Resident signing the pledge at a table" />
            <Crop {...slide(20)} box={{ x: 68, y: 64, w: 12, h: 25 }} alt="Resident in a floral kurta signing the pledge" />
            <Crop {...slide(20)} box={{ x: 82, y: 64, w: 12, h: 25 }} alt="Resident signing the pledge" />
          </Gallery>
        </Split>
        <Label>4 / Result</Label>
        <Stats items={[{ value: "4.85 / 5", label: "Rating", note: "from user feedback and the success criteria" }]} />
        <Gallery columns={4}>
          <Crop {...slide(22)} box={{ x: 75, y: 6, w: 20, h: 18 }} alt="Resident depositing into the bin" />
          <Crop {...slide(22)} box={{ x: 75, y: 26, w: 20, h: 18 }} alt="Resident opening the bin lid" />
          <Crop {...slide(22)} box={{ x: 75, y: 54, w: 20, h: 18 }} alt="Resident smiling beside the bin" />
          <Crop {...slide(22)} box={{ x: 75, y: 73, w: 20, h: 18 }} alt="Resident depositing items" />
        </Gallery>
        <Cards
          items={[
            { title: "Convenient", text: "Convenience drove binning; Wastonic matched it, with a bigger cause behind it." },
            { title: "Easy to understand", text: "On-screen instructions and an LED strip showing fill status, even from a distance." },
            { title: "Motivating", text: "The screen showed how much e-waste people deposited, with monthly and yearly recaps." },
            { title: "Charity over rewards", text: "Offered personal rewards too, residents refused: it would undercut the charity." },
            { title: "Fits both habits", text: "It suits those who bin things immediately and those who collect and dispose in bulk." },
          ]}
        />
      </Chapter>

      <Chapter n="10" title="Business model" kicker="A suggestive plan">
        <Cards
          items={[
            {
              tag: "Value",
              title: "Value proposition",
              text: "For societies: hassle-free disposal, a felt contribution to a greener environment, and a way to support charities. For communities: education and tangible collective impact.",
            },
            {
              tag: "Segments",
              title: "Customers",
              text: "Housing societies and residents, kabadiwaalas wanting a steady source, corporates seeking CSR, and environmental supporters.",
            },
            {
              tag: "Partners",
              title: "Key partners",
              text: "Certified recyclers, housing societies, municipal bodies, CSR sponsors, environmental NGOs and charities.",
            },
            { tag: "Activities", title: "Key activities", text: "Collection, awareness campaigns, fundraising, partnership building and impact measurement." },
            { tag: "Channels", title: "Channels", text: "Direct engagement with societies, events and campaigns, online presence and word of mouth." },
            { tag: "Relations", title: "Relationships", text: "Ongoing engagement, transparency on e-waste recycled and funds raised, and co-creation." },
          ]}
        />
        <Table
          head={["Revenue", "Costs"]}
          rows={[
            ["CSR sponsorships from corporates", "Fixed: bin manufacturing and installation"],
            ["A small share of e-waste sold to certified recyclers", "Fixed: tech, marketing and management teams"],
            ["Donations from individuals and societies", "Variable: campaigns and stakeholder support"],
            ["Government and institutional grants", "Variable: maintenance of bins and infrastructure"],
          ]}
        />
      </Chapter>
    </>
  );
}
