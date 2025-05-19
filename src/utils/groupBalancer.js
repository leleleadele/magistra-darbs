import { collection, getDocs } from "firebase/firestore";

function normalizeGender(gender) {
  if (!gender) return "other";
  const g = gender.toLowerCase();
  if (g.includes("vīrietis")) return "male";
  if (g.includes("sieviete")) return "female";
  return "other";
}

function getGroupFromURL() {
  const params = new URLSearchParams(window.location.search);
  const groupInUrl = params.get("group");
  if (groupInUrl === "a") {
    return "negative";
  } else if (groupInUrl === "b") {
    return "positive";
  } else return null;
}

export async function assignGroupWithConsentGenderAware(db, participantGender) {
  const groupFromURL = getGroupFromURL();
  if (groupFromURL) {
    return groupFromURL;
  }

  const snapshot = await getDocs(collection(db, "eksperiments-2"));

  const counts = {
    negative: { male: 0, female: 0, other: 0, total: 0 },
    positive: { male: 0, female: 0, other: 0, total: 0 },
  };

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const group = data.moodGroup;
    const gender = normalizeGender(data.demographicsResponses?.gender);

    if (group && counts[group]) {
      counts[group][gender]++;
      counts[group].total++;
    }
  });

  const g = normalizeGender(participantGender);

  if (counts.negative[g] < counts.positive[g]) return "negative";
  if (counts.positive[g] < counts.negative[g]) return "positive";

  return counts.negative.total <= counts.positive.total
    ? "negative"
    : "positive";
}
