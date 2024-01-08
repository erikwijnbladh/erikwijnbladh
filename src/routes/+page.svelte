<script>
  import "$lib/styles/styles.scss";
  import { onMount } from "svelte";
  import Typewriter from "svelte-typewriter";
  import Carousel from "$lib/components/Carousel.svelte";
  import Metatags from "$lib/components/Metatags.svelte";

  let windowWidth;
  onMount(() => {
    windowWidth = window.innerWidth;
  });

  // Get time for time display
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  dayjs.extend(utc);
  dayjs.extend(timezone);

  let time = dayjs().tz("Europe/Stockholm").format("HH:mm");
  setInterval(() => {
    time = dayjs().tz("Europe/Stockholm").format("HH:mm");
  }, 5000);

  // GSAP
  import { gsap } from "gsap/dist/gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { ScrollSmoother } from "$lib/gsap/src/ScrollSmoother";

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  let smoother, showcaseElement;
  onMount(() => {
    if (windowWidth >= 900) {
      // Only use scrollSmoother if on a large enough page
      smoother = ScrollSmoother.create({
        smooth: 0.5,
        effects: true,
      });
    }
    if (windowWidth > 1000) {
      gsap.to(".showcase", {
        backgroundPosition: "-16px 800px",
        scrollTrigger: {
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero h1", {
        top: "0.75em",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-bottom", {
        y: "150%",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  // Work section
  let hoveredProject = 0;

  // Fix for firefox typewriter effect
  import { shouldPolyfill } from "@formatjs/intl-segmenter/should-polyfill";
  (async function () {
    if (shouldPolyfill()) {
      await import("@formatjs/intl-segmenter/polyfill-force");
    }
  })();
</script>

<Metatags />

<nav>
  <h2>Erik Wijnbladh</h2>
  <div class="nav-socials">
    <a href="https://github.com/erikwijnbladh" target="_blank">
      <img src="/assets/github-white.svg" alt="github" />
    </a>
    <a
      href="https://www.linkedin.com/in/erik-wijnbladh-a59703187/"
      target="_blank"
    >
      <img src="/assets/linkedin-white.svg" alt="linkedin" />
    </a>
    <a href="https://twitch.tv/yorks_" target="_blank">
      <img src="/assets/twitch-white.svg" alt="twitch" />
    </a>
    <a href="https://discord.com/users/588480933108121618" target="_blank">
      <img src="/assets/discord-white.svg" alt="discord" />
    </a>
  </div>
</nav>

<header class="hero">
  <h1>
    Erik is a
    <span class="selected" style="--cursor-color: #000; --cursor-width: 0.1em;">
      <div class="selected-bottom-dots"></div>
      <Typewriter
        mode="loop"
        interval="150"
        unwriteInterval="75"
        wordInterval="1500"
        delay="1000"
      >
        <span>Developer</span>
        <span>Skier</span>
        <span>Nerd</span>
        <span>Cat dad</span>
      </Typewriter>
    </span>
  </h1>

  <div class="hero-bottom">
    <div class="hero-about">
      <p>
        Hey there👋<strong>I'm Erik</strong>! I do
        <strong>Front-End Development</strong>
        and craft web <strong>applications</strong> using
        <strong>modern frameworks</strong>
        and <strong>cool libraries</strong>.
      </p>
      <br />
      <p>
        Right now, I'm working for an Adtech SaaS and optimzing e-commerces
        through AI Ad Optimization. Giving insights and tools via user friendly
        interfaces.
      </p>
    </div>
    <div class="hero-skills">
      <div class="skill-category">
        <p><strong>Professionally</strong></p>
        <p>
          Vue & Nuxt<br />
          Tailwind<br />
          CSS/HTML/JS<br />
        </p>
      </div>
      <br />
      <div class="skill-category">
        <p><strong>Hobby</strong></p>
        <p>
          Svelte<br />
          GSAP<br />
        </p>
      </div>
    </div>
    <div class="hero-time-and-scroll">
      <p class="hero-time">
        <strong>{time} Stockholm</strong><br />
        Scroll for more
      </p>
      <div class="hero-scroll">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</header>

<main>
  <section class="work" data-hovered-project={hoveredProject}>
    {#if windowWidth < 1000}
      <div class="mobile-projects">
        <h2>My Work</h2>
        <div class="projects">
          <div class="project">
            <Carousel>
              <img
                src="/project-screenshots/bidbrain-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/brightbid-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/speqta-1.webp"
                alt="project screenshot"
              />
            </Carousel>
            <a class="project-info" href="https://speqta.com/" target="_blank">
              <h3>Speqta - current</h3>
              <p>
                Building internal tools & customer facing interfaces.
                (Bidbrain/BrightBid)
              </p>
            </a>
          </div>
          <div class="project">
            <Carousel>
              <img
                src="/project-screenshots/selfcheck-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/selfcheck-2.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/selfcheck-3.webp"
                alt="project screenshot"
              />
            </Carousel>
            <a
              class="project-info"
              href="https://selfcheck.se/en/english/"
              target="_blank"
            >
              <h3>Selfcheck</h3>
              <p>
                Building and developing QR based web application for digital
                checklists.
              </p>
            </a>
          </div>
          <div class="project">
            <Carousel>
              <img
                src="/project-screenshots/hobby-3.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/hobby-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/hobby-2.webp"
                alt="project screenshot"
              />
            </Carousel>
            <a
              class="project-info"
              href="https://www.oru.se/english/"
              target="_blank"
            >
              <h3>Education & Hobby project</h3>
              <p>
                BSc in Informatics from Örebro University. And some small hobby
                projects.
              </p>
            </a>
          </div>
        </div>
      </div>
    {:else}
      <div class="selector">
        <h2>My Work</h2>
        <h2>& Experience</h2>
        <div class="projects">
          <a
            class="project"
            href="https://speqta.com/"
            target="_blank"
            on:mouseover={() => {
              hoveredProject = 1;
            }}
            on:focus={() => {
              hoveredProject = 1;
            }}
          >
            <h3>Speqta - current</h3>
            <p>
              Building internal tools & customer facing interfaces.
              (Bidbrain/BrightBid)
            </p>
          </a>
          <a
            class="project"
            href="https://selfcheck.se/en/english/"
            target="_blank"
            on:mouseover={() => {
              hoveredProject = 2;
            }}
            on:focus={() => {
              hoveredProject = 2;
            }}
          >
            <h3>Selfcheck</h3>
            <p>
              Building and developing QR based web application for digital
              checklists.
            </p>
          </a>
          <a
            class="project"
            href="https://www.oru.se/english/"
            target="_blank"
            on:mouseover={() => {
              hoveredProject = 3;
            }}
            on:focus={() => {
              hoveredProject = 3;
            }}
          >
            <h3>Education & Hobby project</h3>
            <p>
              BSc in Informatics from Örebro University. And some small hobby
              projects.
            </p>
          </a>
          <div class="selection-box">
            <div class="top-dots"></div>
            <div class="bottom-dots"></div>
          </div>
        </div>
      </div>
      <div class="showcase">
        <img
          class="display"
          src="/assets/pro-display-xdr.png"
          alt="apple pro display XDR monitor (decorational)"
        />
        <div class="screen">
          <div class="images">
            <Carousel>
              <img
                src="/project-screenshots/bidbrain-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/brightbid-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/speqta-1.webp"
                alt="project screenshot"
              />
            </Carousel>
            <Carousel>
              <img
                src="/project-screenshots/selfcheck-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/selfcheck-2.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/selfcheck-3.webp"
                alt="project screenshot"
              />
            </Carousel>
            <Carousel>
              <img
                src="/project-screenshots/hobby-3.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/hobby-1.webp"
                alt="project screenshot"
              />
              <img
                src="/project-screenshots/hobby-2.webp"
                alt="project screenshot"
              />
            </Carousel>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <section class="contact">
    <div class="wrapper">
      <h2>Get in touch!</h2>
      <div class="contact-content">
        <div class="content-left">
          <div class="content-category">
            <p><strong>Contact</strong></p>
            <p>
              <a href="mailto:wijnbladherik@gmail.com" target="_blank"
                >wijnbladherik@gmail.com</a
              ><br />
              <a
                href="https://discord.com/users/138712805850218496"
                target="_blank">@wijnbladh (Discord)</a
              >
            </p>
          </div>
          <div class="content-category">
            <p><strong>Location</strong></p>
            <p>Currently based in Stockholm, Sweden</p>
          </div>
          <div class="content-category">
            <p><strong>Links</strong></p>
            <p>
              <a href="https://github.com/erikwijnbladh" target="_blank"
                >Github</a
              ><br />
              <a
                href="https://www.linkedin.com/in/erik-wijnbladh-a59703187/"
                target="_blank">LinkedIn</a
              ><br />
              <a href="https://twitch.tv/yorks_" target="_blank">Twitch</a>
            </p>
          </div>
        </div>
        <form
          class="contact-form"
          acceptCharset="utf-8"
          action="https://formsubmit.co/ac26fdad1a10ea5e206b374a0cc78d6b"
          method="post"
        >
          <div class="group">
            <div class="field">
              <label for="your-name">Name</label>
              <input
                type="text"
                name="name"
                id="your-name"
                placeholder="Name"
                autocomplete="name"
                required
              />
            </div>
            <div class="field">
              <label for="your-email">Email</label>
              <input
                type="email"
                name="email"
                id="your-email"
                placeholder="Email"
                autocomplete="email"
                required
              />
            </div>
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              required
            />
          </div>
          <input type="submit" value="Submit" />
          <input
            type="hidden"
            name="_next"
            value="https://www.erikwijnbladh.se"
          />
        </form>
      </div>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="footer-left">
    <h3>Erik Wijnbladh</h3>
    <a href="mailto:wijnbladherik@gmail.com" target="_blank"
      >wijnbladherik@gmail.com</a
    >
  </div>
  <div class="footer-right">
    <a href="https://github.com/erikwijnbladh/erikwijnbladh" target="_blank"
      >Source code for this site</a
    >
    <div class="footer-socials">
      <a href="https://github.com/erikwijnbladh" target="_blank">
        <img src="/assets/github-white.svg" alt="github" />
      </a>
      <a
        href="https://www.linkedin.com/in/erik-wijnbladh-a59703187/"
        target="_blank"
      >
        <img src="/assets/linkedin-white.svg" alt="linkedin" />
      </a>
      <a href="https://twitch.tv/yorks_" target="_blank">
        <img src="/assets/twitch-white.svg" alt="twitch" />
      </a>
      <a href="https://discord.com/users/138712805850218496" target="_blank">
        <img src="/assets/discord-white.svg" alt="discord" />
      </a>
    </div>
  </div>
</footer>
