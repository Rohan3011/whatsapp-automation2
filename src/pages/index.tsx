import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.hello.$get();
      const { message } = await res.json();
      setMessage(message);
    };
    fetchData();
  }, []);

  if (!message) return <p>Loading...</p>;

  return (
    <main>
      <div className="radioGroup">
        <label htmlFor="theme">
          <input type="radio" name="theme" value="light" />
          <span>light</span>
        </label>
        <label htmlFor="theme">
          <input type="radio" name="theme" value="dark" />
          <span>dark</span>
        </label>
        <label htmlFor="theme">
          <input type="radio" name="theme" value="system" />
          <span>system</span>
        </label>
      </div>
    </main>
  );
}
