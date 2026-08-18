"use client";

// Ambient cinematic background: drifting glow blobs + a field of rising orange
// embers + grain. Embers only render where specks={true} (the landing hero).
export function Ambient({ specks = true }) {
  return (
    <div className="ambient grain" aria-hidden="true">
      <span
        className="blob ember"
        style={{ width: 620, height: 620, left: "8%", top: "6%", animation: "drift1 22s ease-in-out infinite" }}
      />
      <span
        className="blob steam"
        style={{ width: 720, height: 720, right: "2%", top: "18%", animation: "drift2 26s ease-in-out infinite", opacity: 0.14 }}
      />
      <span
        className="blob ember"
        style={{ width: 480, height: 480, left: "38%", bottom: "-8%", animation: "drift2 30s ease-in-out infinite", opacity: 0.12 }}
      />
      {specks && (
        <div className="embers">
          {SPECKS.map((s, i) => (
            <span
              key={i}
              className="ember-speck"
              style={{
                left: s.l,
                bottom: s.b,
                width: s.sz,
                height: s.sz,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// A scattered ember field (hand-authored so it renders identically each load).
const SPECKS = [
  { l: "5%", b: "6%", sz: 3, dur: 8, delay: 0 },
  { l: "10%", b: "18%", sz: 2, dur: 11, delay: 2.1 },
  { l: "15%", b: "2%", sz: 4, dur: 7, delay: 0.6 },
  { l: "20%", b: "26%", sz: 2, dur: 10, delay: 3.2 },
  { l: "25%", b: "10%", sz: 3, dur: 9, delay: 1.3 },
  { l: "30%", b: "20%", sz: 5, dur: 12, delay: 0.4 },
  { l: "35%", b: "4%", sz: 2, dur: 8.5, delay: 2.7 },
  { l: "40%", b: "14%", sz: 3, dur: 7.5, delay: 1.1 },
  { l: "45%", b: "24%", sz: 2, dur: 10.5, delay: 3.6 },
  { l: "50%", b: "8%", sz: 4, dur: 9, delay: 0.9 },
  { l: "55%", b: "16%", sz: 2, dur: 11.5, delay: 2.4 },
  { l: "60%", b: "3%", sz: 3, dur: 7, delay: 1.7 },
  { l: "64%", b: "22%", sz: 5, dur: 12, delay: 0.2 },
  { l: "68%", b: "11%", sz: 2, dur: 9.5, delay: 3.0 },
  { l: "72%", b: "6%", sz: 3, dur: 8, delay: 1.4 },
  { l: "76%", b: "19%", sz: 2, dur: 10, delay: 2.8 },
  { l: "80%", b: "2%", sz: 4, dur: 7.5, delay: 0.7 },
  { l: "84%", b: "14%", sz: 3, dur: 11, delay: 2.0 },
  { l: "88%", b: "24%", sz: 2, dur: 9, delay: 3.4 },
  { l: "91%", b: "9%", sz: 3, dur: 8.5, delay: 1.2 },
  { l: "94%", b: "17%", sz: 2, dur: 10.5, delay: 2.6 },
  { l: "97%", b: "4%", sz: 4, dur: 7, delay: 0.5 },
  { l: "3%", b: "13%", sz: 2, dur: 9.5, delay: 1.9 },
  { l: "8%", b: "9%", sz: 3, dur: 8, delay: 3.3 },
  { l: "13%", b: "22%", sz: 2, dur: 11, delay: 0.8 },
  { l: "18%", b: "6%", sz: 4, dur: 7.5, delay: 2.2 },
  { l: "23%", b: "17%", sz: 2, dur: 10, delay: 1.5 },
  { l: "28%", b: "27%", sz: 3, dur: 12.5, delay: 0.3 },
  { l: "33%", b: "9%", sz: 2, dur: 8.5, delay: 3.1 },
  { l: "38%", b: "21%", sz: 4, dur: 9.5, delay: 1.8 },
  { l: "43%", b: "5%", sz: 2, dur: 7, delay: 2.9 },
  { l: "48%", b: "18%", sz: 3, dur: 11, delay: 0.6 },
  { l: "53%", b: "26%", sz: 2, dur: 10, delay: 3.5 },
  { l: "58%", b: "10%", sz: 4, dur: 8, delay: 1.0 },
  { l: "63%", b: "15%", sz: 2, dur: 12, delay: 2.3 },
  { l: "70%", b: "5%", sz: 3, dur: 7.5, delay: 0.9 },
  { l: "74%", b: "25%", sz: 2, dur: 11.5, delay: 3.2 },
  { l: "78%", b: "12%", sz: 4, dur: 9, delay: 1.6 },
  { l: "82%", b: "21%", sz: 2, dur: 10.5, delay: 2.5 },
  { l: "86%", b: "7%", sz: 3, dur: 8, delay: 0.4 },
  { l: "90%", b: "20%", sz: 2, dur: 12, delay: 1.9 },
  { l: "96%", b: "12%", sz: 3, dur: 9.5, delay: 3.0 },
];
