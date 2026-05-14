import React, { useState, useEffect, useRef } from "react";
import styles from "./Pomodoro.module.css";

const DURATIONS = { work: 25, short_break: 5, long_break: 15 };
const MODE_LABELS = { work: "Work", short_break: "Short Break", long_break: "Long Break" };

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function formatDuration(minutes) {
  if (minutes === 0) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}

function getDateLabel(dateStr) {
  const today = new Date().toLocaleDateString("en-CA");
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");
  if (dateStr === today) return "Today";
  if (dateStr === yesterday) return "Yesterday";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function authHeaders() {
  const token = sessionStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const Pomodoro = ({ setActiveSection }) => {
  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [task, setTask] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for values accessed in async/interval callbacks
  const startedAtRef = useRef(null);
  const modeRef = useRef(mode);
  const taskRef = useRef(task);
  const sessionCountRef = useRef(sessionCount);
  const completionHandledRef = useRef(false);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { taskRef.current = task; }, [task]);
  useEffect(() => { sessionCountRef.current = sessionCount; }, [sessionCount]);

  // Load sessions on mount
  useEffect(() => {
    fetch("/api/pomodoro/sessions", { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then(setSessions)
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  // Timer tick
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // Completion detection
  useEffect(() => {
    if (timeLeft !== 0 || !isRunning || completionHandledRef.current) return;
    completionHandledRef.current = true;
    setIsRunning(false);

    const completedMode = modeRef.current;
    const completedTask = taskRef.current.trim() || "(no task)";
    const completedCount = sessionCountRef.current;
    const sessionStartedAt = startedAtRef.current;

    // Log to DB
    if (sessionStartedAt) {
      fetch("/api/pomodoro/sessions", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          task: completedTask,
          mode: completedMode,
          duration_minutes: DURATIONS[completedMode],
          started_at: sessionStartedAt,
          completed_at: new Date().toISOString(),
        }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((session) => {
          if (session) setSessions((prev) => [session, ...prev]);
        })
        .catch(() => {});
    }

    // Advance to next mode
    if (completedMode === "work") {
      const newCount = completedCount + 1;
      if (newCount >= 4) {
        setSessionCount(0);
        setMode("long_break");
        setTimeLeft(DURATIONS.long_break * 60);
      } else {
        setSessionCount(newCount);
        setMode("short_break");
        setTimeLeft(DURATIONS.short_break * 60);
      }
    } else {
      setMode("work");
      setTimeLeft(DURATIONS.work * 60);
    }

    startedAtRef.current = null;

    // Browser notification
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("Pomodoro complete!", {
        body:
          completedMode === "work"
            ? `Great work on "${completedTask}"! Time for a break.`
            : "Break's over — back to work!",
      });
    }
  }, [timeLeft, isRunning]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = () => {
    if (mode === "work" && !task.trim()) return;
    completionHandledRef.current = false;
    if (!startedAtRef.current) {
      startedAtRef.current = new Date().toISOString();
    }
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(DURATIONS[mode] * 60);
    startedAtRef.current = null;
    completionHandledRef.current = false;
  };

  const handleModeChange = (newMode) => {
    if (isRunning) return;
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode] * 60);
    startedAtRef.current = null;
    completionHandledRef.current = false;
  };

  const handleDeleteSession = async (id) => {
    try {
      const res = await fetch(`/api/pomodoro/sessions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch {}
  };

  // ── Metrics ──────────────────────────────────────────────────────────────────
  const todayStr = new Date().toLocaleDateString("en-CA");
  const todaySessions = sessions.filter(
    (s) => new Date(s.completed_at).toLocaleDateString("en-CA") === todayStr
  );
  const todayWork = todaySessions.filter((s) => s.mode === "work");
  const todayFocusMinutes = todayWork.reduce((sum, s) => sum + s.duration_minutes, 0);
  const taskBreakdown = todayWork.reduce((acc, s) => {
    acc[s.task] = (acc[s.task] || 0) + 1;
    return acc;
  }, {});

  // Group log by date
  const grouped = sessions.reduce((acc, s) => {
    const d = new Date(s.completed_at).toLocaleDateString("en-CA");
    if (!acc[d]) acc[d] = [];
    acc[d].push(s);
    return acc;
  }, {});
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const canStart = mode !== "work" || task.trim().length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => setActiveSection("admin")} type="button">
          ← Admin Portal
        </button>
        <div className={styles.titleRow}>
          <span className={styles.label}>— Pomodoro Timer</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* ── Left: Timer ── */}
        <div className={styles.timerPanel}>
          <div className={styles.modeSelector}>
            {Object.keys(DURATIONS).map((m) => (
              <button
                key={m}
                className={`${styles.modeTab} ${mode === m ? styles.activeTab : ""}`}
                onClick={() => handleModeChange(m)}
                disabled={isRunning}
                type="button"
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>

          <div className={styles.countdown}>{formatTime(timeLeft)}</div>

          <div className={styles.cycleRow}>
            <div className={styles.sessionDots}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i < sessionCount ? styles.dotFilled : ""}`}
                />
              ))}
            </div>
            <span className={styles.cycleLabel}>
              {sessionCount === 0
                ? "New cycle"
                : `${sessionCount} of 4`}
            </span>
          </div>

          <div className={styles.taskInputRow}>
            <input
              className={styles.taskInput}
              type="text"
              placeholder="What are you working on?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              disabled={isRunning}
              maxLength={200}
            />
          </div>

          <div className={styles.controls}>
            {!isRunning ? (
              <button
                className={`${styles.controlBtn} ${styles.startBtn} ${!canStart ? styles.disabledBtn : ""}`}
                onClick={handleStart}
                disabled={!canStart}
                type="button"
              >
                {startedAtRef.current ? "Resume" : "Start"}
              </button>
            ) : (
              <button
                className={`${styles.controlBtn} ${styles.pauseBtn}`}
                onClick={handlePause}
                type="button"
              >
                Pause
              </button>
            )}
            <button
              className={`${styles.controlBtn} ${styles.resetBtn}`}
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
          </div>

          {mode === "work" && !task.trim() && (
            <p className={styles.taskHint}>Enter a task above to start a work session</p>
          )}
        </div>

        {/* ── Right: Metrics + Log ── */}
        <div className={styles.metricsPanel}>
          <div className={styles.sectionLabel}>Today</div>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>{todayWork.length}</span>
              <span className={styles.metricName}>Pomodoros</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>{formatDuration(todayFocusMinutes)}</span>
              <span className={styles.metricName}>Focus time</span>
            </div>
          </div>

          {Object.keys(taskBreakdown).length > 0 && (
            <div className={styles.taskBreakdown}>
              <div className={styles.sectionLabel}>Tasks today</div>
              {Object.entries(taskBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([t, count]) => (
                  <div key={t} className={styles.taskBreakdownRow}>
                    <span className={styles.taskBreakdownName}>{t}</span>
                    <span className={styles.taskBreakdownCount}>
                      {count} {count === 1 ? "session" : "sessions"}
                    </span>
                  </div>
                ))}
            </div>
          )}

          <div className={styles.sectionLabel} style={{ marginTop: "1.5rem" }}>
            Session log
          </div>

          {loading && <p className={styles.emptyState}>Loading...</p>}
          {!loading && sessions.length === 0 && (
            <p className={styles.emptyState}>
              No sessions yet. Complete a timer to start logging.
            </p>
          )}

          <div className={styles.sessionLog}>
            {sortedDates.map((date) => (
              <div key={date} className={styles.dateGroup}>
                <div className={styles.dateHeader}>{getDateLabel(date)}</div>
                {grouped[date].map((s) => (
                  <div key={s.id} className={styles.sessionEntry}>
                    <div className={styles.entryLeft}>
                      <span className={styles.entryTask}>{s.task}</span>
                      <span className={styles.entryMeta}>
                        <span className={`${styles.modeBadge} ${styles[s.mode]}`}>
                          {MODE_LABELS[s.mode]}
                        </span>
                        <span className={styles.entryTime}>
                          {new Date(s.completed_at).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className={styles.entryDuration}>{s.duration_minutes}m</span>
                      </span>
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteSession(s.id)}
                      type="button"
                      title="Delete entry"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
