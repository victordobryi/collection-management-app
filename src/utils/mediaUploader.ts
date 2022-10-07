export const mediaUploader = async (files: File[]) => {
  const media = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dn5vtba0');
    formData.append('cloud_name', 'dekeamxhx');
    formData.append('folder', 'collections');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dekeamxhx/upload',
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await res.json();
      media.push(data.secure_url);
    } catch (error) {
      console.log(error);
    }
  }
  return media;
};
