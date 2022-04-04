// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/api',
  supabaseKey: process.env.SUPABASE_KEY,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseImagesUrl: process.env.SUPABASE_IMAGES_BASEURL
};
