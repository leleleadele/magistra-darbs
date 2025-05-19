import SurveyHtmlFormPlugin from "@jspsych/plugin-survey-html-form";

export default {
  type: SurveyHtmlFormPlugin,
  preamble: "<p>Lūdzu, ievadi savu dalībnieka ID:</p>",
  html: `
    <input name="tobii_id" type="text" required />
  `,
};
