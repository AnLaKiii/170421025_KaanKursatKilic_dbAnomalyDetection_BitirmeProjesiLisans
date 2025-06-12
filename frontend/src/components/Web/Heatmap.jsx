import { useEffect, useState } from "react";

function Heatmap() {
  const [heatmapUrl, setHeatmapUrl] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/get_heatmap").then((response) => response.blob()),
      fetch("http://localhost:5000/get_heatmap_gpt_yorum").then((response) => response.json())
    ])
      .then(([heatmapResponse, gptResponse]) => {
        const url = URL.createObjectURL(heatmapResponse);
        setHeatmapUrl(url);
        setAnswer(gptResponse.answer);
      });
  }, []);

  return (
    <div>
      
      <h2
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#c6e2ff",
        }}
      >
        Page Life Expectancy Heatmap
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {heatmapUrl && (
          <div
            style={{
              maxWidth: "100%",
              width: "60%",
              height: "auto",
            }}
          >
            <img
              src={heatmapUrl}
              alt="Page Life Expectancy Heatmap"
              style={{ maxWidth: "100%", height: "auto" }}
            />

          </div>
        )}
        <div style={{textAlign:"justify"}}>
        {answer}
        </div>
      </div>
    </div>
  );
}

export default Heatmap;