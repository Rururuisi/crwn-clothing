import { Group, FormInputLabel, StyledFormInput } from "./form-input.styles";

function FormInput({ label, ...otherProps }) {
    return (
        <Group>
            <StyledFormInput {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length ? true : false}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
}

export default FormInput;
