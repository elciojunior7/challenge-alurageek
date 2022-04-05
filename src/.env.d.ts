declare var process: {
  env: {
    NG_APP_ENV: string;
    NG_APP_SUPABASE_KEY: string;
    NG_APP_SUPABASE_URL: string;
    NG_APP_SUPABASE_IMAGES_BASEURL: string;
    // Replace the line below with your environment variable for better type checking
    [key: string]: any;
  };
};