'use client';

import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const EnhancedUpload = ({ onFileChange, onDescriptionChange }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onDescriptionChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-stone-600">Choose one of the following:</p>
      <div className="flex space-x-4">
        <motion.div
          className={`flex-1 rounded-lg border-2 border-dashed p-4 ${isDragActive ? 'border-[#ff8300] bg-[#fff5e6]' : 'border-stone-200 bg-stone-50'}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex h-full flex-col items-center justify-center">
            <Upload className="mb-2 h-8 w-8 text-[#ff8300]" />
            <p className="mb-2 text-center text-sm">
              📸 Snap & upload your idea!
            </p>
            <Button variant="outline" size="sm" className="bg-white">
              Choose File
            </Button>
            {file && <p className="mt-2 text-sm text-stone-600">{file.name}</p>}
          </div>
        </motion.div>
        <div className="flex-1">
          <Textarea
            placeholder="💡 Or describe your brilliant idea here!"
            value={description}
            onChange={handleDescriptionChange}
            className="h-full resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedUpload;
