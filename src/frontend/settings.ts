interface Configuration {
  useEmulators: boolean,
  history: { limit: number },
  searchBar: { opacity: { hidden: number, visible: number } },
  colors: { primary: string, secondary: string, tertiary: string, textFocused: string },
  breakpoints: { smaller: number },
  urls: { functionBasePath: string, serviceUrl: string, sampleUrl: string },
  firebaseConfig: {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string,
    databaseURL: string
  }
}

const common: Partial<Configuration> = {
  useEmulators: false,
  history: {
    limit: 5
  },
  searchBar: {
    opacity: {
      hidden: 30,
      visible: 100
    }
  },
  colors: {
    primary: "#F5F6F7",
    secondary: "#27536E",
    tertiary: "#94BCC0",
    textFocused: "#F1A646"
  },
  // In PX
  breakpoints: {
    smaller: 450
  }
}

const local: Partial<Configuration> = {
  useEmulators: true,
  urls: {
    functionBasePath: "",
    serviceUrl: "http://localhost:5001/yadev-firebase/us-central1/main",
    sampleUrl: "https://www.allrecipes.com/recipe/6874/best-ever-muffins/"
  },
  firebaseConfig: {
    apiKey: "AIzaSyDjt2CIV82F1iTQJmf2KUzcydFC4amCnsg",
    authDomain: "reci-dev-9dc80.firebaseapp.com",
    projectId: "reci-dev-9dc80",
    storageBucket: "reci-dev-9dc80.appspot.com",
    messagingSenderId: "135504189938",
    appId: "1:135504189938:web:da3ad2b337e46dbb9e336b",
    measurementId: "G-CPRWT7W65T",
    databaseURL: "https://yadev-firebase.firebaseio.com"
  }
}

const development: Partial<Configuration> = {
  urls: {
    functionBasePath: "",
    serviceUrl: "https://us-central1-reci-dev-9dc80.cloudfunctions.net/main",
    sampleUrl: "https://www.allrecipes.com/recipe/6874/best-ever-muffins/"
  },
  firebaseConfig: {
    apiKey: "AIzaSyDjt2CIV82F1iTQJmf2KUzcydFC4amCnsg",
    authDomain: "reci-dev-9dc80.firebaseapp.com",
    projectId: "reci-dev-9dc80",
    storageBucket: "reci-dev-9dc80.appspot.com",
    messagingSenderId: "135504189938",
    appId: "1:135504189938:web:da3ad2b337e46dbb9e336b",
    measurementId: "G-CPRWT7W65T",
    databaseURL: "https://yadev-firebase.firebaseio.com",
  }
}

const production: Partial<Configuration> = {
  urls: {
    functionBasePath: "",
    serviceUrl: "https://us-central1-yadev-firebase.cloudfunctions.net/main",
    sampleUrl: "https://www.allrecipes.com/recipe/6874/best-ever-muffins/"
  },
  firebaseConfig: {
    apiKey: "AIzaSyDHg7FQTmsbMssC2vVW_N4tfZqBZCV5BEA",
    authDomain: "yadev-firebase.firebaseapp.com",
    databaseURL: "https://yadev-firebase.firebaseio.com",
    projectId: "yadev-firebase",
    storageBucket: "yadev-firebase.appspot.com",
    messagingSenderId: "477071358865",
    appId: "1:477071358865:web:f1091e51b6c511542a3830",
    measurementId: "G-4W8ZH9MMZD"
  }
}

const settingsKey = process.env.SETTINGS || 'local';
const settings = { development, production, local }
const finalConfig: Configuration = {...common, ...settings[settingsKey]}

console.log(`Using setting ${settingsKey}`);

export default finalConfig;