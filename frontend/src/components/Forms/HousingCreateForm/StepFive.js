import React, { useState } from 'react';
import { ErrorMessage } from 'formik';
import Dropzone from 'react-dropzone';
import Icon from '../../../icons';
import { DropzoneContainer, thumbsContainer, thumb, thumbInner, img } from '../../../constants';

const StepFive = ({ setFieldValue, values }) => {
  const [selectedImages, setSelectedImages] = useState(values.images);

  const handleDelete = (file) => {
    values.images = values.images.filter((item) => item !== file);
    setSelectedImages(values.images);
  };

  return (
    <>
      <div className="sm:mx-auto font-bold text-lg sm:text-xl mb-6">
        Help others visualize your place with real pictures!
      </div>
      <Dropzone
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length === 0) {
            return;
          }
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          );
          for (const f of acceptedFiles) {
            values.images.push(f);
          }
          setFieldValue('images', values.images);
        }}
        accept="image/jpeg, image/png"
        minSize={0}
        multiple
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
          const thumbs = selectedImages?.map((file) => {
            return (
              <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                  <img src={file.preview} style={img} alt={file.preview} />
                </div>
                <Icon
                  icon={['fas', 'minus-circle']}
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    color: '#ea4235',
                    width: '20px',
                    height: '20px'
                  }}
                  onClick={() => handleDelete(file)}
                />
              </div>
            );
          });
          return (
            <>
              <DropzoneContainer {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon icon={['fad', 'cloud-upload-alt']} style={{ height: '50px', width: '50px' }} />
                {!isDragActive && 'Click here or drop a file to upload!'}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && 'File type not accepted, sorry!'}
              </DropzoneContainer>
              <aside style={thumbsContainer}>{thumbs}</aside>
            </>
          );
        }}
      </Dropzone>
      <ErrorMessage className="text-red-500 text-xs" component="div" name="images" />
    </>
  );
};

export default StepFive;
