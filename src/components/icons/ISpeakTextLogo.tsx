const ISpeakTextLogo = ({
  width,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <div
      className={className}
      style={{
        fontFamily: "'Geist Pixel Circle', monospace",
        fontSize: width ? width / 4.2 : 28,
        fontWeight: "normal",
        letterSpacing: "2px",
        width,
      }}
    >
      <span className="text-logo-primary">iSPEAK</span>
    </div>
  );
};

export default ISpeakTextLogo;
