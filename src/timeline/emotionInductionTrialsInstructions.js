import InstructionsPlugin from "@jspsych/plugin-instructions";

export default {
  type: InstructionsPlugin,
  pages: [
    `
    <div style="max-width: 700px; margin: auto; text-align: left;">
    <h3>Aplūko attēlus</h3>
      <p>
        Ekrānā tiks attēloti 10 attēli, katrs 5 sekundes. Attēli nomainīsies automātiski.<br>
      </p>
    </div>
    `,
  ],
  show_clickable_nav: true,
  button_label_next: "Tālāk",
  button_label_finish: "Sākt",
  allow_backward: false,
  css_classes: "instructions-wrap",

  on_load: function () {},
  on_finish: function () {},
};
