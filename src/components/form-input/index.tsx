import {Text, TextInput, View} from "react-native";
import {Controller} from "react-hook-form";

interface FormInputProps {
    style?: any;
    label?: string;
    labelStyle?: any;
    inputStyle?: any;
    isSecureText?: boolean;
    control: any;
    name: string;
    errors: any;
    rules?: any;
}

const FormInput = ({ style, label, labelStyle, inputStyle, isSecureText, control, name, errors, rules }: FormInputProps) => {
    return (
        <View style={style}>
            {label && <Text style={labelStyle}>{label}</Text>}
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={inputStyle}
                        onBlur={ onBlur }
                        value={ value }
                        onChangeText={ onChange }
                        secureTextEntry={isSecureText}
                    />
                )}
                name={name}
            />
            {errors && errors[name] && (
                <Text style={{ color: 'red' }}>
                    {errors[name].message}
                </Text>
            )}
        </View>
    )
}

export { FormInput }
