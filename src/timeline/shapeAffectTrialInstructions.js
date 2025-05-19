import InstructionsPlugin from "@jspsych/plugin-instructions";

export default {
  type: InstructionsPlugin,
  pages: [
    `
    <div style="max-width: 700px; margin: auto; text-align: left;">
    <h3>Norādījumi nākamajam uzdevumam - figūru vērtēšana</h3>
      <p>
        1. Aplūko ekrānā attēloto figūru.<br>
        2. Novērtē figūras radīto sajūtu un asociācijas, pārvietojot melno, apļveida slīdni uz skalas. Skalas katrā galā redzami savstarpēji pretēji apzīmējumi —
  <strong>jo tuvāk kādam no tiem novietots slīdnis, jo vairāk šī īpašība atbilst Tavai sajūtai par redzamo figūru</strong>.<br>
      </p>
    </div>
    `,
  ],
  show_clickable_nav: true,
  button_label_next: "Tālāk",
  button_label_previous: "Atpakaļ",
  button_label_finish: "Sākt",
  allow_backward: true,
  css_classes: "instructions-wrap",

  on_load: function () {},
  on_finish: function () {},
};
