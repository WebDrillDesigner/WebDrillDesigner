import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from "react";
import StageComponent from './components/StageComponent';
import config from "./config/AppConfig";
import MenuComponent from './components/MenuComponent';
import helper from './utils/helpers';
import { useShowState } from "./utils/PerformersState";
import { Show } from "./types/Show";
import MenuComponent from "./components/MenuComponent";
import StageComponent from "./components/StageComponent";
import CountSliderComponent from "./components/CountSliderComponent";

const { Content, Sider, Footer } = Layout;

const initialShow: Show = {
  id: "show-1",
  name: "My Awesome Show",
  performers: Object.fromEntries(
    Array.from({ length: 101 }, (_, i) => [i, helper.generateShapes(config.defaultNumPerformers)])
  ),
  count: 1,
};

const App: React.FC<object> = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const {
    show,
    addPerformer,
    positionPerformersInLine,
    saveState,
    loadState,
    set,
    handleCountChange
  } = useShowState(initialShow);

  // empty array means invoked once, adds listener to update windowSize var on 'resize' event
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="left-sidebar" />
        <MenuComponent
          lineOnClick={positionPerformersInLine}
          saveShowOnClick={saveState}
          loadStateOnClick={loadState}
        />
      </Sider>
      <Layout>
        <Content style={{}}>
          <StageComponent
            width={config.canvasWidth}
            height={config.canvasHeight}
            show={show}
            count={set}
          />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <CountSliderComponent 
            onSlide={handleCountChange}
          />
        </Footer>
      </Layout>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="right-sidebar" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" />
      </Sider>

    </Layout>
  );
};

export default App;
