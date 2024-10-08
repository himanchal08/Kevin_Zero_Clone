import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Section2 = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const percentageRef = useRef(null); // Reference for the percentage text

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(textRef.current, {
      fontSize: "100px",
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 0%",             
        end: "+=100%",                
        scrub: 2,                     
        pin: true,                   
        // markers: true,               
      },
    });

    gsap.to("#page2", {
      opacity: 0, // Fade out to 0
      zIndex: "0",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top", 
        scrub: 4, 
        // markers: true,
        pin: true,
      },
    });

    // Opacity transition based on scroll for #canvas-Container
    gsap.to("#canvas-Container", {
      opacity: 0, // Fade out to 0
      scrollTrigger: {
        trigger: "#canvas-Container",
        start: "top top",
        end: "bottom top", 
        scrub: 1,  // Smooth animation based on scroll
        // markers: true,  // Use markers for debugging if needed
      },
    });
  }, []);

  useEffect(() => {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");
    const frames = {
      currentIndex: 0,
      maxIndex: 601,
    };

    let imagesLoaded = 0;
    let images = [];

    function preloadImages() {
      for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `/seconvideo/frame_${i.toString().padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imageUrl;

        img.onload = function () {
          imagesLoaded++;
          images.push(this); // Store the loaded image
          if (imagesLoaded === frames.maxIndex) {
            loadImage(frames.currentIndex);
            startAnimation();
          }
        };
      }
    }

    function loadImage(index) {
      if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('.parent').clientHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        const newWidth = img.width * scaleX;
        const newHeight = img.height * scaleY;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
      }
    }

    function startAnimation() {
      const parentElement = document.querySelector('.parent');
      const scrollHeight = parentElement.clientHeight;
      const windowHeight = window.innerHeight;

      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const progress = scrollTop / (scrollHeight - windowHeight);
        const newIndex = Math.floor(progress * frames.maxIndex);
        loadImage(newIndex);

        // Only update the percentage after 10 frames have been scrolled
        if (newIndex >= 0) {
          const newPercentage = Math.min(Math.floor(progress * 100), 100);
          setPercentage(newPercentage);
        }
      });
    }

    preloadImages();
  }, []);

  return (
    <>
      <div
        className="absolute z-[3] bg-[#0A0A0A] flex justify-center items-center w-full h-[120vh]"
        id="page2"
        ref={sectionRef}
      >
        <div className="flex justify-center items-center">
          <h2 className="text-white text-[30px]" id="text" ref={textRef}>
            Say Goodbye to Pa$$word
          </h2>
        </div>
      </div>

      <div>
        <div className="w-full h-full bg-zinc-900 opacity-0" id="canvas-Container">
          <div className="parent relative w-full h-[900vh]">
            <div className="w-full sticky top-0 h-screen">
              <canvas className="w-full h-screen" id="canvas"></canvas>
              <div className="absolute top-[35%] left-[46%] z-[2] w-1/2 text-white text-[6rem]" ref={percentageRef}>
                {percentage}% {/* Display percentage */}
                <p className="text-[1.4rem] text-center w-[37%] -left-10 relative tracking-wide text-[#7D797B] font-medium">
                  of breaches are caused by stolen credentials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
