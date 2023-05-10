import imageCompression from 'browser-image-compression'

async function blobToFile(blob: Blob, fileName = ''): Promise<File> {
  const newFile = new File([blob], fileName, {
    type: blob.type
  })
  return newFile
}

async function fetchAvatar(url: string): Promise<File> {
  const res = await fetch(url)
  const blob = await res.blob()
  const file = await blobToFile(blob)
  return file
}

async function blobToBase64(blob: Blob): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = error => {
      reject(error)
    }
  })
}

async function convertCompressedFileToBase64(
  file: File
): Promise<string | null> {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 64
    })
    const base64 = await blobToBase64(compressedFile)
    return base64
  } catch (error) {
    console.error(error)
    return null
  }
}

export { convertCompressedFileToBase64, fetchAvatar }
