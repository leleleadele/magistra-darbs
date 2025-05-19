import GenevaWheelPlugin from "../plugins/jspsych-geneva-wheel.js";
import { gew_emotion_translations } from "../consts/index.js";

export default {
  type: GenevaWheelPlugin,
  prompt:
    "Izvēlies emociju un norādi tās intensitāti, kas vislabāk raksturo to, kā jūties šobrīd.",
  response_format: "single",
  labels: {
    otherLabel: "Lūdzu norādīt emociju:",
    resultPrefix: "Atlasīts:",
    submit: "Apstiprināt",
    intensity: "Intensitāte",
    cancel: "Atcelt",
  },
  emotion_translations: gew_emotion_translations,
};
