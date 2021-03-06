import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { PageListItem } from './PageListItem';
import { IRxPage } from 'Base/Model/IRxPage';
import Scrollbar from 'Common/Scrollbar';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
      flexFlow:'column',
    },
  }),
);


export const Pages = observer((
  props:{
    onClose:()=>void,
  }
) => {
  const {onClose} = props;
  const classes = useStyles();
  const history = useHistory();
  const studioStore = useAppStudioStore();
  const handleClick = (page:IRxPage)=>{
    history?.push(`/app-studio/${studioStore?.rxApp?.id}/page/${page.id}/`)
    //studioStore?.editPage(page);
    onClose();
  }

  return (
    <Scrollbar className = {classes.root}>
      {
        studioStore?.rxApp?.pages?.map(page=>{
          return (
            <PageListItem 
              key={page.id}
              page = {page}
              onClick = {()=>handleClick(page)}
            />
          )
        })
      }
    </Scrollbar>
  );
})
