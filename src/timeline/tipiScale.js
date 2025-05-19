import SurveyLikertPlugin from "@jspsych/plugin-survey-likert";

export default {
  type: SurveyLikertPlugin,
  preamble:
    "<p>Novērtē, cik lielā mērā katrs apgalvojums attiecas uz Tavu vispārīgo raksturu (1 – Pilnīgi nepiekrītu, 7 – Pilnīgi piekrītu).</p>",
  questions: [
    {
      name: "extraversion",
      prompt: "Esmu ekstraverts, sabiedrisks:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "agreeableness_negative",
      prompt: "Es esmu kritisks, strīdu meklētājs:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "conscientiousness",
      prompt: "Esmu uzticams, disciplinēts:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "neuroticism",
      prompt: "Esmu nemierīgs, viegli uztraucos:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "openness",
      prompt: "Esmu atvērts jaunai pieredzei, iztēles bagāts:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "extraversion_negative",
      prompt: "Esmu rezervēts, klusējošs:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "agreeableness",
      prompt: "Es esmu laipns, iejūtīgs:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "conscientiousness_negative",
      prompt: "Esmu neuzticams, neorganizēts:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "neuroticism_negative",
      prompt: "Esmu emocionāli stabils, nelokāms:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
    {
      name: "openness_negative",
      prompt: "Man ir maz intereses par mākslu, estētiku:",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
    },
  ],
  css_classes: ["tipi-grid"],
  button_label: "Turpināt",
  data: { task: "TIPI" },
  allow_backward: true,
  scale_width: 400,

  on_load: function () {
    const button = document.querySelector(".jspsych-btn");
    button.disabled = true;

    function checkCompleted() {
      const checked = document.querySelectorAll(
        ".jspsych-survey-likert-opts input:checked"
      );
      if (checked.length === 10) {
        button.disabled = false;
      }
    }

    document
      .querySelectorAll(".jspsych-survey-likert-opts input")
      .forEach((input) => {
        input.addEventListener("change", checkCompleted);
      });
  },
};
