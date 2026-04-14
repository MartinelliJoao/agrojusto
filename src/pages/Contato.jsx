import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.css';

export default function Contato() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatus('Enviando mensagem...');

    setTimeout(() => {
      setIsSending(false);
      setForm({ name: '', email: '', message: '' });
      setStatus('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    }, 1200);
  };

  return (
    <Layout>
      <section className={styles.pageSection}>
        <div className={styles.pageHeader}>
          <p className={styles.pageOverline}>Contato</p>
          <h1 className={styles.pageTitle}>Fale com o AgroJusto</h1>
          <p className={styles.pageSubtitle}>
            Use este canal para solicitar apoio, esclarecer dúvidas ou receber uma avaliação personalizada de sua operação.
          </p>
        </div>

        <div className={styles.contactGrid}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <label className={styles.contactLabel} htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={styles.contactInput}
              placeholder="Seu nome completo"
              required
            />

            <label className={styles.contactLabel} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={styles.contactInput}
              placeholder="seu@email.com"
              required
            />

            <label className={styles.contactLabel} htmlFor="message">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className={styles.contactTextarea}
              placeholder="Conte-nos sobre sua necessidade ou projeto"
              required
            />

            <button type="submit" className={styles.contactButton} disabled={isSending}>
              {isSending ? 'Enviando...' : 'Enviar mensagem'}
            </button>

            {status && <p className={styles.contactStatus}>{status}</p>}
          </form>

          <div className={styles.contactInfo}>
            <div className={styles.contactBox}>
              <h2>Informações de contato</h2>
              <p>
                Estamos prontos para atender produtores, consultores e empresas do agronegócio. Envie sua
                mensagem e responderemos em até 24 horas úteis.
              </p>
              <ul className={styles.contactList}>
                <li>
                  <strong>Email:</strong> contato@agrojusto.com.br
                </li>
                <li>
                  <strong>Telefone:</strong> (11) 4002-8922
                </li>
              </ul>
            </div>

            <div className={styles.contactBox}>
              <h2>Localização</h2>
              <div className={styles.contactMap}>
                <iframe
                  title="Mapa de localização"
                  src="https://maps.google.com/maps?q=plantação%20de%20cana%20de%20açúcar&t=&z=10&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
