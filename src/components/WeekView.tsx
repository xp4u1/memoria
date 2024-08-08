import i18n from "../i18n";

import "./WeekView.scss";

const getCurrentWeek = () => {
  const days = [
    i18n.t('Mon'),
    i18n.t('Tue'),
    i18n.t('Wed'),
    i18n.t('Thu'),
    i18n.t('Fri'),
    i18n.t('Sat'),
    i18n.t('Sun'),
  ];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Monday should be the first day.
  const startOfWeek = new Date(today);

  // Adjust the start date to the most recent Monday.
  startOfWeek.setDate(today.getDate() - currentDayIndex);

  const weekData = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    const day = days[i];
    const date = String(currentDate.getDate()).padStart(2, "0");
    const active = i === currentDayIndex;

    weekData.push({
      day,
      date,
      active,
    });
  }

  return weekData;
};

const WeekView: React.FC = () => {
  return (
    <div id="weekView">
      {getCurrentWeek().map((entry) => (
        <div
          key={entry.day + entry.date}
          className={`dayCard ${entry.active ? " active" : ""}`}
        >
          <p>{entry.day}</p>
          <p className="date">{entry.date}</p>
        </div>
      ))}
    </div>
  );
};

export default WeekView;
