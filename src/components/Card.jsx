import styles from '../styles/Card.module.css';

export default function Card({ 
  children, 
  variant = 'default',
  hover = true,
  icon,
  title,
  subtitle,
  onClick,
  className,
  ...props 
}) {
  return (
    <div
      className={`${styles.card} ${styles[`variant-${variant}`]} ${hover ? styles.hoverable : ''} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {icon && <div className={styles.cardIcon}>{icon}</div>}
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}
