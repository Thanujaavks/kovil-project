import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import {supabase} from "../../hook/supabaseClient";

const UploadWithImagePreviewList = () => {
    const [fileNames, setFileNames] = useState([]);
    const [files, setFiles] = useState([]);
    const [fileURLs, setFileURLs] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        console.log(files);
        setFiles((prev) => [...prev, event.target.files[0]]);
        const newFileNames = files.map((file) => file.name);
        setFileNames((prev) => [...prev, ...newFileNames]);
    };

    const removeFileName = (name) => {
        setFileNames((prev) => prev.filter((fileName) => fileName !== name));
        setFiles((prev) => prev.filter((file) => file.name !== name));
    };

    const handleUpload = async () => {
        if (files.length === 0) return alert('Please select files.');

        const uploadedFiles = []; // To store successfully uploaded file URLs

        for (const file of files) {
            const { data, error } = await supabase.storage
                .from('GeethanjalieFileStorage') // Replace with your bucket name
                .upload(`public/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                console.error(`Error uploading ${file.name}:`, error.message);
            } else {
                //https://bhibujpyprblrczhoofa.supabase.co/storage/v1/object/public
                uploadedFiles.push(`https://bhibujpyprblrczhoofa.supabase.co/storage/v1/object/public/GeethanjalieFileStorage/${data.path}`); // Save the uploaded file path
                console.log(`${data.path} uploaded successfully:`, data);
            }
        }

        // Update state after all uploads are done
        console.log(uploadedFiles);
        setFileURLs((prev) => [...prev, ...uploadedFiles]);
        setFileNames([]);
        setFiles([]);

        alert('All files have been uploaded successfully!');
    };



    console.log(files);
    console.log(fileURLs);

    return (
        <div className="col-md-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Upload With Image Preview</h6>
                </div>
                <div className="card-body p-24">
                    <label
                        htmlFor="file-upload-name"
                        className="mb-16 border border-neutral-600 fw-medium text-secondary-light px-16 py-12 radius-12 d-inline-flex align-items-center gap-2 bg-hover-neutral-200"
                    >
                        <Icon icon="solar:upload-linear" className="text-xl"></Icon>
                        Click to upload
                        <input
                            type="file"
                            className="form-control w-auto mt-24 form-control-lg"
                            id="file-upload-name"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                    </label>

                    {fileNames.length > 0 && (
                        <ul id="uploaded-img-names" className="show-uploaded-img-name">
                            {fileNames.map((fileName, index) => (
                                <li
                                    key={index}
                                    className="uploaded-image-name-list text-primary-600 fw-semibold d-flex align-items-center gap-2"
                                >
                                    <Icon
                                        icon="ph:link-break-light"
                                        className="text-xl text-secondary-light"
                                    ></Icon>
                                    {fileName}
                                    <Icon
                                        icon="radix-icons:cross-2"
                                        className="remove-image text-xl text-secondary-light text-hover-danger-600"
                                        onClick={() => removeFileName(fileName)}
                                    ></Icon>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
                <button
                    type="button"
                    className="btn btn-primary-600 radius-8 px-20 py-11"
                    onClick={handleUpload}
                >
                    Primary
                </button>
            </div>
        </div>
    )
}

export default UploadWithImagePreviewList