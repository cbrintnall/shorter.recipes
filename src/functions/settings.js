const common = {

}

const dev = {
  hostBase: "http://localhost:5000"
}

const prod = {

}

export default { ...common, ...(process.env.NODE_ENV === 'production' ? prod : dev ) }