import type { RouteAnswer } from "../src";

export function getPageContent( _: any ){
  console.log("get page content");
  return {} as RouteAnswer;
}
export function getPagesList(){
  console.log("get pages list");
  return;
};
export function savePage(_:any){
  console.log("page saved");
  return;
}