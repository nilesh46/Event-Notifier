import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import grey from "@material-ui/core/colors/grey";
import { IconButton } from "@material-ui/core";

const DropzoneInput = ({ setFiles }) => {
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
			<IconButton style={{ margin: "4rem" }}>
				<AddAPhotoIcon fontSize="large" style={{ color: grey[50] }} />
			</IconButton>
		</div>
	);
};

export default DropzoneInput;
