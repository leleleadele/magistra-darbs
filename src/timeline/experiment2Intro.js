import InstructionsPlugin from "@jspsych/plugin-instructions";

export default {
  type: InstructionsPlugin,
  pages: [
    `
    <div style="max-width: 700px; margin: auto; text-align: left;">
    <h3>Brīdinājumi pirms vizuālās meklēšanas eksperimenta veikšanas</h3>
    <p></p>
      <p>
        1. Lūdzu, veic eksperimentu <strong>pie datora</strong> (būs nepieciešama tastatūra).<br>
        2. Eksperimentā uz neilgu brīdi var tikt attēlotas nepatīkamas ainas.<br>
      </p>
    </div>
    `,
  ],
  show_clickable_nav: true,
  button_label_next: "Saprotu un esmu gatavs turpināt",
  button_label_previous: "Atpakaļ",
  button_label_finish: "Sākt",
  allow_backward: true,
  css_classes: "instructions-wrap",

  on_load: function () {},
  on_finish: function () {},
};
