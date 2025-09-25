import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Services/firebaseConfig";
import "./ReportPage.css";
import logo from "../../assets/logo.jpg";

// Symptom number to description mapping
const symptomMap = {
  1: "Little interest or pleasure in doing things",
  2: "Feeling down, depressed, or hopeless",
  3: "Trouble falling or staying asleep, or sleeping too much",
  4: "Feeling tired or having little energy",
  5: "Poor appetite or overeating",
  6: "Feeling bad about yourself or that you are a failure",
  7: "Trouble concentrating",
  8: "Moving or speaking so slowly",
  9: "Feeling nervous, anxious, or on edge",
  10: "Not being able to stop or control worrying",
  11: "Worrying too much about different things",
  12: "Trouble relaxing",
  13: "Being so restless that it is hard to sit still",
  14: "Becoming easily annoyed or irritable",
  15: "Feeling afraid, as if something awful might happen",
  16: "Thoughts that you would be better off dead, or of hurting yourself",
};

function ReportPage() {
  const { uid } = useParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestReport = async () => {
      try {
        const predictionsRef = collection(db, "users", uid, "predictions");
        const snapshot = await getDocs(predictionsRef);
        console.log("📥 Predictions fetched:", snapshot.docs.map(d => d.id));

        if (snapshot.empty) {
          console.warn("⚠️ No predictions found for user:", uid);
          setLoading(false);
          return;
        }

        let latestDoc = null;
        let maxNumber = -1;

        snapshot.docs.forEach((docSnap) => {
          const docId = docSnap.id;
          const match = docId.match(/^Report (\d+)$/);
          if (match) {
            const number = parseInt(match[1]);
            if (number > maxNumber) {
              maxNumber = number;
              latestDoc = docSnap;
            }
          }
        });

        if (latestDoc) {
          console.log("✅ Latest report found:", latestDoc.id);
          const fullData = latestDoc.data();
          console.log("📦 Full report document:", fullData);

          if (fullData.result) {
            setReportData(fullData.result);
            console.log("🎯 Extracted result:", fullData.result);
          } else {
            console.error("❌ 'result' field missing in document:", latestDoc.id);
          }
        } else {
          console.warn("⚠️ No valid 'Report #' document found.");
        }
      } catch (err) {
        console.error("🔥 Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };

    if (uid) fetchLatestReport();
  }, [uid]);

  const getFrequentSymptoms = (anxietyMap, depressionMap) => {
    const symptomCount = {};

    const mergeAndCount = (map) => {
      for (const key in map) {
        const match = key.match(/Symptom (\d+)/);
        if (match) {
          const symptomNum = parseInt(match[1]);
          const daysArray = map[key] || [];
          symptomCount[symptomNum] = (symptomCount[symptomNum] || 0) + daysArray.length;
        }
      }
    };

    mergeAndCount(anxietyMap || {});
    mergeAndCount(depressionMap || {});

    return Object.entries(symptomCount)
      .filter(([_, count]) => count >= 7)
      .map(([num]) => symptomMap[num]);
  };

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <div className="report-header">
          <img src={logo} alt="Manodarpan Logo" className="report-logo" />
          <h1 className="report-title">Manodarpan – Report</h1>
        </div>
        <hr />

        {loading ? (
          <p className="report-status">Loading...</p>
        ) : !reportData ? (
          <p className="report-status">No report found.</p>
        ) : (
          <div className="report-body">
            <p>🧠 <strong>Anxiety Level:</strong> {reportData.anxiety_level}</p>
            <p>📊 <strong>Anxiety Score:</strong> {reportData.anxiety_score}</p>
            <p>🧠 <strong>Depression Level:</strong> {reportData.depression_level}</p>
            <p>📊 <strong>Depression Score:</strong> {reportData.depression_score}</p>
            <p>📅 <strong>Start Date:</strong> {reportData.start_date}</p>
            <p>📅 <strong>End Date:</strong> {reportData.end_date}</p>

            <div style={{ marginTop: "1rem" }}>
              <p>📄 <strong>Frequent Symptoms:</strong></p>
              <ul>
                {getFrequentSymptoms(reportData.anxiety_occurrences, reportData.depression_occurrences).length > 0 ? (
                  getFrequentSymptoms(reportData.anxiety_occurrences, reportData.depression_occurrences).map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))
                ) : (
                  <li>No frequent symptoms identified.</li>
                )}
              </ul>
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportPage;
