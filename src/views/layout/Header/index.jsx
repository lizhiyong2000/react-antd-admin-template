import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Modal, Layout, Avatar } from "antd";
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons';

import { Link } from "react-router-dom";
import { logout, getUserInfo } from "@/store/actions";
import FullScreen from "@/components/FullScreen";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";


import "./index.less";
const { Header } = Layout;

const LayoutHeader = (props) => {

  const dispatch = useDispatch();

  const state = {
    ...useSelector(state => state.app),
    ...useSelector(state => state.user),
    ...useSelector(state => state.settings),
  };


  const {
    token,
    avatar,
    sidebarCollapsed,
    showSettings,
    fixedHeader,
  } = state;

  useEffect(() => {
    dispatch(getUserInfo(token));
  }, [token]);


  // token && dispatch(getUserInfo(token));
  const handleLogout = (token) => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        dispatch(logout(token));
      },
    });
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a
          target="_blank"
          href="https://github.com/NLRX-WJC/react-antd-admin-template"
          rel="noopener noreferrer"
        >
          项目地址
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  );
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
        };
      } else {
        styles = {
          width: "calc(100% - 200px)",
        };
      }
    } else {
      styles = {
        width: "100%",
      };
    }
    return styles;
  };
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? "fix-header" : ""}
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <FullScreen />
          {showSettings ? <Settings /> : null}
          <div className="dropdown-wrap">
            <Dropdown menu={menu}>
              <div>
                <Avatar shape="square" size="medium" src={avatar} />
                <Icon component={icons["CaretDownOutlined"]} style={{ color: "rgba(0,0,0,.3)" }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

export default LayoutHeader;
