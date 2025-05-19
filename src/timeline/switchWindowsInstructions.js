import InstructionsPlugin from "@jspsych/plugin-instructions";

export default {
  type: InstructionsPlugin,
  pages: [
    `
    <div style="max-width: 700px; margin: auto; text-align: left;">
      <h3>Neaizver šo logu!</h3>
      <p>
        Tagad, lūdzu, atver Tobii lietotni un veic acu kustību eksperimentu.
        Neaizver šo logu, jo pie tā vēl būs nepieciešams atgriezties, kolīdz eksperimentu būsi pabeidzis.
      </p>
      <p>        
        Ja esi atgriezies no acu kustību eksperimenta, lūdzu, noklikšķini pogu, lai turpinātu.
      </p>
    </div>
    `,
  ],
  show_clickable_nav: true,
  button_label_next: "Pabeidzu acu kustību eksperimentu",
  button_label_previous: "Atpakaļ",
  button_label_finish: "Sākt",
  allow_backward: true,
  css_classes: "instructions-wrap",

  on_load: function () {},
  on_finish: function () {},
};
