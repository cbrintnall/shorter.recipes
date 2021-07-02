const common = {

}

const dev = {
  hostBase: "http://localhost:5000",
  pathBase: "/yadev-firebase/us-central1/ssr"
}

const prod = {
  pathBase: ""
}

export default { ...common, ...(process.env.NODE_ENV === 'production' ? prod : dev ) }