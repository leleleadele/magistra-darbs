/**
 * @title stimuli-affect-research
 * @description
 * @version 0.1.0
 *
 * @assets assets/
 */

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
const experimentToRun = "experiment1"; //mainīt uz "experiment1", "experiment2" vai "experiment3" pēc nepieciešamības

let run;

switch (experimentToRun) {
  case "experiment1":
    ({ run } = await import("./experiment1.js"));
    break;
  case "experiment2":
    ({ run } = await import("./experiment2.js"));
    break;
  case "experiment3":
    ({ run } = await import("./experiment3.js"));
    break;
  default:
    throw new Error(`Unknown experiment: ${experimentToRun}`);
}

export { run };
