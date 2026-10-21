import { Callout, Cards, Chapter, Crop, Gallery, Label, Lead, Prose, Split, Stats, Steps, Table } from "@/components/case/Case";
import Storybook, { type Page } from "@/components/case/Storybook";
import YouTube from "@/components/case/YouTube";
import { getProject } from "@/data/projects";
import EpochLab from "./EpochLab";
import EpochLogo from "./EpochLogo";
import styles from "./epoch.module.css";

/*
 * Epoch, told as a web case study rather than a deck. Copy is transcribed
 * from the original slides; storyboards, characters, renders and photos are
 * cropped from the original artwork.
 */

const plates = getProject("epoch")?.plates ?? [];
/** Slide n of the original deck (1-based). */
const slide = (n: number) => plates[n - 1];

/** One storyboard panel cropped from a slide. */
const panel = (n: number, x: number, y: number, w: number, h: number, caption: string) => (
  <Crop key={`${n}-${x}-${y}`} {...slide(n)} box={{ x, y, w, h }} alt={`Storyboard: ${caption}`} caption={caption} />
);

/** One storyboard page, for a flip-through Storybook. */
const page = (n: number, x: number, y: number, w: number, h: number, caption: string): Page => ({
  ...slide(n),
  box: { x, y, w, h },
  alt: `Storyboard: ${caption}`,
  caption,
});

/*
 * Epoch's own display face, Archivo Black (already loaded site-wide as
 * --font-block), is reused here for the wordmark; no extra font needed.
 */

/** Class for the project page, so the hero picks up the identity too. */
export const theme = styles.theme;

const brandColors = [
  { name: "Mint", hex: "#90D880" },
  { name: "Crimson", hex: "#B82840" },
  { name: "Slate blue", hex: "#7898B8" },
  { name: "Chevron orange", hex: "#E8923C" },
];

/** Opening band in the brand's colours, built around the wordmark and lab set. */
function Brand() {
  return (
    <section className={styles.brand} aria-label="Epoch identity">
      <div className={styles.arcs} aria-hidden="true">
        <span />
        <span />
      </div>
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.logo}>
        <EpochLogo />
      </div>
      <div className={styles.brandText}>
        <p className={styles.brandKicker}>Introducing...</p>
        <p className={styles.brandLine}>
          <strong>Epoch moments</strong>: the decisive junctures that shape the course of human history, relived
          through AR, hologram and VR.
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

function OpeningChapters() {
  return (
    <>
      <Chapter n="01" title="The problem" kicker="Learning to swim without water">
        <Lead>
          Science education in India often feels like learning to swim without water. Students memorise facts instead of
          exploring ideas.
        </Lead>
        <Prose>
          <p>
            Experiments are <strong>step-by-step instructions</strong> with no room for curiosity. Concepts stay
            trapped in textbooks, never connecting to the real world. The result? Science becomes{" "}
            <strong>something to pass</strong>, not something to wonder about.
          </p>
        </Prose>
        <Stats
          items={[
            { value: "70%", label: "Struggle", note: "of students struggle with concepts because of limited hands-on learning" },
            { value: "30%+", label: "No proper labs", note: "of CBSE-affiliated schools lacked proper science labs (2022 survey)" },
            { value: "31%", label: "Find it abstract", note: "of students find science disconnected from real life" },
          ]}
        />
        <Prose>
          <p>
            Underneath it all, schools weigh <strong>theory</strong> far more heavily than <strong>practice</strong>.
          </p>
        </Prose>
      </Chapter>

      <Chapter n="02" title="Insights" kicker="What children told us">
        <Cards
          items={[
            {
              title: "Exploration",
              text: "Open-ended play builds wonder: children need the freedom to create their own narratives and scenarios.",
            },
            {
              title: "Representation",
              text: "Children who see diverse superheroes in stories develop more inclusive views of their peers.",
            },
            {
              title: "Discovery",
              text: "Framed as missions, mysteries or quests, science invites experimenting and builds interest in STEM.",
            },
            {
              title: "Perception",
              text: "Some children dislike scientists, linking them to endless studying. Show them as curious explorers instead.",
            },
            {
              title: "Relevance",
              text: "Students wonder where the science they study is actually used, so link it to everyday life and technology.",
            },
            {
              title: "Understanding",
              text: "Most rely on rote learning for formulas without grasping their meaning; they need to experience it.",
            },
          ]}
        />
        <Label>Stakeholders</Label>
        <Table
          head={["Who", "Role"]}
          rows={[
            ["Students (12–15)", "Primary users: they experience time-travel learning"],
            ["Teachers", "Integrate it into lessons"],
            ["Parents", "Encourage participation and engagement"],
            ["Schools", "Approve and implement the programme"],
          ]}
        />
      </Chapter>

      <Chapter n="03" title="Introducing Epoch" kicker="Living moments in history">
        <Split>
          <div>
            <Lead>
              Epoch moments are the decisive junctures that shape the course of human history: transformative periods
              whose waves ripple through time.
            </Lead>
            <Prose>
              <p>
                Time travel remains science fiction, but <strong>living moments in history</strong> through AR and VR
                is a powerful way for 12–15-year-olds to learn. Rather than reading about breakthroughs in a textbook,
                students are placed in simulated environments that evoke the mood and feeling of those moments.
              </p>
            </Prose>
          </div>
          <EpochLab />
        </Split>
        <Cards
          columns={2}
          items={[
            {
              tag: "01",
              title: "Hands-on learning",
              text: "Doing experiments, building things and working on projects to see and understand science.",
            },
            {
              tag: "02",
              title: "Storytelling in science",
              text: "Stories, real-life examples and historical discoveries make science engaging and memorable.",
            },
          ]}
        />
      </Chapter>

      <Chapter n="04" title="Three media" kicker="AR, hologram and VR">
        <Cards
          items={[
            { tag: "AR", title: "Augmented reality", text: "Brings molecules to life in 3D and overlays interactive physics simulations onto the classroom." },
            { tag: "Hologram", title: "Holograms", text: "Projects interactive 3D models, like anatomy or geometry, into the room for direct visualisation." },
            { tag: "VR", title: "Virtual reality", text: "Full 3D environments to explore complex systems, like cells, and feel phenomena, like gravity." },
          ]}
        />
        <Label>Epoch Experience Centre</Label>
        <Split>
          <Crop
            {...slide(9)}
            box={{ x: 6, y: 6, w: 88, h: 88 }}
            alt="Blueprint of the Epoch Experience Centre: hologram corridors around AR, VR and hologram rooms"
            caption="Floor plan: hologram recall corridors loop around the AR, VR and hologram rooms"
          />
          <Prose>
            <p>
              The centre is a loop. Visitors move through <strong>AR and VR rooms</strong> for tackling a problem and a
              larger <strong>hologram room</strong> for solving it, with hologram corridors for recall in between.
            </p>
            <p>It’s designed to be scalable and interchangeable: rooms swap as the curriculum changes.</p>
          </Prose>
        </Split>
      </Chapter>

      <Chapter n="05" title="The experience" kicker="Three rooms, three scientists">
        <Steps
          items={[
            {
              title: "AR: Galileo",
              text: "Open the app, meet Captain Chrono, time-travel to 1608, rebuild Galileo’s telescope and learn about his breakthrough.",
            },
            {
              title: "Hologram: Newton",
              text: "Get briefed by Captain Chrono, enter Newton’s room and split light into a spectrum with a prism.",
            },
            {
              title: "VR: Faraday & Edison",
              text: "Put on the headset, solve the task in Faraday’s room, find the orb in Time HQ, and help Edison invent the bulb.",
            },
            { title: "Reward", text: "Earn a medal for every mission completed." },
          ]}
        />
      </Chapter>

      <Chapter n="06" title="AR mission" kicker="Galileo’s stolen telescope">
        <Prose>
          <p>
            AR brings historical events into the classroom. Pointing a phone at the room, students watch Galileo
            observe the moons of Jupiter: a virtual telescope, the planets in motion, the history and the explanation.
            It works for many subjects and chapters, and remotely too.
          </p>
        </Prose>
        <Steps
          items={[
            { title: "Open the app", text: "Begin the immersive experience." },
            { title: "Meet your mentor", text: "A futuristic guide appears." },
            { title: "Travel to 1608", text: "Journey back to Galileo’s era as his assistant." },
            { title: "Solve the mystery", text: "The original telescope has been stolen." },
            { title: "Find clues", text: "Use the paper hint and the scattered lenses." },
            { title: "Rebuild it", text: "Assemble the missing parts and see the planet." },
            { title: "Gain an insight", text: "Learn about Galileo’s breakthrough." },
          ]}
        />
        <Label>Storyboard</Label>
        <Storybook
          title="Galileo’s stolen telescope"
          pages={[
            page(14, 5, 23, 16, 27, "2099: science is at risk"),
            page(14, 22, 23, 16, 27, "Through the time vortex"),
            page(14, 39, 23, 16, 27, "1609, Galileo’s study"),
            page(14, 56, 23, 16, 27, "“Why can’t I see anything?”"),
            page(14, 73, 23, 16, 27, "Searching the room in AR"),
            page(14, 5, 52, 16, 27, "Rebuilding the telescope"),
            page(14, 39, 52, 16, 27, "The moons of Jupiter"),
            page(14, 73, 52, 16, 27, "“Now to save the other Epochs”"),
          ]}
        />
      </Chapter>

      <Chapter n="07" title="Hologram room" kicker="An on-demand recap teacher">
        <Prose>
          <p>
            Imagine Captain Chrono and the Time Police as a personal, on-demand recap teacher: a{" "}
            <strong>hologram echo</strong> of the instructor replays the explanation of a tricky concept exactly as it
            happened, gestures and all, with live annotations floating in front of you.
          </p>
          <p>
            Need to revisit a point? Tell the Time Police to rewind or fast-forward. Captain Chrono returns with
            mind-bending questions that help students remember the lesson and carry it with them.
          </p>
        </Prose>
        <Label>Storyboard</Label>
        <Gallery columns={3}>
          {panel(19, 13, 12, 21, 20, "The hologram room")}
          {panel(19, 66, 12, 21, 20, "A hologram rises from the desk")}
          {panel(19, 13, 33, 21, 20, "Sound, demonstrated")}
          {panel(19, 66, 33, 21, 20, "Beneath the sea")}
          {panel(19, 40, 54, 21, 20, "Out into space")}
          {panel(19, 66, 54, 21, 20, "Solid, liquid, vacuum")}
        </Gallery>
      </Chapter>

      <Chapter n="08" title="AR & hologram characters" kicker="Captain Chrono, Galileo and Newton">
        <Gallery columns={3}>
          <Crop {...slide(16)} box={{ x: 61, y: 10, w: 16, h: 71 }} alt="Captain Chrono: blond hair, red visor, long blue trench coat" caption="Captain Chrono: fearless time enforcer" framed={false} />
          <Crop {...slide(17)} box={{ x: 46, y: 0, w: 15, h: 90 }} alt="Galileo turnaround: white beard, ruff collar, rust-orange coat" caption="Galileo: proved the Earth orbits the Sun" framed={false} />
          <Crop {...slide(18)} box={{ x: 47, y: 0, w: 15, h: 96 }} alt="Newton turnaround: white wig, blue coat, orange waistcoat" caption="Newton: the laws of motion and gravity" framed={false} />
        </Gallery>
        <Gallery columns={2}>
          <Crop {...slide(17)} box={{ x: 63, y: 3, w: 22, h: 82 }} alt="Galileo head studies from four angles" caption="Galileo, head studies" />
          <Crop {...slide(18)} box={{ x: 64, y: 8, w: 19, h: 77 }} alt="Newton head studies from four angles" caption="Newton, head studies" />
        </Gallery>
      </Chapter>
    </>
  );
}

function VrChapters({ start }: { start: number }) {
  const n = (i: number) => String(start + i).padStart(2, "0");
  return (
    <>
      <Chapter n={n(0)} title="Why VR" kicker="What only virtual reality can do">
        <Cards
          columns={2}
          items={[
            {
              tag: "01",
              title: "Simulated material testing",
              text: "Students try different filament materials in a virtual lab, seeing what lights up and for how long.",
            },
            {
              tag: "02",
              title: "Visualising the invisible",
              text: "Magnetic field lines flow visibly around the coil, so something intangible becomes tangible.",
            },
            {
              tag: "03",
              title: "The “aha!” moment",
              text: "Getting a stable light bulb to glow is visually compelling, which makes the discovery stick.",
            },
            {
              tag: "04",
              title: "Direct cause and effect",
              text: "Moving a magnet directly creates electricity, in a way static pictures and videos can’t show.",
            },
          ]}
        />
      </Chapter>

      <Chapter n={n(1)} title="The VR mission" kicker="Save the timeline">
        <Steps
          items={[
            { title: "Enter the city", text: "Walk through a futuristic city, the year 2099." },
            { title: "Board the train", text: "Step onto the electromagnetic train and wait." },
            { title: "Faraday’s room", text: "Help save the timeline by performing electromagnetic induction." },
            { title: "Time police HQ", text: "Find the orb that is disrupting the timeline." },
            { title: "Edison’s room", text: "Help Edison invent the light bulb by testing every filament." },
            { title: "Earn a badge", text: "Rewards that motivate further exploration." },
          ]}
        />
        <Label>Storyboard / Faraday</Label>
        <Gallery columns={4}>
          {panel(22, 8, 7, 18.5, 29, "2099: travel to the HQ")}
          {panel(22, 28, 7, 18.5, 29, "Boarding the train")}
          {panel(22, 48, 7, 18.5, 29, "Turning the dial")}
          {panel(22, 67, 7, 18.5, 29, "Arriving in 1879")}
          {panel(22, 8, 39, 18.5, 29, "Metal rod, coil, battery")}
          {panel(22, 28, 39, 18.5, 29, "Wrapping the coil")}
          {panel(22, 48, 39, 18.5, 29, "Connecting the battery")}
          {panel(22, 8, 71, 18.5, 29, "Inducing a current")}
          {panel(22, 28, 71, 18.5, 29, "Timeline saved")}
          {panel(22, 48, 71, 18.5, 29, "Through the portal")}
          {panel(22, 67, 71, 18.5, 29, "The HQ’s hall of orbs")}
        </Gallery>
        <Label>Storyboard / Edison</Label>
        <Gallery columns={4}>
          {panel(23, 8, 1, 18, 23, "Entering the HQ")}
          {panel(23, 27, 1, 18, 23, "The disrupted orb")}
          {panel(23, 46, 1, 18, 23, "1879, New Jersey")}
          {panel(23, 66, 1, 18, 23, "Edison’s lab")}
          {panel(23, 46, 26, 18, 23, "Coconut hair")}
          {panel(23, 66, 26, 18, 23, "Oops")}
          {panel(23, 8, 51, 18, 23, "Platinum wire")}
          {panel(23, 27, 51, 18, 23, "Too expensive")}
          {panel(23, 46, 51, 18, 23, "Bamboo carbon")}
          {panel(23, 66, 51, 18, 23, "Light")}
        </Gallery>
        <Prose>
          <p>
            Each failed filament teaches something: coconut hair burns out, platinum works but costs too much, and{" "}
            <strong>carbonised bamboo</strong> finally gives a stable, affordable light.
          </p>
        </Prose>
      </Chapter>

      <Chapter n={n(2)} title="VR characters" kicker="Edison, Faraday and Captain Chrono in 3D">
        <Gallery columns={3}>
          <Crop {...slide(25)} box={{ x: 54, y: 13, w: 26, h: 85 }} alt="3D render of Thomas Edison in a green coat" caption="Edison: lit up the world with innovation" />
          <Crop {...slide(26)} box={{ x: 54, y: 3, w: 26, h: 93 }} alt="3D render of Michael Faraday in a maroon coat" caption="Faraday: a changing magnetic field induces current" />
          <Crop {...slide(27)} box={{ x: 54, y: 4, w: 27, h: 87 }} alt="3D render of Captain Chrono in a navy trench coat" caption="Captain Chrono: fearless time enforcer" />
        </Gallery>
        <Prose>
          <p>
            <strong>Captain Chrono</strong> is the guide who ties the missions together: a fearless time enforcer who
            keeps history on track while leading young explorers through the past.
          </p>
        </Prose>
      </Chapter>

      <Chapter n={n(3)} title="The space" kicker="Rooms, a scale model and rewards">
        <Label>Room design</Label>
        <Gallery columns={2}>
          <Crop {...slide(28)} box={{ x: 10, y: 11, w: 31, h: 85 }} alt="Unfolded room texture: brick walls and an arched navy door" caption="Corridor" />
          <Crop {...slide(28)} box={{ x: 44, y: 11, w: 40, h: 83 }} alt="Unfolded room texture: bookshelves, a blackboard and framed pictures" caption="Study" />
        </Gallery>
        <Label>Scale model</Label>
        <Gallery columns={4}>
          <Crop {...slide(29)} box={{ x: 2.5, y: 6, w: 22.5, h: 79 }} alt="Scale model of the Epoch centre with its lit sign" />
          <Crop {...slide(29)} box={{ x: 26, y: 6, w: 23, h: 79 }} alt="Top-down view of the model’s rooms and corridors" />
          <Crop {...slide(29)} box={{ x: 49.5, y: 6, w: 23, h: 79 }} alt="Top-down view with lit interiors" />
          <Crop {...slide(29)} box={{ x: 73, y: 6, w: 23, h: 79 }} alt="Side view of the model with the Epoch sign" />
        </Gallery>
        <Label>Medals</Label>
        <Split>
          <Gallery columns={3} phones>
            <Crop {...slide(30)} box={{ x: 16, y: 25, w: 13, h: 62 }} alt="Astronomy medal with a planet and telescope" framed={false} />
            <Crop {...slide(30)} box={{ x: 41.5, y: 25, w: 13, h: 62 }} alt="Optics medal with a rainbow ribbon and a prism" framed={false} />
            <Crop {...slide(30)} box={{ x: 65.5, y: 25, w: 13, h: 62 }} alt="Gravity medal with a space-time mesh" framed={false} />
          </Gallery>
          <Prose>
            <p>
              Each completed mission earns a medal tied to a discovery: astronomy, light and optics, and gravity.
            </p>
          </Prose>
        </Split>
        <Label>Let’s take a look at our video...</Label>
        <YouTube id="LEDTF4EPZNI" title="Epoch experience center VR" caption="A walkthrough of the Epoch experience centre, in VR" />
      </Chapter>

      <Chapter n={n(4)} title="Why it’s different" kicker="How Epoch is unique">
        <Cards
          columns={2}
          items={[
            { title: "Beyond role-play", text: "Unlike KidZania, kids don’t just pretend: they actively take part in history and science." },
            { title: "Deeper engagement", text: "Not passive like textbooks or videos. Students live history and science through AR, VR and holograms." },
            { title: "Modular & scalable", text: "Adaptable modules fit different locations and evolve with new curriculum needs." },
            { title: "Many formats", text: "A physical centre, an app, a school programme, or a VR game." },
          ]}
        />
      </Chapter>

      <Chapter n={n(5)} title="User testing" kicker="Students and teachers">
        <Stats items={[{ value: "4.2 / 5", label: "Average rating" }]} />
        <Table
          head={["", "What worked", "What didn’t"]}
          rows={[
            [
              "Students",
              "The storytelling, the time-travel aspect, the graphics and world building. Age-relevant, with immediate recall; they liked the niche scientists and wanted more tasks and subjects.",
              "Wanted more popular scientists too, and more audio.",
            ],
            [
              "Teachers",
              "Saw the children happy with a scientist for the first time; would use it in class for initial explanations; liked the visuals and UI.",
              "More audio and more interaction with the scientist.",
            ],
          ]}
        />
      </Chapter>

      <Chapter n={n(6)} title="Impact" kicker="Usability and feasibility">
        <Cards
          items={[
            { title: "Usability", text: "Real-time feedback and cues in the space, mission-based instructions, interactions pitched at teenage skill levels." },
            { title: "Scalability", text: "Adaptable room modules fit different locations, customisable by subject and curriculum." },
            { title: "Feasibility", text: "AR, hologram and VR work independently or together, and assets are reused across sessions at minimal cost." },
          ]}
        />
        <Callout label="In one line">
          Epoch’s time-travel story links each medium, starting with an accessible AR mobile game, moving through a
          partially immersive hologram room, and building towards deeper VR immersion.
        </Callout>
        <Label>Future scope</Label>
        <Steps
          items={[
            { title: "Test & validate", text: "Run user testing of the full Epoch experience with students and teachers." },
            { title: "More subjects", text: "Cover all the sciences: physics, chemistry and biology." },
            { title: "More levels", text: "New hologram and VR missions around key scientific milestones." },
            { title: "Partners", text: "Arcades and museums as experience centres and marketing touchpoints." },
          ]}
        />
      </Chapter>
    </>
  );
}

export default function EpochCase() {
  return (
    <>
      <Brand />
      <OpeningChapters />
      <VrChapters start={9} />
    </>
  );
}
