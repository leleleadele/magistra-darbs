import SurveyHtmlFormPlugin from "@jspsych/plugin-survey-html-form";

export default [
  {
    type: SurveyHtmlFormPlugin,
    css_classes: "demographics",
    preamble: `<p>Vecums:</p>`,
    html: `
    <select name="age" required class="dropdown">
      <option value="" disabled selected>Atlasi savu vecumu</option>
      ${Array.from(
        { length: 100 },
        (_, i) => `<option value="${i + 1}">${i + 1}</option>`
      ).join("")}
    </select>
  `,
    button_label: "Turpināt",
    data: { task: "Demographics" },
  },
  {
    type: SurveyHtmlFormPlugin,
    css_classes: "demographics",
    preamble: `<p>Dzimums:</p>`,
    html: `
      <label><input type="radio" name="gender" value="Vīrietis" required> Vīrietis</label><br>
      <label><input type="radio" name="gender" value="Sieviete"> Sieviete</label><br>
      <label><input type="radio" name="gender" value="Cits" id="gender-other-radio"> Cits</label><br>
      <input type="text" id="gender-other-input" name="gender_other" style="display:none; margin-top: 6px;" placeholder="Lūdzu norādi..." />
    `,
    button_label: "Turpināt",
    data: { task: "Demographics" },
    on_load: () => {
      const otherRadio = document.getElementById("gender-other-radio");
      const otherInput = document.getElementById("gender-other-input");
      const radios = document.querySelectorAll("input[name='gender']");

      radios.forEach((radio) => {
        radio.addEventListener("change", () => {
          if (otherRadio.checked) {
            otherInput.style.display = "block";
            otherInput.required = true;
          } else {
            otherInput.style.display = "none";
            otherInput.required = false;
          }
        });
      });
    },
  },
  {
    type: SurveyHtmlFormPlugin,
    css_classes: "demographics",
    preamble: `<p>Tautība:</p>`,
    html: `
      <label><input type="radio" name="ethnicity" value="Latviešu" required> Latviešu</label><br>
      <label><input type="radio" name="ethnicity" value="Krievu"> Krievu</label><br>
      <label><input type="radio" name="ethnicity" value="Cita" id="ethnicity-other-radio"> Cita</label><br>
      <input type="text" id="ethnicity-other-input" name="ethnicity_other" style="display:none; margin-top: 6px;" placeholder="Lūdzu norādi..." />
    `,
    button_label: "Turpināt",
    data: { task: "Demographics" },
    on_load: () => {
      const otherRadio = document.getElementById("ethnicity-other-radio");
      const otherInput = document.getElementById("ethnicity-other-input");
      const radios = document.querySelectorAll("input[name='ethnicity']");

      radios.forEach((radio) => {
        radio.addEventListener("change", () => {
          if (otherRadio.checked) {
            otherInput.style.display = "block";
            otherInput.required = true;
          } else {
            otherInput.style.display = "none";
            otherInput.required = false;
          }
        });
      });
    },
  },
  {
    type: SurveyHtmlFormPlugin,
    css_classes: "demographics",
    preamble: `<p>Tava profesionālā joma:</p>`,
    html: `
      ${[
        "Students",
        "Pedagogs / pasniedzējs",
        "Zinātnieks / pētnieks",
        "Mākslinieks / dizainers",
        "IT speciālists / programmētājs",
        "Medicīnas darbinieks",
        "Tirdzniecības vai klientu apkalpošanas darbinieks",
        "Administrators / biroja darbinieks",
        "Vadītājs / uzņēmējs",
        "Ražošanas vai rūpniecības darbinieks",
        "Celtnieks / tehniķis / mehāniķis",
        "Lauksaimniecības vai mežsaimniecības darbinieks",
        "Nestrādā / meklē darbu",
        "Pensionārs",
        "Cits",
      ]
        .map(
          (opt, i) =>
            `<label><input type="radio" name="career_field" value="${opt}" ${
              i === 0 ? "required" : ""
            }> ${opt}</label><br>`
        )
        .join("")}
      <input type="text" id="career-other-input" name="career_field_other" style="display:none; margin-top: 6px;" placeholder="Lūdzu norādi..." />
    `,
    button_label: "Turpināt",
    data: { task: "Demographics" },
    on_load: () => {
      const otherInput = document.getElementById("career-other-input");
      const radios = document.querySelectorAll("input[name='career_field']");
      radios.forEach((radio) => {
        radio.addEventListener("change", () => {
          if (radio.value === "Cits" && radio.checked) {
            otherInput.style.display = "block";
            otherInput.required = true;
          } else {
            otherInput.style.display = "none";
            otherInput.required = false;
          }
        });
      });
    },
  },
  {
    type: SurveyHtmlFormPlugin,
    css_classes: "demographics",
    preamble: `<p>Vai Tu iegūsti vai esi ieguvis izglītību mākslas, dizaina vai citā radošā jomā (mākslas skolā, mākslas vidusskolā, augstskolā u.tml. vai neformālās izglītības ceļā), vai arī esi saistīts ar radošo jomu profesionālā vai hobiju līmenī?</p>`,
    html: `
      <label><input type="radio" name="creative_experience" value="Jā" required> Jā, mani hobiji un / vai izglītība, un /  vai profesija ir saistīta ar mākslu, dizainu vai cita veida radošo jomu.</label><br>
      <label><input type="radio" name="creative_experience" value="Nē"> Nē, neesmu saistīts ar mākslu, dizainu un cita veida radošajām jomām nedz hobija, nedz izglītības, nedz profesionālā līmenī.</label>
    `,
    button_label: "Turpināt",
    data: { task: "Demographics" },
  },
];
