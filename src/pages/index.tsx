import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";

type FormData = {
  "first-name": string;
  "last-name": string;
  "food-limitation": string;
  "plus-one": string;
  "money-gift": string;
};

export default function Home() {
  const [values, setValues] = useState<FormData>({
    "first-name": "",
    "food-limitation": "omnivorous",
    "last-name": "",
    "plus-one": "false",
    "money-gift": "0",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/notion", {
        body: JSON.stringify(values),
        method: "POST",
      });

      if (!response.ok) {
        return alert(`
        There was an error with your form submission:
        Status: ${response.status} - ${response.statusText}
        `);
      }

      return alert("Submission succesful");
    } catch (error) {
      return alert(`
      There was an error with your form submission:
      ${error}
      `);
    }
  };

  const updateValue = (field: keyof FormData, value: string | boolean) => {
    setValues((values) => ({
      ...values,
      [field]: value.toString(),
    }));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.wrapper}>
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              className={styles.mb}
              onChange={(e) => updateValue("first-name", e.target.value)}
              value={values["first-name"]}
            />
          </div>

          <div className={styles.wrapper}>
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              className={styles.mb}
              onChange={(e) => updateValue("last-name", e.target.value)}
              value={values["last-name"]}
            />
          </div>

          <div className={styles.wrapper}>
            <label htmlFor="food-limitation">
              What kind of food can you eat?
            </label>
            <select
              name="food-limitation"
              id="food-limitation"
              className={styles.mb}
              onChange={(e) => updateValue("food-limitation", e.target.value)}
              value={values["food-limitation"]}
            >
              <option value="omnivorous">I eat anything</option>
              <option value="vegetarian">{"I'm vegetarian"}</option>
              <option value="vegan">{"I'm vegan"}</option>
            </select>
          </div>

          <div className={styles.inline}>
            <input
              type="checkbox"
              name="plus-one"
              id="plus-one"
              onChange={(e) => updateValue("plus-one", e.target.checked)}
              value={values["plus-one"]}
            />
            <label htmlFor="plus-one">I will bring a +1</label>
          </div>

          <div className={styles.wrapper}>
            <label htmlFor="money-gift">How much money will you gift me?</label>
            <input
              type="number"
              name="money-gift"
              id="money-gift"
              min="0"
              className={styles.mb}
              onChange={(e) => updateValue("money-gift", e.target.value)}
              value={values["money-gift"]}
            />
          </div>

          <div className={styles.wrapper}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </main>
    </>
  );
}
