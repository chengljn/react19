import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Home() {
  const [input, setInput] = useState(``);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // if (wasCalled.current) return;
    // wasCalled.current = true;
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch(`/api/socket`);
    socket = io();

    socket.on(`connect`, () => {
      console.log(`websocket connected`);
    });

    socket.on(`update-input`, (msg) => {
      console.log(`broadcast message: ${msg}`);
      setMessages(msg);
    });
  };

  const onChangeHandler = (e: any) => {
    const msg = e.target.value;
    setInput(msg);
  };
  const sendMessage = () => {
    socket.emit(`input-change`, [...messages, input]);

    setInput(``);
  };

  return (
    <>
      <Head>
        <title>WebSocket example on Next.js</title>
        <meta name="description" content="Example for WebSocket on Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            WebSocket on <a href="https://nextjs.org">Next.js</a>
          </h1>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}

          <input
            className={styles.input}
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
          />
          <button onClick={sendMessage} style={{ padding: `8px 16px` }}>
            Send
          </button>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=typescript-nextjs-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{` `}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}
