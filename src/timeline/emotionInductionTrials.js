import jsPsychImageKeyboardResponse from "@jspsych/plugin-image-keyboard-response";
import {
  emotionInductionImagesNegative,
  emotionInductionImagesPositive,
} from "../consts/experiment2.js";

export default function emotionInductionTrials(jsPsych) {
      const imageTrials = []

      for (let i = 0; i < 10; i++) { 
        imageTrials.push({
            type: jsPsychImageKeyboardResponse,
            stimulus: function() {
                const moodGroup = window.moodGroup;
    
                const images =
                  moodGroup === "negative"
                    ? emotionInductionImagesNegative
                    : emotionInductionImagesPositive;

                    return images[i]
            },
            choices: "NO_KEYS",
            trial_duration: 5000,
          })
      }

      return imageTrials
  };

