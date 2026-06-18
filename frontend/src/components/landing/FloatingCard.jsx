export const FloatingCard = ({ src, alt, className = "", label }) => (
  <figure className={`floating-photo ${className}`}>
    <img src={src} alt={alt} />
    {label ? <figcaption>{label}</figcaption> : null}
  </figure>
);
