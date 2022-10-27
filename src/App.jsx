import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { ColorInput } from '@mantine/core'

function App() {
  const [navbar, setNavbar] = useState("#ff0000")

  return (
    <MantineProvider>
     <ColorInput label='Navbar' value={navbar} onChange={setNavbar} ></ColorInput>
    </MantineProvider>
  )
}

export default App
