import { FC, InputHTMLAttributes } from "react";
import { Group, FormInputLabel, StyledFormInput } from "./form-input.styles";

type FromInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FromInputProps> = ({ label, ...otherProps }) => {
    return (
        <Group>
            <StyledFormInput {...otherProps} />
            {label && (
                <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === "string" && otherProps.value.length)}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
}

export default FormInput;
