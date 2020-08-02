const common = {
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