import SurveyHtmlFormPlugin from "@jspsych/plugin-survey-html-form";
import affectScales from "../layouts/stimuliAffectSliders.js";

function generateShapeTrial(shape) {
  return {
    type: SurveyHtmlFormPlugin,
    html: affectScales,
    button_label: "Turpināt",
    data: {
      stimulus: shape,
      task: "Stimuli",
    },
    on_load: function () {
      const button = document.querySelector(".jspsych-btn");
      button.disabled = true;

      const sliders = {
        valence: document.getElementById("valence"),
        pleasantness: document.getElementById("pleasantness"),
        liking: document.getElementById("liking"),
        tension: document.getElementById("tension"),
      };

      const touched = {
        valence: false,
        pleasantness: false,
        liking: false,
        tension: false,
      };

      function enableButton() {
        const allTouched = Object.values(touched).every((moved) => moved);
        button.disabled = !allTouched;
      }

      for (const [key, slider] of Object.entries(sliders)) {
        slider.addEventListener("input", () => {
          touched[key] = true;
          enableButton();
        });
      }
    },
  };
}

const shapeTrials = (shapeFilenames) =>
  shapeFilenames.map((filename) => ({
    filename,
    trial: generateShapeTrial(filename),
  }));

export default shapeTrials;
