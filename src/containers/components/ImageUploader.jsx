import React, { useState } from "react";
import Upload from "antd/es/upload/Upload";
import { Upload as UploadIcon } from "lucide-react";
const MAX_IMAGES = 4;

const ImageUploader = ({ onChange, setError, clearErrors }) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList.length > MAX_IMAGES) {
      setError("imageData", {
        type: "manual",
        message: "Bạn chỉ có thể tải tối đa 4 ảnh",
      });
      return;
    }

    setFileList(newFileList);
    onChange(newFileList);
    clearErrors("imaegData"); // Clear error when valid
  };

  return (
    <Upload
      listType="picture"
      fileList={fileList}
      beforeUpload={() => false} // Prevent auto-upload
      onChange={handleChange}
    >
      {fileList.length >= MAX_IMAGES ? null : (
        <button
          className="flex items-center py-1 px-3 rounded-full text-[#333] text-[13px] border border-solid border-[#ededed] gap-2 font-medium mt-[15px]"
          type="button"
        >
          <UploadIcon stroke="#a4aaaf" size={16} />
          Tải ảnh lên
        </button>
      )}
    </Upload>
  );
};
export default ImageUploader;
