import { ParameterType } from "jspsych";

class GenevaWheelPlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }
  static info = {
    name: "geneva-wheel",
    parameters: {
      prompt: {
        type: ParameterType.STRING,
        default: "How do you feel right now?",
      },
      labels: {
        type: ParameterType.OBJECT,
        default: {
          otherLabel: "Please specify:",
          resultPrefix: "Selected emotion:",
          submit: "Continue",
          intensity: "Intensity",
          cancel: "Cancel",
        },
      },
      response_format: {
        type: ParameterType.STRING,
        default: "single",
      },
      emotion_translations: {
        type: ParameterType.OBJECT,
        default: {},
      },
    },
  };

  trial(display_element, trial) {
    const labels = trial.labels;
    const isMultiple = trial.response_format === "multiple";

    const baseEmotions = [
      "Interest",
      "Amusement",
      "Pride",
      "Joy",
      "Pleasure",
      "Contentment",
      "Love",
      "Admiration",
      "Relief",
      "Compassion",
      "Sadness",
      "Guilt",
      "Regret",
      "Shame",
      "Disappointment",
      "Fear",
      "Disgust",
      "Contempt",
      "Hate",
      "Anger",
    ];

    const translatedEmotions = baseEmotions.map((name) => ({
      name,
      label: trial.emotion_translations[name] || name,
    }));

    const radiusSteps = [];
    const baseRadius = 8;
    const spacing = 8;
    for (let i = 0; i < 5; i++) {
      const size = baseRadius + 3.5 * i;
      const previousCenter = i === 0 ? 60 : radiusSteps[i - 1];
      const previousSize = baseRadius + 3.5 * (i - 1);
      const newCenter = previousCenter + previousSize + spacing + size;
      radiusSteps.push(newCenter);
    }

    let svgEmotionCircles = "";

    translatedEmotions.forEach((emotion, index) => {
      const angleDeg = index * (360 / translatedEmotions.length) - 82;
      const angleRad = (angleDeg * Math.PI) / 180;

      radiusSteps.forEach((r, intensityIndex) => {
        const x = Math.cos(angleRad) * r;
        const y = Math.sin(angleRad) * r;
        const size = baseRadius + 3.5 * intensityIndex;
        svgEmotionCircles += `
          <circle cx="${x}" cy="${y}" r="${size}" fill="${
          index % 2 ? "#fff" : "#d6d6d6"
        }" stroke="#333" class="circle" data-emotion="${
          emotion.name
        }" data-intensity="${intensityIndex + 1}"/>
        `;
      });

      const outerIndex = radiusSteps.length - 1;
      const outerCenter = radiusSteps[outerIndex];
      const outerSize = baseRadius + 3.5 * outerIndex;
      const labelRadius = outerCenter + outerSize + 18;

      const labelX = Math.cos(angleRad) * labelRadius;
      const labelY = Math.sin(angleRad) * labelRadius;

      svgEmotionCircles += `
        <text x="${labelX}" y="${labelY}" class="label" text-anchor="middle">${emotion.label}</text>
      `;
    });

    const noneLabel = trial.emotion_translations["None"] || "None";
    const otherLabel = trial.emotion_translations["Other"] || "Other";

    const svgCenterEmotions = `
      <circle cx="0" cy="-30" r="20" fill="#eee" stroke="#333" class="circle" data-emotion="None" data-intensity="0"/>
      <text x="0" y="-30" class="label" text-anchor="middle">${noneLabel}</text>
      <circle cx="0" cy="30" r="20" fill="#eee" stroke="#333" class="circle" data-emotion="Other" data-intensity="0"/>
      <text x="0" y="35" class="label" text-anchor="middle">${otherLabel}</text>
    `;

    display_element.innerHTML = `
      <div class="gew">
        <h3 style="font-size: 16px;">${trial.prompt}</h3>
        <div class="gew-wheel-container">
          <svg viewBox="-350 -300 700 600" width="100%" id="gew-wheel"  preserveAspectRatio="xMidYMid meet">
            ${svgEmotionCircles}
            ${svgCenterEmotions}
          </svg>
        </div>
        <p id="gew-result"><strong>${
          labels.resultPrefix
        }</strong> ${noneLabel}</p>

        <dialog id="other-dialog">
          <form method="dialog">
            <label>${labels.otherLabel}</label>
            <input type="text" id="dialog-other-text" style="width: 100%; margin-top: 8px" />
            <label style="margin-top: 12px; display: block">${
              labels.intensity
            }</label>
            <div id="dialog-intensity-circles" style="display: flex; gap: 10px; align-items: center; justify-content: center; margin-top: 6px;">
              ${[1, 2, 3, 4, 5]
                .map(
                  (i) =>
                    `<div class="dialog-intensity-circle" data-intensity="${i}" title="${i}" style="width: ${
                      12 + i * 4
                    }px; height: ${
                      12 + i * 4
                    }px; border-radius: 50%; background: #ddd; cursor: pointer;"></div>`
                )
                .join("")}
            </div>
            <div style="margin-top: 16px; text-align: right">
              <button class="jspsych-btn" id="cancel-other" type="button">${
                labels.cancel
              }</button>
              <button class="jspsych-btn" id="confirm-other" value="ok" disabled>${
                labels.submit
              }</button>
            </div>
          </form>
        </dialog>

        <div style="margin-top: 20px; text-align: center;">
          <button class="jspsych-btn" id="submit-gew" disabled>${
            labels.submit
          }</button>
        </div>
      </div>
    `;

    const selectedEmotions = {};
    let selectedEmotion = null;
    let selectedIntensity = null;
    let dialogSelectedIntensity = null;

    const resultText = document.getElementById("gew-result");
    const submitBtn = document.getElementById("submit-gew");
    const dialog = document.getElementById("other-dialog");
    const dialogInput = document.getElementById("dialog-other-text");
    const confirmOtherBtn = document.getElementById("confirm-other");

    function validateOtherDialog() {
      confirmOtherBtn.disabled = !(
        dialogInput.value.trim() && dialogSelectedIntensity
      );
    }

    dialogInput.addEventListener("input", validateOtherDialog);

    document.querySelectorAll(".dialog-intensity-circle").forEach((el) => {
      el.addEventListener("click", (e) => {
        dialogSelectedIntensity = e.target.getAttribute("data-intensity");
        document
          .querySelectorAll(".dialog-intensity-circle")
          .forEach((c) => (c.style.background = "#ddd"));
        e.target.style.background = "#aaa";
        validateOtherDialog();
      });
    });

    document.getElementById("cancel-other").addEventListener("click", () => {
      dialog.close();
    });

    document.querySelectorAll(".circle").forEach((el) => {
      el.addEventListener("click", (e) => {
        const wasSelected = e.target.classList.contains("selected");
        const emotion = e.target.getAttribute("data-emotion");
        const intensity = e.target.getAttribute("data-intensity");

        if (!isMultiple) {
          Object.keys(selectedEmotions).forEach(
            (key) => delete selectedEmotions[key]
          );
          document
            .querySelectorAll(".circle")
            .forEach((c) => c.classList.remove("selected"));
          e.target.classList.add("selected");
          selectedEmotions[emotion] = { intensity };
        } else {
          if (wasSelected) {
            e.target.classList.remove("selected");
            delete selectedEmotions[emotion];
            updateResult();
            checkEnableSubmit();
            return;
          } else {
            document
              .querySelectorAll(`.circle[data-emotion="${emotion}"]`)
              .forEach((c) => c.classList.remove("selected"));
            e.target.classList.add("selected");
          }
        }

        if (emotion === "None") {
          Object.keys(selectedEmotions).forEach(
            (key) => delete selectedEmotions[key]
          );
          document
            .querySelectorAll(".circle")
            .forEach((c) => c.classList.remove("selected"));
          e.target.classList.add("selected");

          if (isMultiple && wasSelected) {
            delete selectedEmotions[emotion];
            e.target.classList.remove("selected");
          } else {
            selectedEmotions[emotion] = { intensity };
            e.target.classList.add("selected");
          }
        } else {
          delete selectedEmotions["None"];
          document.querySelectorAll(".circle").forEach((c) => {
            if (c.getAttribute("data-emotion") === "None")
              c.classList.remove("selected");
          });

          if (emotion === "Other") {
            dialogInput.value = "";
            dialogSelectedIntensity = null;
            document
              .querySelectorAll(".dialog-intensity-circle")
              .forEach((c) => (c.style.background = "#ddd"));
            validateOtherDialog();
            dialog.showModal();
            return;
          } else {
            selectedEmotions[emotion] = { intensity };
          }
        }

        selectedEmotion = emotion;
        selectedIntensity = intensity;
        updateResult();
        checkEnableSubmit();
      });
    });

    confirmOtherBtn.addEventListener("click", () => {
      const label = dialogInput.value.trim();
      if (label && dialogSelectedIntensity) {
        delete selectedEmotions["None"];
        document.querySelectorAll(".circle").forEach((c) => {
          if (c.getAttribute("data-emotion") === "None")
            c.classList.remove("selected");
        });
        selectedEmotions["Other"] = {
          intensity: dialogSelectedIntensity,
          label,
        };
        selectedEmotion = "Other";
        selectedIntensity = dialogSelectedIntensity;
        updateResult();
        checkEnableSubmit();
      }
    });

    function updateResult() {
      const parts = Object.entries(selectedEmotions).map(([key, val]) => {
        const label =
          key === "Other" && val.label
            ? val.label
            : trial.emotion_translations[key] || key;
        return `${label} (${val.intensity})`;
      });
      resultText.innerHTML = `<strong>${
        labels.resultPrefix
      }</strong> ${parts.join(", ")}`;
    }

    function checkEnableSubmit() {
      if (isMultiple) {
        const valid = Object.values(selectedEmotions).some((e) => e.intensity);
        submitBtn.disabled = !valid;
      } else {
        submitBtn.disabled = !(selectedEmotion && selectedIntensity);
      }
    }

    submitBtn.addEventListener("click", () => {
      const trial_data = {
        emotions: selectedEmotions,
      };
      display_element.innerHTML = "";
      this.jsPsych.finishTrial(trial_data);
    });
  }
}

export default GenevaWheelPlugin;
