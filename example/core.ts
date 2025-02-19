import type { RouteAnswer } from "../src";

export function getPageContent( page:string ){
  console.log("get page content", page);
  return {} as RouteAnswer;
}
export function getPagesList(){
  console.log("get pages list");
};
export function savePage( page:object ){
  console.log( page,"saved");
}