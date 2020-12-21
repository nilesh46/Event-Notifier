import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { IconButton } from "@material-ui/core";

const DropzoneInput = ({ setFiles, marg }) => {
	const onDrop = useCallback(
		(acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
		[setFiles]
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
		accept: "image/*",
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<IconButton>
				<AddAPhotoIcon fontSize="large" color="inherit" />
			</IconButton>
		</div>
	);
};

export default DropzoneInput;
