import jsPsychImageKeyboardResponse from "@jspsych/plugin-image-keyboard-response";
import jsPsychHtmlButtonResponse from "@jspsych/plugin-html-button-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
          <p>Kolīdz meklējamo formu atrodi, <strong>nekavējoties</strong> spied "SPACE" vai jebkuru citu tastatūras taustiņu.</p>
            <p>Meklē sekojošo formu:</p>
            <img src="${targetImage}" height="80" style="display:block;margin:48px auto 54px;" />
          `,
          choices: ["Sākt uzdevumu"],
          data: { task: "instruction", batch: batchName },
        },
        ...trials,
      ],
      data: { batch: batchName },
      randomize_order: true, 
    };
  }

  const batch1 = makeBatch(
    "neg-pos",
    "assets/search/neg-pos.png",
    shuffleArray([
      makeTrial("assets/search/neg-pos-1.svg"),
      makeTrial("assets/search/neg-pos-2.svg"),
      makeTrial("assets/search/neg-pos-3.svg"),
      makeTrial("assets/search/neg-pos-4.svg"),
    ]).flat()
  );
  
  const batch2 = makeBatch(
    "pos-neu",
    "assets/search/pos-neu.png",
    shuffleArray([
      makeTrial("assets/search/pos-neu-1.svg"),
      makeTrial("assets/search/pos-neu-2.svg"),
      makeTrial("assets/search/pos-neu-3.svg"),
      makeTrial("assets/search/pos-neu-4.svg"),
    ]).flat()
  );
  
  const batch3 = makeBatch(
    "pos-neg",
    "assets/search/pos-neg.png",
    shuffleArray([
      makeTrial("assets/search/pos-neg-1.svg"),
      makeTrial("assets/search/pos-neg-2.svg"),
      makeTrial("assets/search/pos-neg-3.svg"),
      makeTrial("assets/search/pos-neg-4.svg"),
    ]).flat()
  );
  
  const batch4 = makeBatch(
    "neg-neu",
    "assets/search/neg-neu.png",
    shuffleArray([
      makeTrial("assets/search/neg-neu-1.svg"),
      makeTrial("assets/search/neg-neu-2.svg"),
      makeTrial("assets/search/neg-neu-3.svg"),
      makeTrial("assets/search/neg-neu-4.svg"),
    ]).flat()
  );
  
const visualSearchBatches = {
  timeline: shuffleArray([
    batch1,
    batch2,
    batch3,
    batch4,
  ]),
  randomize_order: true, 
};

export default visualSearchBatches;