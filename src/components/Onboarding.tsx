import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

export default function Onboarding() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("lexicon-onboarded")) {
      setShow(true);
    }
  }, []);

  if (!show) {
    return (
      <section className="onboarding-shell">
        <div className="onboarding-panel">
          <h2>You are already onboard</h2>
          <p>Your lexicon ritual is ready. You can revisit this page any time.</p>
          <button onClick={() => navigate("/")}>Return Home</button>
        </div>
      </section>
    );
  }

  function beginJourney() {
    window.localStorage.setItem("lexicon-onboarded", "true");
    setShow(false);
    navigate("/");
  }

  return (
    <div className="onboarding-screen onboarding-shell">
      <div className="onboarding-panel">
        <p className="onboarding-kicker">Seasonal Studio</p>
        <h2>Welcome to Mood Lexicon</h2>
        <p>
          A quiet space for exploring words and the feelings they carry.
          Take your time, add language gently, and let meaning gather.
        </p>
        <button onClick={beginJourney}>Begin</button>
      </div>
    </div>
  );
}
