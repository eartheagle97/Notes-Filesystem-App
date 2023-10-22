import React, { useState, useEffect } from "react";
import Image from "next/image";

function Bootloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 2; // This will update 2% every 100ms, so it'll take 5 seconds to reach 100%
        }
        clearInterval(interval);
        return 100;
      });
    }, 100);
    handlePlayAudio()
    return () => clearInterval(interval); // Clean up the interval when the component is unmounted
  }, []);

  function handlePlayAudio() {
    const audioElement = document.getElementById("backgroundAudio") as HTMLAudioElement;
    audioElement?.play();
  }

  return (
    <>
      <div className="w-screen h-screen bg-black text-white flex flex-col justify-center items-center">
        <audio id="backgroundAudio">
          <source src="/assets/sounds/login-sound.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div className="mb-20">
          <Image
            src={"/assets/img/BootScreen.png"}
            alt={"Windows XP Logo"}
            width={400}
            height={400}
          />
        </div>
        <div>
          <progress max="100" value={progress}></progress>
        </div>
      </div>
    </>
  );
}

export default Bootloader;
