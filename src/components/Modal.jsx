import styles from '../styles/Modal.module.css';

export default function Modal({ 
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  closeButton = true,
  className,
  ...props 
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={handleBackdropClick}
      {...props}
    >
      <div className={`${styles.modal} ${styles[`size-${size}`]} ${className || ''}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {closeButton && (
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Fechar modal"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className={styles.body}>
          {children}
        </div>

        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
