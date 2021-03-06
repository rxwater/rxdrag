import { sleep } from "mock/utils/sleep";
import createId from "rx-drag/utils/createId";
import rolesData from "./rolesData";

export const rxRole = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('get rxUser', args)
  for(var i = 0; i < rolesData.length; i++){
    //ID会被转成String
    // eslint-disable-next-line eqeqeq
    if(rolesData[i].id == args.id){
      //console.log()
      return rolesData[i];
    }
  }

  return 
}

export const rxRoles = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return {data:rolesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}

export const allRxRoles = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('mock return allRxRoles')
  return rolesData;
}

export const updateRxRoles = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  return rolesData
}

export const saveRxRole = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  
  let role = {...args.role, id:args.role?.id || createId(), created_at:''}

  return role;
}

export const removeRxRoles = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  //const module = getModuleBySlug(args.slug);
  return rolesData;

}

export const roleQueryResolvers = {
  rxRole,
  rxRoles,
  allRxRoles,
}


export const roleMutationResolvers = {
  updateRxRoles,
  saveRxRole,
  removeRxRoles
}