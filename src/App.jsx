import { useState, Fragment, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import LoadingScreen from "./LoadingScreen";

function App() {
  const [sku, setSku] = useState("");
  const {
    unityProvider,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: "WebGL/JoyTreeBuild.loader.js",
    dataUrl: "WebGL/JoyTreeBuild.data.gz",
    frameworkUrl: "WebGL/JoyTreeBuild.framework.js.gz",
    codeUrl: "WebGL/JoyTreeBuild.wasm.gz",
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    console.log(loadingProgression);
  }, [loadingProgression]);

  // Define the Get3DModelUrl function
  const Get3DModelUrl = (url) => {
    window.location.href = `https://techwariumxrtyremodel.glitch.me/?modelUrl=${encodeURIComponent(
      url
    )}`;
  };

  useEffect(() => {
    if (isLoaded) {
      sendMessage("ProductManager", "SetSKU", sku);
    }
  }, [sku, isLoaded, sendMessage]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSku(urlParams.get("sku") || "");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Register the event listener for Get3DModelUrl
  useEffect(() => {
    addEventListener("Get3DModelUrl", Get3DModelUrl);

    return () => {
      removeEventListener("Get3DModelUrl", Get3DModelUrl);
    };
  }, [addEventListener, removeEventListener]);

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const loadingScreenStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
  };

  return (
    <Fragment>
      <div style={containerStyle}>
        <Unity style={containerStyle} unityProvider={unityProvider} />
        {!isLoaded && (
          <div style={loadingScreenStyle}>
            <LoadingScreen progress={Math.floor(loadingProgression * 100)} />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default App;
