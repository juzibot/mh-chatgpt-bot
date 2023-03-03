import * as dotenv from 'dotenv'
dotenv.config()

export const checkEnv = (mustExistEnvList: string[]) => {
  const missingEnvVarList: string[] = []
  for (const envKey of mustExistEnvList) {
    if (!process.env[envKey]) {
      missingEnvVarList.push(envKey)
    }
  }
  if (missingEnvVarList.length > 0) {
    console.error(`
      ******************************************************************************
       ATTENTION: (注意)

       Missing environment variables: ${missingEnvVarList.join(', ')}
       Server can not run without these variables, please check the configurations
       Exiting the process in 5 seconds
      ******************************************************************************
    `)
    setTimeout(() => {
      process.exit(-1)
    }, 5000)
  }
}
