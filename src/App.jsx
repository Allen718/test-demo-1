import { useState } from 'react'
import { AppStyled } from './AppStyled'

import './App.css'
import UploadImgML from './UploadImgML'

function App() {
  const [images, setImages] = useState();
  const handleRemoveImgUrl = () => { };

  return (
    <div className="App">
      <AppStyled>
        <div>
          <UploadImgML
            setImages={setImages}
            disabled={false}
            images={images}
          />
        </div>
      </AppStyled>
    </div>
  )
}

export default App
