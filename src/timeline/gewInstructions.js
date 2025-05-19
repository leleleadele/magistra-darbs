import InstructionsPlugin from "@jspsych/plugin-instructions";

export default {
  type: InstructionsPlugin,
  pages: [
    `
    <div style="max-width: 700px; margin: auto; text-align: left;">
      <h3>Norādījumi par emociju apli</h3>
      <p>
        Lai pēc iespējas precīzāk aprakstītu to, kā jūties šobrīd, aicinām Tevi izvēlēties atbilstošu emociju no emociju apļa.
        Katra veida emocija izriet no apļa centra kā stars, un tas sastāv no dažādu izmēru aplīšiem,
        kuri attēlo šīs emocijas <strong>intensitāti</strong> – jo lielāks un tālāk no centra, jo <strong>spēcīgāk</strong> izjusta emocija.
      </p>
    </div>
    <div style="max-width: 700px; margin: auto; text-align: left;">
      <p>
        <strong>Kā atbildēt:</strong><br>
        1. Noklikšķini uz emocijas, kas vislabāk raksturo Tavas šī brīža izjūtas.<br>
        2. Izvēlies atbilstošu emocijas intensitāti, spiežot uz aplīša ar atbilstošu intensitātes "lielumu".<br>
        3. Ja nejūti nevienu emociju, izvēlies <em>"Neviena"</em>.<br>
        4. Ja jūti emociju, kura emociju aplī nav iekļauta, izvēlies <em>"Cita"</em>, nosauc šo emociju, kā arī izvēlies tās intensitāti.
      </p>
      <p style="font-size: 0.9em; color: #555;">
        Piezīme: Iekļautie emociju nosaukumi var vispārināt un ietvert sevī līdzīgas emocijas no vienas "emociju saimes" (piem., "Dusmas" = aizkaitinājums, niknums u.c.).
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
