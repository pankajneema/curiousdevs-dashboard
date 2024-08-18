import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Resend } from 'resend';
import { useEffect, useState } from 'react';
import { EmailTemplate } from './email-template';

import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns';


export default function Home() {
  const resend = new Resend('re_RwAtpDX7_8XdnoB5GPFQcNgxaq7qeKTVp');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("EMAIL --> ",email);
      try {
        const { data, error } = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: ['delivered@resend.dev'],
          subject: 'Notify From Dashbaord',
          react: EmailTemplate({ firstName: email }),
        });
    
        if (error) {
          setMessage('Something went wrong. Please try again.');
          setEmail('');
        }
    
        setMessage('Thank you for subscribing!');
        setEmail(''); // clear the input field;
      } catch (error) {
        setMessage('Something went wrong. Please try again.');
        setEmail('');     
      }

    };

  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-09-31T00:00:00'); // Set your target date here
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Curiousdevs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img src="/logo-no-background.svg" alt="My Icon" className={styles.main_logo} />
          <h1 className={styles.title}>
            Welcome to <a href="https://curiousdevs.vercel.app">Curiousdevs</a>
          </h1>

          <p className={styles.description}>
            <code>Just around the corner, ready to arrive — stay excited 🎯. </code>
          </p>

          <div className={styles.grid}>
            <a
              href="https://curiousdevs.vercel.app"
              className={styles.card}
            >
              <h3 className={styles.heading}>We are coming soon - hold on tight &rarr;</h3>
                {Object.keys(timeLeft).length > 0 ? (
                  <p>
                    <span className={styles.timer}> {timeLeft.days}d </span> 
                    <span className={styles.timer}> {timeLeft.hours}h </span> 
                    <span className={styles.timer}> {timeLeft.minutes}m </span> 
                    <span className={styles.timer}> {timeLeft.seconds}s</span>      
                  </p>
                ) : (
                  <p className={styles.timer} >The event has started!</p>
                )}
            </a>

            <a
              className={styles.card}
            >
             <form onSubmit={handleSubmit}>
              <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.email}
                />
                <input
                  type="submit"
                  value="💁 Notify Me"
                  className={styles.email}
                />
              </form>   
              {message && <p>{message}</p>}
            </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 4rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
