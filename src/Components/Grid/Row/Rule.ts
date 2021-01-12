import { Rule } from "../../../Base/Rules/Rule";
import OptionSelect from "Base/PropsInputs/OptionSelect";
import { IProp } from "../../../Base/Model/IProp";
import NumberInput from "Base/PropsInputs/NumberInput";
import { IMeta } from "Base/Model/IMeta";
import marginRules from "Base/Rules/marginRules";

export class GridRowRule extends Rule{
  editPaddingY = '8px';
  editPaddingX = '8px';
  labelKey ="row";

  accept(child:IMeta){
    if(child.name === 'GridColumn'){
      return true;
    }
    return false;
  }

  getFields(): Array<IProp>{
    return [
      ...marginRules,
      {
        name:'direction',
        label:'direction',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'row',
              label:'Row'
            },
            {
              value:'row-reverse',
              label:'Row Reverse'
            },
            {
              value:'column',
              label:'Column'
            },
            {
              value:'column-reverse',
              label:'Column Reverse'
            },
          ]
        }
      },
      {
        name:'justify',
        label:'justify',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'flex-start',
              label:'Flex Start'
            },
            {
              value:'center',
              label:'Center'
            },
            {
              value:'flex-end',
              label:'Flex End'
            },
            {
              value:'space-between',
              label:'Space Between'
            },
            {
              value:'space-around',
              label:'Space Around'
            },
            {
              value:'space-evenly',
              label:'Space Evenly'
            },
          ]
        }
      },

      {
        name:'alignContent',
        label:'align-content',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'stretch',
              label:'Stretch',
            },
            {
              value:'center',
              label:'Center',
            },
            {
              value:'flex-start',
              label:'Flex Start',
            },
            {
              value:'flex-end',
              label:'Flex End',
            },
            {
              value:'space-between',
              label:'Space Between',
            },
            {
              value:'space-around',
              label:'Space Around',
            },
          ]
        }
      },
      {
        name:'alignItems',
        label:'align-items',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'flex-start',
              label:'Flex Start',
            },
            {
              value:'center',
              label:'Center',
            },
            {
              value:'flex-end',
              label:'Flex End',
            },
            {
              value:'stretch',
              label:'Stretch',
            },
            {
              value:'baseline',
              label:'Baseline',
            },
          ],
        }
      },
      {
        name:'spacing',
        label:'spacing',
        input:NumberInput,
        props:{
          'min':0,
          'max':10,
        }
      },
    ]
  }

}