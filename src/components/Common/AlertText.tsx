const AlertText = ({ color, label, message, className, style }: any) => {
  return (
    <span
      className={`text-base ${className}`}
      style={{ color: color, ...style }}
    >
      <span className="font-bold">{label}</span>
      <span> {message}</span>
    </span>
  );
};

export default AlertText;
