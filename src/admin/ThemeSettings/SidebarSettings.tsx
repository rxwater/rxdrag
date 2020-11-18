import React, { Fragment } from 'react';
import { createStyles, Divider, makeStyles, Theme, Typography } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import useSidebarSkin from 'store/theme/useSidebarSkin';
import classNames from 'classnames';
import { setSiderbarSkinAction } from 'store/theme/actions';
import { DARK, LIGHT } from 'store/theme/useThemeSettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBlock:{
      width:'50px',
      height:'80px',
      border:'solid 1px',
      borderRadius:'10px',
      cursor:"pointer",
      margin:theme.spacing(1),
    },
    selected:{
      boxShadow: "0 0 0 2px rgba(26, 92,255, 0.4)"
    }
  }),
);

function MaskBlock(
  props:{
    selectedLinerGradient:string,
    mask:string,
    borderColor?:string,
    light?:boolean,
  }
){
  const {mask, selectedLinerGradient, borderColor, light=false} = props;
  const classes = useStyles();
  const dispatch = useDispatch()
  const selected = mask === selectedLinerGradient;
  const sidebarSkin = useSidebarSkin()

  const handleClick = ()=>{
    dispatch(setSiderbarSkinAction({
      ...sidebarSkin, 
      maskLinearGradient:mask,
      mode:light ? LIGHT : DARK,
    }))
    console.log('mode', light ? LIGHT : DARK)
  }

  return (
    <div className = {classNames(classes.colorBlock, {[classes.selected]:selected})}
      style={{
        backgroundImage : mask,
        borderColor: borderColor||'transparent',
        opacity: ".9",
      }}
      onClick={handleClick}
    ></div>
  )
}

export default function SidebarSettings(){
  const classes = useRowStyles();
  const sidebarSkin = useSidebarSkin()
 
  return (
    <Fragment>
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('sidebar-color')}</Typography>
      <div className = {classes.content}>
        <MaskBlock 
          selectedLinerGradient= {sidebarSkin.maskLinearGradient} 
          mask="linear-gradient(45deg,#ffffff,#ffffff)" 
          borderColor="#000"
          light
        />
        <MaskBlock selectedLinerGradient= {sidebarSkin.maskLinearGradient} mask="linear-gradient(45deg,#780206,#061161)"/>
        <MaskBlock selectedLinerGradient= {sidebarSkin.maskLinearGradient} mask="linear-gradient(45deg,#33001b,#ff0084)"/>
        <MaskBlock selectedLinerGradient= {sidebarSkin.maskLinearGradient} mask="linear-gradient(45deg,#360033,#0b8793)"/>
        <MaskBlock selectedLinerGradient= {sidebarSkin.maskLinearGradient} mask="linear-gradient(45deg,#000000,#000000)" borderColor="#fff"/>
      </div>
      <Divider />
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('sidebar-image')}</Typography>
      <div className = {classes.content}>
        
      </div>
    </Fragment>
  )
}