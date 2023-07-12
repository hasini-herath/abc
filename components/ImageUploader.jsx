import { useState } from 'react';
import styles from "@styles/globals.css"

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }
    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();

    for ( const file of fileInput.files ) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');  
  }

  return (
    <div className={styles.container}>     
          <main className={styles.main}>
        <h1 className={styles.title}>
          Image Uploader
        </h1>
        <form className={styles.form} onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>          
          <img src={imageSrc} />          
          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}
          {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </main>   
    </div>
  )
}