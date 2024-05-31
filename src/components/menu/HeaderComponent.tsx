import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography , Image, Button } from 'antd';
import useImage from "use-image";
import UploadButtonComponent from './UploadButtonComponent';
import { message, Upload, UploadFile } from "antd";
import SelectShowComponent from './SelectShowComponent';
import { Show } from '../../types/Show';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;


interface HeaderComponentProps {
  imageSrc: string;
  children?: React.ReactNode;
  loadStateOnClick: (file: UploadFile[]) => void;
  setShowOnClick: (showToSet: string) => void;
  showTitles: string[];
  initialSelectedShow: string;
  saveShowOnClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const HeaderComponent = (props: HeaderComponentProps) => {
  const [image] = useImage(props.imageSrc);

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          style={{
            margin: '-6px 0 0 0'
          }}
          preview={false}
          width={50}
          src={props.imageSrc}
        />
        <Title 
          level={1}
          style={{
            color: 'white',
            margin: '-2px 0 0 0'
            }}
        >Drill Designer</Title>
      </div>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <div>
          <SelectShowComponent 
            setShowOnClick={props.setShowOnClick}
            showTitles={props.showTitles}
            initialSelectedShow={props.initialSelectedShow}
          />
        </div>
        <Button style={{ marginLeft: '20px' }} onClick={props.saveShowOnClick}>Save Show to File</Button>
        <div style={{ marginLeft: '20px' }}>
          <UploadButtonComponent loadStateOnClick={props.loadStateOnClick}/>
        </div>

      </div>
    </Header>
  );
}

export default HeaderComponent;