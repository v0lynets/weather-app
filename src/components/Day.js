export default function Day({ icon, day, min, max }) {
  return (
    <div className={day === "Today" ? " day important" : "day"}>
      <span>{icon}</span>
      {day}
      <p>
        {min}&deg; - <strong>{max}&deg;</strong>
      </p>
    </div>
  );
}
