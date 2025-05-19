import jsPsychImageKeyboardResponse from "@jspsych/plugin-image-keyboard-response";
import jsPsychHtmlButtonResponse from "@jspsych/plugin-html-button-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";

function makeTrial(image) {
  return [
    {
      type: jsPsychImageKeyboardResponse,
      stimulus: "assets/search/fixation.svg",
      choices: "NO_KEYS",
      trial_duration: 3000,
      data: { task: "fixation" },
    },
    {
      type: jsPsychImageKeyboardResponse,
      stimulus: image,
      trial_duration: null,
      data: { task: "visual_search", stimulus_name: image },
      css_classes: "visual-search",
    },
    {
        type: HtmlKeyboardResponsePlugin,
        stimulus: "",
        trial_duration: 100,
    }
  ];
}

function makeBatch(batchName, targetImage, trials) {
    return {
      timeline: [
        {
          type: jsPsychHtmlButtonResponse,
          stimulus: `
            <h3>Meklēšanas uzdevums</h3>
            <div>
            <p>Uz ekrāna būs attēlotas abstraktas formas. Tavs uzdevums ir starp tām atrast <strong> vienu konkrētu formu </strong>, kas norādīta zemāk.<br>
            Kolīdz meklējamo formu atrodi, <strong>nekavējoties</strong> spied "SPACE" vai jebkuru citu tastatūras taustiņu.</p>
            <p>Kopā meklēšana būs jāveic 18 reizes. Pirmās divas reizes ir vingrināšanās.<br>
            Pirms katras meklēšanas kārtas būs redzams fiksācijas punkts ekrāna centrā uz 3 sekundēm.</p>
</div>
            <p>Meklē sekojošo formu:</p>
            <img src="${targetImage}" height="80" style="display:block;margin:48px auto 54px;" />
            <p style="display:block;margin:48px auto 54px;">Uzreiz, kolīdz atrodi, spied "SPACE" vai jebkuru citu taustiņu</p>
          `,
          choices: ["Sākt uzdevumu"],
          data: { task: "instruction", batch: batchName },
        },
        ...trials,
      ],
      data: { batch: batchName },
    };
  }

const batch1 = makeBatch("practice", "assets/search/test-target.png", [
  ...makeTrial("assets/search/test.svg"),
  ...makeTrial("assets/search/test2.svg"),
]);

const visualSearchBatches = {
  timeline: [
    batch1,
  ],
  randomize_order: false, 
};

export default visualSearchBatches;