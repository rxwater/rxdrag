import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import colorConfig from "Components/common/configs/colorConfig";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import sizeConfig from "Components/common/configs/sizeConfig";
import helperTextConfig from "Components/common/configs/helperTextConfig";

export class SwitchBoxConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      {
        name:'label',
        label:'label',
        propType:'string',
      },
      colorConfig,
      sizeConfig,
      helperTextConfig
    ]
  }

}