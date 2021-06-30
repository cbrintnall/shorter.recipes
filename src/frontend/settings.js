export const firebaseConfig = {
    apiKey: "AIzaSyDHg7FQTmsbMssC2vVW_N4tfZqBZCV5BEA",
    authDomain: "yadev-firebase.firebaseapp.com",
    projectId: "yadev-firebase",
    storageBucket: "yadev-firebase.appspot.com",
    messagingSenderId: "477071358865",
    appId: "1:477071358865:web:f1091e51b6c511542a3830",
    measurementId: "G-4W8ZH9MMZD",
}

const common = {
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

const development = {
    ...common,
    urls: {
        serviceUrl: "http://localhost:5001/yadev-firebase/us-central1/main",
        sampleUrl: "https://www.allrecipes.com/recipe/6874/best-ever-muffins/"
    }
}

const production = {
    ...common,
    urls: {
        serviceUrl: "https://us-central1-yadev-firebase.cloudfunctions.net/main",
        sampleUrl: "https://www.allrecipes.com/recipe/6874/best-ever-muffins/"
    }
}

const settings = { development, production }

export default settings[process.env.NODE_ENV]