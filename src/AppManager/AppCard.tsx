import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Badge, CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import { IRxApp } from 'Base/Model/IRxApp';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { useMutation } from '@apollo/react-hooks';
import { GET_RX_APP_LIST, REMOVE_RX_APP } from 'Base/GraphQL/APP_GQLs';
import { useDragItStore } from 'Store/Helpers/useDragItStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
    },
    
    content: {
      display:'flex',
      flexFlow:'column',
      justifyContent:'center',
      alignItems:'center',
      cursor:'pointer',
    },
    appAvata: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    appName:{
      marginTop:theme.spacing(2),
    },
    actions:{
      diplay:'flex',
      justifyContent:'space-between',
      minHeight:theme.spacing(7),
    },
    pos: {
      paddingLeft: theme.spacing(1),
    },

    menuItem:{
      padding:theme.spacing(1, 3),
    },

    menuButton:{
      width: '40px',
      height: '40px',
    },
  }),
);


export default function AppCard(
  props:{
    apps:Array<IRxApp>,
    rxApp:IRxApp
  }
) {
  const {apps, rxApp} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();
  const dragItStore = useDragItStore();

  const [excuteRemoveRxPage, {loading, error}] = useMutation( REMOVE_RX_APP,
    {
      //更新缓存
      update(cache, { data: { removeRxApp } }){
        cache.writeQuery({
          query:GET_RX_APP_LIST,
          data:{
            rxApps:apps.filter(app=>app.id !== removeRxApp.id)
          }
        });
      },
      onCompleted: (data)=>{
        dragItStore.setSuccessAlert(true);
      }
    }
  );

  useShowAppoloError(error);
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hadleEdit = ()=>{
    history.push(`/app-studio/${rxApp.id}`)
    setAnchorEl(null);
  }

  const handleRemove = ()=>{
    setAnchorEl(null);
    dragItStore?.confirmAction(intl.get('confirm-delete'), ()=>{
      excuteRemoveRxPage({
        variables:{id:rxApp.id}
      })     
    })

  }

  const handlePackageDown = ()=>{
    handleMenuClose();
    dragItStore.infoError('打包下载功能尚未开放')
  }

  const handleToApp = ()=>{
    history.push(`/app/${rxApp?.id}/`)
  }
  
  return (
    <Card className={classes.root}>
      <CardContent 
        className={classes.content}
        onClick = {handleToApp}
      >
        <Badge color="secondary" badgeContent={rxApp.notifications}>
          <Avatar className = {classes.appAvata} style={{ backgroundColor: rxApp.color}} variant = "rounded">
            <MdiIcon iconClass = {rxApp.icon} size={40}  />
          </Avatar>
        </Badge>
        <Typography variant="h5" component="div" className={classes.appName}>
          {rxApp.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography className={classes.pos} color="textSecondary">
          {rxApp.app_type}
        </Typography>
        {
          loading 
          ? <CircularProgress size = {24}/>
          : <>
              <IconButton
                onClick = {handleMenuOpen}
                className = {classes.menuButton}
              >
                <MdiIcon iconClass = "mdi-dots-horizontal" size={20} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                
              >
                <MenuItem onClick={hadleEdit} className = {classes.menuItem}>
                  <ListItemIcon>
                    <MdiIcon iconClass = "mdi-pencil-ruler"  size={18}/>
                  </ListItemIcon>
                  {intl.get('edit')} 
                </MenuItem>
                {
                  //!rxApp.is_system && 
                   // <MenuItem onClick={handleMenuClose} className = {classes.menuItem}>
                   //   <ListItemIcon>
                   //     <MdiIcon iconClass = "mdi-toy-brick-remove"  size={18}/>
                   //   </ListItemIcon>
                  //    {intl.get('uninstall')} 
                   // </MenuItem>
                }
                {
                  !rxApp.is_system && 
                  <MenuItem onClick={handlePackageDown} className = {classes.menuItem}>
                    <ListItemIcon>
                      <MdiIcon iconClass = "mdi-package-down"  size={18}/>
                    </ListItemIcon>
                    {intl.get('make-package')} 
                  </MenuItem>
                }
                { !rxApp.is_system && 
                  <Divider/>
                }
                { !rxApp.is_system && 
                  <MenuItem className = {classes.menuItem} onClick={handleRemove}>
                    <ListItemIcon>
                      <MdiIcon iconClass = "mdi-delete-forever" color={'red'} size={18}/>
                    </ListItemIcon>
                    {intl.get('delete')} 
                  </MenuItem>
                }
              </Menu>
            </>
        }


      </CardActions>
    </Card>
  );
}
