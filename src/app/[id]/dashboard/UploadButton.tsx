import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import { useEffect } from "react";

interface OurUploadButtonProps {
  userId: string;
}

export const OurUploadButton: React.FC<OurUploadButtonProps> = ({ userId }) => {
  const handleClientUploadComplete = async (res: any) => {
    try {
      console.log('Upload response:', res[0].key);
  
      // Adjust this line based on the actual structure of the response
      const imageKey = res[0].key;
  
      if (!imageKey) {
        throw new Error('Image key is undefined');
      }
  
      const response = await fetch(`/api/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageKey }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user with image key');
      }
  
      console.log('Image key sent to server:', imageKey);
      alert('Upload Completed');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert(`ERROR!`);
    }
  };
  

  return (
    <>
    <UploadButton<OurFileRouter>
      className="bg-blue-500 rounded-lg w-64"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => { 
        console.log('Upload response:', res);
        handleClientUploadComplete(res);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      onBeforeUploadBegin={(files) => {
        // Preprocess files before uploading (e.g., rename them)
        return files.map(
          (f) => new File([f], "renamed-" + f.name, { type: f.type }),
        );
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
    </>
    
  );
};

