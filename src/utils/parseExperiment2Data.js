function reverseScore(value) {
  return value !== null ? 8 - value : null;
}

export default function parseExperiment2Data(data) {
  const moodGroup = data.find((d) => d.moodGroup)?.moodGroup ?? null;

  const tipiResponses = data
    .filter(
      (trial) =>
        trial.trial_type === "survey-likert" &&
        trial.task === "TIPI" &&
        trial.response
    )
    .map((trial) => ({
      extraversion: trial.response?.extraversion + 1 ?? null,
      agreeableness_negative: reverseScore(
        trial.response?.agreeableness_negative + 1
      ),
      conscientiousness: trial.response?.conscientiousness + 1 ?? null,
      neuroticism: trial.response?.neuroticism + 1 ?? null,
      openness: trial.response?.openness + 1 ?? null,
      extraversion_negative: reverseScore(
        trial.response?.extraversion_negative + 1
      ),
      agreeableness: trial.response?.agreeableness + 1 ?? null,
      conscientiousness_negative: reverseScore(
        trial.response?.conscientiousness_negative + 1
      ),
      neuroticism_negative: reverseScore(
        trial.response?.neuroticism_negative + 1
      ),
      openness_negative: reverseScore(trial.response?.openness_negative + 1),
    }));

  const demographicTrials = data.filter(
    (trial) => trial.task === "Demographics" && trial.response
  );
  const demographicsResponses = {};
  for (const trial of demographicTrials) {
    Object.assign(demographicsResponses, trial.response);
  }
  const gewTrials = data.filter((d) => d.trial_type === "geneva-wheel");
  const gew_pre = gewTrials[0]?.emotions;
  const gew_post = gewTrials[1]?.emotions;

  const visualSearchTrials = data.filter(
    (d) =>
      d.task === "visual_search" && d.trial_type === "image-keyboard-response"
  );
  const visualSearch = visualSearchTrials.map((trial) => ({
    stimulus: trial.stimulus_name ?? trial.stimulus ?? null,
    rt: trial.rt ?? null,
    batch: trial.batch ?? null,
  }));

  return {
    moodGroup,
    tipiResponses,
    demographicsResponses,
    gew_pre,
    gew_post,
    visualSearch,
  };
}
