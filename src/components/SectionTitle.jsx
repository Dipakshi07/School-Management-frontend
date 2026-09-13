import "./SectionTitle.css";
const SectionTitle = ({
  eyebrow,
  title,
  description,
  center = true
}) => {

  return (
    <div
      className={`section-title ${
        center ? "center" : "left"
      }`}
    >

      {eyebrow && (
        <span className="section-eyebrow">
          {eyebrow}
        </span>
      )}

      <h2>
        {title}
      </h2>

      {description && (
        <p>
          {description}
        </p>
      )}

    </div>
  );
};

export default SectionTitle;