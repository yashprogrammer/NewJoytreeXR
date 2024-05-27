import React, { useEffect, useState } from "react";

function LoadingScreen({ progress }) {
  const [fakeProgress, setFakeProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (fakeProgress < 80) {
      interval = setInterval(() => {
        setFakeProgress((prev) => {
          if (prev < 80) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 50); // Adjust the interval timing as needed
    } else {
      setFakeProgress(progress);
    }

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (progress >= 80) {
      setFakeProgress(progress);
    }
  }, [progress]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <div className="div">
        <img loading="lazy" srcSet="/LogoLoading.png" className="img" />
        <div className="div-2">
          <img loading="lazy" srcSet="/loadingContent.png" className="img-2" />
        </div>
        <div className="div-3">
          <div
            className="div-4"
            style={{
              width: `${fakeProgress}%`,
              animation: `loadingAnimation 0.6s forwards`,
            }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes loadingAnimation {
          0% {
            width: 0%;
          }
          100% {
            width: 97%;
          }
        }

        .div {
          align-items: center;
          background-color: var(--Basic-White, #f8f8f8);
          display: flex;
          flex-direction: column;
          padding: 47px 80px 80px;
        }
        @media (max-width: 991px) {
          .div {
            padding: 0 20px;
          }
        }
        .img {
          aspect-ratio: 1.79;
          object-fit: auto;
          object-position: center;
          width: 10rem;
          max-width: 100%;
        }
        .div-2 {
          justify-content: center;
          border-radius: 20px;
          display: flex;
          width: 100%;
          max-width: 800px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .img-2 {
          aspect-ratio: 2.38;
          object-fit: auto;
          object-position: center;
          width: 100%;
        }
        @media (max-width: 991px) {
          .img-2 {
            max-width: 100%;
          }
        }
        .div-3 {
          border-radius: 40px;
          background-color: #e8e8e8;
          display: flex;
          width: 858px;
          max-width: 100%;
          flex-direction: column;
          align-items: start;
          justify-content: center;
        }
        @media (max-width: 991px) {
          .div-3 {
            padding-right: 20px;
          }
        }
        .div-4 {
          border-radius: 30px;
          box-shadow: 0px 24px 48px 0px #d7c4c5;
          background-color: #d9666f;
          height: 16px;
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
