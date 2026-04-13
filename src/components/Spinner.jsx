import styles from '../styles/Spinner.module.css';

export default function Spinner({ 
  size = 'md', 
  color = 'primary',
  overlay = false,
  message,
  className 
}) {
  const spinnerElement = (
    <div className={`${styles.spinner} ${styles[`size-${size}`]} ${styles[`color-${color}`]} ${className || ''}`}>
      <div className={styles.spin}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className={styles.overlay}>
        <div className={styles.spinnerContainer}>
          {spinnerElement}
        </div>
      </div>
    );
  }

  return spinnerElement;
}
