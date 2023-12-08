import React, {ReactNode, useRef} from 'react';
import Box from "@mui/material/Box";

type TypeFileUpload = {
    setFile: Function,
    accept: string;
    children: ReactNode
}

const FileUpload: React.FC<TypeFileUpload> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: any) => {
        setFile(e.target.files[0])
    }

    return (
        <Box onClick={() => ref.current?.click()}>
            <input
                type="file"
                accept={accept}
                style={{display: "none"}}
                // @ts-ignore
                ref={ref}
                onChange={onChange}
            />
            {children}
        </Box>
    );
};

export default FileUpload;