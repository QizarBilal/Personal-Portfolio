// client/src/custom.d.ts
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.jpeg" {
  const value: string;
  export default value;
}
