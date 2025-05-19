import { assignGroupWithConsentGenderAware } from "../utils/groupBalancer.js";
import InstructionsPlugin from "@jspsych/plugin-instructions";

export default function groupAssignmentStep(db, jsPsych) {
  return {
    type: InstructionsPlugin,
    pages: [
      "<p id='assignment-message'>Tiek noteikta eksperimenta grupa. Lūdzu uzgaidi...</p>",
    ],
    choices: "NO_KEYS",
    on_load: async function () {
      const allData = jsPsych.data.get().values();
      const genderTrial = allData.find((d) => !!d.response?.gender);
      const parsed = genderTrial ? genderTrial.response : {};
      const gender = parsed["gender"];
      const moodGroup = await assignGroupWithConsentGenderAware(db, gender);

      window.moodGroup = moodGroup;
      jsPsych.data.addProperties({ moodGroup });
      jsPsych.finishTrial();
    },
    button_label_next: "Tālāk",
    button_label_finish: "Sākt",
    allow_backward: false,
    css_classes: "instructions-wrap",
    allow_keys: false,
  };
}
