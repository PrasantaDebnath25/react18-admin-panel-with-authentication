const ImageFormat={ 
    imageCheck(str) { 
        if (str === 'png' || str === 'jpg' || str === 'jpeg' || str === 'PNG' || str === 'JPG' || str === 'JPEG' ) {
          return true
        } else {
          return false
        }
    },
    videoCheck(str) { 
      if (str === 'mp4' || str === 'mp3' || str === 'gif' || str === 'MP4' || str === 'MP3' || str === 'GIF' ) { 
        return true
      } else {
        return false
      }
    },
    fileUploadExtentionCheck(str) { 
        if (str === 'png' || str === 'jpg' || str === 'jpeg' || str === 'pdf' || str === 'PNG' || str === 'JPG' || str === 'JPEG' || str === 'PDF') {
          return true
        } else {
          return false
        }
    },
    fileUploadSize(fileSize) {
      //5MB
      if (fileSize === '' || fileSize === null || fileSize === undefined || fileSize > 5242880) {
        return false
      } else {
        return true
      }
    },
    videoUploadSize(fileSize) {
      //50MB
      if (fileSize === '' || fileSize === null || fileSize === undefined || fileSize > 52428800) {
        return false
      } else {
        return true
      }
    },
    fileUploadSizeForProfilePhoto(fileSize) { 
      //4MB
      if (fileSize === '' || fileSize === null || fileSize === undefined || fileSize > 4194304) {
        return false
      } else {
        return true
      }
    },
    fileForRoster(str) { //For Roster
      if (str === 'xls' || str === 'xlsx' || str === 'csv' || str === 'XLS' || str === 'XLSX' || str === 'CSV' ) {
        return true
      } else {
        return false
      }
    },
    fileUploadSizeForRoster(fileSize) {
      //10MB //For Roster
      if (fileSize === '' || fileSize === null || fileSize === undefined || fileSize > 10485760) {
        return false
      } else {
        return true
      }
    }
    
}
export default ImageFormat;