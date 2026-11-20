import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import InitialLoader from './components/common/InitialLoader'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <InitialLoader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      <AppRoutes />
    </>
  )
}

export default App
