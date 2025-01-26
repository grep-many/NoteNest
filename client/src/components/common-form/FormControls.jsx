import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

const FormControls = ({ formControls = [], formData, setFormData }) => {

    const [passwordVisible, setPasswordVisible] = useState({});

    const handlePasswordToggle = (name) => {
        setPasswordVisible((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    }

    const renderComponentByType = (getControlItem) => {

        let element = null;
        const currentControlItemValue = formData[getControlItem.name] || "";

        switch (getControlItem.componentType) {
            case "input":
                if (getControlItem.type === "password") {
                    // Render password field with toggle
                    element = (
                        <div className="relative">
                            <Input
                                id={getControlItem.name}
                                name={getControlItem.name}
                                placeholder={getControlItem.placeholder}
                                type={passwordVisible[getControlItem.name] ? "text" : "password"} // Toggle between password and text
                                value={currentControlItemValue}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        [getControlItem.name]: event.target.value,
                                    })
                                }
                                className='pr-10'
                            />
                            <button
                                type="button"
                                onClick={() => handlePasswordToggle(getControlItem.name)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {passwordVisible[getControlItem.name] ? (
                                    <EyeOff className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                    );
                } else {

                    element = (
                        <Input
                            id={getControlItem.name}
                            name={getControlItem.name}
                            placeholder={getControlItem.placeholder}
                            type={getControlItem.type}
                            value={currentControlItemValue}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    [getControlItem.name]: event.target.value,
                                })
                            }
                        />
                    );
                }
                break;
            case "textarea":
                element = (
                    <Textarea
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        value={currentControlItemValue}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;
            default:
                element = (
                    <Input
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type}
                        value={currentControlItemValue}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;
        }

        return element;
    }

    return (
        <div className="flex flex-col gap-3">
            {formControls.map((controleItem) => (
                <div key={controleItem.name}>
                    <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
                    {renderComponentByType(controleItem)}
                </div>
            ))}
        </div>
    );
}

export default FormControls;