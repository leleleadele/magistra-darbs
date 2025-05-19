function reverseScore(value) {
    return value !== null ? 8 - value : null;
  }
  
export default function parse (data) {
    const gewResponses = data.find(
        (trial) => trial.trial_type === "geneva-wheel"
      ).emotions;
    
      const shapeResponses = data
        .filter((trial) => trial.response && trial.task === "Stimuli")
        .map((trial) => ({
          ...trial.response,
          stimulus: trial.stimulus || "unknown",
          time_elapsed: trial.time_elapsed ?? null,
        }));
    
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
    
      const demographicsResponses = data
        .filter((trial) => trial.task === "Demographics" && trial.response)
        .map((trial) => trial.response);
    
      const participantId = data[0]?.participant_id ?? "unknown";
    
      return {
        participant_id: participantId,
        timestamp: new Date().toISOString(),
        gewResponses,
        shapeResponses,
        tipiResponses,
        demographicsResponses,
      };
}