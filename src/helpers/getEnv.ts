export const getPortFromEnv = (defaultVal: number = 8080): number => {
  let lPort: number = defaultVal;

  if(
    process.env.PORT !== undefined &&
    process.env.PORT.length > 0
  ) {
    try {
      lPort = parseInt(process.env.PORT, 10);
    } catch(exception) {
      console.warn(`<getPortFromEnv> process.env.PORT (${process.env.PORT}) is not set, using default value of ${lPort}`);
    }
  }

  return lPort;
};
