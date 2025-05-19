import { collection, addDoc } from "firebase/firestore";
import parseExperiment1Data from "./parseExperiment1Data.js";
import parseExperiment2Data from "./parseExperiment2Data.js";
import parseExperiment3Data from "./parseExperiment3Data.js";

async function saveDataToFirestore(db, jsPsych, collectionName) {
  let finalData;
  const data = jsPsych.data.get().values();

  if (collectionName === "eksperiments-1") {
    finalData = parseExperiment1Data(data);
  } else if (collectionName === "eksperiments-2") {
    finalData = parseExperiment2Data(data);
  } else if (collectionName === "eksperiments-3") {
    finalData = parseExperiment3Data(data);
  }

  try {
    await addDoc(collection(db, collectionName), finalData);
  } catch (error) {
    throw new Error("❌ Kļūme: ", error);
  }
}

export default saveDataToFirestore;
