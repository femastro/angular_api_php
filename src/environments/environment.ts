// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'https://aj.mastrosoft.com.ar/imgProducto',
  apiUrl: 'https://www.mastrosoft.com.ar/api/public/imgProducto',
  apiRest: 'https://www.mastrosoft.com.ar/api/public/neumaticos',
  apiAll: 'https://www.mastrosoft.com.ar/api/public/all',
  apiImage: "https://www.mastrosoft.com.ar/api/public/imagen",
  apiUser: "https://www.mastrosoft.com.ar/api/public/login",
  apiCloudinary: 'https://api.cloudinary.com/v1_1/femastro/image/upload',
  apiCloudinaryVariable: 'CLOUDINARY_URL=cloudinary://823859513865117:IJBNzVyIt8xLPmHbrEeEQAQs9Bg@femastro',
  firebaseConfig : {
    apiKey: "AIzaSyBfNHU1wv6fztKBeQata6Zm9-nkkGUxsSA",
    authDomain: "gestion-70d23.firebaseapp.com",
    projectId: "gestion-70d23",
    storageBucket: "gestion-70d23.appspot.com",
    messagingSenderId: "893447245022",
    appId: "1:893447245022:web:fd1214cc1ce062e8aa864f",
    measurementId: "G-WL9QEK3CWE"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
