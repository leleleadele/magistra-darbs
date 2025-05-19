import "../styles/main.scss";
import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";
import shapeTrials from "./timeline/shapeAffectTrials.js";
import tipiScale from "./timeline/tipiScale.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import saveDataToFirestore from "./utils/saveDataToFirestore.js";
import { firebaseConfig, shapes } from "./consts/experiment1.js";
import demographics from "./timeline/demographics.js";
import shapeTrialInstructions from "./timeline/shapeAffectTrialInstructions.js";
import saveSuccess from "./layouts/saveSuccess.js";
import saveFail from "./layouts/saveFail.js";
import gewTrial from "./timeline/gew.js";
import gewInstructions from "./timeline/gewInstructions.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function run({ assetPaths }) {
  const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: true,
    message_progress_bar: "Eksperimenta izpilde",
    on_finish: async () => {
      try {
        await saveDataToFirestore(db, jsPsych);
        document.body.innerHTML = saveSuccess;
      } catch (error) {
        console.error("Datu saglabāšana neizdevās:", error);
        document.body.innerHTML = saveFail;
      }
    },
  });

  const participantID = jsPsych.randomization.randomID(12);
  jsPsych.data.addProperties({ participant_id: participantID });

  const timeline = [];

  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images.concat([
      shapes.map((shape) => `assets/shapes/${shape}`),
    ]),
  });

  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: false,
    button_label: "Turpināt",
  });

  timeline.push(gewInstructions);
  timeline.push(gewTrial);

  const shuffled = jsPsych.randomization.shuffle(shapeTrials(shapes));
  const total = shuffled.length;

  const numberedShapeTrials = shuffled.map((item, index) => {
    return {
      ...item.trial,
      preamble: `
      <div style="text-align:center;">
        <img src="assets/shapes/${item.filename}" height="300" style="max-width: calc(100vw - 20px);">
      </div>
      <p class="stimuli-instructions">Novērtē attēloto figūru:</p>
      `,
      data: {
        ...item.trial.data,
        trial_number: index + 1,
        total_trials: total,
      },
    };
  });

  timeline.push(shapeTrialInstructions);
  timeline.push(...numberedShapeTrials);
  timeline.push(tipiScale);
  timeline.push(...demographics);

  await jsPsych.run(timeline);

  return jsPsych;
}
