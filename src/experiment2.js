import "../styles/main.scss";
import { initJsPsych } from "jspsych";
import saveDataToFirestore from "./utils/saveDataToFirestore.js";
import {
  firebaseConfig,
  emotionInductionImagesNegative,
  emotionInductionImagesPositive,
  searchImages,
} from "./consts/experiment2.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import emotionWheel from "./timeline/gew.js";
import tipi from "./timeline/tipiScale.js";
import demographics from "./timeline/demographics.js";
import emotionWheelInstructions from "./timeline/gewInstructions.js";
import jsPsychPreload from "@jspsych/plugin-preload";
import saveSuccess from "./layouts/saveSuccess.js";
import saveFail from "./layouts/saveFail.js";
import groupAssignmentStep from "./timeline/groupAssignment.js";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import experiment2Intro from "./timeline/experiment2Intro.js";
import emotionInductionTrials from "./timeline/emotionInductionTrials.js";
import visualSearchBatches from "./timeline/visualSearchBatches.js";
import visualSearchPractice from "./timeline/visualSearchPractice.js";
import emotionInductionTrialsInstructions from "./timeline/emotionInductionTrialsInstructions.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const timeline = [];

export async function run({}) {
  const jsPsych = initJsPsych({
    on_finish: async () => {
      try {
        await saveDataToFirestore(db, jsPsych, "eksperiments-2");
        document.body.innerHTML = saveSuccess;
      } catch (error) {
        console.error("Datu saglabāšana neizdevās:", error);
        document.body.innerHTML = saveFail;
      }
    },
  });

  timeline.push({
    type: jsPsychPreload,
    images: [
      ...emotionInductionImagesNegative,
      ...emotionInductionImagesPositive,
      ...searchImages,
    ],
  });

  timeline.push(experiment2Intro);
  timeline.push(emotionWheelInstructions);
  timeline.push(emotionWheel);
  timeline.push(tipi);
  timeline.push(...demographics);
  timeline.push(groupAssignmentStep(db, jsPsych));
  timeline.push(emotionInductionTrialsInstructions);
  timeline.push(...emotionInductionTrials());
  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: 100,
  });
  timeline.push(visualSearchPractice);

  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: 100,
  });
  timeline.push(visualSearchBatches);
  timeline.push(emotionWheel);

  await jsPsych.run(timeline);
  return jsPsych;
}
