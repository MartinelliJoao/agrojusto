import styles from '../styles/Button.module.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  icon,
  className,
  ...props 
}) {
  return (
    <button
      className={`${styles.button} ${styles[`variant-${variant}`]} ${styles[`size-${size}`]} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
