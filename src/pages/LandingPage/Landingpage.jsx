import React from "react";
import styles from "./Landingpage.module.css";
import { useNavigate } from "react-router-dom";

export default function Landingpage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/Images/SVG.png" alt="" />
          <p>FormBot</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.signIn} onClick={() => navigate("/register")}>Sign In</button>
          <button className={styles.create}onClick={() => navigate("/register")}> Create a FormBot</button>
        </div>
      </div>

      <div className={styles.content}>
        <img src="/Images/SVG1.png" alt=""  className={styles.svg1}/>
        <div className={styles.text}>
        <h1>
          Build advanced chatbots <br /> visually
        </h1>
        <p>
          Typebot gives you powerful blocks to create unique chat experiences.
          Embed them <br /> anywhere on your web/mobile apps and start
          collecting results like magic.
        </p>
        <button>Create a FormBot for free</button>
        </div>

        <img src="/Images/SVG2.png" alt=""  className={styles.svg1}/>
     
      </div>

      <img src="/Images/hero.png" alt="" className={styles.hero} />

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.ftrLogo}>
            <img src="/Images/SVG.png" alt="" />
            <span>FormBot</span>
          </div>

          <p>
            Made with ❤️ by <br /> @cuvette
          </p>
        </div>
        <div className={styles.footerContent}>
          <h4> Product</h4>
          <ul>
            <li>Status</li>
            <li>Documentation</li>
            <li>Roadmap</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className={styles.footerContent}>
          <h4 className={styles.community}>Community</h4>
          <ul>
            <li>Discord</li>
            <li>Github Repository</li>
            <li>Twitter</li>
            <li>Linkedin</li>
            <li>OSS Friends</li>
          </ul>
        </div>
        <div className={styles.footerContent}>
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Contacts</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
