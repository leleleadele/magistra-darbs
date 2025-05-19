import "../styles/main.scss";
import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import { initJsPsych } from "jspsych";
import tipiScale from "./timeline/tipiScale.js";
import saveDataLocally from "./utils/saveDataLocally.js";
import demographics from "./timeline/demographics.js";
import gewInstructions from "./timeline/gewInstructions.js";
import saveSuccess from "./layouts/saveSuccess.js";
import saveFail from "./layouts/saveFail.js";
import gew from "./timeline/gew.js";
import tobiiId from "./timeline/tobiiId.js";
import switchWindowsInstructions from "./timeline/switchWindowsInstructions.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import saveDataToFirestore from "./utils/saveDataToFirestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function run({ assetPaths }) {
  const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: true,
    message_progress_bar: "Eksperimenta izpilde",
    on_finish: async () => {
      try {
        await saveDataToFirestore(db, jsPsych, "eksperiments-3");
        await saveDataLocally(jsPsych);
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
    type: FullscreenPlugin,
    fullscreen_mode: false,
    button_label: "Turpināt",
  });

  timeline.push(tobiiId);
  timeline.push(gewInstructions);
  timeline.push(gew);
  timeline.push(switchWindowsInstructions);
  timeline.push(gew);
  timeline.push(tipiScale);
  timeline.push(...demographics);

  await jsPsych.run(timeline);

  return jsPsych;
}
