// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  supabaseKey: process.env.NG_APP_SUPABASE_KEY,
  supabaseUrl: process.env.NG_APP_SUPABASE_URL,
  supabaseImagesUrl: process.env.NG_APP_SUPABASE_IMAGES_BASEURL
};
