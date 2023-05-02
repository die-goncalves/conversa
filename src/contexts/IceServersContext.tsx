import { createContext, type ReactNode, useEffect, useState } from 'react'

interface IceServersData {
  iceServers: RTCIceServer[] | undefined
}
const IceServersContext = createContext({} as unknown as IceServersData)

interface IceServersProviderProps {
  children: ReactNode
}
function IceServersProvider({
  children
}: IceServersProviderProps): JSX.Element {
  const [iceServers, setIceServers] = useState<RTCIceServer[]>()

  useEffect(() => {
    async function getIceServers(): Promise<void> {
      try {
        // Calling the REST API TO fetch the TURN Server Credentials
        const apiKey: string = import.meta.env.VITE_APP_METERED_API_KEY
        const response = await fetch(
          `https://conversa.metered.live/api/v1/turn/credentials?apiKey=${apiKey}`
        )

        // Saving the response in the iceServers array
        const iceServers = await response.json()
        setIceServers(iceServers)
      } catch (error) {
        console.error(error)
      }
    }
    void getIceServers()
  }, [])

  return (
    <IceServersContext.Provider value={{ iceServers }}>
      {children}
    </IceServersContext.Provider>
  )
}

export { IceServersContext, IceServersProvider }
