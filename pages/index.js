import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';


export default function Home() {



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
          <code>Just around the corner, ready to arrive — stay connected 🎯. </code>
        </p>


        {/* <div className={styles.grid}> */}
          <a href="https://curiousdevs.vercel.app" className={styles.card}>
            <h3 className={styles.heading}>our moment is near - comming soon 🥺</h3>
            {Object.keys(timeLeft).length > 0 ? (
                <p  className={styles.timeDiv}>
                  <span className={styles.timer} >  {timeLeft.days}d  </span>
                  <span className={styles.timer} >  {timeLeft.hours}h  </span>
                  <span className={styles.timer} >  {timeLeft.minutes}m  </span>
                  <span className={styles.timer} >  {timeLeft.seconds}s  </span>
                </p>
              ) : (
                <p className={styles.timer}>The event has started!</p>
              )}
          </a>
        {/* </div> */}
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer> */}

      <style jsx>{`
        main {
          padding: 5rem 0;
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
