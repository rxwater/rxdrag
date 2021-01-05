import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MultiContentPotlet from 'components/common/MultiContentPotlet';
import { IMeta } from 'base/Model/IMeta';
import ComponentRender from 'base/ComponentRender';
import { RXNode } from 'base/RXNode/RXNode';
import { ModelProvider, useModelStore } from 'base/ModelTree/ModelProvider';
import { ModelArrayFieldStore } from '../ModelArrayFieldStore';
import { Observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
    },
  }),
);

interface ColumnMeta{
  field?:string;
  label?:string;
  props?:any;
  input?:{
    name:string,
    props:any,
  };
}

const OneToManyTable = React.forwardRef((
  props: {
    field?:string,
    size?:any,
    childrenNodes?:Array<RXNode<IMeta>>,
    isDeisgning?:boolean,
  }, 
  ref:any
)=>{
  const{
    field,
    size,
    childrenNodes = [],
    isDeisgning,
     ...rest
  } = props;
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getFieldStore(field||'') as ModelArrayFieldStore;
  useEffect(()=>{
    if(field){
      modelStore?.setFieldStore(field,  new ModelArrayFieldStore({name:field, props}));      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  const handleAddNew = ()=>{
    if(isDeisgning){
      return;
    }
    fieldStore?.addRow();
  }

  const handelRemove = (index:number)=>{
    fieldStore?.removeRow(index);
  }

  return (
    <Observer>{()=>
      <MultiContentPotlet 
        ref={ref}
        onAddNew = {handleAddNew}
        {...rest}
      >
          <Table className={classes.table} size={size}>
            <TableHead>
              <TableRow>
                {
                  childrenNodes.map((column, index)=>{
                    const{width = undefined, ...other} = (column.meta.props ? column.meta.props : {})
                    return(
                      <TableCell key={`${column}-${index}`} component="th" style={{width:width}} {...other}>
                        <b>
                          {column.meta.props?.label}
                        </b>
                      </TableCell>
                    )
                  })
                }
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldStore?.rows.map((rowStore, rowIndex) => (
                <ModelProvider value={rowStore} key = {rowStore.id}>
                  <TableRow key={`row-${rowStore.id}`} >
                    {
                      childrenNodes.map((column, index)=>{
                        return(
                          <ComponentRender key={`${column}-${index}-row-${rowStore.id}`} component = {column} />
                        )
                      })
                    }
                    <TableCell align="right">
                      <IconButton aria-label="delete"
                        onClick = {(event) => {handelRemove(rowIndex)}}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </ModelProvider>
              ))}
            </TableBody>
          </Table>    
      </MultiContentPotlet>
    }
    </Observer>
  )
})

export default OneToManyTable;