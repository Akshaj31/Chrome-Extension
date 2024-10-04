const imageInput = document.getElementById('image-input');
const convertBtn = document.getElementById('convert-btn');
const canvas = document.getElementById('canvas');
const downloadLink = document.getElementById('download-link');


// To store the format of the uploaded file (jpeg or png)
let currentFormat = '';  

// To store the original filename
let originalFilename = '';  


function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

function getFileNameWithoutExtension(filename) {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
}
  
imageInput.addEventListener('change', handleFile);
convertBtn.addEventListener('click', convertImage);

function handleFile(event) {
  const file = event.target.files[0];

  if (file) {
    const fileExtension = getFileExtension(file.name);
    originalFilename = getFileNameWithoutExtension(file.name); 

    if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
      currentFormat = 'jpeg';
      convertBtn.textContent = 'Convert to PNG'; 
    } else if (fileExtension === 'png') {
      currentFormat = 'png';
      convertBtn.textContent = 'Convert to JPEG'; 
    }

    const reader = new FileReader();

    reader.onload = function(e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        convertBtn.disabled = false;
      };
    };

    reader.readAsDataURL(file);
  }
}

function convertImage() {
  let mimeType, fileExtension;

  if (currentFormat === 'jpeg') {
    // If the current image is JPEG, convert to PNG
    mimeType = 'image/png';
    fileExtension = 'png';
  } else if (currentFormat === 'png') {
    // If the current image is PNG, convert to JPEG
    mimeType = 'image/jpeg';
    fileExtension = 'jpg';
  }


  const imageUrl = canvas.toDataURL(mimeType);
  

  const newFilename = `${originalFilename}_converted_to_${fileExtension}.${fileExtension}`;
  

  downloadLink.href = imageUrl;
  downloadLink.download = newFilename; // Use the new name for download
  downloadLink.style.display = 'block';  // Show the download link
  downloadLink.textContent = `Download ${fileExtension.toUpperCase()}`;
}



