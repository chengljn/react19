import Image from "next/image";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useState, useTransition } from "react";

import bikePic from "../../public/images/bike.png";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="m-auto flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center space-x-6">
          <div className="space-y-2">
            <div>
              🤖 A new React compiler will be introduced in future versions of
              React.{" "}
            </div>
            <div>
              {" "}
              🙌🏽 We will now have automatic re-rendering, memoization, and
              optimization of state and UI.{" "}
            </div>
            <div>
              🔮 There will be new hooks like use(), which will simplify
              promises and asynchronous code.{" "}
            </div>
            <div>⚙️ React will now support server-side components. </div>
            <div>
              📝 Better form handling will be achieved through actions,
              useFormStatus(), useStatusForm(), and useOptimistic().{" "}
            </div>
            <div>
              🖼 React will optimize asset loading at the core level through
              suspense to enhance performance. 🔗 React will also integrate with
              Web Components.{" "}
            </div>
          </div>
          <Image
            className="dark:invert w-[400px]"
            src={bikePic}
            alt="bike logo"
            priority
          />
        </div>
        <div>React 18</div>
        <Sandpack
          files={{
            "/App.js": `import { useState } from "react";

export default function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const error = await new Promise(r => setTimeout(r, 2000));;
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    } 
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}`,
          }}
          template="react"
          options={{ resizablePanels: true }}
        />
        <div>React 19 Actions</div>
        <Sandpack
          files={{
            "/App.js": `import { useState,useTransition } from "react";

export default function UpdateName({}) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
     await new Promise(r => setTimeout(r, 2000));
       return;
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
    </div>
  );
}`,
          }}
          template="react"
          options={{ resizablePanels: true }}
        />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
