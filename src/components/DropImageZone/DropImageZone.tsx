import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import './drop-image-zone.scss';
import { useTranslation } from 'react-i18next';

interface IDropImageZone {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isVisible?: boolean;
}

export const DropImageZone = ({
  setFiles,
  isVisible = true
}: IDropImageZone) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setFileNames(acceptedFiles.map((file) => file.name));
  };
  const { t } = useTranslation();

  return (
    <Dropzone onDrop={handleDrop} accept={{ 'image/*': [] }}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      }) => {
        const additionalClass = isDragAccept
          ? 'accept'
          : isDragReject
          ? 'reject'
          : '';

        return (
          <div
            {...getRootProps({
              className: `dropzone ${additionalClass}`
            })}
            style={{
              opacity: isVisible ? '1' : '0',
              position: isVisible ? 'relative' : 'absolute',
              top: 0,
              height: '100%'
            }}
          >
            <input {...getInputProps()} />
            <span>{isDragActive ? '📂' : '📁'}</span>
            {fileNames.length > 0 ? (
              <>
                <strong>{t('Files')}:</strong>
                <ul>
                  {fileNames.map((fileName) => (
                    <li key={fileName}>{fileName}</li>
                  ))}
                </ul>
              </>
            ) : (
              t('Dragndrop images, or click to select files')
            )}
          </div>
        );
      }}
    </Dropzone>
  );
};
