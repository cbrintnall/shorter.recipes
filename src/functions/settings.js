const common = {
  recipeRequestTimeoutMS: 2000
}

const local = {}

const development = {}

const production = {}

const settingsMap = {
  local,
  development,
  production
}

export default { ...common, ...settingsMap[process.env.SETTINGS] }