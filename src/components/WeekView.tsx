import "./WeekView.scss";

const data = [
  {
    day: "Mo",
    date: "27",
    active: false,
  },
  {
    day: "Di",
    date: "28",
    active: false,
  },
  {
    day: "Mi",
    date: "29",
    active: false,
  },
  {
    day: "Do",
    date: "30",
    active: false,
  },
  {
    day: "Fr",
    date: "31",
    active: false,
  },
  {
    day: "Sa",
    date: "01",
    active: false,
  },
  {
    day: "So",
    date: "02",
    active: true,
  },
];

const WeekView: React.FC = () => {
  return (
    <div id="weekView">
      {data.map((entry) => (
        <div className={`dayCard ${entry.active ? " active" : ""}`}>
          <p>{entry.day}</p>
          <p className="date">{entry.date}</p>
        </div>
      ))}
    </div>
  );
};

export default WeekView;
